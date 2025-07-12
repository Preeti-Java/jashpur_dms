import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TokenStorageService } from '../../_helpers/token-storage-service';

interface MenuItem {
  icon: string;
  label: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
   standalone: true,
})
export class Sidebar {



 userRoles: string[] = [];
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();
  user: any;
  
  
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
    const user = this.tokenStorage.getUser();
    if (user) {
      this.user = user;
    }
    const role = this.tokenStorage.getUserRole();
    if (role) {
      this.userRoles = role;
    }
  }

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }


  menuItems: MenuItem[] = [
    {
      icon: 'fas fa-home',
      label: 'Dashboard',
      isOpen: false,
      children: [
        { icon: 'fas fa-chart-pie', label: 'Analytics' },
        { icon: 'fas fa-tasks', label: 'Projects' },
      ]
    },
    {
      icon: 'fas fa-cog',
      label: 'Settings',
      isOpen: false,
      children: [
        { icon: 'fas fa-user', label: 'Profile' },
        { icon: 'fas fa-lock', label: 'Security' },
      ]
    },
    {
      icon: 'fas fa-envelope',
      label: 'Messages'
    }
  ];

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleMenuItem(item: MenuItem) {
    // Only toggle if sidebar is not collapsed and item has children
    if (!this.isSidebarCollapsed && item.children) {
      item.isOpen = !item.isOpen;
    }
  }
  
  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }
}
