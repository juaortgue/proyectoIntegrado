import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CategoryResponse } from 'src/app/interfaces/category-response';
import { DeleteCategoryDialogComponent } from '../../dialogs/delete-category-dialog/delete-category-dialog.component';
import { CreateCategoryDialogComponent } from '../../dialogs/create-category-dialog/create-category-dialog.component';
import { CategoryCreateDto } from '../../dto/create-category.dto';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private authService: AuthenticationService, private categoryService: CategoryService, 
    public snackBar: MatSnackBar, public dialog: MatDialog, private router: Router) { }
  displayedColumns: string[] = ['name', 'actions'];

  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    if (this.authService.getToken()==null || !this.authService.isAdmin()) {
      this.router.navigate ( [ '/' ] );
    } else {
      this.getAllCategories();
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(categoryList => {
      this.dataSource = new MatTableDataSource(categoryList.rows);
      this.dataSource.paginator = this.paginator;
      console.log(categoryList.rows);
    }, error => {
      this.snackBar.open('Error obtaining categories', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }
  openDialogDeleteCategory(c: CategoryResponse) {
    const dialogDeleteCategory = this.dialog.open(DeleteCategoryDialogComponent, { data: { category: c } });
    dialogDeleteCategory.afterClosed().subscribe(result => {
      this.getAllCategories();
    });
  }
  openDialogNewCategory() {
    const dialogNewCategory = this.dialog.open(CreateCategoryDialogComponent, { width: '500px' });
    dialogNewCategory.afterClosed().subscribe(res => (res === 'confirm') ? this.getAllCategories() : null,
      err => this.snackBar.open('There was an error when we were creating a new Route.', 'Close', { duration: 3000 }));
  }
  openDialogEditCategory(categoryCreateDto: CategoryCreateDto) {
    const dialogUpdateCategory = this.dialog.open(CreateCategoryDialogComponent, { width: '500px', data: { category: categoryCreateDto } });
    dialogUpdateCategory.afterClosed().subscribe(result => {
      this.getAllCategories();
    });
  }
  /*openDialogDeleteUser(u: UserResponse) {
    const dialogDeleteUser = this.dialog.open(DialogDeleteUserComponent, { data: { user: u } });
    dialogDeleteUser.afterClosed().subscribe(result => {
      this.getAll();
    });
  }
  openDialogNewUser() {
    const dialogNewUser = this.dialog.open(DialogCreateUserComponent, { width: '500px' });
    dialogNewUser.afterClosed().subscribe(result => {
      this.getAll();
    });
  }
  openDialogUpdateUser(userResponse: UserResponse) {
    const dialogUpdateUser = this.dialog.open(DialogEditUserComponent, { width: '500px', data: { user: userResponse } });
    dialogUpdateUser.afterClosed().subscribe(result => {
      this.getAll();
    });
  }*/

}
