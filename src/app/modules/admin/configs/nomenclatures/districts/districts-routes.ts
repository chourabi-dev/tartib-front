import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

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
] as Routes;
