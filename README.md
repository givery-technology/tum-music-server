# Conceptum server app

## API

**POST** /user
Creates a user.

Request payload:
``` Javascript
{
    "email": "someone@example.com",
    "password": "notmypassword",
    "name": "John Doe"
}
```


**POST** /login
Authenticates with an email and password.

Request payload:
``` Javascript
{
    "email": "someone@example.com",
    "password": "notmypassword",
}
```

Response:
``` Javascript
{
    "message": "status message",
    "user": "the user we logged into, or false if the operation failed"
}
```
