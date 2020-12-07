My Recipe Portal Backend
==================================

> This repo contains the My Recipe backend codes

## Related modules

* express - web application framework for node
* pug - template engine
* stylus - pre-processor CSS
* sequelize - nodejs orm for mysql
* bower - a package manager for the web
* gulp - automate workflow

## Prerequisites

* Node.js `http://nodejs.org`
* Mysql `Install Xampp/Mampp/Wampp`

## Project Structure
```sh
.
├── app/
│   └── controllers           # contains controller files
│   └── models                # contains model files
│   └── helper                # contains helper files for uploading images and logging
│   └── routes.js             # routes config file
├── config/
│   ├── config.json           # environment config JSON file that include environment for db migrations
│   ├── configJs.js           # environment config Js file that include environment for db connections
│   └── db.js                 # db config
├── migrations/               # contains DB migrations files to create tables in DB
├── seeders/                  # contains DB seeding files to dubmb super user and some dummy data in DB
├── public/                   # contains static assets
│   ├── components            # bower components folder
│   ├── favicon               # favicon folder
│   ├── fonts                 # contains font files
│   ├── css                   # all files will generate from gulp
│   ├── styl                  # contains style sheets (stylus)
│   ├── js                    # contains js files
│   └── img                   # contains image files
├── test/
│   └── spec.js               # unit & func tests
├── .bowerrc                  # bower config
├── .bower.json               # bower dependencies
├── .Procfile                 # process file for heroku implementation
├── .gitignore                # specifies intentionally untracked files to ignore
├── .editorconfig.js          # editor config
├── .gulpfile.js              # gulp config
├── .eslintrc.yml             # eslint config
├── .eslintignore             # eslint ignore specific files and directories config file
├── .travis.yml               # travis ci config
├── app.js                    # app setup file
└── package.json              # build scripts and dependencies

```

## Getting Started

The easiest way to get started is to clone the repository:

```sh
# Get the latest snapshot
$ git clone 
$ cd MyRecipes

# Install dependencies
$ npm install
 
```
# Create Database
```sh
$ create database "recipe"
 
 # Database Table migrations
 $ run following commands
 $ 1) npm install -g sequelize-cli
 $ 2) npx sequelize-cli db:migrate

  # database seed with superuser 
 $ run following commands
 $ 1) npx sequelize-cli db:seed:all
```
## Development

    npm start
    
Your app should now be running on [localhost:8000](http://localhost:8000/).

## Test

    npm test
## Docker Support

* Docker `https://docs.docker.com/engine/installation/`

```
# Build the project
docker-compose build  

# Start the application
docker-compose up
```

## Deploy

Make sure you have the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

Plus make sure to run the Angular Final Build by `ng build --aot --prod --buildOptimizer`
after from this copy the folder from `dist` folder and paste in the `public` folder in the
directory and then follow the procedure below.

```

git add .
git commit -m '<message>'
git push heroku master
heroku open
```

