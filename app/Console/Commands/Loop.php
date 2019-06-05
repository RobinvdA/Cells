<?php

namespace App\Console\Commands;

use App\Game\Cell;
use App\Events\Updated;
use App\Game\Map;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class Loop extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'loop:start';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start game loop';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Resetting...');

        Redis::del('actions');
        Redis::del('players');

        foreach (Map::COLORS as $color) {
            Redis::del($color . '-click');
        }

        $this->info('Starting loop...');

        $iteration = 1;

        while (true) {
            $this->info(time() . ': ' . $iteration++);

            $actions = Redis::get('actions');
            $actions = $actions ? json_decode($actions) : [];

            $players = Redis::get('players');
            $players = $players ? json_decode($players) : [];

            foreach ($players as $player) {
                $cell = Redis::get($player . '-click');

                if (! $cell) {
                    continue;
                }

                $cell = json_decode($cell);

                $this->handleClick($cell->x, $cell->y, $cell->color);

                $actions[] = $cell;

                Redis::del($player . '-click');
            }

            Redis::set('actions', json_encode($actions));

            usleep(100000);
        }
    }

    protected function handleClick($x, $y, $color)
    {
        broadcast(new Updated([
            $x . ':' . $y => Cell::make($color)
        ]));
    }
}
