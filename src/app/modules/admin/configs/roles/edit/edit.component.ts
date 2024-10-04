import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { RoleModel } from 'app/core/models/role.model';
import { RoleService } from 'app/core/services/role.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
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
    MatCheckboxModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  roleForm: UntypedFormGroup
  submit: boolean;
  roleId: any

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _roleService: RoleService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
    this._activatedRoute.paramMap.subscribe(async params => {
      let id = params.get('id')
      if (id) {
        this.roleId = id
        this.getOne(id)
      }
    })
  }

  initForm() {
    this.roleForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, []],
      active: [false, []],
    })
  }

  getOne(id: any) {
    this._roleService.getOne(id).subscribe(
      (data: CommonResponse<RoleModel>) => {
        this.setFormData(data.body)
      }
    )
  }

  setFormData(data: RoleModel) {
    this.roleForm.patchValue({
      ...data,
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
      this._roleService.update(this.roleId, this.value).subscribe(
        (data: CommonResponse<RoleModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/roles/list"])
        }
      )
    }
  }

}
