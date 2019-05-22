<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name') }}</title>

        <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro" rel="stylesheet">

        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body>
        <div id="app" class="container mx-auto">

            <button @click="toggleState" type="button" class="border rounded px-3 py-2">
                @{{ running ? 'Stop' : 'Start' }}
            </button>

            <div class="w-full" style="height:500px">

                <canvas ref="gameContainer" class="w-full h-full border bg-white">

                </canvas>

            </div>

        </div>

        <script>
            window.Map = <?=json_encode($map);?>;
        </script>

        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
