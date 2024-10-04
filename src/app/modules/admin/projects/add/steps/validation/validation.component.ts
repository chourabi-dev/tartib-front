import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectValidationService } from 'app/core/services/projectValidation.service';
import { UntypedFormGroup, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProjectModel } from 'app/core/models/project.model';
import { ProjectValidationModel } from 'app/core/models/projectValidation.model';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';

@Component({
  selector: 'app-validation',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDividerModule
  ],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.scss'
})
export class ValidationComponent {

  @Input() projectData: ProjectModel;
  @Output() nextPanel: EventEmitter<String> = new EventEmitter();

  projectValidationForm: UntypedFormGroup
  submit: boolean;

  isEdit: boolean = false
  projectValidationId: any = null

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _toastrService: ToastrService,
    private _projectValidationService: ProjectValidationService,
    private _activatedRoute: ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.initForm()
    if (this.projectData) {
      this.isEdit = false
      this.getOne(this.projectData.id)
    }
  }

  initForm() {
    this.projectValidationForm = this._formBuilder.group({
      project: [null, []],
      additionalInformation: [null, []],
      documentName: [null, []], // Assuming economic nature ID is a string
      author: [null, []], // Assuming currency ID is a string
      submissionDate: [null, []],
    })
  }

  getOne(id: any) {
    this._projectValidationService.findOne({ project: id }).subscribe(
      (data: CommonResponse<ProjectValidationModel>) => {
        this._toastrService.success(data.message)
        this.projectValidationId = data.body.id
        this.projectValidationForm.patchValue({
          ...data.body,
        })
        this.isEdit = true
      }
    )
  }

  get form() {
    return this.projectValidationForm.controls;
  }

  get valid() {
    return this.projectValidationForm.valid
  }

  get value() {
    return this.projectValidationForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      console.log(this.value);
      if (this.isEdit) {
        this._projectValidationService.update(this.projectValidationId, { ...this.value, project: this.projectData.id }).subscribe(
          (data: CommonResponse<ProjectValidationModel>) => {
            this._toastrService.success(data.message)
            this._router.navigate(["/projects/list"])
          }
        )
      } else {
        this._projectValidationService.create({ ...this.value, project: this.projectData.id }).subscribe(
          (data: CommonResponse<ProjectValidationModel>) => {
            this._toastrService.success(data.message)
            this._router.navigate(["/projects/list"])
          }
        )
      }
    }
  }

}
