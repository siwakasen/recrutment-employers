# Use the official PHP image with Composer and Node installed
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Install npm dependencies
COPY package*.json ./
RUN npm install

# Install Composer dependencies
COPY composer.json composer.lock ./
RUN composer install --prefer-dist --no-scripts --no-dev --optimize-autoloader

# Copy existing application directory
COPY . .

# Set appropriate permissions
RUN chown -R www-data:www-data /var/www && \
    chmod -R 755 /var/www/storage

# Expose port 9000 for PHP-FPM
EXPOSE 9000

# Start PHP-FPM server
CMD ["php-fpm"]

# Application environment configuration (set via docker-compose or externally)
ENV DB_CONNECTION=mysql \
    DB_HOST=127.0.0.1 \
    DB_PORT=3306 \
    DB_DATABASE=recrutment_employers \
    DB_USERNAME=root \
    DB_PASSWORD= \
    MAIL_MAILER=smtp \
    MAIL_HOST=smtp.gmail.com \
    MAIL_PORT=587 \
    MAIL_USERNAME= \
    MAIL_PASSWORD= \
    MAIL_ENCRYPTION= \
    MAIL_FROM_ADDRESS=
