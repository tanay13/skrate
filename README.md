## Skrate Task

### Technologies Used

- Typescript
- mongoDB
- mongoose
- EJS
- heroku
- Shelljs - To copy views folder to dist after the build

### How to run

#### Installing all the dependencies

```js
npm install
```

#### Running the server

```js
npm tsc

npm run start

```

### API endpoints

#### For Registering new user

```
api/users/new
```

Request Body

```
{
    username: String
}
```

#### For listing all users

```
api/users/all
```

#### For creating a new meeting

```
api/meeting/new
```

Request Body

```
{
    user: [Users],
    date: Date
}
```

#### For listing all meetings

```
api/meeting/all
```
