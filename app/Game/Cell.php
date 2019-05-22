<?php

namespace App\Game;

class Cell implements \JsonSerializable
{
    /**
     * @var string
     */
    public $color;

    /**
     * @return Cell
     */
    public static function make()
    {
        $cell = new static();

        $cell->color = 'white';

        return $cell;
    }

    /**
     * @return string
     */
    public function jsonSerialize()
    {
        return $this->color;
    }
}
