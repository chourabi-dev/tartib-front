import { Routes } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { DetailComponent } from './detail/detail.component';

export default [
    {
        path     : '',
        component: LandingHomeComponent,
    },
    {
        path     : ':id',
        component: DetailComponent,
    },
] as Routes;
