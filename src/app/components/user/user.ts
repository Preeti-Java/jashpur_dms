import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CreateUser } from "../create-user/create-user";
import { ListUser } from "../list-user/list-user";
import { Register } from "../register/register";
import { Profile } from "../profile/profile";

@Component({
  selector: 'app-user',
  imports: [MatTabsModule, MatIconModule, ListUser, Register, Profile],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {

}
