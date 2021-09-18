@servers(['web' => 'deploy@vams.app'])

@story('deploy:new')
    clone-code
    install-dependencies
@endstory

@story('deploy:update')
    update-code
    install-dependencies
@endstory

@story('deploy:syncdb')
    update-database
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

@task('update-database')
    cd /var/www/vhosts/vams.app
    sed -i 's/APP_ENV=production/APP_ENV=local/g' .env
    php artisan migrate --seed
    sed -i 's/APP_ENV=local/APP_ENV=production/g' .env
@endtask

@task('update-database:clean')
    cd /var/www/vhosts/vams.app
    sed -i 's/APP_ENV=production/APP_ENV=local/g' .env
    php artisan migrate:fresh --seed
    sed -i 's/APP_ENV=local/APP_ENV=production/g' .env
@endtask
