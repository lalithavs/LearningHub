import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AttendanceService } from './../../../shared/attendance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css'],
})
export class TeacherHomeComponent implements OnInit {
  attendanceMarked = true;
  user;

  constructor(
    private attendanceService: AttendanceService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserLogin();
    console.log(this.user);
    this.attendanceService.getAttendance(this.user).subscribe(
      (response) => {
        console.log(response);
        const res = JSON.parse(JSON.stringify(response));
        if (res['attended'] === true) {
          this.attendanceMarked = false;
        } else {
          this.attendanceMarked = true;
        }
      },
      (err) => {
        console.log('Get Attendance error');
      }
    );
  }

  onAttended() {
    this.attendanceService.setAttendance(this.user).subscribe(
      (response) => {
        const res = JSON.parse(JSON.stringify(response));
        this.snackBar.open(res['message'], 'OK', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.attendanceMarked = false;
      },
      (err) => {
        const res = JSON.parse(JSON.stringify(err));
        this.snackBar.open(res['message'], 'OK', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }
}
