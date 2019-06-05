<?php

namespace App\Game;

use Illuminate\Support\Collection;

class Map implements \JsonSerializable
{
    /**
     * @var Collection
     */
    public $rows;

    const COLORS = ['red', 'green', 'blue', 'yellow'];

    /**
     * @return Map
     */
    public static function make()
    {
        $map = new static();

        $map->rows = collect([
            Row::make(),
            Row::make(),
            Row::make(),
            Row::make(),
            Row::make(),
            Row::make(),
            Row::make(),
            Row::make(),
            Row::make(),
            Row::make(),
            Row::make(),
            Row::make(),
            Row::make(),
            Row::make(),
            Row::make(),
        ]);

        return $map;
    }

    /**
     * @return string
     */
    public function jsonSerialize()
    {
        return $this->rows;
    }
}
