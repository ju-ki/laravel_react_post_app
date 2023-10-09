<?php

namespace App\Services;

use App\Models\Category;

class CategoryService
{
    public function createCategory($data)
    {
        $categoryIds = [];
        foreach ($data["categories"] as $categoryData) {
            $category = Category::firstOrCreate([
                'name' => $categoryData['value']
            ]);
            $categoryIds[] = $category->id;
        }

        return $categoryIds;
    }
}
