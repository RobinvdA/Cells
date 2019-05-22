<?php

namespace App\Console\Commands;

use App\Events\Updated;
use App\Game\Cell;
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
        $this->info('Starting loop...');

        $iteration = 1;

        while (true) {
            $this->info(time() . ': Iteration ' . $iteration++);

            $cell = Redis::get('click');

            $cell = $cell ? json_decode($cell) : null;

            if ($cell) {
                $this->handleClick($cell->x, $cell->y, $cell->color);
            }

            Redis::del('click');

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
