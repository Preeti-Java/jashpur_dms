import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { BoardUser } from './components/board-user/board-user';
import { BoardAdmin } from './components/board-admin/board-admin';
import { BoardSuperadmin } from './components/board-superadmin/board-superadmin';
import { Upload } from './components/upload/upload';
import { Dashboard } from './components/dashboard/dashboard';
import { BulkUpload } from './components/bulk-upload/bulk-upload';
import { SingleUpload } from './components/single-upload/single-upload';
import { CreateMessage } from './components/create-message/create-message';
import { CreateUser } from './components/create-user/create-user';
import { FileLogs } from './components/file-logs/file-logs';
import { ListUser } from './components/list-user/list-user';
import { Logs } from './components/logs/logs';
import { UserLogs } from './components/user-logs/user-logs';
import { Message } from './components/message/message';
import { ReadMessage } from './components/read-message/read-message';
import { Search } from './components/search/search';
import { User } from './components/user/user';
import { EntriesFilters } from './components/entries-filters/entries-filters';
import { AllDocuments } from './components/all-documents/all-documents';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default landing page
  { path: 'login', component: Login },

  { path: 'create-message', component: CreateMessage, canActivate: [authGuard] },
  { path: 'read-message', component: ReadMessage, canActivate: [authGuard] },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      {
        path: 'search',
        component: Search,
        canActivate: [authGuard],
        children: [
          {
            path: 'entries-filter',
            component: EntriesFilters,
            canActivate: [authGuard, roleGuard],
            data: { role: ['ROLE_ADMIN', 'ROLE_SUPERADMIN'] }
          },
          {
            path: 'all-Documents',
            component: AllDocuments,
            canActivate: [authGuard, roleGuard],
            data: { role: ['ROLE_ADMIN', 'ROLE_SUPERADMIN'] }
          }
        ]
      },
      {
        path: 'user',
        component: User,
        canActivate: [authGuard],
        children: [
          {
            path: 'create-users',
            component: Register,
            canActivate: [authGuard, roleGuard],
            data: { role: ['ROLE_ADMIN', 'ROLE_SUPERADMIN'] }
          },
          {
            path: 'list-users',
            component: ListUser,
            canActivate: [authGuard, roleGuard],
            data: { role: ['ROLE_ADMIN', 'ROLE_SUPERADMIN'] }
          },
          {
            path: 'profile',
            component: Profile,
            canActivate: [authGuard]
          }
        ]
      },
      {
        path: 'upload',
        component: Upload,
        canActivate: [authGuard],
        children: [
          {
            path: 'bulk-upload',
            component: BulkUpload,
            canActivate: [authGuard, roleGuard],
            data: { role: ['ROLE_ADMIN', 'ROLE_SUPERADMIN'] }
          },
          {
            path: 'single-upload',
            component: SingleUpload,
            canActivate: [authGuard, roleGuard],
            data: { role: ['ROLE_ADMIN', 'ROLE_SUPERADMIN'] }
          }
        ]
      },
      {
        path: 'message',
        component: Message,
        canActivate: [authGuard]
      }
    ]
  },

  { path: 'logs', component: Logs, canActivate: [authGuard, roleGuard], data: { role: ['ROLE_ADMIN', 'ROLE_SUPERADMIN'] } },
  { path: 'user-logs', component: UserLogs, canActivate: [authGuard, roleGuard], data: { role: ['ROLE_ADMIN', 'ROLE_SUPERADMIN'] } },
  { path: 'file-logs', component: FileLogs, canActivate: [authGuard, roleGuard], data: { role: ['ROLE_ADMIN', 'ROLE_SUPERADMIN'] } }
];
