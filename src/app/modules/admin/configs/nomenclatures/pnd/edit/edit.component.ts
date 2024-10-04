import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MinisterService } from 'app/core/services/minister.service';
import { MinisterModel } from 'app/core/models/minister.model';
import { OrganisationService } from 'app/core/services/organisation.service';
import { PndService } from 'app/core/services/pnd.service';
import { PndModel } from 'app/core/models/pnd.model';

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

  pndForm: UntypedFormGroup
  submit: boolean;
  categoryId: any

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _pndService: PndService,
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
    this.pndForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null, []],
      active: [false, []],
    })
  }

  getOne(id: any) {
    this._pndService.getOne(id).subscribe(
      (data: CommonResponse<PndModel>) => {
        this.setFormData(data.body)
      }
    )
  }

  setFormData(data: PndModel) {
    this.pndForm.patchValue({
      ...data,
    })
  }

  get form() {
    return this.pndForm.controls;
  }

  get valid() {
    return this.pndForm.valid
  }

  get value() {
    return this.pndForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      this._pndService.update(this.categoryId, this.pndForm.value).subscribe(
        (data: CommonResponse<PndModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/nomenclatures/pnd/list"])
        }
      )
    }
  }

}
