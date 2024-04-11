## OSME application

### **Description:**

OSME application for sale gift-cards.

## Project local set up

### 1. Get project code:

To get the project code you should make `git clone` command from the remote repository on GitLab.
The console command will look like:
```
git clone git@gitlab.com:Kupreyka/backend-osme.git
```

### 2. Create .env file:

In root of project: go to folder /scripts and run:

```
create-env.sh
```

### 3. Run Docker containers:

In root of project:

``` 
docker-compose up --build
```

### 4. Create database:

In root of project:

```
npx sequelize-cli db:create
```

### 5. Run migrations:

In root of project:

```
npx sequelize-cli db:migrate
```
