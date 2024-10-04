import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GovernorateModel } from 'app/core/models/governorate.model';
import { GovernorateService } from 'app/core/services/governorate.service';
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
                grid-template-columns: 30px 100px 100px 100px auto 100px 100px 100px 50px
            }
        }
    `,
  ],
})
export class ListComponent {

  governorats: Array<GovernorateModel> = []
  isLoading: boolean = false;

  constructor(
    private _governorateService: GovernorateService
  ) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this._governorateService.findAll().subscribe(
      (data: CommonResponse<GovernorateModel[]>) => {
        console.log(data);
        this.governorats = data.body
      }
    )
  }

}
