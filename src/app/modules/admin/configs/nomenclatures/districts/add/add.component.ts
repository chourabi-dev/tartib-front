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

  districtForm: UntypedFormGroup
  submit: boolean;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _districtService: DistrictService,
    private _toastrService: ToastrService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.districtForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null, []],
      active: [false, []],
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
      this._districtService.create(this.value).subscribe(
        (data: CommonResponse<DistrictModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/nomenclatures/districts/list"])
        }
      )
    }
  }

}
