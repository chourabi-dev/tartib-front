import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import { ComponentModel } from 'app/core/models/components.model';
import { ManageComponent } from './manage/manage.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProjectModel } from 'app/core/models/project.model';
import { ProjectPlanModel } from 'app/core/models/projectPlan.model';
import { CamponentService } from 'app/core/services/component.service';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';

@Component({
  selector: 'app-components',
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
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss',
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
                grid-template-columns: 30px 80px 80px auto 100px 100px 50px;
            }
        }
    `,
  ],
})
export class ComponentsComponent {

  @Input() projectPlanData: ProjectPlanModel;

  components: Array<ComponentModel> = []

  isLoading: boolean = false;
  dialogRef: MatDialogRef<ManageComponent, any>;

  constructor(
    private dialog: MatDialog,
    private _componentService: CamponentService,
    private _cdk: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this._componentService.findAll().subscribe(
      (data: CommonResponse<ComponentModel[]>) => {
        console.log(data);
        this.components = data.body
        this._cdk.markForCheck()
      }
    )
    this._cdk.detectChanges()
  }

  addComponent() {
    this.dialogRef = this.dialog.open(ManageComponent, {
      width: '560px',
      height: 'auto',
      data: {
        edit: false,
        projectPlan: this.projectPlanData
      }
    }).updatePosition({ top: '5%' })

    this.dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data) {
          this.findAll()
          this._cdk.markForCheck()
        }
      }
    )
    this._cdk.detectChanges()
  }

  editComponent(id: any) {

    this._componentService.getOne(id).subscribe(
      (data: CommonResponse<ComponentModel>) => {
        this.dialogRef = this.dialog.open(ManageComponent, {
          width: '560px',
          height: 'auto',
          data: {
            edit: true,
            component:data.body,
            projectPlan: this.projectPlanData
          }
        }).updatePosition({ top: '5%' })

        this.dialogRef.afterClosed().subscribe(
          (data: any) => {
            if (data) {
              this.findAll()
              this._cdk.markForCheck()
            }
          }
        )
        this._cdk.detectChanges()
      }
    )

  }



}
