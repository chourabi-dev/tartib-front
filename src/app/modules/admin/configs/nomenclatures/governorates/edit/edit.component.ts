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
import { GovernorateService } from 'app/core/services/governorate.service';
import { GovernorateModel } from 'app/core/models/governorate.model';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  governoratForm: UntypedFormGroup
  submit: boolean;
  governoratId: any
  districts: Array<DistrictModel>

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _districtService: DistrictService,
    private _governorateService: GovernorateService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllDistrict()
    this.initForm()
    this._activatedRoute.paramMap.subscribe(async params => {
      let id = params.get('id')
      if (id) {
        this.governoratId = id
        this.getOne(id)
      }
    })
  }

  findAllDistrict() {
    this._districtService.findAll().subscribe(
      (data: CommonResponse<DistrictModel[]>) => {
        this.districts = data.body
      }
    )
  }

  initForm() {
    this.governoratForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null, []],
      district: [null, []],
      active: [false, []],
    })
  }

  getOne(id: any) {
    this._governorateService.getOne(id).subscribe(
      (data: CommonResponse<GovernorateModel>) => {
        this.setFormData(data.body)
      }
    )
  }

  setFormData(data: GovernorateModel) {
    this.governoratForm.patchValue({
      ...data,
      district: data.district.id
    })
  }

  get form() {
    return this.governoratForm.controls;
  }

  get valid() {
    return this.governoratForm.valid
  }

  get value() {
    return this.governoratForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      this._districtService.update(this.governoratId, this.governoratForm.value).subscribe(
        (data: CommonResponse<DistrictModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/nomenclatures/governorates/list"])
        }
      )
    }
  }

}
