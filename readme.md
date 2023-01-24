<h1 align="center">Simple Todo App 📝</h1>
<h4 align="center">A simple Todo App where user can signup, login and create todo list. User can also add multiple items on created list.</h4>

## About

<p>A Simple understanding how Express works with Sequelize (ORM), with simple login authentication with Json web token.</p>

## Key Features ✨

- Express
- JWT
- Sequelize
- Sequelize CLI
- PostgreSQL
- Joi
- Nodemon

## Getting Started 🚀

### Prerequisites 🛂

- [Node](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [PgAdmin](https://www.pgadmin.org/) (if you are not fimiliar with psql shell)
- IDE prefebly [VS Code](https://code.visualstudio.com/download)
- [Git](https://git-scm.com/downloads) obviously!

### Installation ⚙

```bash
# Clone github repo on desired directory
$ git clone https://github.com/[your-github-user]/[your-repository-name]

# Navigate to directory
$ cd reponame

# Install node packages
$ npm install
```

🎉 At point we have successfully clone the project as well as installed require packages.

```bash
# Now open the project folder on VS Code
$ code .
```

After that, browse to

```
server/config/config.json
```

Where you can see an object which has 3 keys
`development`, `test` & `production`<br>
As we are on local system we will be using `development`<br>
Update your configration according to PostgreSQL

```
"development": {
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
    "database": "todos_dev",
    "host": "localhost",
    "dialect": "postgres",
    "port": YOUR_DATABASE_PORT
  },
```
> Tip: You can check your PostgreSQL configration via psql shell

At this point we have connected our project to PostgreSQL 🔐

You can also add your host & port for Node Server in ```.env```, if needed.

```
HOST = localhost
PORT = 3000
```

> Tip: You can use terminal on VS Code as well (ctrl + shift + `)

Create database ```todos_dev```
```bash
# Navigate to server
cd server

# Migrating Models to PostgreSQL
sequelize db:migrate
```
This command will take all the models to PostgreSQL via migrations ⬆️


