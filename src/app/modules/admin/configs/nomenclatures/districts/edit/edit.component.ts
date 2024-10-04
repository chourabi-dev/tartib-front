import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { DistrictModel } from 'app/core/models/district.model';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DistrictService } from 'app/core/services/district.service';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

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
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  districtForm: UntypedFormGroup
  submit: boolean;
  districtId: any

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _districtService: DistrictService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
    this._activatedRoute.paramMap.subscribe(async params => {
      let id = params.get('id')
      if (id) {
        this.districtId = id
        this.getOne(id)
      }
    })
  }

  initForm() {
    this.districtForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null, []],
      active: [false, []],
    })
  }

  getOne(id: any) {
    this._districtService.getOne(id).subscribe(
      (data: CommonResponse<DistrictModel>) => {
        this.setFormData(data.body)
      }
    )
  }

  setFormData(data: DistrictModel) {
    this.districtForm.patchValue({
      ...data,
    })
  }

  get form() {
    return this.districtForm.controls;
  }

  get valid() {
    return this.districtForm.valid
  }

  get value() {
    return this.districtForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      this._districtService.update(this.districtId, this.districtForm.value).subscribe(
        (data: CommonResponse<DistrictModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/nomenclatures/districts/list"])
        }
      )
    }
  }

}
