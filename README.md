# kintohub.com

The default repo for Kintohub.com! This is gonna be one hell of a project.
😎

- [Contribution guidelines for this project](./CONTRIBUTION.md)

## First time setup

- _(optional)(e2e)_ install [`java run time`](https://www.java.com/en/download/mac_download.jsp) for the e2e tests
- install [`nvm`](https://github.com/creationix/nvm)
- _(optional)(e2e)_ install `allure` to be able to view allure e2e test reports using `brew install allure`
- `nvm use`
- create `.env` file (it is ignored) and setup all the env vars in it, you can check`~/.env.sample` for reference
  - you need to fill out the app id and env name in order to connect with the backend
  - you need to create a github OAuth App and add the client id to `.env`

## Commands

The following command shortcuts are available during development:

- `npm install`: Installs all NPM dependencies.
- `npm start`: Starts a local web server at `http://localhost:3000`.
- `npm test`: Runs unit tests.
- `npm run test:e2e` Compile the app and runs all the e2e tests
- `npm run test:e2e:cache` Run all the e2e tests without compiling the app
- `npm run lint`: Runs linting
- `npm run allure`: open the e2e test allure report _(needs allure to be installed)_

## FAQ

### Getting `Module not found: Can't resolve ....`

Make sure the `.env` is setup correctly, you need to add

```
NODE_PATH=src/
```

### Append key to localstorage (Reset)

the token are saved in localstorage in the format like:

```
kintohub:auth
kintohub:auth:isLoggedin
```

if you want to append a key on that set the following

```
REACT_APP_LOCAL_STORAGE_KEY_APPEND=randomkey
```

the result the local storage will be saved like:

```
kintohub:auth-randomkey
kintohub:auth:isLoggedin-randomkey
```

this is to force reset the storage for the users

If you want to show the signUp page - dev only - add the following keys

```
REACT_APP_SHOW_SIGNUP=true
```

### Setting up google analytics

you only need to assign the following env variable to enable google analytics

```
REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID=UA-xxx-1
```

> this won't affect development, you don't need to add it

### Setting up and running E2E tests

- you need to duplicate `.env.sample` and rename it to `.env`
- good rule of practice whenever you pull run the e2e tests using `npm run test:e2e` this takes extra time because it compiles the client side code
- after that and when writing new e2e tests it is better to run e2e tests using `npm run test:e2e:cache`

> Note: whenever any code inside `/src` changes the app needs to be recompiled (use `npm run test:e2e` to do that)

#### There is currently two suites in the e2e

- `default`: everything in the app mostly except tests related to kintoblock builds
- `builds`: mostly tests related to kintoblocks builds

`default` suite is ran by default, no changes needed

##### Running `builds`

To run `builds` suite, two changes needs to happen:

in `package.json` update the following line in `scripts`

```
"e2e-tests": "wdio wdio.conf.js --suite default"
```

To:

```
"e2e-tests": "wdio wdio.conf.js --suite builds"
```

and the test timeouts need to be changed to 5m because builds take a while, need to change the following in `wdio.conf.js`

```
waitforTimeout: 5 * 60 * 1000, // line 95
connectionRetryTimeout: 5 * 60 * 1000, // line 99
timeout: 5 * 60 * 1000 // line 153
```

### Connect GitHub

you need to make sure the `Authorise callback URL` for the GitHub app is

```
http://clienturl.com/githubConnect
```

### Disable limitation (testing only)

To disable limitation add in the `.env`

```
REACT_APP_DISABLE_LIMITATION=true
```

### for metrics integration

add the following key to `.env` with the value of the corresponding grafana integration - for staging it is

```
REACT_APP_GRAFANA_URL=https://grafana.staging.kintohub.com/
```

### How to hide a page/component from production

in `pageHelper` there is a function `isProduction()` defined, you will need to wrap the component with an if to hide it

Ex:

```
import {isProduction} from './helpers/pageHelper'

{!isProduction() ? <SecretComponent /> : null }
```

##### Note:

there is two env variables that affect this option

- `REACT_APP_SHOW_DEV_UI` you set to true if `NODE_ENV` is `PRODUCTION` (when doing `npm build`) to still show dev UI
- `REACT_APP_SHOW_PRODUCTION` you set to true if `NODE_ENV` is not `PRODUCTION` but you still want to show production UI
