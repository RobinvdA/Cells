<?php

Route::post('game/click', function () {

    request()->validate([
        'x' => 'required',
        'y' => 'required',
        'color' => 'required'
    ]);

    \Illuminate\Support\Facades\Redis::set(request()->color . '-click', json_encode(request()->all()));

});

Route::get('game/actions', function () {

    $actions = \Illuminate\Support\Facades\Redis::get('actions');
    $actions = $actions ? json_decode($actions) : [];

    $updates = collect($actions)->mapWithKeys(function ($cell) {
        return [$cell->x . ':' . $cell->y => $cell->color];
    });

    return response()->json($updates);

});

Route::get('game/join', function () {

    $colors = collect(\App\Game\Map::COLORS);

    $players = \Illuminate\Support\Facades\Redis::get('players');

    $players = $players ? json_decode($players) : [];

    $availableColors = $colors->diff($players);

    abort_if($availableColors->isEmpty(), 400, 'No more colors available.');

    $color = $availableColors->random();

    $players[] = $color;

    \Illuminate\Support\Facades\Redis::set('players', json_encode($players));

    return response()->json([
        'color' => $color
    ]);

});