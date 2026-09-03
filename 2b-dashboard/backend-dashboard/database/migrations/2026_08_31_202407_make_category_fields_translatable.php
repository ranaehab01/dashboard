<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;


//converts category data from normal strings into JSON translations without deleting existing categories.

return new class extends Migration
{
    public function up(): void
    {
  
//MySQL doesn't allow the existing normal unique index to remain on the JSON column
        Schema::table('categories', function (Blueprint $table) {
            $table->dropUnique(['name']);
        });


        DB::table('categories')
            ->where('id', 1)
            ->update([
                'name' => json_encode([
                    'en' => 'electronics',
                    'ar' => 'إلكترونيات',
                ], JSON_UNESCAPED_UNICODE), //makes the Arabic remain readable.

                'description' => json_encode([
                    'en' => 'Electronics product',
                    'ar' => 'منتجات إلكترونية',
                ], JSON_UNESCAPED_UNICODE),
            ]);

        DB::table('categories')
            ->where('id', 2)
            ->update([
                'name' => json_encode([  //7wlna el data mn array l json
                    'en' => 'kitchen',
                    'ar' => 'مطبخ',
                ], JSON_UNESCAPED_UNICODE),

                'description' => json_encode([
                    'en' => 'kitchen products',
                    'ar' => 'منتجات المطبخ',
                ], JSON_UNESCAPED_UNICODE),
            ]);

        //h7wl el col l json
        Schema::table('categories', function (Blueprint $table) {
            $table->json('name')->change();
            $table->json('description')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('name')->change();
            $table->text('description')->nullable()->change();

            $table->unique('name');
        });
    }
};
