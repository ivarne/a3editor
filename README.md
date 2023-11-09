# a3editor

see published version on https://ivarne.github.io/a3editor/


[![Deploy static content to Pages](https://github.com/ivarne/a3editor/actions/workflows/static.yml/badge.svg)](https://github.com/ivarne/a3editor/actions/workflows/static.yml)

## Desgin goals
Clear separation of concerns
* Backend C# (not in this demo)
  * Host html and scripts
  * Authentication and authorization
  * Endpoint to download transformed repo for specific commit
  * Endpoint to upload transformed repo and create a new commit.
    
* Frontend parts (Typescript/React)
  * Download transformed repo and initialize redux state
  * View components to display current repo
  * Edit components to create edit actions
  * Reducers to transform the redux state based on these actions
  * Code to upload the changes and make a commit using the backend.

### Future possibilites
* As all state modifications are done through a serializable action, one might easily stream these changes to live update an existing app.


