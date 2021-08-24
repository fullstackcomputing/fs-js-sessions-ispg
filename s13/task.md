# Tasks
- code middlewares: isRole, isRoleAny, isRoleAll
- code middleware: catchErrors
- design a generic CRUD api/services interface

## code middlewares: isRole, isRoleAny, isRoleAll
```js

/* 
  file: src/middleware.js 
*/

export function hasRole(role) {
  return async (req, res, next) => {
    // [your code]
  }
}

export function hasRoleAny(...role) {
  return async (req, res, next) => {
    // [your code]
  }
}

export function hasRoleAll(...role) {
  return async (req, res, next) => {
    // [your code]
  }
}

/* 
  file: src/index.js 
*/

  adminRouter.all('*', middleware.hasRole('admin'));
  apiRouter.all('*', middleware.hasRoleAny('user', 'admin'));

  const hasUserAdminRole = middleware.hasRoleAll('user', 'admin');
  app.get('/test-admin-user-role', hasUserAdminRole, api.getUsers);

```


## code middleware: catchErrors
```js

/* 
  file: src/index.js 
*/

// crud
adminRouter.get('/users', middleware.catchErrors(api.getUser));

/* 
  file: src/api/getUser.js 
*/

// good: cleaned up api (no try/catch) 
async function getUser(req, res, next) {
  const user = await service.getUser(req.params.id);
  if (!user) return res.status(400).send('User Not found');
  return res.json(user);
}

// better: cleaned up api (no try/catch) and offloading the error handling to service layer
async function getUser(req, res, next) {
  const user = await service.getUser(req.params.id);
  // handle the not found user error from service layer
  // if (!user) return res.status(400).send('User Not found');
  return res.json(user);
}


/* 
  file: src/service/getUser.js 
*/

async function getUser(userId) {
  try {
    const UserModel = mongoose.model('User');
    const user = await UserModel.findById(userId).exec();
    if(!user) {
      const error = new Error('User Not Found');
      error.statusCode = 404;
      throw err;
    }
    return user;
  } catch(err) {
      throw err;
  }
}

/* 
  file: src/middleware.js 
*/

export function catchErrors(route) {
  return async (req, res, next) => {
    // [your code]
  }
}

// In the end all route definitions will look like:

/* 
  file: src/index.js 
*/

import middleware, { catchErrors } from './middleware';
import api from './api';

// crud
adminRouter.get('/users', catchErrors(api.getUsers));
adminRouter.post('/users', catchErrors(api.createUser));
adminRouter.get('/users/:id', catchErrors(api.getUser));
adminRouter.put('/users/:id', catchErrors(api.updateUser));
adminRouter.delete('/users/:id', catchErrors(api.deleteUser));

```

## design a generic CRUD api/service interface
```js
// 
// current interface
// 
import middleware, { catchErrors } from './middleware';
import api from './api';

// crud
adminRouter.get('/users', catchErrors(api.getUsers));
adminRouter.post('/users', catchErrors(api.createUser));
adminRouter.get('/users/:id', catchErrors(api.getUser));
adminRouter.put('/users/:id', catchErrors(api.updateUser));
adminRouter.delete('/users/:id', catchErrors(api.deleteUser));

//
// expected interface
//
import crud from './crud';
import middleware, { catchErrors } from './middleware';
import mongoose from 'mongoose';

const UserModel = mongoose.model('User');

adminRouter.get('/users', catchErrors(crud.api.list(UserModel)));
adminRouter.post('/users', catchErrors(crud.api.create(UserModel)));
adminRouter.get('/users/:id', catchErrors(crud.api.get(UserModel)));
adminRouter.put('/users/:id', catchErrors(crud.api.update(UserModel)));
adminRouter.delete('/users/:id', catchErrors(crud.api.delete(UserModel)));

```
