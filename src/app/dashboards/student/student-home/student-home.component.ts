import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/shared/attendance.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css'],
})
export class StudentHomeComponent implements OnInit {
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
