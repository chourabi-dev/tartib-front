import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { ProjectModel } from 'app/core/models/project.model';
import { ToastrService } from 'ngx-toastr';
import { ProjectStrategyService } from 'app/core/services/projectStrategy.service';
import { ProjectStrategyModel } from 'app/core/models/projectStrategy.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-strategy',
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
  templateUrl: './strategy.component.html',
  styleUrl: './strategy.component.scss'
})
export class StrategyComponent {

  @Input() projectData: ProjectModel;
  @Output() nextPanel: EventEmitter<String> = new EventEmitter();

  projectStrategyForm: UntypedFormGroup
  submit: boolean;

  isEdit: boolean = false
  projectStrategyId: any = null

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _toastrService: ToastrService,
    private _projectStrategyService: ProjectStrategyService,
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
    this.projectStrategyForm = this._formBuilder.group({
      project: [null, []],
      pnd: [null, []],
      pndAxis: [null, []],
      strategy: [null, []],
      strategyAxis: [null, []],
      shemaName: [null, []],
      shemaProject: [null, []],
      pndProject: [null, []],
      blueprintName: [null, []],
      blueprintProject: [null, []],
      objective: [null, [Validators.required]],
      result: [null, [Validators.required]],
      components: [null, [Validators.required]],
      document: [null, []],
      realisationStart: [null, [Validators.required]],
      realisationEnd: [null, [Validators.required]],
      operationStart: [null, []],
      workplan: [null, []],
    })
  }

  getOne(id: any) {
    this._projectStrategyService.findOne({ project: id }).subscribe(
      (data: CommonResponse<ProjectStrategyModel>) => {
        this._toastrService.success(data.message)
        this.projectStrategyId = data.body.id
        this.projectStrategyForm.patchValue({
          ...data.body,
          strategy: data.body.strategy ? data.body.strategy.id : null,
          strategyAxis: data.body.strategyAxis ? data.body.strategyAxis.id : null,
          pnd: data.body.pnd ? data.body.pnd.id : null,
          pndAxis: data.body.pndAxis ? data.body.pndAxis.id : null,
        })
        this.isEdit = true
      }
    )
  }

  get form() {
    return this.projectStrategyForm.controls;
  }

  get valid() {
    return this.projectStrategyForm.valid
  }

  get value() {
    return this.projectStrategyForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      console.log(this.value);
      if (this.isEdit) {
        this._projectStrategyService.update(this.projectStrategyId, { ...this.value, project: this.projectData.id }).subscribe(
          (data: CommonResponse<ProjectModel>) => {
            this._toastrService.success(data.message)
            this.nextPanel.emit('study')
          }
        )
      } else {
        this._projectStrategyService.create({ ...this.value, project: this.projectData.id }).subscribe(
          (data: CommonResponse<ProjectModel>) => {
            this._toastrService.success(data.message)
            this.nextPanel.emit('study')
          }
        )
      }
    }
  }

}
