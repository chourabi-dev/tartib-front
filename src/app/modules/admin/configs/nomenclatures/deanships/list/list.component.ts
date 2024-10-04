import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DeanshipModel } from 'app/core/models/deanship.model';
import { DeanshipService } from 'app/core/services/deanship.service';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    MatMenuModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  styles: [
    /* language=SCSS */
    `
        .inventory-grid {
            grid-template-columns: 48px auto 40px;

            @screen sm {
                grid-template-columns: 48px auto 112px 72px;
            }

            @screen md {
                grid-template-columns: 48px 112px auto 112px 72px;
            }

            @screen lg {
                grid-template-columns: 30px 50px 80px 80px 80px 80px auto 100px 100px 100px 50px;
            }
        }
    `,
  ],
})
export class ListComponent {

  deanships: Array<DeanshipModel> = []
  isLoading: boolean = false;

  constructor(
    private _deanshipService: DeanshipService
  ) { }

  ngOnInit(): void {

    this.findAll()

  }

  findAll() {
    this._deanshipService.findAll().subscribe(
      (data: CommonResponse<DeanshipModel[]>) => {
        this.deanships = data.body
      }
    )
  }

}
