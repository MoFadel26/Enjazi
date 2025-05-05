# User Creation Scripts

These scripts allow you to easily create test users in your database. They are especially useful for testing and development.

## Available Scripts

### 1. Create Admin User (`createUser.js`)

Creates an admin user with easy-to-remember credentials:
- Email: `admin@admin.com`
- Password: `Admin@123`
- Role: `admin`

```bash
node createUser.js
```

### 2. Create Custom User (`createCustomUser.js`)

Creates a user with credentials specified via command-line arguments:

```bash
node createCustomUser.js username=john email=john@example.com password=John@123 role=admin
```

Default values if not specified:
- Username: `test`
- Email: `test@test.com`
- Password: `Test@123`
- Role: `user`

### 3. Create Simple User (`createSimpleUser.js`)

Creates a user with very simple credentials, bypassing password validation:
- Email: `user@test.com`
- Password: `password123`
- Role: `user`

```bash
node createSimpleUser.js
```

## Notes

- These scripts directly connect to your MongoDB database using the connection string in your `.env` file.
- The admin user script and custom user script apply proper password hashing.
- The simple user script bypasses model validation to allow simple passwords.
- All scripts check if a user with the same email or username already exists before creating a new one.

## Usage Instructions

1. Navigate to the scripts directory:
   ```
   cd server/scripts
   ```

2. Run the desired script:
   ```
   node createUser.js
   ```

3. Use the displayed credentials to log in to your application. 