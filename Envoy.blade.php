@servers(['web' => 'deploy@vams.app'])

@story('deploy')
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
    cd /var/www/app
    git pull origin master
@endtask

@task('install-dependencies')
    cd /var/www/app
    composer install
@endtask

@task('update-database')
    cd /var/www/app
    sed -i 's/APP_ENV=production/APP_ENV=local/g' .env
    php artisan migrate --seed
    sed -i 's/APP_ENV=local/APP_ENV=production/g' .env
@endtask

@task('update-database:clean')
    cd /var/www/app
    sed -i 's/APP_ENV=production/APP_ENV=local/g' .env
    php artisan migrate:fresh --seed
    sed -i 's/APP_ENV=local/APP_ENV=production/g' .env
@endtask

@finished
    @slack('https://hooks.slack.com/services/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', '#laravel-enjoy-notifications', 'crm.dealandserve.com has been successfully deployed!')
@endfinished
