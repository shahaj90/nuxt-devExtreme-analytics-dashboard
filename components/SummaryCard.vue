<template>
  <div class="bg-white rounded-2xl shadow p-4">
    <h3 class="text-gray-500 text-sm font-semibold">{{ title }}</h3>
    <div class="flex items-center space-x-2">
      <template v-if="title === 'Users'">
        <UsersIcon class="size-6 text-blue-500" />
      </template>
      <template v-else-if="title === 'Sales'">
        <ShoppingCartIcon class="size-6 text-blue-500" />
      </template>
      <template v-else>
        <CubeTransparentIcon class="size-6 text-blue-500" />
      </template>
      <p class="text-2xl font-bold">{{ value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UsersIcon, ShoppingCartIcon, CubeTransparentIcon } from '@heroicons/vue/24/solid';

defineProps<{
  title: string;
  value: string | number;
}>();
</script>
