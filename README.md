# React Js Base
=======================

##### Packages used :
* redux
* react-redux
* react-router-dom
* redux-logger
* react-loadable
* jquery
* react-localization

##### Assume my platform are :
* Linux

##### Assume my configurations are :
* NODE 8.1.2
* NPM 5.4.1

```````````````````

## Table of Contents

- [Install Steps](#install-steps)
- [Folder Structure](#folder-structure)


## Install Steps

###### Steps for Setting up `reactjs-base` project
Install ``Node`` and  ``NPM``
```
Navigate to Project root folder and install
```
$ npm install
```
Starting development server
```
$ npm start
```
Building the code from development
```
$ npm run build
```
Note: If you dont have permisson running npm commands use sudo user

```

###### `.env` file 

```

REACT_APP_HOMEPAGE = / 
REACT_APP_BASE_API = web

```
```
Note: Ignore `code/node_modules`, `code/build` and `.env` files and folders before pushing to server.
```

## Folder Structure

After creation, your project should look like this:

```

my-app/
    README.md
    node_modules/
    package.json
    package-lock.json
    config/
    scripts/
    public/
        index.html
        favicon.ico
    src/
    actions/
    assets/
        css/
        fonts/
        images/
    components/
        layouts/
            Application.jsx
            Header.jsx
            Loader.jsx
            NotFountComponent.jsx
    containers/
        Dashboard/
            index.jsx
        Home/
            index.jsx
    locale/
        combineLocale.jsx
        index.jsx
        common.jsx
        home.jsx
    middleware/
        asyc.js
    reducers/
        home/
        index.jsx
    route/
        index.js
    utility/
        locale/
        Form.js
        Utility.js
        Validator.js
        authorization.js
        requestFacatory.js
    App.js
    index.js
    registerServiceWorker.js

```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

This folder structure is a ejected react setup
    config/, scripts/ holds the code of webpack setup can be modified if necessary

package-lock.json - should commit every time the new file updates .