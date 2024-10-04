import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProjectService } from 'app/core/services/project.service';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { ProjectIdentityModel } from 'app/core/models/projectIdentity.model';
import { ProjectModel } from 'app/core/models/project.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {

  @Output() projectData: EventEmitter<ProjectModel> = new EventEmitter();
  @Output() nextPanel: EventEmitter<String> = new EventEmitter();
  projectInfoForm: UntypedFormGroup
  submit: boolean;
  isEdit: boolean = false
  projectId: any = null

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _toastrService: ToastrService,
    private _projectService: ProjectService,
    private _activatedRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.initForm()
    this._activatedRoute.paramMap.subscribe(async params => {
      let id = params.get('id')
      if (id) {
        this.projectId = id
        this.getOne(id)
      }
    })
  }

  initForm() {
    this.projectInfoForm = this._formBuilder.group({
      simepCode: [null, [Validators.required]],
      simepDate: [null, [Validators.required]],
      observation: [null, [Validators.required]],
      status: [false, [Validators.required]],
      active: [false, [Validators.required]],
    })
  }

  getOne(id: any) {
    this._projectService.getOne(id).subscribe(
      (data: CommonResponse<ProjectModel>) => {
        this._toastrService.success(data.message)
        this.projectData.emit(data.body)
        this.projectInfoForm.patchValue({
          ...data.body
        })
        this.isEdit = true
      }
    )
  }

  get form() {
    return this.projectInfoForm.controls;
  }

  get valid() {
    return this.projectInfoForm.valid
  }

  get value() {
    return this.projectInfoForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      if (this.isEdit) {
        this._projectService.update(this.projectId, { ...this.value }).subscribe(
          (data: CommonResponse<ProjectModel>) => {
            this._toastrService.success(data.message)
            this.projectData.emit(data.body);
            this.nextPanel.emit('identity')
          }
        )
      } else {
        this._projectService.create(this.value).subscribe(
          (data: CommonResponse<ProjectModel>) => {
            this._toastrService.success(data.message)
            this.projectData.emit(data.body);
            this.nextPanel.emit('identity')
          }
        )
      }
    }
  }

}
