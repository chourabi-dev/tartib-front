import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { UserModel } from 'app/core/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'app/core/services/user.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  userForm: UntypedFormGroup
  submit: boolean;
  userId: any

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _userService: UserService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this.initUserForm()
    this._activatedRoute.paramMap.subscribe(async params => {
      let id = params.get('id')
      if (id) {
        this.userId = id
        this.getOne(id)
      }
    })

  }

  initUserForm() {

    this.userForm = this._formBuilder.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    })

  }

  getOne(id: any) {
    this._userService.getOne(id).subscribe(
      (data: CommonResponse<UserModel>) => {
        this.setFormData(data.body)
      }
    )
  }

  setFormData(data: UserModel) {
    this.userForm.patchValue({
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
    })
  }

  get form() {
    return this.userForm.controls;
  }

  get valid() {
    return this.userForm.valid
  }

  get value() {
    return this.userForm.value
  }

  validSubmit() {
    this.submit = true;
    if (this.valid) {
      this._userService.update(this.userId, this.value).subscribe(
        (data: CommonResponse<UserModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/users/list"])
        }
      )
    }
  }

}
