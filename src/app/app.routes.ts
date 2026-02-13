// import { Routes } from '@angular/router';

// // Public
// import { HomeComponent } from './features/home/home';
// import { LoginComponent } from './features/auth/login/login';

// // Admin
// import { AdminLayoutComponent } from './features/admin/layout/admin-layout/admin-layout';
// import { AdminDashboardComponent } from './features/admin/dashboard/admin-dashboard/admin-dashboard';
// // import { ManageUsersComponent } from './features/admin/manage-users/manage-users.component';
// import { RequestListComponent } from './features/admin/resource-requests/request-list/request-list';
// import { AddEmployeeComponent } from './features/admin/manage-users/add-employee/add-employee';
// // import { InventoryComponent } from './features/admin/inventory/inventory.component';
// // import { SkillAnalysisComponent } from './features/admin/skill-analysis/skill-analysis.component';

// // // Employee
// import { EmployeeLayoutComponent } from './features/employee/layout/employee-layout/employee-layout';
// import { EmployeeDashboardComponent } from './features/employee/dashboard/employee-dashboard/employee-dashboard';
// import { RequestResourceComponent } from './features/employee/request-resource/request-resource/request-resource';
// // import { ResourceHistoryComponent } from './features/employee/resource-history/resource-history.component';
// // import { SkillProgressComponent } from './features/employee/skill-progress/skill-progress.component';

// // // Guards (optional for now)
// // import { AuthGuard } from './core/guards/auth.guard';
// // import { RoleGuard } from './core/guards/role.guard';

// export const routes: Routes = [

//   // 🌐 Public Routes
//   { path: '', component: HomeComponent },
//    {
//     path: 'login',
//     loadComponent: () =>
//       import('./features/auth/login/login')
//         .then(m => m.LoginComponent)
//   },
// {
//   path: 'admin',
//   component: AdminLayoutComponent,
//   children: [
//     { path: 'dashboard', component: AdminDashboardComponent },
//     { path: 'requests', component: RequestListComponent },
//     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//     { path: 'add-employee', component: AddEmployeeComponent }

//   ]
// }
// ,

// {
//   path: 'employee',
//   component: EmployeeLayoutComponent,
//   // canActivate: [AuthGuard, RoleGuard],
//   data: { role: 'EMPLOYEE' },
//   children: [
//     { path: 'dashboard', component: EmployeeDashboardComponent },
//     { path: 'request', component:RequestResourceComponent},
//     // { path: 'history', component: ResourceHistoryComponent },
//     { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
//   ]
// }
// ,

//   // 🚫 Fallback Route
//   { path: '**', redirectTo: '' }
// ];


import { Routes } from '@angular/router';

// 🌐 Public
import { HomeComponent } from './features/home/home';
import { LoginComponent } from './features/auth/login/login';

// 🔐 Guards
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

// 👨‍💼 Admin
import { AdminLayoutComponent } from './features/admin/layout/admin-layout/admin-layout';
import { AdminDashboardComponent } from './features/admin/dashboard/admin-dashboard/admin-dashboard';
import { RequestListComponent } from './features/admin/resource-requests/request-list/request-list';
import { AddEmployeeComponent } from './features/admin/manage-users/add-employee/add-employee';

// 👩‍💻 Employee
import { EmployeeLayoutComponent } from './features/employee/layout/employee-layout/employee-layout';
import { EmployeeDashboardComponent } from './features/employee/dashboard/employee-dashboard/employee-dashboard';
import { RequestResourceComponent } from './features/employee/request-resource/request-resource/request-resource';

export const routes: Routes = [

  // =============================
  // 🌐 PUBLIC ROUTES
  // =============================

  { path: '', component: HomeComponent },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.LoginComponent)
  },

  // =============================
  // 👨‍💼 ADMIN ROUTES (PROTECTED)
  // =============================

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' },
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'requests', component: RequestListComponent },
      { path: 'add-employee', component: AddEmployeeComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // =============================
  // 👩‍💻 EMPLOYEE ROUTES (PROTECTED)
  // =============================

  {
    path: 'employee',
    component: EmployeeLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'EMPLOYEE' },
    children: [
      { path: 'dashboard', component: EmployeeDashboardComponent },
      { path: 'request', component: RequestResourceComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // =============================
  // 🚫 FALLBACK ROUTE
  // =============================

  { path: '**', redirectTo: '' }

];
