import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';

import { StrategyComponent } from './steps/strategy/strategy.component';
import { IdentityComponent } from './steps/identity/identity.component';
import { RiskComponent } from './steps/risk/risk.component';
import { PlanComponent } from './steps/plan/plan.component';
import { StudyComponent } from './steps/study/study.component';
import { ValidationComponent } from './steps/validation/validation.component';
import { ZoneComponent } from './steps/zone/zone.component';
import { InfoComponent } from './steps/info/info.component';
import { ProjectModel } from 'app/core/models/project.model';
import { ProjectIdentityModel } from 'app/core/models/projectIdentity.model';
import { LogiqueComponent } from './steps/logique/logique.component';

@Component({
  selector: 'app-project',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    LogiqueComponent,
    StrategyComponent,
    RiskComponent,
    IdentityComponent,
    PlanComponent,
    InfoComponent,
    StudyComponent,
    ValidationComponent,
    ZoneComponent
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {

  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: any[] = [];
  selectedPanel2: string = 'info';
  selectedPanel: string = 'identity';

  projectData:ProjectIdentityModel
  projectEdit:boolean = false

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  projectForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
  ) {

  }

  ngOnInit(): void {
    this.initProjectMenu()
    this.initMediaChange()
  }

  /**
     * On destroy
     */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  initProjectMenu() {
    this.panels = [
      // {
      //   id: 'info',
      //   icon: 'heroicons_outline:information-circle',
      //   title: 'Information générale',
      //   description: 'Information générale du projet',
      // },
      {
        id: 'identity',
        icon: 'heroicons_outline:identification',
        title: "Identité & structure",
        description: "Identité et structure du projet",
      },
      {
        id: 'zone',
        icon: 'heroicons_outline:map-pin',
        title: "Zone d'intervention",
        description: "Zone d'intervention du projet",
      },
      {
        id: 'strategy',
        icon: 'heroicons_outline:adjustments-vertical',
        title: "Alignement stratégique",
        description: "Alignement stratégique du projet",
      },
      {
        id: 'logique',
        icon: 'heroicons_outline:document-check',
        title: "logique d'intervention",
        description: "logique d'intervention du projet",
      },
      {
        id: 'study',
        icon: 'heroicons_outline:presentation-chart-bar',
        title: "Etudes & autorisations",
        description: "Etudes et autorisations du projet",
      },
      {
        id: 'plan',
        icon: 'heroicons_outline:calculator',
        title: "Coût & Plan de financement",
        description: "Coût et Plan de financement du projet",
      },
      {
        id: 'risk',
        icon: 'heroicons_outline:clipboard-document-check',
        title: "Analyse de risques",
        description: "Analyse de risques du projet",
      },
      {
        id: 'validation',
        icon: 'heroicons_outline:document-check',
        title: "Validation fiche",
        description: "Validation fiche du projet",
      }
    ];
  }

  initMediaChange() {
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Set the drawerMode and drawerOpened
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        }
        else {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  drawerToggle() {
    this.drawerOpened = !this.drawerOpened
  }

  /**
     * Navigate to the panel
     *
     * @param panel
     */
  goToPanel(panel: string): void {
    this.selectedPanel = panel;

    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }

  /**
     * Get the details of the panel
     *
     * @param id
     */
  getPanelInfo(id: string): any {
    return this.panels.find(panel => panel.id === id);
  }

  getProjectIdentity(data:ProjectIdentityModel) {
    this.projectData = data
  }

}
