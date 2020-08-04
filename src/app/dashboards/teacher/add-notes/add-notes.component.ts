import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

import { NotesService } from '../../../shared/notes/notes.service';
import { Notes } from './../../../shared/notes/notes.model';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css'],
})
export class AddNotesComponent implements OnInit, OnDestroy {
  notesForm = this.fb.group({
    standard: [null, Validators.required],
    subject: [null, Validators.required],
    title: [null, Validators.required],
    notes: [null, Validators.required],
  });
  subjects = ['English', 'Maths', 'EVS', 'CS'];
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
  isLoading = false;
  notes: Notes;
  private mode = 'create';
  private noteId: string;
  private authStatusSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.noteId = paramMap.get('postId');
        this.isLoading = true;
        this.notesService.getNote(this.noteId).subscribe((note) => {
          this.isLoading = false;
          const noteData = JSON.parse(JSON.stringify(note));
          this.notes = {
            _id: noteData._id,
            standard: noteData.standard,
            subject: noteData.subject,
            title: noteData.title,
            notes: noteData.notes,
            creator: noteData.creator,
          };
          console.log(this.notes);
          this.notesForm.setValue({
            standard: this.notes.standard,
            subject: this.notes.subject,
            title: this.notes.title,
            notes: this.notes.notes,
          });
        });
      } else {
        this.mode = 'create';
        this.noteId = null;
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    const note = {
      standard: this.notesForm.value.standard,
      subject: this.notesForm.value.subject,
      title: this.notesForm.value.title,
      notes: this.notesForm.value.notes,
    };
    if (this.mode === 'create') {
      this.notesService.addNote(note).subscribe(
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
    } else {
      this.notesService.updateNote(this.noteId, note).subscribe(
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
    this.notesForm.reset();
  }

  ngOnDestroy() {}
}
