import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  signupForm: FormGroup;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  onSignup() {
    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(
      this.signupForm.get('email').value,
      this.signupForm.get('passwords.password1').value
    );
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      passwords: new FormGroup(
        {
          password1: new FormControl(null, [
            Validators.required,
            Validators.minLength(8),
          ]),
          password2: new FormControl(null, [
            Validators.required,
            Validators.minLength(8),
          ]),
        },
        {
          validators: (group) =>
            group.value.password1 === group.value.password2
              ? null
              : { unmatched: true },
        }
      ),
    });
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }

  checkPasswordMatch() {
    return (
      this.signupForm.get('passwords.password1').valid &&
      this.signupForm.get('passwords.password2').valid &&
      this.signupForm.get('passwords').invalid
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
