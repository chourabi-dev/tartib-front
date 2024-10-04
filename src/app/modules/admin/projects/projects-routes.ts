import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

export default [
  {
    path: 'list', component: ListComponent,
    resolve: {
      data: () => null,
    },
  },
  {
    path: 'add', component: AddComponent,
    resolve: {
      data: () => null,
    },
  },
  {
    path: 'edit/:id', component: AddComponent,
    resolve: {
      data: () => null,
    },
  },
] as Routes;
