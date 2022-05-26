@servers(['web' => 'relativemedia@vams.app'])

@task('delete-code')
    cd /var/www/vhosts
    rm -rf vams.app
@endtask

@story('deploy:new')
    clone-code
    install-dependencies
@endstory

@story('deploy:update')
    update-code
    install-dependencies
@endstory

@story('deploy:syncdb')
    migrate-database
@endstory

@story('deploy:syncseeddb')
    migrate-database
    seed-databse
@endstory

@story('deploy:resetdb')
    update-database:clean
@endstory

@task('update-code')
    cd /var/www/vhosts/vams.app
    git pull origin master
@endtask

@task('clone-code')
    cd /var/www/vhosts
    git clone git@github.com:vams-app/vams.app.git
@endtask

@task('install-dependencies')
    cd /var/www/vhosts/vams.app
    composer install
@endtask

@task('migrate-database')
    cd /var/www/vhosts/vams.app
    sed -i 's/APP_ENV=production/APP_ENV=local/g' .env
    php artisan migrate
    sed -i 's/APP_ENV=local/APP_ENV=production/g' .env
@endtask

@task('seed-database')
    cd /var/www/vhosts/vams.app
    sed -i 's/APP_ENV=production/APP_ENV=local/g' .env
    php artisan db:seed
    sed -i 's/APP_ENV=local/APP_ENV=production/g' .env
@endtask

@task('update-database:clean')
    cd /var/www/vhosts/vams.app
    sed -i 's/APP_ENV=production/APP_ENV=local/g' .env
    php artisan migrate:fresh --seed
    sed -i 's/APP_ENV=local/APP_ENV=production/g' .env
@endtask
