import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from '../../services/category.service';
import { CategoryCreateDto } from '../../dto/create-category.dto';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss']
})
export class CreateCategoryDialogComponent implements OnInit {
  edit: boolean;
  name: string;
  form: FormGroup;
  categoryId: string;
  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private categoryService: CategoryService, public dialogRef: MatDialogRef<CreateCategoryDialogComponent>) { }


  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.edit = true;
      this.categoryId = this.data.category.id;
    } else {
      this.edit = false;
    }
  }
  createForm() {
    if (this.data) {
      const editForm: FormGroup = this.fb.group ({
        name: [this.data.category.name, Validators.compose ([ Validators.required ])]
      });
      this.form = editForm;
    } else {
      const newForm: FormGroup = this.fb.group ({
        name: [null, Validators.compose ([ Validators.required ])]
      });
      this.form = newForm;
    }
  }
  addCategory() {
    const categoryCreateDto = new CategoryCreateDto(this.name);
    this.categoryService.createCategory(categoryCreateDto).subscribe(
      category => {
        this.dialogRef.close('confirm');
      }
    );
  }
  editCategory() {
    const categoryCreateDto = new CategoryCreateDto(this.name);
    this.categoryService.updateCategory(this.categoryId, categoryCreateDto).subscribe(
      categoria => {
        this.dialogRef.close('confirm');
      }
    );
  }
  onSubmit() {
    if (this.edit) {
      const editCategory: CategoryCreateDto = <CategoryCreateDto>this.form.value;
      this.categoryService.updateCategory(this.categoryId, editCategory).subscribe(r => {
        this.dialogRef.close('confirm');
      }, e => {
        this.snackBar.open('Failed to create.', 'Close', {duration: 3000});
      });
    } else {
      const newCategory: CategoryCreateDto = <CategoryCreateDto>this.form.value;
      this.categoryService.createCategory(newCategory).subscribe(r => this.dialogRef.close('confirm'),
      e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));
    }
  }

}
