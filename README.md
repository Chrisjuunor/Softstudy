# Softstudy

Softstudy is a digital platform that uses technology and data to help students study better, helping them make better decisions about what to study and when to study.

# Starting the application

## install the dependencies

- npm install

## setup the environment variables

- Create an .env file in the root directory
- Set the .env file using the format and details in the .env.examples file

## running the server

- npm start -- starts the server
- npm run dev -- starts the server in development mode

## API endpoints specifications

### POST base_url/api/mentors/sign-up
  - sign up a mentor into the system  

Request body:  
 \{  
 "firstName": "John", // required  
 "lastName": "Doe", // required  
 "email: "johndoe@gmail.com", // required  
 "password": "1235asdf", // required  
 "areaOfSpeciality": "web dev", // required  
 \}

Response:  
\{
status: "success",  
data: \{  
  mentor: \{
"firstName": String,  
 "lastName": String,  
 "email: String,  
 "areaOfSpeciality": String, 
 "_id: String,   
 "profileImg: "",  
 "createdAt: Timestamp,  
 "updatedAt: Timstamp  
  \},  
 token: String,  
\}  
\}  

### POST base_url/api/mentors/login  
  - Logs a mentor into the system

Request body:  
 \{   
 "email: "johndoe@gmail.com", // required  
 "password": "1235asdf", // required   
 \}

Response:  
\{
status: "success",  
data: \{  
  mentor: \{
"firstName": String,  
 "lastName": String,  
 "email: String,  
 "areaOfSpeciality": String, 
 "_id: String,   
 "profileImg: "",  
 "createdAt: Timestamp,  
 "updatedAt: Timstamp  
  \},  
 token: String,  
\}  
\}  

### POST base_url/api/mentors/me/profile-img
  - Uploads and updates a mentor's profile image

Request body:  
 \{  
 "profileImg": image file with size 1mb or below, // required    
 \}

Response:  
\{
status: "success",  
message: "Image uploaded successfully"  
\}  

### GET base_url/api/mentors/me/profile-img  
  - Returns a mentor's profile picture if any  

Response:  
\{  
  image file  
\}    

### DELETE base_url/api/mentors/me/profile-img  
  - Deletes a mentor's profile picture  

Response:  
\{
status: "success",  
message: "Profile image deleted"  
\}  

### PATCH base_url/api/mentors/me/update  
  - updates mentor's profile details 

Request body:  
 \{  
 "firstName": "John",  
 "lastName": "Doe",  
 "areaOfSpeciality": "web dev",   
 \}

Response:  
\{
status: "success",  
data: \{  
"firstName": String,  
 "lastName": String,  
 "email: String,  
 "areaOfSpeciality": String, 
 "_id: String,   
 "profileImg: "",  
 "createdAt: Timestamp,  
 "updatedAt: Timstamp   
\}  
\}  

### PATCH base_url/api/mentors/me/change-password  
  - changes mentor's current password  

Request body:  
 \{  
 "currentPassword": "John1235",  
 "newPassword": "Doeasd12",    
 \}

Response:  
\{
status: "success",  
message: "Password updated successfully!"  
\}  

### POST base_url/api/mentors/me/logout  
  - Logs out a mentor from the current logged in device  

Response:  
\{  
  status: "success",  
  message: "logout successfully"  
\}  

### POST base_url/api/mentors/me/logout-all   
  - Logs out a mentor from all logged in devices  

Response:  
\{  
  status: "success",  
  message: "logout successfully from all devices"  
\} 




### POST base_url/api/learners/sign-up
  - sign up a learner into the system  

Request body:  
 \{  
 "firstName": "John", // required  
 "lastName": "Doe", // required  
 "email: "johndoe@gmail.com", // required  
 "password": "1235asdf", // required  
 "dateOfBirth": "12/17/1999", // mm/dd/yy  
 \}

Response:  
\{
status: "success",  
data: \{  
  learner: \{
"firstName": String,  
 "lastName": String,  
 "email: String,  
 "dateOfBirth": "1/12/1999", // dd/mm/yy  
 "_id: String,   
 "profileImg: "",  
 "createdAt: Timestamp,  
 "updatedAt: Timstamp  
  \},  
 token: String,  
\}  
\}  

### POST base_url/api/learners/login  
  - Logs a learner into the system

Request body:  
 \{   
 "email: "johndoe@gmail.com", // required  
 "password": "1235asdf", // required   
 \}

Response:  
\{
status: "success",  
data: \{  
  learner: \{
"firstName": String,  
 "lastName": String,  
 "email: String,  
 "dateOfBirth": "1/12/1999", // dd/mm/yy  
 "_id: String,   
 "profileImg: "",  
 "createdAt: Timestamp,  
 "updatedAt: Timstamp  
  \},  
 token: String,  
\}  
\}  

### POST base_url/api/learners/me/profile-img
  - Uploads and updates a learner's profile image

Request body:  
 \{  
 "profileImg": image file with size 1mb or below, // required    
 \}

Response:  
\{
status: "success",  
message: "Image uploaded successfully"  
\}  

### GET base_url/api/learners/me/profile-img  
  - Returns a learner's profile picture if any  

Response:  
\{  
  image file  
\}    

### DELETE base_url/api/learners/me/profile-img  
  - Deletes a learner's profile picture  

Response:  
\{
status: "success",  
message: "Profile image deleted"  
\}  

### PATCH base_url/api/learners/me/update  
  - updates learner's profile details 

Request body:  
 \{  
 "firstName": "John",  
 "lastName": "Doe",  
"dateOfBirth": "1/12/1999", // dd/mm/yy    
 \}

Response:  
\{
status: "success",  
data: \{  
"firstName": String,  
 "lastName": String,  
 "email: String,  
"dateOfBirth": Date,   
 "_id: String,   
 "profileImg: "",  
 "createdAt: Timestamp,  
 "updatedAt: Timstamp   
\}  
\}  

### PATCH base_url/api/learners/me/change-password  
  - changes learner's current password  

Request body:  
 \{  
 "currentPassword": "1235asdf",  
 "newPassword": "Doeasd12",    
 \}

Response:  
\{
status: "success",  
message: "Password updated successfully!"  
\}  

### POST base_url/api/learners/me/logout  
  - Logs out a learner from the current logged in device  

Response:  
\{  
  status: "success",  
  message: "logout successfully"  
\}  

### POST base_url/api/learners/me/logout-all   
  - Logs out a learner from all logged in devices  

Response:  
\{  
  status: "success",  
  message: "logout successfully from all devices"  
\}  



### POST base_url/api/courses  
  - Creates a course. You have to be logged in as a mentor.  

Request body:  
 \{  
 "title": "Node course", // required  
 "description": "This is a node course for beginners", // required  
 \}

Response:  
\{  
    "status": "success",  
    "data": \{  
        "title": String,
        "description": String,  
        "_id": String,  
        "createdAt": Timstamp,  
        "updatedAt": Timstamp,  
    \}  
\}   

### GET base_url/api/courses  
  - Returns all available courses  

Response:  
\{  
    "status": "success",  
    "data": \[  
    \{  
        "title": String,
        "description": String,  
        "_id": String,  
        "createdAt": Timstamp,  
        "updatedAt": Timstamp,  
    \},  
     \{  
        "title": String,
        "description": String,  
        "_id": String,  
        "createdAt": Timstamp,  
        "updatedAt": Timstamp,  
    \},  
    ...
    \]  
\} 

### GET base_url/api/courses/:_id  
  - Returns a course details and all of it lessons  

Response:  
\{    
    "courseDetails": \{  
        "title": String,
        "description": String,  
        "_id": String,  
        "banner"" Buffer,  
        "createdAt": Timstamp,  
        "updatedAt": Timstamp,  
    \},  
    "courseLessons":  
    \[  
     \{  
        "title": String,
        "text": String,  
        "_id": String,  
        "course": String, 
        "video": Buffer 
        "createdAt": Timstamp,  
        "updatedAt": Timstamp,  
    \},  
    {  
        "title": String,
        "text": String,  
        "_id": String,  
        "course": String, 
        "video": Buffer 
        "createdAt": Timstamp,  
        "updatedAt": Timstamp,  
    \},
    ...
    \]  
\} 

### POST base_url/api/courses/:_id/banner 
  - Uploads and updates a couuse's banner. You have to be logged in as a mentor.

Request body:  
 \{  
 "banner": image file with size 1mb or below, // required    
 \}

Response:  
\{
status: "success",  
message: "Banner uploaded successfully"  
\}  

### GET base_url/api/courses/:_id/banner  
  - Returns a course's banner if any  

Response:  
\{  
  image file  
\}    




### POST base_url/api/:course_id/add-lesson  
  - Adds a lesson to a course. You have to be logged in as a mentor.  

Request body:  
 \{  
 "title": "Node course", // required  
 "description": "This is a node course for beginners", // required  
 \}

Response:  
\{  
    "status": "success",  
    "data": \{  
        "title": String,
        "text": String,  
        "_id": String,  
        "course": String, 
        "createdAt": Timstamp,  
        "updatedAt": Timstamp,
    \}  
\} 

### POST base_url/api/:lesson_id/upload-video  
  - Adds a video to a lesson. You have to logged in as a mentor. 

Request body:  
 \{  
 "video": mp4 file with size 100mb or below, // required    
 \}

Response:  
\{
status: "success",  
message: "Banner uploaded successfully"  
\} 

### POST base_url/api/notes
- Creates a new note for a learner. you must eb logged in as a learner.

  Request body:<br/>
  \{<br/>
  "title": "node class",<br/>
  "content": "content for node class"<br/>
  \}
  
  Response:<br/>
  \{<br/>
    "title": "string"<br/>
    "content": "string"<br/>
    "learnerId": "string",<br/>
    "_id": "string",<br/>
    "createdAt": "Timestamp",<br/>
    "updatedAt": "Timestamp",<br/>
  \}
  
  
### GET base_url/api/notes
- Returns all learner notes. Learner must be logged in

Response:<br/>
  \[<br/>
    {<br/>
        "_id": "string",<br/>
        "title": "string",<br/>
        "content": "string",<br/>
        "createdAt": "Timestamp",<br/>
        "updatedAt": "Timestamp",<br/>   
    },<br/>
    {<br/>
        "_id": "string",<br/>
        "title": "String",<br/>
        "content": "String",<br/>
        "learnerId": "String",<br/>
        "createdAt": "Tinmestamp",<br/>
        "updatedAt": "Timestamp",<br/>
    }<br/>
  \]
  
### GET base_url/api/notes/:note_id
- returns a single note specified by id. learner must be logged in

Response:<br/>
  \{<br/>
    "_id": "String",<br/>
    "title": "String",<br/>
    "content": "String",<br/>
    "learnerId": "String",<br/>
    "createdAt": "Timestamp",<br/>
    "updatedAt": "Timestamp",<br/>
\}


### PATCH base_url/api/note/:note_id
- updates a learners note. 

Request:<br/>
  \{<br/>
    "title": "note1",<br/>
    "content": "this is the learners first node note"<br/>
  \}
  
Response:<br/>
  \{<br/>
     "_id": "String",<br/>
    "title": "String",<br/>
    "content": "String",<br/>
    "learnerId": "String",<br/>
    "createdAt": "Timestamp",<br/>
    "updatedAt": "Timestamp",<br/>
  \}

### DELETE base_url/api/note/:note_id
- deletes learner's note. Learner must be logged in

Response:<br/>
  \{<br/>
    "message": "note deleted succesfully<br/>
  \}
