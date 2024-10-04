import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { InventoryPagination, InventoryProduct } from '../../apps/ecommerce/inventory/inventory.types';
import { Observable } from 'rxjs';
import { InventoryService } from '../../apps/ecommerce/inventory/inventory.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProjectService } from 'app/core/services/project.service';
import { ProjectModel } from 'app/core/models/project.model';
import { MatMenuModule } from '@angular/material/menu';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { ProjectIdentityService } from 'app/core/services/projectIdentity.service';
import { ProjectIdentityModel } from 'app/core/models/projectIdentity.model';

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
                grid-template-columns: 48px 12px auto 112px 72px;
            }

            @screen lg {
                grid-template-columns: 30px 160px 100px auto 100px 100px 100px 100px 50px;
            }
        }
    `,
  ],
})
export class ListComponent {

  projects: Array<ProjectModel> = []
  projectsIdentity: Array<ProjectIdentityModel> = []

  isLoading: boolean = false;

  constructor(
    private _inventoryService: InventoryService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService,
    private _projectService: ProjectService,
    private _projectIdentityService:ProjectIdentityService
  ) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this._projectIdentityService.findAll().subscribe(
      (data: CommonResponse<ProjectIdentityModel[]>) => {
        console.log(data);
        this.projectsIdentity = data.body
      }
    )
  }

}
