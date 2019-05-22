<?php

namespace App\Console\Commands;

use App\Events\Updated;
use Illuminate\Console\Command;

class Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'socket:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test socket';

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

        broadcast(new Updated(['a', 'b']));

        $this->info('Event sent');
    }
}
