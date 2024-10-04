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
import { PndAxisService } from 'app/core/services/pndAxis.service';
import { PndAxisModel } from 'app/core/models/pndAxis.model';
import { MatSelectModule } from '@angular/material/select';
import { PndService } from 'app/core/services/pnd.service';
import { PndModel } from 'app/core/models/pnd.model';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatSelectModule,
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

  pndAxeForm: UntypedFormGroup
  pnds: Array<PndModel> = []
  submit: boolean;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _pndAxisService: PndAxisService,
    private _pndService: PndService,
    private _toastrService: ToastrService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.findAllPnd()
    this.initForm()
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
      this._pndAxisService.create(this.value).subscribe(
        (data: CommonResponse<PndAxisModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/nomenclatures/pnd-axis/list"])
        }
      )
    }
  }

  isLoading: boolean = false;

  




  findAllPnd() {
    this._pndService.findAll().subscribe(
      (data: CommonResponse<PndModel[]>) => {
        console.log(data);
        this.pnds = data.body
      }
    )
  }

}
