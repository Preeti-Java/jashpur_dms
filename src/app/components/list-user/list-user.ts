import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Users } from '../../modals/Users';
import { UserManagerService } from '../../services/user-manager-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../user/user';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-list-user',
  standalone:true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule],
  templateUrl: './list-user.html',
  styleUrl: './list-user.scss'
})
export class ListUser implements OnInit  {

  displayedColumns: string[] = ['username', 'email', 'firstname', 'lastname', 'mobile', 'roles'];
  UserfilterForm: FormGroup;
  showTable = false;

  
  //dataSource: any[] = [];
  dataSource = new MatTableDataSource<User>();

   @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private fb: FormBuilder,
    private _userManagerService : UserManagerService,
   
  private _snackBar : MatSnackBar
  ){
    this.UserfilterForm = this.fb.group({
      roles: ['']
     
     
    });
  }
  
   listOfRoles = [
    "SUPERADMIN", "ADMIN", "USER"
  ]


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    
   
  }
  
  reset(){
    this.UserfilterForm.reset();
  }


  onSubmit(roles : string) {
    
    this._userManagerService.loadUserList(roles).subscribe({
      next: (response: any) => {
        this.showTable=true;
        this.dataSource = response;
      },
      error: (error) => {
        alert(error);
      }
    });
  }

}
