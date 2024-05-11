# Book Library Rest API

Restful API for Book library

## Installation

1. Clone the repository
```sh
git clone https://github.com/ervanchodry112/book-library-test-case.git
cd backend
cp .env.example .env

"setup your database inside .env file"

npm install

```

## Run the project
```sh
npm run dev
```

Now you can open the API documentation in your local using
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)


## Using documentation
To use all endpoint you need to get the **api key**
To get the api key you can use the login endpoint

There is a default account with
username: `admin`
password: `1234`

You can click the `Try it out` button at **Authorization > Login** endpoint, and change the username and password. If the authorization success, you will get the token from the API response like this 
```
{
  "status": "success",
  "message": "Authentication succes!",
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "password": "$2b$10$y5/OQUfb/rjQhvI5wci74uRJKOT.M00ajOoZkTKRmnbga/YYmIg92",
      "name": "Administrator",
      "code": "admin",
      "penalty": false,
      "penalty_end": null,
      "role": "admin",
      "code_number": 0,
      "createdAt": "2024-05-11T05:22:21.966Z",
      "updatedAt": "2024-05-11T05:22:21.966Z",
      "deletedAt": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJpYXQiOjE3MTU0MDYwMTgsImV4cCI6MTcxNTQxNjgxOH0.xbmyHJPOfdPUPc3IanralzI3QRNf46JL1UnRa-BSXok"
  }
}
```
Copy your token, then click the `Authorize` button at the top-right of the page.
Paste your token in the value field 
Then hit the authorize button, and you can use all of the endpoint.