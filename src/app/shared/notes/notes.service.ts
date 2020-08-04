import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Notes } from './notes.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private posts: Notes[] = [];
  private postsUpdated = new Subject<{ posts: Notes[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getNote(noteId: string) {
    return this.http.get('http://localhost:3000/api/notes/' + noteId);
  }

  addNote(note) {
    return this.http.post('http://localhost:3000/api/notes/addNote', note);
  }

  updateNote(id, note) {
    return this.http.put(
      'http://localhost:3000/api/notes/updateNote',
      id,
      note
    );
  }

  getNotes(postsPerPage, currentPage) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/notes' + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post) => {
              return {
                title: post.title,
                notes: post.notes,
                _id: post._id,
                subject: post.subject,
                creator: post.creator,
                standard: post.standard,
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((transformedPostData) => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts,
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  deleteNote(id) {
    return this.http.delete('http://localhost:3000/api/notes/' + id);
  }
}
