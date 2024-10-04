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
import { MatSelectModule } from '@angular/material/select';
import { GovernorateModel } from 'app/core/models/governorate.model';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { GovernorateService } from 'app/core/services/governorate.service';
import { DistrictService } from 'app/core/services/district.service';
import { ToastrService } from 'ngx-toastr';
import { DistrictModel } from 'app/core/models/district.model';
import { DelegationService } from 'app/core/services/delegation.service';
import { DelegationModel } from 'app/core/models/delegeation.model';

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
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  delegationForm: UntypedFormGroup
  submit: boolean;
  governorates: Array<GovernorateModel>
  districts: Array<DistrictModel>

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _districtService: DistrictService,
    private _governorateService: GovernorateService,
    private _delegationService: DelegationService,
    private _toastrService: ToastrService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.findAllDistrict()
    this.initForm()
  }

  initForm() {
    this.delegationForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null, []],
      // district: [null, []],
      governorate: [null, []],
      active: [false, []],
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

  findAllDistrict() {
    this._districtService.findAll().subscribe(
      (data: CommonResponse<DistrictModel[]>) => {
        this.districts = data.body
      }
    )
  }

  findAllByDistrict(id: any) {
    this._governorateService.findAllByDistrict(id).subscribe(
      (data: CommonResponse<GovernorateModel[]>) => {
        this.governorates = data.body;  // Assuming data.body contains the list of governorates
      },
      (error) => {
        console.error('Error fetching governorates:', error);
      }
    );
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      this._delegationService.create(this.value).subscribe(
        (data: CommonResponse<DelegationModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/nomenclatures/delegations/list"])
        }
      )
    }
  }

}
