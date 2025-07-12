import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { TokenStorageService } from './_helpers/token-storage-service';
import { Login } from "./components/login/login";
import { provideHttpClient, withFetch } from '@angular/common/http';

/**
 * The root component of the Angular application.
 * Manages user authentication status and displays appropriate navigation links.
 */
@Component({
  selector: 'app-root',
standalone : true,
  imports: [RouterModule,CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  
})
export class App {
[x: string]: any;
  protected title = 'jashpur_dms';

  isLoggedIn = false; // Tracks if a user is logged in
  showAdminBoard = false; // Controls visibility of Admin link
  showUserBoard = false;  // Controls visibility of User link
  showSuperAdminBoard = false;
  username?: string; // Stores the logged-in username

  constructor(private tokenStorageService: TokenStorageService, private router: Router){}

  goHome() {
   // this['router'].navigate(['/home']);
    this.router.navigate(['/home']);
  }

 

  /**
   * Logs out the current user.
   * Clears session storage and reloads the page to reflect logout.
   */
  logout(): void {
    this.tokenStorageService.signOut(); // Clear token and user data
    window.location.reload(); // Reload the page to reset application state
  }
}
