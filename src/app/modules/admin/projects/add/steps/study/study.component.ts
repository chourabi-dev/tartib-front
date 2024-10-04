import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { ProjectStrategyService } from 'app/core/services/projectStrategy.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectStudyModel } from 'app/core/models/projectStudy.model';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { ProjectModel } from 'app/core/models/project.model';
import { ProjectStudyService } from 'app/core/services/projectStudy.service';

@Component({
  selector: 'app-study',
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
  templateUrl: './study.component.html',
  styleUrl: './study.component.scss'
})
export class StudyComponent {

  @Input() projectData: ProjectModel;
  @Output() nextPanel: EventEmitter<String> = new EventEmitter();

  projectStudyForm: UntypedFormGroup
  submit: boolean;

  isEdit: boolean = false
  projectStudyId: any = null

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _toastrService: ToastrService,
    private _projectStudyService: ProjectStudyService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm()
    if (this.projectData) {
      this.isEdit = false
      this.getOne(this.projectData.id)
    }
  }

  initForm() {
    this.projectStudyForm = this._formBuilder.group({
      project: [null, []],
      title: [null, []],
      status: [null, []],
      observation: [null, []],
      realisationDate: [null, []],
      actualisationDate: [null, []],
      officeName: [null, []],
      officeEmail: [null, []],
      report: [null, []],
      autorisationTitle: [null, []],
      autorisationOffice: [null, []],
      autorisationDocument: [null, []],
      autorisationObservation: [null, []],
    })
  }

  getOne(id: any) {
    this._projectStudyService.findOne({ project: id }).subscribe(
      (data: CommonResponse<ProjectStudyModel>) => {
        this._toastrService.success(data.message)
        this.projectStudyId = data.body.id
        this.projectStudyForm.patchValue({
          ...data.body,
          studyState: data.body.studyState ? data.body.studyState.id : null,
        })
        this.isEdit = true
      }
    )
  }

  get form() {
    return this.projectStudyForm.controls;
  }

  get valid() {
    return this.projectStudyForm.valid
  }

  get value() {
    return this.projectStudyForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      console.log(this.value);
      if (this.isEdit) {
        this._projectStudyService.update(this.projectStudyId, { ...this.value, project: this.projectData.id }).subscribe(
          (data: CommonResponse<ProjectModel>) => {
            this._toastrService.success(data.message)
            this.nextPanel.emit('plan')
          }
        )
      } else {
        this._projectStudyService.create({ ...this.value, project: this.projectData.id }).subscribe(
          (data: CommonResponse<ProjectModel>) => {
            this._toastrService.success(data.message)
            this.nextPanel.emit('plan')
          }
        )
      }
    }
  }

}
