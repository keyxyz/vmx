# Backend API

## Preresquities

- Node.js
- MySQL
- npm

## Setup

- Clone/Download this repository and navigate to it's root.
- Install dependencies: `npm install`
- Create `.env` file
  ```env
    # node.js config
    NODE_ENV=

    # Front End URL
    CLIENT_URL=

    # Database config
    DB_HOSTNAME=
    DB_PORT=
    DB_USERNAME=
    DB_PASSWORD=
    DB_DATABASE=

    # Cookies
    # cookie name
    COOKIE_NAME=
    # comma separated keys
    COOKIE_KEYS=

    # JWT secret key
    SECRET_KEY=
  ```
- Log into MySQL and create the database with all tables
  ```sh
  # login
  mysql -u username -p
  # create the database
  mysql> source ./database/db.sql;
  # populate some demo data
  mysql> source ./database/data.sql;
  ```
- Run dev server: `npm run dev`
- In production: `npm start`

## API Usage

- `@` - Public (accessible by everyone)
- `$` - Protected (an account is required)
- `%` - Private (admin only)

### Courses

- @ GET `/api/course/categories` - get list of categories with available courses
- @ GET `/api/course/:id` - get course details by `id` with all available sections
- @ GET `/api/lessons/:id` - get all available lessons using section `id`

### Auth

- @ POST `/api/auth/register` - create user account
  
  - User must login after registration

- @ POST `/api/auth/login` - signin user
  
  - An auth token is available in the headers (Authorization) or Cookies (`authToken`), cache it for use in subsquent requests.

- $ GET `/api/auth/logout` - sign out user

### User

- $ GET  `/api/user` - user profile
- $ DELETE `/api/user` - let user delete their own account
  
  - Automatically logout user after deletion of account

- $ PUT `/api/user` - let user update their details

### Admins

#### Users
- % GET `/api/admin/profile/:id` - view user account details by `id`
- % POST `/api/admin/profile/delete/:id` - delete a user account by `id`
- % POST `/api/admin/profile/update/:id` - update user details by `id`
- % GET `/api/admin/profile/list` - view a list of users

#### Categories
- % POST `/api/admin/category/create` _(title, description, image, published)_ - create a new category
- % PUT `/api/admin/category/:id` _(title, description, image, published)_ - update a category by `id`
- % DELETE `/api/admin/category/:id` - delete a category by `id`

#### Courses
- % POST `/api/admin/course/create` _(category, title, description, image, published, level, pricing)_ - create a new course
- % PUT `/api/admin/course/:id` _(category, title, description, image, published, level, pricing)_ - update course details by `id`
- % DELETE `/api/admin/course/:id` - delete a course by `id`

#### Sections
- % POST `/api/admin/section/create` _(course, title, order)_ - create a new section
- % GET `/api/admin/section/:id` _(course, title, order)_ - update section details by `id`
- % DELETE`/api/admin/section/:id` - delete a section by `id`

#### Lessons
- % POST `/api/admin/lesson/create` _(section, preview, title, url, order)_ - create a new lesson
- % GET `/api/admin/lesson/:id` _(section, preview, title, url, order)_ - update lesson details by `id`
- % DELETE `/api/admin/lesson/:id` - delete a lesson by `id`
