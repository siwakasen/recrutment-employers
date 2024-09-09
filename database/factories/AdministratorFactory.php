<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Administrator;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AdministratorFactory extends Factory
{
    protected $model = Administrator::class;
    protected static ?string $password;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'admin_name' => $this->faker->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => static::$password ??= bcrypt('password'),
            'role_id' => random_int(1, 2),
        ];
    }
}
