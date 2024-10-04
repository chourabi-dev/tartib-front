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
import { CurrencyService } from 'app/core/services/currency.service';
import { CurrencyModel } from 'app/core/models/currency.model';

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

  currencyForm: UntypedFormGroup
  submit: boolean;
  currencyId: any

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _currencyService: CurrencyService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
    this._activatedRoute.paramMap.subscribe(async params => {
      let id = params.get('id')
      if (id) {
        this.currencyId = id
        this.getOne(id)
      }
    })
  }

  initForm() {
    this.currencyForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null, []],
      active: [false, []],
    })
  }

  getOne(id: any) {
    this._currencyService.getOne(id).subscribe(
      (data: CommonResponse<CurrencyModel>) => {
        this.setFormData(data.body)
      }
    )
  }

  setFormData(data: CurrencyModel) {
    this.currencyForm.patchValue({
      ...data,
    })
  }

  get form() {
    return this.currencyForm.controls;
  }

  get valid() {
    return this.currencyForm.valid
  }

  get value() {
    return this.currencyForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      this._currencyService.update(this.currencyId, this.currencyForm.value).subscribe(
        (data: CommonResponse<CurrencyModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/nomenclatures/currency/list"])
        }
      )
    }
  }

}
