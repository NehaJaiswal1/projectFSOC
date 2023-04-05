# FSOC

## Project - Job Portal

### Key points
- In this project we will work feature wise. That means we pick one object like user, book, blog, etc at a time. We work through it's feature. The steps would be:
  1) We create it's model.
  2) We build it's APIs.
  3) We test these APIs.
  4) We deploy these APIs.
  5) We integrate these APIs with frontend.
  6) We will repeat steps from Step 1 to Step 5 for each feature in this project.
- This project is divided into 4 features namely User, Product, Cart and Order. You need to work on a single feature at a time. Once that is completed as per above mentioned steps. You will be instructed to move to next Feature.
- In this project we are changing how we send token with a request. Instead of using a custom header key like x-api-key, you need to use Authorization header and send the JWT token as Bearer token.
- Create a group database `groupXDatabase`. You can clean the db you previously used and resue that.
- This time each group should have a *single git branch*. Coordinate amongst yourselves by ensuring every next person pulls the code last pushed by a team mate. You branch will be checked as part of the demo. Branch name should follow the naming convention `project/productsManagementGroupX`
- Follow the naming conventions exactly as instructed.


## FEATURE I - Admin
### Models
- Admin Model
```yaml
{ 
  name: {type: String, required: true}
  role: {enum:["Admin", "Job-seeker", "employeer"], required: true}
  email: {type: String, required: true}
  password: {type: , reuired:  true}
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```


## User APIs 
### POST /register
- Create a user document from request body. Request body must contain image.
- Upload image to S3 bucket and save it's public url in user document.
- Save password in encrypted format. (use bcrypt)
- __Response format__
  - _**On success**_ - Return HTTP status 201. Also return the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "Admin created successfully",
    "data": {
        "name": "John",
        "email": "johndoe@mailinator.com",
        "password": "$2b$10$DpOSGb0B7cT0f6L95RnpWO2P/AtEoE6OF9diIiAEP7QrTMaV29Kmm",
        "_id": "6162876abdcb70afeeaf9cf5",
        "createdAt": "2021-10-10T06:25:46.051Z",
        "updatedAt": "2021-10-10T06:25:46.051Z",
        "__v": 0
    }
}
```

### POST /login
- Allow an user to login with their email and password.
- On a successful login attempt return the userId and a JWT token contatining the userId, exp, iat.
> **_NOTE:_** There is a slight change in response body. You should also return userId in addition to the JWT token.
- __Response format__
  - _**On success**_ - Return HTTP status 200 and JWT token in response body. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "Admin login successfully",
    "data": {
        "userId": "6165f29cfe83625cf2c10a5c",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTYyODc2YWJkY2I3MGFmZWVhZjljZjUiLCJpYXQiOjE2MzM4NDczNzYsImV4cCI6MTYzMzg4MzM3Nn0.PgcBPLLg4J01Hyin-zR6BCk7JHBY-RpuWMG_oIK7aV8"
    }
}
```

## GET /admin/:adminId/profile (Authentication required)
- Allow an user to fetch details of their profile.
- Make sure that userId in url param and in token is same
- __Response format__
  - _**On success**_ - Return HTTP status 200 and returns the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "Admin profile details",
    "data": {
        "_id": "6162876abdcb70afeeaf9cf5",
        "name": "John",
        "email": "johndoe@mailinator.com",
        "password": "$2b$10$DpOSGb0B7cT0f6L95RnpWO2P/AtEoE6OF9diIiAEP7QrTMaV29Kmm",
        "createdAt": "2021-10-10T06:25:46.051Z",
        "updatedAt": "2021-10-10T06:25:46.051Z",
        "__v": 0
    }
}
```


## FEATTURE II - User Model
### Models
- user Model
```yaml
{
    username: { type: String, required: true },
    password: { type: String, required: true },

    firstName: { type: String , default:''},
    lastName: { type: String , default:''},
    email: { type: String , default:''},
    mobileNumber: { type: String , default:''},
    portfolio: { type: String , default:''},

    about: { type: String , default:''},
    address: { type: String , default:''},

    education: { type: [] , default: [''] },
    skills: { type: [] ,default: ['']  },
    projects: { type: [] , default: [''] },
    experience: { type: [] , default: [''] },

    appliedJobs: [],
    status: {string, default: 'pending', enum[pending, completed, cancled]},
  },
  { timestamps: true }


```


## user API  (_authentication required as authorization header - bearer token_)

## User APIs 
### POST /register
- Create a user document from request body. Request body must contain image.
- Upload image to S3 bucket and save it's public url in user document.
- Save password in encrypted format. (use bcrypt)
- __Response format__
  - _**On success**_ - Return HTTP status 201. Also return the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "user created successfully",
    "data": {
        "name": "John",
        "email": "johndoe@mailinator.com",
        "password": "$2b$10$DpOSGb0B7cT0f6L95RnpWO2P/AtEoE6OF9diIiAEP7QrTMaV29Kmm",
        "_id": "6162876abdcb70afeeaf9cf5",
        "createdAt": "2021-10-10T06:25:46.051Z",
        "updatedAt": "2021-10-10T06:25:46.051Z",
        "__v": 0
    }
}
```

### POST /login
- Allow an user to login with their email and password.
- On a successful login attempt return the userId and a JWT token contatining the userId, exp, iat.
> **_NOTE:_** There is a slight change in response body. You should also return userId in addition to the JWT token.
- __Response format__
  - _**On success**_ - Return HTTP status 200 and JWT token in response body. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "Admin login successfully",
    "data": {
        "userId": "6165f29cfe83625cf2c10a5c",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTYyODc2YWJkY2I3MGFmZWVhZjljZjUiLCJpYXQiOjE2MzM4NDczNzYsImV4cCI6MTYzMzg4MzM3Nn0.PgcBPLLg4J01Hyin-zR6BCk7JHBY-RpuWMG_oIK7aV8"
    }
}
```

## GET /user/:userId/profile (Authentication required)

- Allow an user to fetch details of their profile.
- Make sure that userId in url param and in token is same
- __Response format__
  - _**On success**_ - Return HTTP status 200 and returns the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "Admin profile details",
    "data": {
        "_id": "6162876abdcb70afeeaf9cf5",
        "name": "John",
        "email": "johndoe@mailinator.com",
        "password": "$2b$10$DpOSGb0B7cT0f6L95RnpWO2P/AtEoE6OF9diIiAEP7QrTMaV29Kmm",
        "createdAt": "2021-10-10T06:25:46.051Z",
        "updatedAt": "2021-10-10T06:25:46.051Z",
        "__v": 0
    }
}
```

### PUT /user/:userId
- Updates a user data by changing at least one or all fields
- Check if the productId exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response body like [this](#error-response-structure)
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the updated user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

### DELETE /user/:userId
- Deletes a user by user id if it's not already deleted
- __Response format__
  - _**On success**_ - Return HTTP status 200. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)



## FEATURE III - JOB
### Models
- job Model
```yaml
{

    title: {type : String, required: true}, //(up to 300 characters)
    department: {type : String, required: true},
    salaryFrom : {type : Number, required: true},
    salaryTo : {type : Number, required: true},
    experience : {type : String, required: true},
    jobDescription : {type : String, required: true}, //(up to 3000 characters)
    minimumQualification : {type : String, required: true},
    skillsRequired : {type : String, required: true},
    company :{type : String, required: true}, //(up to 100 characters)
    location :{type : String, required: true}, // (any Indian city or remote)
    email : {type : String, required: true},
    phoneNumber : {type : String, required: true},
    appliedCandidates : {type : [] , required: true},
    postedBy : {type : String, required: true},
    tags: {type : [] , required: true}
}
```


## Job APIs 
### POST /job/:jobId/
- Create a job 
- __Response format__
  - _**On success**_ - Return HTTP status 201. Also return the cart document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
"appliedCandidates": [],
"_id": "6127487386f681465cdaf9f3",
"title": "Java Developer",
"department": "IT",
"salaryFrom": 20000,
"salaryTo": 35000,
"experience": "3",
"skillsRequired": "strong js knowledge",
"minimumQualification": "batchelor degree",
"smallDescription": "We are looking for a passionate hands-on engineers to join the Bangalore Swiggy Engineering team.",
"fullDescription": "React.js, a comprehensive JavaScript library for building user interfaces, has changed the way we think about front-end development. React.js has grasped the interest of the open source community and it is here to stay. However, the nuances and idiosyncrasies of React.js require extra caution when distinguishing between good JavaScript developers and true experienced React.js developers.",
"company": "SR Tech",
"email": "edvensoft@gmail.com",
"phoneNumber": "9989632587",
"postedBy": "6122434efdc7c27220f485d8",
"companyDescription": "EdvenSoft Solutions is an industry leader with a solid track record of software solution delivery success as evidenced by our many success stories",
"createdAt": "2021-08-26T07:53:23.437Z",
"updatedAt": "2021-08-28T17:22:27.540Z",
}

```


### GET /job/:jobId/job
- Returns Applied candidates 
- __Response format__
  - _**On success**_ - Return HTTP status 200. Return the cart document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

### DELETE /job/:jobId/job
- Deletes the job 
- __Response format__
  - _**On success**_ - Return HTTP status 204. Return a suitable message. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)



## Testing 
- To test these apis create a new collection in Postman named Project FunctionUp Summer Of code
- Each api should have a new request in this collection
- Each request in the collection should be rightly named. Eg Create user, Create job, Get details etc

Refer below sample
 ![A Postman collection and request sample](assets/Postman-collection-sample.png)

## Response

### Successful Response structure
```yaml
{
  status: true,
  message: 'Success',
  data: {

  }
}
```
### Error Response structure
```yaml
{
  status: false,
  message: ""
}
```
