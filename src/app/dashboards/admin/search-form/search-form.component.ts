import { AuthService } from './../../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from './../admin.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId;

  searchForm = this.fb.group({
    role: ['Teacher', Validators.required],
    search: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onSubmit() {
    const user = {
      role: this.searchForm.value.role,
      search: this.searchForm.value.search + '@school.com',
    };
    this.adminService.searchUser(user).subscribe(
      (response) => {
        const res = JSON.parse(JSON.stringify(response));
        this.snackBar.open(res['message'], 'OK', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.adminService.setUserDetails(user.role, res.user);
        this.router.navigate(['/admin/user']);
      },
      (err) => {
        const res = JSON.parse(JSON.stringify(err));
        console.log(res.error.message);
        this.snackBar.open(res.error['message'], 'OK', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.searchForm.reset();
      }
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
