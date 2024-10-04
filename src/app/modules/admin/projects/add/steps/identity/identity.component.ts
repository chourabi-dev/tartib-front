import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    UntypedFormGroup,
    UntypedFormBuilder,
    Validators,
    ReactiveFormsModule,
    FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { ProjectModel } from 'app/core/models/project.model';
import { ProjectIdentityService } from 'app/core/services/projectIdentity.service';
import { ProjectIdentityModel } from 'app/core/models/projectIdentity.model';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorModel } from 'app/core/models/sector.model';
import { SectorService } from 'app/core/services/sector.service';
import { MinisterService } from 'app/core/services/minister.service';
import { MinisterModel } from 'app/core/models/minister.model';
import { OrganisationService } from 'app/core/services/organisation.service';
import { OrganisationModel } from 'app/core/models/organisation.model';
import { CategoryModel } from 'app/core/models/category.model';
import { ProjectTypologyModel } from 'app/core/models/projectTypology.model';
import { CategoryService } from 'app/core/services/category.service';
import { TypologyService } from 'app/core/services/typology.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { DistrictModel } from 'app/core/models/district.model';
import { DistrictService } from 'app/core/services/district.service';
import { GovernorateModel } from 'app/core/models/governorate.model';
import { DelegationModel } from 'app/core/models/delegeation.model';
import { DeanshipModel } from 'app/core/models/deanship.model';
import {  LocationService } from 'app/core/services/location.service';
@Component({
    selector: 'app-identity',
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
        NgxMaskDirective,
        NgxMaskPipe,
        MatDialogModule,
    ],
    templateUrl: './identity.component.html',
    styleUrl: './identity.component.scss',
    providers: [provideNgxMask()],
})
export class IdentityComponent {
    @Input() projectIdentityData: ProjectIdentityModel;
    @Output() nextPanel: EventEmitter<String> = new EventEmitter();

    projectIdentityForm: UntypedFormGroup;
    submit: boolean;

    isEdit: boolean = false;
    projectIdentityId: any = null;

    sectors: Array<SectorModel> = [];
    ministers: Array<MinisterModel> = [];
    organisations: Array<OrganisationModel> = [];
    categories: Array<CategoryModel> = [];
    typologies: Array<ProjectTypologyModel> = [];
    districts: Array<DistrictModel>=[]
    governorates:Array<GovernorateModel>=[]
delegations:Array<DelegationModel>=[]
deanships:Array<DeanshipModel>=[]

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _toastrService: ToastrService,
        private _projectIdentityService: ProjectIdentityService,
        private _activatedRoute: ActivatedRoute,
        private _sectorService: SectorService,
        private _ministerService: MinisterService,
        private _categoryService: CategoryService,
        private _typlogieService: TypologyService,
        private _organisationService: OrganisationService,
        private _districtService :DistrictService,
        public dialog: MatDialog,
        private _router: Router,
        private _locationService:LocationService

    ) {}

    ngOnInit(): void {
        this.initForm();
        this._activatedRoute.paramMap.subscribe(async (params) => {
            var id = params.get('id');
            this.projectIdentityId = id;
            console.log(this.projectIdentityId);
            if (this.projectIdentityId) {
                this.getOne(this.projectIdentityId);
            }
        });
        this.findAllService();
        this.findAllMinister();
        this.findAllOrganisations();
        this.findAllCategroeis();
        this.findAllTyplogies();
        this.findAllDistrict();
        this.initForm();
        if (this.projectIdentityData) {
            this.isEdit = false;
        }
    }

    initForm() {
        // this.projectIdentityForm = this._formBuilder.group({
        //     // project: [null, []],
        //     code: [null, []],
        //     name: [null, [Validators.required]],
        //     description: [null, [Validators.required]],
        //     typology: [null, []],
        //     category: [null, []],
        //     sector: [null, [Validators.required]],
        //     minister: [null, []],
        //     ministerName: [null, [Validators.required]],
        //     organisation: [null, []],
        //     responsibleName: [null, [Validators.required]],
        //     responsibleEmail: [null, [Validators.required, Validators.email]],
        //     responsiblePhone: [null, [Validators.min(11)]],
        //     managementUnitName: [null, [Validators.required]],
        //     projectManagerName: [null, [Validators.required]],
        //     projectManagerEmail: [null, []],
        //     projectManagerPhone: [null, []],
        //     projectOwnerName: [null],
        //     projectOwnerEmail: [null],
        //     projectOwnerPhone: [null],
        // });
        this.projectIdentityForm = this._formBuilder.group({
            code: [null, []],  // Corresponds to 'code' column in the entity
            name: [null, [Validators.required]],  // Corresponds to 'name'
            description: [null, [Validators.required]],  // Corresponds to 'description'
            
            typology: [null, []],  // References 'TypologyEntity'
            category: [null, []],  // References 'CategoryEntity'
            sector: [null, [Validators.required]],  // References 'SectorEntity'
            
            minister: [null, []],  // References 'MinisterEntity'
            ministerName: [null, [Validators.required]],  // Corresponds to 'minister_name'
            
            organisation: [null, []],  // References 'OrganisationEntity'
            
            responsibleName: [null, [Validators.required]],  // Corresponds to 'responsible_name'
            responsibleEmail: [null, [Validators.required, Validators.email]],  // Corresponds to 'responsible_email'
            responsiblePhone: [null, [Validators.min(11)]],  // Corresponds to 'responsible_phone'
            
            managementUnitName: [null, [Validators.required]],  // Corresponds to 'management_unitname'
            
            projectManagerName: [null, [Validators.required]],  // Corresponds to 'project_manager_name'
            projectManagerEmail: [null, []],  // Corresponds to 'project_manager_email'
            projectManagerPhone: [null, []],  // Corresponds to 'project_manager_phone'
            
            projectOwnerName: [null],  // Corresponds to 'po_name'
            projectOwnerEmail: [null],  // Corresponds to 'po_email'
            projectOwnerPhone: [null],  // Corresponds to 'po_phone'
            
            districts: [null, []],  // Corresponds to ManyToMany relationship with DistrictEntity
            governorates: [null, []],  // Corresponds to ManyToMany relationship with GovernorateEntity
            delegations: [null, []],  // Corresponds to ManyToMany relationship with DelegationEntity
            deanships: [null, []],  // Corresponds to ManyToMany relationship with DeanshipEntity
        });
        
    }

    getOne(id: any) {
        this._projectIdentityService
            .getOne(id)
            .subscribe((data: CommonResponse<ProjectIdentityModel>) => {
                console.log(data);

                this._toastrService.success(data.message);
                this.projectIdentityId = data.body.id;
                this.districts=data.body.districts
                this.projectIdentityForm.patchValue({
                    ...data.body,
                    sector: data.body.sector ? data.body.sector.id : null,
                    typology: data.body.typology ? data.body.typology.id : null,
                    category: data.body.category ? data.body.category.id : null,
                    minister: data.body.minister ? data.body.minister.id : null,
                    organisation: data.body.organisation
                        ? data.body.organisation.id
                        : null,
                });
                this.isEdit = true;
            });
    }

    findAllService() {
        this._sectorService
            .findAll()
            .subscribe((data: CommonResponse<SectorModel[]>) => {
                this.sectors = data.body;
            });
    }

    findAllMinister() {
        this._ministerService
            .findAll()
            .subscribe((data: CommonResponse<MinisterModel[]>) => {
                this.ministers = data.body;
            });
    }

    findAllOrganisations() {
        this._organisationService
            .findAll()
            .subscribe((data: CommonResponse<OrganisationModel[]>) => {
                this.organisations = data.body;
            });
    }
    findAllCategroeis() {
        this._categoryService
            .findAll()
            .subscribe((data: CommonResponse<CategoryModel[]>) => {
                this.categories = data.body;
            });
    }
    findAllTyplogies() {
        this._typlogieService
            .findAll()
            .subscribe((data: CommonResponse<ProjectTypologyModel[]>) => {
                this.typologies = data.body;
            });
    }

    get form() {
        return this.projectIdentityForm.controls;
    }

    get valid() {
        return this.projectIdentityForm.valid;
    }

    get value() {
        return this.projectIdentityForm.value;
    }

   async validSubmit() {
        this.submit = true;
        if (this.valid) {
            console.log(this.value);
            if (this.isEdit) {
                this._projectIdentityService
                    .update(this.projectIdentityId, {
                        ...this.value,
                        // project: this.projectData.id,
                    })
                    .subscribe((data: CommonResponse<ProjectIdentityModel>) => {
                        this._toastrService.success(data.message);
                        this.nextPanel.emit('zone');
                    });
            } else {
                this._projectIdentityService
                    .create({
                        ...this.value,
                        //  project: this.projectData.id
                    })
                    .subscribe((data: CommonResponse<ProjectIdentityModel>) => {
                        this._toastrService.success(data.message);
                        // this.nextPanel.emit('zone');
                        this.openDialog(data.body)
                    });
            }
        }
    }
    findMinistreByCode(code: any) {
        this._ministerService.getOne(code).subscribe((data) => {
            console.log('adad' + data.body.name);

            this.projectIdentityForm.patchValue({
                ministerName: data.body ? data.body.code : null,
            });
        });
    }
    getResponsiblePhoneControl(): FormControl {
        return this.form.responsiblePhone as FormControl; // Casting to FormControl
    }
    openDialog(createdProjectIdentity:ProjectIdentityModel): void {
        const dialogRef = this.dialog.open(FuseConfirmationDialogComponent, {
            maxWidth: '800px',
            data: {
                dismissible: true, // If you want the dismiss button to show
                icon: {
                    show: true,
                    name: 'heroicons_outline:check-circle', // Replace with the icon name
                    color: 'success', // Options: 'primary', 'accent', 'warn', etc.
                },
                title: 'Confirmation', // Title of the dialog
                message:  `Votre code projet est : ${createdProjectIdentity.code} ! voulez vous continuez à renseigner ?` , // Message in the dialog
                actions: {
                    confirm: {
                        show: true,
                        label: 'Oui, Continuer à renseigner', // Confirm button text
                        color: 'primary', // Color of the confirm button
                    },
                    cancel: {
                        show: true,
                        label: 'Non, enregistrer et sortir', // Cancel button text
                    },
                },
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                console.log('Item created.');
                // Perform delete operation
                this.nextPanel.emit('zone');
            } else {
                console.log('return to list.');
                this._router.navigate(['/projects/list']);
            }
        });
    }

    findAllDistrict() {
        this._districtService.findAll().subscribe(
          (data: CommonResponse<DistrictModel[]>) => {
            this.districts = data.body
          }
        )
      }

      onDistrictChange() {
        const selectedDistricts = this.projectIdentityForm.get('districts').value;
        if (selectedDistricts.length > 0) {
            console.log(selectedDistricts);
            
          this._locationService.getGovernoratesByDistricts(selectedDistricts).subscribe(
           (data:any) => {
              this.governorates = data.body;
              this.projectIdentityForm.get('governorates').setValue([]);
              this.projectIdentityForm.get('delegations').setValue([]);
              this.projectIdentityForm.get('deanships').setValue([]);
            }
          );
        } else {
          this.governorates = [];
          this.delegations = [];
          this.deanships = [];
        }
      }
    
      onGovernorateChange() {
        const selectedGovernorates = this.projectIdentityForm.get('governorates').value;
        if (selectedGovernorates.length > 0) {
          this._locationService.getDelegationsByGovernorates(selectedGovernorates).subscribe(
            (data: any) => {
              this.delegations = data.body;
              this.projectIdentityForm.get('delegations').setValue([]);
              this.projectIdentityForm.get('deanships').setValue([]);
            }
          );
        } else {
          this.delegations = [];
          this.deanships = [];
        }
      }
    
      onDelegationChange() {
        const selectedDelegations = this.projectIdentityForm.get('delegations').value;
        if (selectedDelegations.length > 0) {
          this._locationService.getDeanshipsByDelegations(selectedDelegations).subscribe(
            (data: any) => {
              this.deanships = data.body;
              this.projectIdentityForm.get('deanships').setValue([]);
            }
          );
        } else {
          this.deanships = [];
        }
      }
    
      toggleAllSelection(controlName: string) {
        const control = this.projectIdentityForm.get(controlName);
        const allOptionValues = this[controlName].map(item => item.id);
        
        if (control.value.length === allOptionValues.length) {
          control.setValue([]);
        } else {
          control.setValue(allOptionValues);
        }
    
        // Trigger the appropriate change event
        if (controlName === 'districts') {
          this.onDistrictChange();
        } else if (controlName === 'governorates') {
          this.onGovernorateChange();
        } else if (controlName === 'delegations') {
          this.onDelegationChange();
        }
      }


    }
