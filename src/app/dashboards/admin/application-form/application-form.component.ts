import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../admin.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css'],
})
export class ApplicationFormComponent implements OnInit, OnDestroy {
  private mode = 'create';
  private authStatusSub: Subscription;
  isLoading = false;
  student;
  id;

  applicationForm = this.fb.group({
    fullName: [null, Validators.required],
    standard: ['1', Validators.required],
    dob: [null, Validators.required],
    motherName: [null, Validators.required],
    fatherName: [null, Validators.required],
    gender: [null, Validators.required],
    address: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
    ],
    admissionNumber: [null, Validators.required],
    password: [null, Validators.required],
    role: ['Student', Validators.required],
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
        this.student = this.adminService.getUserDetails()[1];
        console.log(this.id);
        console.log(this.student);
        this.isLoading = false;
        this.applicationForm.setValue({
          fullName: this.student.fullName,
          standard: this.student.standard,
          dob: this.student.dob,
          motherName: this.student.motherName,
          fatherName: this.student.fatherName,
          gender: this.student.gender,
          address: this.student.address,
          city: this.student.city,
          state: this.student.state,
          postalCode: this.student.postalCode,
          admissionNumber: this.student.admissionNumber.split('@')[0],
          password: null,
          role: 'Student',
        });
        this.applicationForm.get('admissionNumber').disable();
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.mode === 'create') {
      const student = {
        fullName: this.applicationForm.value.fullName,
        standard: this.applicationForm.value.standard,
        dob: this.applicationForm.value.dob,
        motherName: this.applicationForm.value.motherName,
        fatherName: this.applicationForm.value.fatherName,
        gender: this.applicationForm.value.gender,
        address: this.applicationForm.value.address,
        city: this.applicationForm.value.city,
        state: this.applicationForm.value.state,
        postalCode: this.applicationForm.value.postalCode,
        admissionNumber:
          this.applicationForm.value.admissionNumber + '@school.com',
        password: this.applicationForm.value.password,
        role: 'Student',
      };
      this.adminService.addStudent(student).subscribe(
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
      const student = {
        fullName: this.applicationForm.value.fullName,
        standard: this.applicationForm.value.standard,
        dob: this.applicationForm.value.dob,
        motherName: this.applicationForm.value.motherName,
        fatherName: this.applicationForm.value.fatherName,
        gender: this.applicationForm.value.gender,
        address: this.applicationForm.value.address,
        city: this.applicationForm.value.city,
        state: this.applicationForm.value.state,
        postalCode: this.applicationForm.value.postalCode,
        admissionNumber: this.student.admissionNumber,
        password: this.applicationForm.value.password,
        role: 'Student',
      };
      this.adminService.updateStudent(this.id, student).subscribe(
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

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
