import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgFor , NgIf} from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatCard } from '@angular/material/card';
import { Users } from '../../modals/Users';
import { User } from '../user/user';
import { UserManagerService } from '../../services/user-manager-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auth } from '../../services/auth';




@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatInputModule,
ReactiveFormsModule,
  MatCard,
  MatOption, // ✅ Needed for <mat-option>
  
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  standalone: true
})
export class Register {

     userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _userService : UserManagerService,
    private _authService : Auth,
     private _snackBar : MatSnackBar
  ) {
    this.userForm = this.fb.group({
      username: [''],
      password: [''],
      mobile: [''],
      email: [''],
      firstname: [''],
      lastname: [''],
      roles: ['']
    });
  }

 

   faEye = faEye;
  faEyeSlash = faEyeSlash;

  listOfRoles = [
    "SUPERADMIN", "ADMIN", "USER"
  ]


onSubmit() : void{
  //  const formValue = this.userForm.value;
    
  //    const newUser: Users = {
  //   ...formValue,
  //   roles: [{ name: formValue.roles }] // 👈 transform role string to array of object
  // };
   const { username, email, firstname, lastname, mobile, password, roles } = this.userForm.value;

const roleList: string[] = [roles]; // ✅ assume single role selected

this._authService.register(
  username,
  email,
  firstname,
  lastname,
  mobile,
  password,
  roleList).subscribe({
        next: (response: String) => {
                this._snackBar.open(JSON.stringify(response), 'close',{
                   horizontalPosition: 'center',
                   verticalPosition: 'top',
                });
                this.userForm.reset();
                },
                error: (err: any) => {
                this._snackBar.open('Something wrong ! Try again.' + err, 'close',{
                   horizontalPosition: 'center',
                   verticalPosition: 'top',
                });
                }
    })
  }

}
