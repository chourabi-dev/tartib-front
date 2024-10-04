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
import { MinisterModel } from 'app/core/models/minister.model';
import { OrganisationService } from 'app/core/services/organisation.service';
import { PndService } from 'app/core/services/pnd.service';
import { SectorService } from 'app/core/services/sector.service';

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

  sectorForm: UntypedFormGroup
  submit: boolean;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _sectorService: SectorService,
    private _toastrService: ToastrService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.sectorForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null, []],
      active: [false, []],
    })
  }

  get form() {
    return this.sectorForm.controls;
  }

  get valid() {
    return this.sectorForm.valid
  }

  get value() {
    return this.sectorForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      this._sectorService.create(this.value).subscribe(
        (data: CommonResponse<MinisterModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/nomenclatures/sectors/list"])
        }
      )
    }
  }

}
