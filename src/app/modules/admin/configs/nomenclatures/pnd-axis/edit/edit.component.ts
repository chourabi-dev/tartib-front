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
import { PndService } from 'app/core/services/pnd.service';
import { PndModel } from 'app/core/models/pnd.model';
import { PndAxisService } from 'app/core/services/pndAxis.service';
import { PndAxisModel } from 'app/core/models/pndAxis.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
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

  pndAxeForm: UntypedFormGroup
  submit: boolean;
  PndAxeId: any
  pnds: Array<PndModel> = []

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _pndService: PndService,
    private _pndAxisService: PndAxisService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
        this.findAllPnd()

    this.initForm()
    this._activatedRoute.paramMap.subscribe(async params => {
      let id = params.get('id')
      if (id) {
        this.PndAxeId = id
        this.getOne(id)
      }
    })
  }

  initForm() {
    this.pndAxeForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      pnd:[null,[Validators.required]],
      description: [null, []],
      active: [false, []],
    })
  }

  getOne(id: any) {
    this._pndAxisService.getOne(id).subscribe(
      (data: CommonResponse<PndAxisModel>) => {
        this.setFormData(data.body)
      }
    )
  }

  setFormData(data: PndAxisModel) {
    this.pndAxeForm.patchValue({
      ...data,
      pnd: data.pnd ? data.pnd.id : null,

    })
  }

  get form() {
    return this.pndAxeForm.controls;
  }

  get valid() {
    return this.pndAxeForm.valid
  }

  get value() {
    return this.pndAxeForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      this._pndAxisService.update(this.PndAxeId, this.pndAxeForm.value).subscribe(
        (data: CommonResponse<PndAxisModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/nomenclatures/pnd-axis/list"])
        }
      )
    }
  }
  findAllPnd() {
    this._pndService.findAll().subscribe(
      (data: CommonResponse<PndModel[]>) => {
        console.log(data);
        this.pnds = data.body
      }
    )
  }

}
