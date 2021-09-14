<?php

namespace Database\Factories;

use App\Models\AircraftClass;
use Illuminate\Database\Eloquent\Factories\Factory;

class AircraftClassFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AircraftClass::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'uuid' => '607d854a-18f7-42ae-99f6-63b4b7f07f1a',
            'short_name' => 'METL',
            'name' => 'Multi-engine TurboProp Land',
            'order' => 7
        ];
    }
}
