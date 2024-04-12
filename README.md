## Startup application

### **Description:**

Startup.

## Project local set up

### 1. Get project code:

To get the project code you should make `git clone` command from the remote repository on GitLab.
The console command will look like:
```
git clone https://gitlab.com/Kupreyka/be-startup.git
```

### 2. Create .env file:

In root of project: go to folder /scripts and run:

```
create-env.sh
```

### 3. Create database:

In root of project:

```
npx sequelize-cli db:create
```

### 4. Run migrations:

In root of project:

```
npx sequelize-cli db:migrate
```

### 4. Run seeds:

In root of project:

```
npx sequelize-cli db:seed:all
```
