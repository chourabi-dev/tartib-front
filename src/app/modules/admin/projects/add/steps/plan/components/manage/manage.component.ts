import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { ProjectModel } from 'app/core/models/project.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CamponentService } from 'app/core/services/component.service';
import { ComponentModel } from 'app/core/models/components.model';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { ProjectPlanModel } from 'app/core/models/projectPlan.model';
import { ProjectService } from 'app/core/services/project.service';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent {

  componentForm: UntypedFormGroup

  projects: Array<ProjectModel>
  components: Array<ComponentModel>
  isEdit:boolean = false
  submit: boolean;

  constructor(
    public dialogRef: MatDialogRef<ManageComponent>,
    private _formBuilder: UntypedFormBuilder,
    private _toastrService: ToastrService,
    private _componentService: CamponentService,
    private _projectService: ProjectService,
    private _cdk: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA)
    private data: any
  ) { }


  ngOnInit() {
    this.isEdit = this.data.edit
    this.initForm()
    this.findAllProject()
    this.findAllComponents()
    this.setForm(this.data.projectPlan, this.data.component)
    this._cdk.detectChanges()
  }

  /* ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this._cdk.detectChanges()
  } */

  findAllComponents() {
    this._componentService.findAll().subscribe(
      (data: CommonResponse<ComponentModel[]>) => {
        console.log(data);
        this.components = data.body
      }
    )
  }

  findAllProject() {
    this._projectService.findAll().subscribe(
      (data: CommonResponse<ProjectModel[]>) => {
        console.log(data);
        this.projects = data.body
      }
    )
  }

  initForm() {
    this.componentForm = this._formBuilder.group({
      project: [null, []],
      projectPlan: [null, []],
      subComponent: [null, []],
      component: [null, []],
      name: [null, []],
      code: [null, []],
      description: [null, []],
    })
  }

  setForm(projectPlan: ProjectPlanModel, component: ComponentModel) {
    this.componentForm.patchValue({
      ...this.data,
      projectPlan: projectPlan.id,
      project: this.isEdit ? (component.project ? component.project.id : null) : null,
      subComponent: this.isEdit ? (component.subComponent ? component.subComponent : null) : null,
      component: this.isEdit ? (component.component ? component.component.id : null) : null,
      name: this.isEdit ? (component.name ? component.name : null) : null,
      code: this.isEdit ? (component.code ? component.code : null) : null,
      description: this.isEdit ? (component.description ? component.description : null) : null,
    })
    this._cdk.markForCheck()
  }

  get form() {
    return this.componentForm.controls;
  }

  get valid() {
    return this.componentForm.valid
  }

  get value() {
    return this.componentForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      if (this.isEdit) {
        this._componentService.update(this.data.component.id, this.value).subscribe(
          (data: CommonResponse<ComponentModel>) => {
            this._toastrService.success(data.message)
            this.dialogRef.close(true)
          }
        )
      } else {
        this._componentService.create(this.value).subscribe(
          (data: CommonResponse<ComponentModel>) => {
            this._toastrService.success(data.message)
            this.dialogRef.close(true)
          }
        )
      }
    }
  }

  onClose() {
    this.dialogRef.close(false)
  }

}
