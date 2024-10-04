import { Routes } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { ArticleComponent } from './article.component';

export default [
    {
        path     : '',
        component: ArticleComponent,
    },
] as Routes;
