import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRiskService } from 'app/core/services/projectRisk.service';
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectRiskModel } from 'app/core/models/projectRisk.model';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { ProjectModel } from 'app/core/models/project.model';

@Component({
  selector: 'app-risk',
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
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatSelectModule
  ],
  templateUrl: './risk.component.html',
  styleUrl: './risk.component.scss'
})
export class RiskComponent {

  @Input() projectData: ProjectModel;
  @Output() nextPanel: EventEmitter<String> = new EventEmitter();

  data:any[] = [];
 

  riskForm = new FormGroup({
    category: new FormControl('',Validators.required),
    title: new FormControl('',Validators.required),
    descreption: new FormControl('',Validators.required),
    occurance: new FormControl('',Validators.required),
    mitigation: new FormControl('',Validators.required),
  })


  submit: boolean;

  isEdit: boolean = false
  projectRiskId: any = null

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _toastrService: ToastrService,
    private _projectRiskService: ProjectRiskService,
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
    /*this.projectRiskForm = this._formBuilder.group({
      project: [null, []],
      category: [null, []],
      name: [null, []], // Assuming economic nature ID is a string
      description: [null, []], // Assuming currency ID is a string
      probability: [null, []],
      impact: [null, []],
      gravity: [null, []],
      mitigation: [null, []],
      comments: [null, []],
    })*/
  }

  getOne(id: any) {
    this._projectRiskService.findOne({ project: id }).subscribe(
      (data: CommonResponse<ProjectRiskModel>) => {
        this._toastrService.success(data.message)
        this.projectRiskId = data.body.id
        /*this.projectRiskForm.patchValue({
          ...data.body,
          category: data.body.category ? data.body.category.id : null,
        })*/
        this.isEdit = true
      }
    )
  }

  get form() {
    return this.form.controls;
  }

  get valid() {
    return this.form.valid
  }

  get value() {
    return this.form.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      console.log(this.value);
      if (this.isEdit) {
        this._projectRiskService.update(this.projectRiskId, { ...this.value, project: this.projectData.id }).subscribe(
          (data: CommonResponse<ProjectRiskModel>) => {
            this._toastrService.success(data.message)
            this.nextPanel.emit('validation')
          }
        )
      } else {
        this._projectRiskService.create({ ...this.value, project: this.projectData.id }).subscribe(
          (data: CommonResponse<ProjectRiskModel>) => {
            this._toastrService.success(data.message)
            this.nextPanel.emit('validation')
          }
        )
      }
    }
  }




  addData(){
    this.data.push(this.riskForm.value);
    this.riskForm.reset();
  }

  deleteDATA(i:number){
    this.data.splice(i,1)
  }

}
