import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UserRoleService } from 'app/core/services/userRole.service';
import { RoleService } from 'app/core/services/role.service';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { RoleModel } from 'app/core/models/role.model';
import { UserModel } from 'app/core/models/user.model';
import { UserService } from 'app/core/services/user.service';
import { UntypedFormGroup, UntypedFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserRoleModel } from 'app/core/models/userRole.model';

@Component({
    selector: 'app-add',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    templateUrl: './add.component.html',
    styleUrl: './add.component.scss'
})
export class AddComponent {

    userRoleForm: UntypedFormGroup

    roles: Array<RoleModel>
    users: Array<UserModel>

    submit: boolean;

    constructor(
        public dialogRef: MatDialogRef<AddComponent>,
        private _userRoleService: UserRoleService,
        private _userService: UserService,
        private _roleService: RoleService,
        private _formBuilder: UntypedFormBuilder,
        private _toastrService: ToastrService,
        @Inject(MAT_DIALOG_DATA)
        private data: any
    ) { }


    ngOnInit() {
        this.findAllRole()
        this.findAllUser()
        this.initForm()
        console.log(this.data.update);
        console.log(this.data.userRoleId);

        if(this.data.update && this.data.userRoleId) {
            this.getOne()
        }
    }

    getOne() {
        this._userRoleService.getOne(this.data.userRoleId).subscribe(
            (data: CommonResponse<UserRoleModel>) => {
                this.setForm(data.body)
            }
        )
    }

    initForm() {
        this.userRoleForm = this._formBuilder.group({
            role: [null, [Validators.required]],
            user: [null, [Validators.required]]
        })
    }

    setForm(data:UserRoleModel) {
        this.userRoleForm.patchValue({
            ...this.data,
            role:data.role.id,
            user:data.user.id
        })
    }

    findAllUser() {
        this._userService.findAll().subscribe(
            (data: CommonResponse<UserModel[]>) => {
                console.log(data);
                this.users = data.body
            }
        )
    }

    findAllRole() {
        this._roleService.findAll().subscribe(
            (data: CommonResponse<RoleModel[]>) => {
                console.log(data);
                this.roles = data.body
            }
        )
    }

    get form() {
        return this.userRoleForm.controls;
    }

    get valid() {
        return this.userRoleForm.valid
    }

    get value() {
        return this.userRoleForm.value
    }

    validSubmit() {
        this.submit = true;
        if (this.valid) {
            if(this.data.update && this.data.userRoleId) {
                this._userRoleService.update(this.data.userRoleId, this.value).subscribe(
                    (data: CommonResponse<UserRoleModel>) => {
                        this._toastrService.success(data.message)
                        this.dialogRef.close(true)
                    }
                )
            } else {
                this._userRoleService.create(this.value).subscribe(
                    (data: CommonResponse<UserRoleModel>) => {
                        this._toastrService.success(data.message)
                        this.dialogRef.close(true)
                    }
                )
            }
        }
    }

    onClose() {
        this.dialogRef.close(false)
    }



}
