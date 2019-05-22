<?php

Route::post('game/click', function () {

    request()->validate([
        'x' => 'required',
        'y' => 'required',
        'color' => 'required'
    ]);

    \Illuminate\Support\Facades\Redis::set('click', json_encode(request()->all()));

});
