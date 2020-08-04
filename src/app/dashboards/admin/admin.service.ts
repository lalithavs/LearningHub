import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  userRole;
  user;

  constructor(private http: HttpClient) {}

  addStudent(student) {
    return this.http.post(
      'http://localhost:3000/api/admin/addStudent',
      student
    );
  }

  updateStudent(id, student) {
    return this.http.put(
      'http://localhost:3000/api/admin/updateStudent/' + id,
      student
    );
  }

  deleteStudent(id) {
    return this.http.delete(
      'http://localhost:3000/api/admin/deleteStudent/' + id
    );
  }

  addTeacher(teacher) {
    return this.http.post(
      'http://localhost:3000/api/admin/addTeacher',
      teacher
    );
  }

  updateTeacher(id, teacher) {
    return this.http.put(
      'http://localhost:3000/api/admin/updateTeacher/' + id,
      teacher
    );
  }

  deleteTeacher(id) {
    return this.http.delete(
      'http://localhost:3000/api/admin/deleteTeacher/' + id
    );
  }

  searchUser(user) {
    return this.http.post('http://localhost:3000/api/user/searchUser', user);
  }

  setUserDetails(userRole, user) {
    this.userRole = userRole;
    this.user = user;
  }

  getUserDetails() {
    return [this.userRole, this.user];
  }
}
