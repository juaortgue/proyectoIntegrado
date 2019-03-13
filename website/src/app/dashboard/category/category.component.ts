import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

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
    if (this.authService.getToken() == null) {
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

}
