import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse } from 'app/core/handlers/response-handler/common-response';
import { UserModel } from 'app/core/models/user.model';

@Component({
  selector: 'app-add',
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
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  userForm: UntypedFormGroup
  submit: boolean;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _userService: UserService,
    private _toastrService: ToastrService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this.initUserForm()

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
      this._userService.create(this.value).subscribe(
        (data: CommonResponse<UserModel>) => {
          this._toastrService.success(data.message)
          this._router.navigate(["/configs/users/list"])
        }
      )
    }
  }

}
