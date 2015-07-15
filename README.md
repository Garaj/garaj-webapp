# garaj-webapp
This project includes an Angular app and an API. It is a clone of [Daftmonk/generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack). Simply clone it run `npm install && bower install` and then `grunt serve`.

You should also either run `mongod` in your machine or set environment variable `MONGOLAB_DEV_URI` to a valid mongodb standard URI.

Example: `mongodb://<dbuser>:<dbpassword>@ds012345.mongolab.com:12345/garaj`

If you set your `NODE_ENV` variable to `production` you should set `MONGOLAB_URI` to a valid mongodb standard URI.

You can set these variables by duplicating `server/config/environment/local.env.sample.js` and renaming it to `local.env.js`. This file is ignored by git, so do not worry, you will not be sending your credentials.

More can be found here about yeoman generators and deploying to heroku: [Daftmonk/generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack)
