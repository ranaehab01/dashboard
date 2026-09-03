<?php

use App\Http\Middleware\SetLocale;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )

    //you need to register the Spatie permission middleware there
    ->withMiddleware(function (Middleware $middleware): void {
        
        $middleware->alias([  //bdehom esm mo5tasr 3shan anady beh
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
        ]);

        $middleware->api(append: [ SetLocale::class, ]); //by7ot middleware fe kol el api routes

    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->create();