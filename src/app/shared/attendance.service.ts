import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private http: HttpClient) {}

  getAttendance(id) {
    return this.http.post('http://localhost:3000/api/user/attendanceStatus', {
      id,
    });
  }

  setAttendance(id) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log(today);
    return this.http.post('http://localhost:3000/api/user/markAttendance', {
      id,
      today,
    });
  }

  viewAttendance(id) {
    return this.http.post('http://localhost:3000/api/user/viewAttendance', {
      id,
    });
  }
}
