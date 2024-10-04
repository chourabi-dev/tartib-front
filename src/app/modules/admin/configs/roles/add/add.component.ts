import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RoleService } from 'app/core/services/role.service';
import { RoleModel } from 'app/core/models/role.model';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  roleForm: UntypedFormGroup
  submit: boolean;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _roleService: RoleService,
    private _toastrService: ToastrService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.roleForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, []],
      active: [false, []],
    })
  }

  get form() {
    return this.roleForm.controls;
  }

  get valid() {
    return this.roleForm.valid
  }

  get value() {
    return this.roleForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      this._roleService.create(this.value).subscribe(
        (data: CommonResponse<RoleModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/roles/list"])
        }
      )
    }
  }

}
