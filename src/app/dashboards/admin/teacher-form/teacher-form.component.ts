import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css'],
})
export class TeacherFormComponent implements OnInit {
  private mode = 'create';
  private authStatusSub: Subscription;
  isLoading = false;
  teacher;
  id;

  teacherForm = this.fb.group({
    fullName: [null, Validators.required],
    subjects: [null, Validators.required],
    standards: [null, Validators.required],
    teacherId: [null, Validators.required],
    password: [null, Validators.required],
    role: ['Teacher', Validators.required],
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

  subjectsList = ['English', 'Maths', 'EVS', 'CS'];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.isLoading = true;
        this.teacher = this.adminService.getUserDetails()[1];
        console.log(this.id);
        console.log(this.teacher);
        this.isLoading = false;
        this.teacherForm.setValue({
          fullName: this.teacher.fullName,
          subjects: this.teacher.subjects,
          standards: this.teacher.standards,
          teacherId: this.teacher.teacherId.split('@')[0],
          password: null,
          role: 'Teacher',
        });
        this.teacherForm.get('teacherId').disable();
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.mode === 'create') {
      const teacher = {
        fullName: this.teacherForm.value.fullName,
        subjects: this.teacherForm.value.subjects,
        standards: this.teacherForm.value.standards,
        teacherId: this.teacherForm.value.teacherId + '@school.com',
        password: this.teacherForm.value.password,
        role: 'Teacher',
      };
      this.adminService.addTeacher(teacher).subscribe(
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
          console.log(err);
          this.snackBar.open(res.error['message'], 'OK', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    } else {
      const teacher = {
        fullName: this.teacherForm.value.fullName,
        subjects: this.teacherForm.value.subjects,
        standards: this.teacherForm.value.standards,
        teacherId: this.teacher.teacherId,
        password: this.teacherForm.value.password,
        role: 'Teacher',
      };
      this.adminService.updateTeacher(this.id, teacher).subscribe(
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
