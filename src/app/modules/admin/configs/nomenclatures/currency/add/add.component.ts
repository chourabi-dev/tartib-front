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
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { ToastrService } from 'ngx-toastr';
import { DistrictService } from 'app/core/services/district.service';
import { DistrictModel } from 'app/core/models/district.model';
import { CurrencyService } from 'app/core/services/currency.service';
import { CurrencyModel } from 'app/core/models/currency.model';

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
    ReactiveFormsModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  currencyForm: UntypedFormGroup
  submit: boolean;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _currencyService: CurrencyService,
    private _toastrService: ToastrService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.currencyForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null, []],
      active: [false, []],
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
      this._currencyService.create(this.value).subscribe(
        (data: CommonResponse<CurrencyModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/nomenclatures/currency/list"])
        }
      )
    }
  }

}
