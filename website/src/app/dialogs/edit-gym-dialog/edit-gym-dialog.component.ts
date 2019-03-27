import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GymService } from 'src/app/services/gym.service';
import { GymResponse } from 'src/app/interfaces/gym-response';
import { GymOneResponse } from 'src/app/interfaces/gym-one-response';
import { GymCreateDto } from 'src/app/dto/gym-create.dto';
import { GeoService } from 'src/app/services/geo.service';
import { MatSnackBar } from '@angular/material';
import { UploadGymService } from 'src/app/services/upload-gym.service';
import { forkJoin } from 'rxjs';
import { GymCreatePhotoDto } from 'src/app/dto/gym-photo-dto';

@Component({
  selector: 'app-edit-gym-dialog',
  templateUrl: './edit-gym-dialog.component.html',
  styleUrls: ['./edit-gym-dialog.component.scss']
})
export class EditGymDialogComponent implements OnInit {
  public form: FormGroup;
  @ViewChild('file') file;
  progress;
  canBeClosed = true;
  primaryButtonText = 'Subir';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  public files: Set<File> = new Set();
  gym:GymOneResponse;
  constructor(private uploadService:UploadGymService, private fb: FormBuilder, private gymService: GymService,
    public dialogRef: MatDialogRef<EditGymDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private geoService: GeoService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.gym = this.data.gym;
    this.createFormEmpty();
    console.log(this.data)
    this.getOne();
    
    
  }
  createForm() {
    this.form = this.fb.group({
      name: [this.gym.name, Validators.compose ([ Validators.required ])],
      address: [this.gym.address, Validators.compose ([ Validators.required ])],
      zipcode: [this.gym.zipcode, Validators.compose ([ Validators.required ])],
      province: [this.gym.province, Validators.compose ([ Validators.required ])],
      city: [this.gym.city, Validators.compose ([ Validators.required ])],
      price: [this.gym.price, Validators.compose ([ Validators.required ])],
      description: [this.gym.description, Validators.compose ([ Validators.required ])],
      picture: [null, Validators.compose ([ Validators.required ])]

    });
  }
  createFormEmpty() {
    this.form = this.fb.group({
      name: [null, Validators.compose ([ Validators.required ])],
      address: [null, Validators.compose ([ Validators.required ])],
      zipcode: [null, Validators.compose ([ Validators.required ])],
      province: [null, Validators.compose ([ Validators.required ])],
      city: [null, Validators.compose ([ Validators.required ])],
      price: [null, Validators.compose ([ Validators.required ])],
      description: [null, Validators.compose ([ Validators.required ])],
      picture: [null, Validators.compose ([ Validators.required ])]

    });
  }
  
  getOne(){
    
    this.gymService.getOneGym(this.data.gym.id).subscribe(gymOneResponse=>{
      
      this.gym = gymOneResponse;
      this.createForm();

    });
  }
  onSubmit(){


    const gymDto: GymCreateDto = this.form.value;
    let position = '';
    this.geoService.getLocation(gymDto.address).subscribe(r => {
      console.log('MIRA')
      console.log(gymDto)
      position = r.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
      position = position+','+r.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
      gymDto.position = position;
    
    this.gymService.createGym(gymDto).subscribe(r => this.dialogRef.close('confirm'),
    e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));

    })
    //SOLUCION TEMPORAL A IMAGENES
    /*if(this.gym.picture!=null){
      gymDto.picture = this.gym.picture;

    }else{
      gymDto.picture= 'https://s.imgur.com/images/logo-1200-630.jpg?2'
    }*/
    //SOLUCION TEMPORAL A IMAGENES
    gymDto.position = this.gym.position
   
    this.gymService.updateGym(this.data.gym.id, gymDto).subscribe(gymEdited=>{
      console.log(gymEdited);
      
    });
  }
  //photo


  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    this.files = new Set();
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key]);
      }
    }
  }
  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close('confirm');

      /*this.trainingService.create(newTraining).subscribe(r => this.dialogRef.close('confirm'),
      e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));*/
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    const newGym :GymCreatePhotoDto = <GymCreatePhotoDto>this.form.value;
    console.log('JEJE')
    console.log(newGym);
    this.progress = this.uploadService.editWithPhoto(this.files, newGym, this.data.gym.id);
    // tslint:disable-next-line:forin
    for (const key in this.progress) {
      this.progress[key].progress.subscribe(val => console.log(val));
    }

    // convert the progress map into an array
    const allProgressObservables = [];
    // tslint:disable-next-line:forin
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finalizar';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;

    });
  }
  //foto

}
