
# Recrutment App
 Recrutment App adalah aplikasi untuk pengelolaan proses lamaran kerja perusahaan. Aplikasi ini menggunakan Laravel Inertia + React.
## Requirement
- nodejs
- npm/pnpm
- php 8.3*
- composer
- docker
- docker compose
- git

Create Google app password:
- **[How to create app passwords](https://knowledge.workspace.google.com/kb/how-to-create-app-passwords-000009237)**
## Installation

```bash
    # clone the repository
    git clone https://github.com/siwakasen/recrutment-employers.git
```
```bash
    # change directory to the project
    cd recrutment-employers
```

### Setting up Mysql with Docker
```bash
    # make sure on port 3306 is not being used
    docker compose up -d
```

### Web Deployment

Build reactjs view:
```bash
    pnpm install
    pnpm build
```

Build laravel inertia app:

```bash
    composer install
```
Configure the env:
Copy .env.example into .env

```bash
# Using linux:
cp .env.example .env

# If using windows, just simply change the name of .env.example to .env
```
change this section:
```bash
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@example.com
MAIL_PASSWORD= 'YOUR_GOOGLE_APP_PASSWORD'
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=your_email@example.com
MAIL_FROM_NAME="${APP_NAME}"
```
Generate app key:
```bash
php artisan key:generate
```
Generate storage link
```bash
php artisan storage:link
```
Migrate the seed into database:
```bash
php artisan migrate --seed
```

Run the web app:
```bash
php artisan serve
```

## Thank you ...
