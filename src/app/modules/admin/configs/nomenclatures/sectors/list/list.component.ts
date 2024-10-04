import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DistrictModel } from 'app/core/models/district.model';
import { DistrictService } from 'app/core/services/district.service';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { MatMenuModule } from '@angular/material/menu';
import { CategoryService } from 'app/core/services/category.service';
import { CategoryModel } from 'app/core/models/category.model';
import { MinisterModel } from 'app/core/models/minister.model';
import { MinisterService } from 'app/core/services/minister.service';
import { OrganisationService } from 'app/core/services/organisation.service';
import { OrganisationModel } from 'app/core/models/organisation.model';
import { PndService } from 'app/core/services/pnd.service';
import { PndModel } from 'app/core/models/pnd.model';
import { SectorService } from 'app/core/services/sector.service';
import { SectorModel } from 'app/core/models/sector.model';

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
                grid-template-columns: 30px 100px 100px auto 100px 100px 100px 50px;
            }
        }
    `,
  ],
})
export class ListComponent {

  sectors: Array<SectorModel> = []
  isLoading: boolean = false;

  constructor(
    private _sectorService: SectorService
  ) { }

  ngOnInit(): void {

    this.findAll()

  }

  findAll() {
    this._sectorService.findAll().subscribe(
      (data: CommonResponse<SectorModel[]>) => {
        console.log(data);
        this.sectors = data.body
      }
    )
  }

}
