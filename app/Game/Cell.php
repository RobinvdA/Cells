<?php

namespace App\Game;

class Cell implements \JsonSerializable
{
    /**
     * @var string
     */
    public $color;

    /**
     * @param string $color
     * @return Cell
     */
    public static function make($color = 'white')
    {
        $cell = new static();

        $cell->color = $color;

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
