import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { ProjectModel } from 'app/core/models/project.model';
import { ProjectZoneService } from 'app/core/services/projectZone.service';
import { ProjectZoneModel } from 'app/core/models/projectZone.model';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { DeanshipModel } from 'app/core/models/deanship.model';
import { DelegationModel } from 'app/core/models/delegeation.model';
import { DistrictModel } from 'app/core/models/district.model';
import { GovernorateModel } from 'app/core/models/governorate.model';
import { DeanshipService } from 'app/core/services/deanship.service';
import { DelegationService } from 'app/core/services/delegation.service';
import { DistrictService } from 'app/core/services/district.service';
import { GovernorateService } from 'app/core/services/governorate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-zone',
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
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.scss'
})
export class ZoneComponent {

  @Input() projectData: ProjectModel;
  @Output() nextPanel: EventEmitter<String> = new EventEmitter();

  projectZoneForm: UntypedFormGroup
  submit: boolean;

  governorates: Array<GovernorateModel>
  districts: Array<DistrictModel>
  delegations: Array<DelegationModel>
  deanships: Array<DeanshipModel>

  isEdit: boolean = false
  projectZoneId: any = null

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _toastrService: ToastrService,
    private _projectZoneService: ProjectZoneService,
    private _districtService: DistrictService,
    private _governorateService: GovernorateService,
    private _delegationService: DelegationService,
    private _deanshipService: DeanshipService,
    private _activatedRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.findAllDistrict()
    this.findAllGovernorate()
    this.findAllDelegation()
    this.findAllDeanship()
    this.initForm()
    if(this.projectData) {
        this.isEdit = false
        this.getOne(this.projectData.id)
    }
  }

  initForm() {
    this.projectZoneForm = this._formBuilder.group({
      project: [null, []],
      description: [null, [Validators.required]],
      type: [null, [Validators.required]],
      national: [false, [Validators.required]],
      district: [null, []],
      governorate: [null, []],
      delegation: [null, []],
      deanship: [null, []],
      landDisponibility: [false, [Validators.required]],
      landObservation: [null, []],
      landRelease: [null, []],
      projectRelated: [false, [Validators.required]],
      projectCode: [null, []],
      projectName: [null, []],
      projectLinkType: [null, []],
      stakeholderName: [null, []],
      stakeholderEmail: [null, []],
      stakeholderRole: [null, []],
    })
  }

  getOne(id: any) {
    this._projectZoneService.findOne({ project: id }).subscribe(
      (data: CommonResponse<ProjectZoneModel>) => {
        this._toastrService.success(data.message)
        this.projectZoneId = data.body.id
        this.projectZoneForm.patchValue({
          ...data.body,
          district: data.body.district.id,
          governorate: data.body.governorate.id,
          delegation: data.body.delegation.id,
          deanship: data.body.deanship.id,
        })
        this.isEdit = true
      }
    )
  }

  findAllDistrict() {
    this._districtService.findAll().subscribe(
      (data: CommonResponse<DistrictModel[]>) => {
        this.districts = data.body
      }
    )
  }

  findAllGovernorate() {
    this._governorateService.findAll().subscribe(
      (data: CommonResponse<GovernorateModel[]>) => {
        this.governorates = data.body
      }
    )
  }

  findAllDelegation() {
    this._delegationService.findAll().subscribe(
      (data: CommonResponse<DelegationModel[]>) => {
        this.delegations = data.body
      }
    )
  }

  findAllDeanship() {
    this._deanshipService.findAll().subscribe(
      (data: CommonResponse<DeanshipModel[]>) => {
        this.deanships = data.body
      }
    )
  }

  get form() {
    return this.projectZoneForm.controls;
  }

  get valid() {
    return this.projectZoneForm.valid
  }

  get value() {
    return this.projectZoneForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      console.log(this.value);
      if (this.isEdit) {
        this._projectZoneService.update(this.projectZoneId, { ...this.value, project: this.projectData.id }).subscribe(
          (data: CommonResponse<ProjectModel>) => {
            this._toastrService.success(data.message)
            this.nextPanel.emit('strategy')
          }
        )
      } else {
        this._projectZoneService.create({ ...this.value, project: this.projectData.id }).subscribe(
          (data: CommonResponse<ProjectModel>) => {
            this._toastrService.success(data.message)
            this.nextPanel.emit('strategy')
          }
        )
      }
    }
  }

}
