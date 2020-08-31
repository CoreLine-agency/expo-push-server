## Skeleton for Node.js applications written in TypeScript

### Generate backend before running
```bash
npm run generate
```

Backend is mostly generated from specification file `src/backend/data/model.er`.

ER (entities' relations) file is a way to define project's relations and fields for relations.
You can open (and edit) the file for further info.

The project currently implements a backend for simple blogging engine containing users, blog posts and files.
It allows user to register, and manage their profile info, profile image and post blog posts.
Email login, facebook login and google login are also implemented.

`config.ts` contains the info about all env variables required for setting up project for social login and database
other than inline sqlite file

For every relation, the following files are generated in the `data` directory:
    - `model` which contains all fields, relations and update method
    
    - `auth` which defines permissions for every one of CRUD operations per entity
    
    - `enum` which contains all enums mentioned in the ER file
    
    - `field-resolver` for custom graphql resolvers
    
    - `resolver` for automatically generated CRUD operations
    
    - `inputs/CreateInput` for input used in CREATE operations
    
    - `inputs/NestedInput` for input used in nested UPDATE operations (used to update relations)
    
    - `inputs/EditInput` for input used in regular UPDATE operations

Some of these files can be edited by adding code within <keep-*> tags.

### Development
```bash
npm start
```

### Running tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Proxy to internet
```bash
npm run proxy
```

### Production run
```bash
node src/backend
```

### Trying out the backend
Open your browser and visit graphql console at http://localhost:5001/playground.
After setting "request.credentials" to "include" in console settings, you can try out the backend there.
