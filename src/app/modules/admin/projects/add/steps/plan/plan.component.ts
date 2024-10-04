import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProjectPlanService } from 'app/core/services/projectPlan.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectModel } from 'app/core/models/project.model';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { ProjectPlanModel } from 'app/core/models/projectPlan.model';
import { CurrencyModel } from 'app/core/models/currency.model';
import { CurrencyService } from 'app/core/services/currency.service';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsComponent } from './components/components.component';
import { ExtensionsComponent } from './extensions/extensions.component';

@Component({
  selector: 'app-plan',
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
    MatDividerModule,
    MatTabsModule,
    ComponentsComponent,
    ExtensionsComponent
  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent {

  @Input() projectData: ProjectModel;
  @Output() nextPanel: EventEmitter<String> = new EventEmitter();

  projectPlanForm: UntypedFormGroup
  submit: boolean;

  isEdit: boolean = false
  projectPlanId: any = null
  projectPlanData:ProjectModel = null

  currencies:Array<CurrencyModel> = [];

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _toastrService: ToastrService,
    private _projectPlanService: ProjectPlanService,
    private _currencyService: CurrencyService,
    private _cdk: ChangeDetectorRef,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAllCurrency()
    this.initForm()
    if (this.projectData) {
      this.isEdit = false
      this.getOne(this.projectData.id)
    }
  }

  findAllCurrency() {
    this._currencyService.findAll().subscribe(
        (data: CommonResponse<CurrencyModel[]>) => {
            this.currencies = data.body
        }
    )
  }

  initForm() {
    this.projectPlanForm = this._formBuilder.group({
      project: [null, []],
      amount: [null, []],
      economicNature: [null, []], // Assuming economic nature ID is a string
      currency: [null, []], // Assuming currency ID is a string
      exchangeRate: [null, []],
      itemTitle: [null, []],
      itemLocalCost: [null, []],
      itemEquivalentCost: [null, []],
      fundingSource: [null, []], // Assuming funding source ID is a string
      fundingSourceType: [null, []], // Assuming funding source type ID is a string
      fundingCurrency: [null, []], // Assuming funding currency ID is a string
      fundingAmount: [null, []],
      fundingLocalAmount: [null, []],
      fundingEquivalentAmount: [null, []],
      fundingStart: [null, []],
      fundingEnd: [null, []],
      fundingAgreement: [null, []],
      effectiveDate: [null, []],
      sendingDate: [null, []],
      approvalDate: [null, []],
      arpDate: [null, []],
      ratificationDate: [null, []],
      plenaryDate: [null, []],
      ortNumber: [null, []],
      ortDate: [null, []],
    })
  }

  getOne(id: any) {
    this._projectPlanService.findOne({ project: id }).subscribe(
      (data: CommonResponse<ProjectPlanModel>) => {
        this._toastrService.success(data.message)
        this.projectPlanId = data.body.id
        this.projectPlanData = data.body,
        this.projectPlanForm.patchValue({
          ...data.body,
          economicNature: data.body.economicNature ? data.body.economicNature.id : null,
          currency: data.body.currency ? data.body.currency.id : null,
          fundingSource: data.body.fundingSource ? data.body.fundingSource.id : null,
          fundingSourceType: data.body.fundingSourceType ? data.body.fundingSourceType.id : null,
          fundingCurrency: data.body.fundingCurrency ? data.body.fundingCurrency.id : null,
        })
        this.isEdit = true
        this._cdk.markForCheck()
      }
    )
    this._cdk.detectChanges()
  }

  get form() {
    return this.projectPlanForm.controls;
  }

  get valid() {
    return this.projectPlanForm.valid
  }

  get value() {
    return this.projectPlanForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      console.log(this.value);
      if (this.isEdit) {
        this._projectPlanService.update(this.projectPlanId, { ...this.value, project: this.projectData.id }).subscribe(
          (data: CommonResponse<ProjectPlanModel>) => {
            this._toastrService.success(data.message)
            this.projectPlanData = data.body
            this._cdk.markForCheck()
            //this.nextPanel.emit('risk')
          }
        )
      } else {
        this._projectPlanService.create({ ...this.value, project: this.projectData.id }).subscribe(
          (data: CommonResponse<ProjectPlanModel>) => {
            this._toastrService.success(data.message)
            this.projectPlanData = data.body
            this._cdk.markForCheck()
            //this.nextPanel.emit('risk')
          }
        )
      }
    }
    this._cdk.detectChanges()
  }

}
