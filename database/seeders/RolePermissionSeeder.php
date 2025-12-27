<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'dashboard.view',
            'users.manage',
            'roles.manage',
            'content.manage',
            'products.manage',
            'orders.manage',
            'settings.manage',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $superAdmin = Role::firstOrCreate(['name' => 'super_admin']);
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $editor = Role::firstOrCreate(['name' => 'editor']);

        $superAdmin->givePermissionTo(Permission::all());

        $admin->givePermissionTo([
            'dashboard.view',
            'content.manage',
            'products.manage',
            'orders.manage',
        ]);

        $editor->givePermissionTo([
            'dashboard.view',
            'content.manage',
        ]);
    }
}
