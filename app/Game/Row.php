<?php

namespace App\Game;

use Illuminate\Support\Collection;

class Row implements \JsonSerializable
{
    /**
     * @var Collection
     */
    public $cells;

    /**
     * @return Row
     */
    public static function make()
    {
        $row = new static();

        $row->cells = collect([
            Cell::make(),
            Cell::make(),
            Cell::make(),
            Cell::make(),
            Cell::make(),
            Cell::make(),
            Cell::make(),
            Cell::make(),
            Cell::make(),
            Cell::make(),
            Cell::make(),
            Cell::make(),
            Cell::make(),
            Cell::make(),
            Cell::make(),
        ]);

        return $row;
    }

    /**
     * @return string
     */
    public function jsonSerialize()
    {
        return $this->cells;
    }
}
