import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { AddComponent } from './add/add.component';
import { UserRoleService } from 'app/core/services/userRole.service';
import { UserRoleModel } from 'app/core/models/userRole.model';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    RouterLink,
    MatTableModule,
    MatMenuModule
  ],
  templateUrl: './assign.component.html',
  styleUrl: './assign.component.scss',
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
                grid-template-columns: 30px auto 200px 200px 200px 50px;
            }
        }
    `,
  ],
})
export class AssignComponent {

  userRoles: Array<UserRoleModel> = []
  isLoading: boolean = false;
  dialogRef: MatDialogRef<AddComponent, any>;

  constructor(
    private dialog: MatDialog,
    private _userRoleService: UserRoleService
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.findAll()
  }

  findAll() {
    this._userRoleService.findAll().subscribe(
      (data: CommonResponse<UserRoleModel[]>) => {
        console.log(data);
        this.userRoles = data.body
      }
    )
  }

  addUserRole() {
    this.dialogRef = this.dialog.open(AddComponent, {
      width: '560px',
      height: 'auto',
      data: {
        userRoleId:null,
        update:false
      }
    }).updatePosition({ top: '5%' })

    this.dialogRef.afterClosed().subscribe(
      (data:any) => {
        if(data) {
          this.findAll()
        }
      }
    )
  }

  updateUserRole(id:any) {
    this.dialogRef = this.dialog.open(AddComponent, {
      width: '560px',
      height: 'auto',
      data: {
        userRoleId:id,
        update:true
      }
    }).updatePosition({ top: '5%' })

    this.dialogRef.afterClosed().subscribe(
      (data:any) => {
        if(data) {
          this.findAll()
        }
      }
    )
  }

}
