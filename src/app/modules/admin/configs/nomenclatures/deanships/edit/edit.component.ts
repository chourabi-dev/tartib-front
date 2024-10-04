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
import { DeanshipService } from 'app/core/services/deanship.service';
import { DeanshipModel } from 'app/core/models/deanship.model';

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

  deanshipForm: UntypedFormGroup
  submit: boolean;

  districts: Array<DistrictModel>
  governorates: Array<GovernorateModel>
  delegations: Array<DelegationModel>

  deanshipId: any

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _districtService: DistrictService,
    private _governorateService: GovernorateService,
    private _delegationService: DelegationService,
    private _deanshipService: DeanshipService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.findAllDistrict()
    this.findAllGovernorat()
    this.findAllDelegation()
    this.initForm()
    this._activatedRoute.paramMap.subscribe(async params => {
      let id = params.get('id')
      if (id) {
        this.deanshipId = id
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

  findAllDelegation() {
    this._delegationService.findAll().subscribe(
      (data: CommonResponse<DelegationModel[]>) => {
        this.delegations = data.body
      }
    )
  }

  getOne(id: any) {
    this._deanshipService.getOne(id).subscribe(
      (data: CommonResponse<DeanshipModel>) => {
        this.setFormData(data.body)
      }
    )
  }

  initForm() {
    this.deanshipForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null, []],
      district: [null, []],
      governorate: [null, []],
      delegation: [null, []],
      active: [false, []],
    })
  }

  setFormData(data: DeanshipModel) {
    this.deanshipForm.patchValue({
      ...data,
      district: data.district.id,
      governorate: data.governorate.id,
      delegation: data.delegation.id
    })
  }

  get form() {
    return this.deanshipForm.controls;
  }

  get valid() {
    return this.deanshipForm.valid
  }

  get value() {
    return this.deanshipForm.value
  }


  validSubmit() {
    this.submit = true;

    if (this.valid) {
      this._deanshipService.update(this.deanshipId, this.value).subscribe(
        (data: CommonResponse<DeanshipModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/nomenclatures/deanships/list"])
        }
      )
    }
  }

}
