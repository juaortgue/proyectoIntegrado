import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GymService } from 'src/app/services/gym.service';
import { GymResponse } from 'src/app/interfaces/gym-response';
import { GymOneResponse } from 'src/app/interfaces/gym-one-response';
import { GymCreateDto } from 'src/app/dto/gym-create.dto';
import { GeoService } from 'src/app/services/geo.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-gym-dialog',
  templateUrl: './edit-gym-dialog.component.html',
  styleUrls: ['./edit-gym-dialog.component.scss']
})
export class EditGymDialogComponent implements OnInit {
  public form: FormGroup;
  gym:GymOneResponse;
  constructor(private fb: FormBuilder, private gymService: GymService,
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
      description: [this.gym.description, Validators.compose ([ Validators.required ])]
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
      description: [null, Validators.compose ([ Validators.required ])]
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
    if(this.gym.picture!=null){
      gymDto.picture = this.gym.picture;

    }else{
      gymDto.picture= 'https://s.imgur.com/images/logo-1200-630.jpg?2'
    }
    //SOLUCION TEMPORAL A IMAGENES
    gymDto.position = this.gym.position
   
    this.gymService.updateGym(this.data.gym.id, gymDto).subscribe(gymEdited=>{
      console.log(gymEdited);
      
    });
  }
  /*getPosition(){
    let position = '';
    this.geoService.getLocation(newGym.address).subscribe(r => {
      
      position = r.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
      position = position+','+r.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
      newGym.position = position;
      //newGym.picture='foto'
    
    this.gymService.createGym(newGym).subscribe(r => this.dialogRef.close('confirm'),
    e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));

    })
  }*/
  /*let position = '';

      //obtain geolocation
      this.geoService.getLocation(newGym.address).subscribe(r => {
      
        position = r.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
        position = position+','+r.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
        newGym.position = position;
        //newGym.picture='foto'
      
      this.gymService.createGym(newGym).subscribe(r => this.dialogRef.close('confirm'),
      e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));
  
      })*/
}
