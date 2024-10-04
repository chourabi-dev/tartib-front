import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-add',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule
    ],
    templateUrl: './add.component.html',
    styleUrl: './add.component.scss'
})
export class AddComponent {

}
