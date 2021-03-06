# Labs26-Apollo-Team-A Backend

> https://apollo-a-api.herokuapp.com/

> https://dbdesigner.page.link/HF9NWJ5kRDt3bjKp7

**BREAKING NEWS: This gets updated regularly...😀😂** 

* List of API detail. Note: Some of the routes are in progress!!!!

| Method | Endpoint                                  | Description                   | Auth Required |
| ------ | ----------------------------------------- | ----------------------------- | :-----------: |
| GET    | /                                         | Base endpoint                 |      [ ]      |
| GET    | /profile/                                 | Get all users                 |      [x]      |
| GET    | /profile/:id                              | Get user by id                |      [x]      |
| GET    | /context                                  | Get all context               |      [x]      |
| GET    | /context/:id                              | Get context by id             |      [x]      |
| GET    | /question                                 | Get all questions             |      [x]      |
| GET    | /question/:id                             | Get question by id            |      [x]      |
| GET    | /topic                                    | Get all topics                |      [x]      |
| GET    | /topic/:id                                | Get topic by id               |      [x]      |
| GET    | /response                                 | Get all responses             |      [x]      |
| GET    | /response/:id                             | Get response by id            |      [x]      |
| GET    | /thread                                   | Get all thread                |      [x]      |
| GET    | /thread/:id                               | Get thread by id              |      [x]      |
| GET    | /notification                             | Get all notification          |      [x]      |
| GET    | /notification/:id                         | Get notification by id        |      [x]      |
| GET    | /topicquestion                            | Get all topicid & questionid  |      [x]      |
| GET    | /topicquestion/:id                        | Get topicid & questionid by id|      [x]      |
| GET    | /profiles/:id/details                     | Get details of users by id    |      [x]      |
| GET    | /topic/:id/details                        | Get details of topic by id    |      [x]      |
| GET    | /response/:id/details                     | Get details of response by id |      [x]      |
| POST   | /profile                                  | Creates new user              |      [x]      |
| POST   | /topic                                    | Creates new topic             |      [x]      |
| POST   | /response                                 | Creates new response          |      [x]      |
| POST   | /thread                                   | Creates new thread            |      [x]      |
| POST   | /notification                             | Creates new notification      |      [x]      |
| POST   | /topicquestion                            | Creates questionid- topicid   |      [x]      |
| PUT    | /profile                                  | Updates user profile          |      [x]      |
| PUT    | /topic                                    | Updates topic                 |      [x]      |
| PUT    | /response                                 | Updates response              |      [x]      |
| PUT    | /thread                                   | Updates thread                |      [x]      |
| PUT    | /notification                             | Updates notification          |      [x]      |
| DEL    | /profile/:id                              | Deletes user                  |      [x]      |
| DEL    | /topic/:id                                | Deletes topic user            |      [x]      |
| DEL    | /response/:id                             | Deletes response              |      [x]      |
| DEL    | /thread/:id                               | Deletes thread                |      [x]      |
| DEL    | /notification/id                          | Deletes notification          |      [x]      |
| DEL    | /topicquestion                            | Deletes questionid-topicid    |      [x]      |



> Login needs OKTA Authorization
> Mock User response
```
{
    "id": "00ulthapbErVUwVJy4x6",
    "firstname": "FirstName001",
    "lastname": "LastName001",
    "email": "llama001@maildrop.cc\"",
    "avatarUrl": "https://s3.amazonaws.com/uifaces/faces/twitter/manigm/128.jpg",
    "created_at": "2020-09-15T16:32:50.202Z",
    "updated_at": "2020-09-15T16:32:50.202Z"
}
```
> Mock Topic response
```
{
    "id": 1,
    "leaderid": "00ulthapbErVUwVJy4x6",
    "topicname": "Testing First Topic",
    "topicfrequency": "Daily",
    "contextid": 1,
    "joincode": "12SZXY",
    "created_at": "2020-09-15T16:32:50.240Z",
    "updated_at": "2020-09-15T16:32:50.240Z"
}
```
>Mock Response response
```
{
    "id": 1,
    "questionid": 1,
    "response": "This is my response.",
    "respondedby": "00ulthapbErVUwVJy4x6",
    "topicid": 1,
    "created_at": "2020-09-15T16:32:50.250Z",
    "updated_at": "2020-09-15T16:32:50.250Z"
}
```
>Mock Thread response
```
{
    "id": 1,
    "responseid": 1,
    "reply": "This reply is for your responsein my topic",
    "repliedby": "00ulthapbErVUwVJy4x6",
    "created_at": "2020-09-15T16:32:50.258Z",
    "updated_at": "2020-09-15T16:32:50.258Z"
}
```
>Mock topicquestion response
```
[
    {
        "id": 1,
        "topicid": 1,
        "questionid": 1
    }
]
```

# Basic Node API

Welcome to your `Basic Node API Repository`. Use this to start your own Greenfield Project using nodejs, express and common industry standards.

This repository assumes a handful of industry practices and standards. We strive to keep you on the bleeding edge of the industry and as a result, we have made some opinions for you so that you don't have to; you're welcome.

Read more at <https://docs.labs.lambdaschool.com/labs-api-strarter/>

## Requirements

Labs teams must follow all [Labs Engineering Standards](https://labs.lambdaschool.com/topics/node-js/).


## Getting Started

### Enviornment Variables

- `PORT` - API port (optional, but helpful with FE running as well)
  - The following ports are whitelisted for use with okta
    - 3000
    - 8000
    - 8080
- `DS_API_URL` - URL to a data science api. (eg. <https://ds-bw-test.herokuapp.com/>)
- `DS_API_TOKEN` - authorization header token for data science api (eg. SUPERSECRET)
- `DATABASE_URL` - connection string for postgres database
- `OKTA_URL_ISSUER` - The complete issuer URL for verifying okta access tokens. `https://example.okta.com/oauth2/default`
- `OKTA_CLIENT_ID` - the okta client ID.

See .env.sample for example values

### Setup postgres

There are 3 options to get postgresql installed locally [Choose one]:

1. Use docker. [Install](https://docs.docker.com/get-docker/) for your platform
    - run: `docker-compose up -d` to start up the postgresql database and pgadmin.
    - Open a browser to [pgadmin](http://localhost:5050/) and you should see the Dev server already defined.
    - If you need to start over you will need to delete the folder `$ rm -rf ./data/pg` as this is where all of the server data is stored.
      - if the database `api-dev` was not created then start over.
2. Download and install postgresql directly from the [main site](https://www.postgresql.org/download/)
    - make note of the port, username and password you use to setup the database.
    - Connect your client to the server manually using the values previously mentioned
    - You will need to create a database manually using a client.
    - Make sure to update the DATABASE_URL connection string with the values for username/password, databasename and server port (if not 5432).
3. Setup a free account at [ElephantSQL](https://www.elephantsql.com/plans.html)
    - Sign up for a free `Tiney Turtle` plan
    - copy the URL to the DATABASE_URL .env variable
    - make sure to add `?ssl=true` to the end of this url

### Setup the application

- create your project repo by forking or using this as a template.
- run: `npm install` to download all dependencies.
- run: `cp .env.sample .env` and update the enviornment variables to match your local setup.
- run: `npm run knex migrate:latest` to create the starting schema.
- run: `npm run knex seed:run` to populate your db with some data.
- run: `npm run tests` to confirm all is setup and tests pass.
- run: `npm run watch:dev` to start nodemon in local dev enviornment.

> Make sure to update the details of the app name, description and version in
> the `package.json` and `config/jsdoc.js` files.

## Contributing

See the [contributing doc](https://github.com/Lambda-School-Labs/labs-api-starter/blob/main/CONTRIBUTING.md)
for more info.
