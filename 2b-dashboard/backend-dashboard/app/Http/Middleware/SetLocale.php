<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function handle(Request $request,Closure $next): Response {

        $locale = $request->header('Accept-Language', 'en');  

        if (!in_array($locale, ['en', 'ar'])) {
            $locale = 'en';  //default english
        }

        app()->setLocale($locale); //bghyr lang laravel

        return $next($request); // means finished my middleware work 
                                //Continue processing the request(category controller)
    }
}
