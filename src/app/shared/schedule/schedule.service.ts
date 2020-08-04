import { Schedule } from './schedule.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private posts: Schedule[] = [];
  private postsUpdated = new Subject<{
    posts: Schedule[];
    postCount: number;
  }>();

  constructor(private http: HttpClient) {}

  addSchdule(schedule) {
    return this.http.post(
      'http://localhost:3000/api/schedule/addSchedule',
      schedule
    );
  }
  getSchedule(postsPerPage, currentPage) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/schedule' + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post) => {
              return {
                id: post._id,
                standard: post.standard,
                day: post.day,
                time: post.time,
                subject: post.subject,
                link: post.link,
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
}
