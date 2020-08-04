import { AttendanceService } from './../../../shared/attendance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  userRole;
  user;
  userLogin;
  isLoading = false;
  attendanceDetails = false;
  attendanceContents = [];

  constructor(
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.userRole = this.adminService.getUserDetails()[0];
    this.user = this.adminService.getUserDetails()[1];
    console.log(this.user);
    if (this.userRole === 'Teacher') {
      this.userLogin = this.user.teacherId;
    } else {
      this.userLogin = this.user.admissionNumber;
    }
  }

  onAttendance(id) {
    // this.isLoading = true;
    this.attendanceService.viewAttendance(this.userLogin).subscribe(
      (response) => {
        const res = JSON.parse(JSON.stringify(response));
        res.details.forEach((element) => {
          this.attendanceContents.push(element.date);
        });
        console.log(res.details);
        this.attendanceDetails = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onUpdate(id) {
    this.isLoading = true;
    if (this.userRole === 'Teacher') {
      this.router.navigate(['/admin/updateTeacher', id]);
    } else {
      this.router.navigate(['/admin/updateStudent', id]);
    }
  }

  onDelete(id) {
    this.isLoading = true;
    if (this.userRole === 'Teacher') {
      this.adminService.deleteTeacher(id).subscribe(
        (response) => {
          const res = JSON.parse(JSON.stringify(response));
          this.snackBar.open(res['message'], 'OK', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/admin']);
        },
        (err) => {
          const res = JSON.parse(JSON.stringify(err));
          this.snackBar.open(res.error['message'], 'OK', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    } else {
      this.adminService.deleteStudent(id).subscribe(
        (response) => {
          const res = JSON.parse(JSON.stringify(response));
          this.snackBar.open(res['message'], 'OK', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/admin']);
        },
        (err) => {
          const res = JSON.parse(JSON.stringify(err));
          this.snackBar.open(res.error['message'], 'OK', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    }
  }
}
