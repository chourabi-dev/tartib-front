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
import { CategoryService } from 'app/core/services/category.service';
import { CategoryModel } from 'app/core/models/category.model';

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

  categoryForm: UntypedFormGroup
  submit: boolean;
  categoryId: any

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _categoryService: CategoryService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
    this._activatedRoute.paramMap.subscribe(async params => {
      let id = params.get('id')
      if (id) {
        this.categoryId = id
        this.getOne(id)
      }
    })
  }

  initForm() {
    this.categoryForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null, []],
      active: [false, []],
    })
  }

  getOne(id: any) {
    this._categoryService.getOne(id).subscribe(
      (data: CommonResponse<CurrencyModel>) => {
        this.setFormData(data.body)
      }
    )
  }

  setFormData(data: CurrencyModel) {
    this.categoryForm.patchValue({
      ...data,
    })
  }

  get form() {
    return this.categoryForm.controls;
  }

  get valid() {
    return this.categoryForm.valid
  }

  get value() {
    return this.categoryForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      this._categoryService.update(this.categoryId, this.categoryForm.value).subscribe(
        (data: CommonResponse<CategoryModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/nomenclatures/category/list"])
        }
      )
    }
  }

}
