import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ScheduleService } from './../../../shared/schedule/schedule.service';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.css'],
})
export class NewScheduleComponent {
  scheduleForm = this.fb.group({
    standard: [null, Validators.required],
    day: [null, Validators.required],
    time: [null, Validators.required],
    subject: [null, Validators.required],
    link: [null, Validators.required],
  });

  classes = [
    'Pre-KG',
    'LKG',
    'UKG',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  timings = [
    '8:30 AM - 9:30 AM',
    '9:30 AM - 10:30 AM',
    '10:30 AM - 11:30 AM',
    '11:30 AM - 12:30 PM',
    '12:30 PM - 1:30 PM',
    '1:30 PM - 2:30 PM',
    '2:30 PM - 3:30 PM',
  ];
  subjects = ['English', 'Malayalam', 'Hindi', 'Maths', 'EVS', 'CS'];

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit() {
    const schedule = {
      standard: this.scheduleForm.value.standard,
      day: this.scheduleForm.value.day,
      time: this.scheduleForm.value.time,
      subject: this.scheduleForm.value.subject,
      link: this.scheduleForm.value.link,
    };
    this.scheduleService.addSchdule(schedule).subscribe(
      (response) => {
        const res = JSON.parse(JSON.stringify(response));
        this.snackBar.open(res['message'], 'OK', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['/teacher']);
      },
      (err) => {
        const res = JSON.parse(JSON.stringify(err));
        this.snackBar.open(res['message'], 'OK', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['/teacher']);
      }
    );
  }
}
