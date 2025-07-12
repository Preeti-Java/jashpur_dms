import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserManagerService } from '../../services/user-manager-service';
import { Users } from '../../modals/Users';



@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  userData!: Users;

  constructor(private http: HttpClient,
    private _userManagerService: UserManagerService
  ) {}

   ngOnInit(): void {
    this.getUserProfile();
  }
  getUserProfile(): void {
    let username = localStorage.getItem("auth-user"); 
  
    if (username) {
    this._userManagerService.getUserProfile(username).subscribe({
    next: (response: Users) => {
          this.userData = response;
      },
      error: (error) => {
        alert(error);
      }
    });
}
else
{
  alert("Login again");
}
}

}
