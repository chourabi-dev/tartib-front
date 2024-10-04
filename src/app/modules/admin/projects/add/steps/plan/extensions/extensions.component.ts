import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPlanModel } from 'app/core/models/projectPlan.model';

@Component({
  selector: 'app-extensions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './extensions.component.html',
  styleUrl: './extensions.component.scss'
})
export class ExtensionsComponent {

    @Input() projectPlanData: ProjectPlanModel;

}
