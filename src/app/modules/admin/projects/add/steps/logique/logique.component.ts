import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectModel } from 'app/core/models/project.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { ProjectService } from 'app/core/services/project.service';
import { InterventionService } from 'app/core/services/intervention.service';

@Component({
  selector: 'app-logique',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDividerModule,
    
  ],
  templateUrl: './logique.component.html',
  styleUrl: './logique.component.scss'
})
export class LogiqueComponent implements OnInit {
  @Input() projectData: ProjectModel;
  @Output() nextPanel: EventEmitter<String> = new EventEmitter();
  isEdit: boolean = false;
  componenets:any[] = [];

  cadreLogiqueFile: File | null = null; 
  planTravailFile: File | null = null; 

  form = new FormGroup({
    generalObjective: new FormControl('',Validators.required),
    specificObjective: new FormControl('',Validators.required),
    result: new FormControl('',Validators.required),
    repeater : new FormGroup({
      title : new FormControl(''),
      description : new FormControl(''),
      cost : new FormControl(''),
      devise : new FormControl(''),
      
    }),
    cadreLogiqueFile: new FormControl(''),
    startYear: new FormControl('',Validators.required),
    endYear: new FormControl(''),
    planTravailDocument: new FormControl('')
  })


  constructor(private api:InterventionService){}
  ngOnInit(): void {
   /*
   test how file reader "check NETWORK TAB IN DEBUG MODE CHROME"
   this.api.getFilebyNameID("demo.txt").toPromise().then((res)=>{
    console.log(res);
    
   })*/
  }


  deleteComponent(i:number){
    this.componenets.splice(i,1);
  }


  submitRepeater(){
    let payload = this.form.value.repeater;
    this.componenets.push(payload);

    console.log(this.componenets);

    this.form.controls.repeater.reset();
    
  }


  onCadreLogiqueSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.cadreLogiqueFile = file;
      console.log('Selected file:', file.name);
    }
  }

  onPlanTravailSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.planTravailFile = file;
      console.log('Selected file:', file.name);
    }
  }

  


  sendFORM(){ 

    const formData = new FormData(); 
    
    // other data from the form like generalObjective
    formData.append('general_objective', this.form.value.generalObjective);
    formData.append('specific_objective', this.form.value.specificObjective);
    formData.append('result', this.form.value.result);
    formData.append('repeater', JSON.stringify(this.form.value.repeater));
    formData.append('plan_travail_document', this.planTravailFile);
    formData.append('cadre_logique_document', this.cadreLogiqueFile);
    formData.append('start_year', this.form.value.startYear);
    formData.append('end_year', this.form.value.endYear); 

     this.api.create(formData).toPromise().then((res)=>{
      console.log(res);
      
     })
  }
  
}
