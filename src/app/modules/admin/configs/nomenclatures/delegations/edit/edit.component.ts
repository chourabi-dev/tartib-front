import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { DelegationModel } from 'app/core/models/delegeation.model';
import { DistrictModel } from 'app/core/models/district.model';
import { GovernorateModel } from 'app/core/models/governorate.model';
import { DelegationService } from 'app/core/services/delegation.service';
import { DistrictService } from 'app/core/services/district.service';
import { GovernorateService } from 'app/core/services/governorate.service';
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
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  delegationForm: UntypedFormGroup
  submit: boolean;
  governorates: Array<GovernorateModel>
  districts: Array<DistrictModel>
  delegationId: any

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _districtService: DistrictService,
    private _governorateService: GovernorateService,
    private _delegationService: DelegationService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.findAllDistrict()
    this.findAllGovernorat()
    this.initForm()
    this._activatedRoute.paramMap.subscribe(async params => {
      let id = params.get('id')
      if (id) {
        this.delegationId = id
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

  findAllGovernorat() {
    this._governorateService.findAll().subscribe(
      (data: CommonResponse<GovernorateModel[]>) => {
        this.governorates = data.body
      }
    )
  }

  getOne(id: any) {
    this._delegationService.getOne(id).subscribe(
      (data: CommonResponse<DelegationModel>) => {
        this.setFormData(data.body)
      }
    )
  }

  initForm() {
    this.delegationForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null, []],
      district: [null, []],
      governorate: [null, []],
      active: [false, []],
    })
  }

  setFormData(data: DelegationModel) {
    this.delegationForm.patchValue({
      ...data,
      district: data.district.id,
      governorate: data.governorate.id
    })
  }

  get form() {
    return this.delegationForm.controls;
  }

  get valid() {
    return this.delegationForm.valid
  }

  get value() {
    return this.delegationForm.value
  }


  validSubmit() {
    this.submit = true;

    if (this.valid) {
      this._delegationService.update(this.delegationId, this.value).subscribe(
        (data: CommonResponse<DelegationModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/nomenclatures/delegations/list"])
        }
      )
    }
  }

}
