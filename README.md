# e-Learning Hub

> ##### Submitted by Lalitha V S
>
> ###### For the fulfilment of Main Project requirement of FSD course conducted by ICTAK

## Abstract

The project is a basic Online Learning Management System for schools. The project is intended to be used by three main users in schools:

1.  Admin
2.  Teachers
3.  Students

The details of each of the above role is explained in the respective sections below.

Only logged in users will be able to access various details.

> **Note:**
>
> - There is no separate _"Sign Up"_ module in this project which can be directly accessed by new users.
> - This is done intentionally to prevent
>   -- any random person from signing up and accessing various details.
>   -- student signing up as teacher or vice versa.
> - Any new user (student / teacher) has to be added by the Admin only with the adequate user role.
> - Once the Admin creates the user, they will be able to login with the role as specified by the Admin.
>
> There is indeed a workaround in case of extreme emergencies like Admin forgetting the credentials. The project has a Sign Up module through which can be accessed by the developer through which new user can be created. After that, the developer has to manually set the user role as "Admin" in the database manually (default user role is "Student").

## How to install and run the project

1.  Navigate to the project folder in the terminal.
2.  Type **npm install** and hit enter. This will install the project dependencies (see _Project Dependencies_ section below for more details) into the project folder.
3.  Type **node server** and hit enter. This will start the NodeJS / Express server.
4.  Open another terminal window, navigate to the same project folder, type **ng serve** and hit enter. This will start the Angular server.
5.  Open a browser window, type **http://localhost:4200/** and hit enter.

> **Note**: The NodeJS / Express as well as the Angular files are in the same folder. So both the severs has to be started from the same project folder.

## Project Dependencies

In addition to NodeJS and Angular, the following modules are required. These will be automatically installed by **npm install** command mentioned above.

1.  Angular CDK
2.  Angular Material
3.  bcryptjs
4.  cors
5.  express
6.  jsonwebtoken
7.  mongoose
8.  multer

> **Note:** More details like the versions of the above modules can be found in package.json / package-lock.json files inside the project folder.

## Project Details

As mentioned in the _Abstract_ section, the project is intended to be used by three main users in schools:

1.  Admin
2.  Teachers
3.  Students

### Admin

Admin will be able to:

1.  Add a new student / teacher.
2.  View the details of the students / teachers.
3.  Update the details of student / teachers.
4.  Delete a student / teacher.

The Admin username is **admin@school.com** and the password is **12345678**.

> **Note:** The Admin username and password is already existing in the project database (MongoDB Atlas). So no need to create the same. Rest of the users (teacher / student) can be created after logging in as Admin.

### Teacher

Teachers will be able to:

1.  Add the class schedule with class time and the link to join the online class.
2.  Add / edit / delete class notes.
3.  View the details of the student.

### Student

Students will be able to:

1.  View the class schedule.
2.  View the class notes.
