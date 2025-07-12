import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct
import { Users } from '../../modals/Users';
import { TokenStorageService } from '../../_helpers/token-storage-service';
import Swal from 'sweetalert2';
import { Dashboard } from '../dashboard/dashboard';



@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
 
})
export class Login {

  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private _router: Router, private _auth : Auth,
     private _localStorageService : TokenStorageService,
     private _activeRouter: ActivatedRoute,
    ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  
  }

  

  

  errorMessage: string | null = null;
  

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;
    if (this.loginForm.invalid) return;
  
    const { username, password } = this.loginForm.value;
    

    this._auth.login("superadmin", "superadmin123").subscribe(response => {

      const token = response?.token;
      if (token != null && token != undefined) {
        //login success
        console.log("--------");
      
        this._localStorageService.saveToken(token);
        this._localStorageService.saveUser(response?.username,response.roles[0]);
        //redirect user dashboard
      //  var url = this._activeRouter.snapshot.queryParamMap.get('returnUrl') || '/user/dashboard';
        //event
        console.log("Navigating to dashboard...");
        this._router.navigate(['dashboard']);
        
      }
      else {
        this.errorMessage = 'login failed';
      }
    }, error => {
      if (error == null || error == undefined || error.status == 0)
        this.errorMessage = "Server offline, Try after some time."
      else
        this.errorMessage = error.error.message;
    });
  }

}

