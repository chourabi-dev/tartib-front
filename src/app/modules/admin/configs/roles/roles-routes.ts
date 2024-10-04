import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AccessComponent } from './access/access.component';
import { PermissionComponent } from './permission/permission.component';

export default [
  {
    path: 'list',
    component: ListComponent,
    resolve: {
      data: () => null,
    },
  },
  {
    path: 'add',
    component: AddComponent,
    resolve: {
      data: () => null,
    },
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      data: () => null,
    },
  },
  {
    path: 'access',
    component: AccessComponent,
    resolve: {
      data: () => null,
    },
  },
  {
    path: 'permission',
    component: PermissionComponent,
    resolve: {
      data: () => null,
    },
  },
] as Routes;
