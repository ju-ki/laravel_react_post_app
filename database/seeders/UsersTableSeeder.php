<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $numberOfUsersToCreate = 10; // 例として10ユーザーを作成する場合
        $latestUserId = User::max('id') ?: 1;

        $users = [];

        for ($i = 0; $i <= $numberOfUsersToCreate; $i++) {
            $users[] = [
                'name' => fake()->name(),
                'email' => "test" . ($latestUserId + $i) . "@test.com",
                'email_verified_at' => now(),
                'password' => bcrypt("password"),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        User::insert($users);
    }
}
