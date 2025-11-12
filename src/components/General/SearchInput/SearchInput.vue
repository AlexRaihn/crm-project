<script setup lang="ts">
import { Input } from "@/components/ui/input";

import { Search, X } from "lucide-vue-next";

type Emits = {
  search: [];
};

const emit = defineEmits<Emits>();

const model = defineModel<string>({ default: "" });

function filter(isReset = false) {
  console.log("!!");
  if (isReset) model.value = "";

  console.log("!!", model.value);
  emit("search");
}
</script>

<template>
  <div class="c-flex-row gap-0! w-full bg-white items-center">
    <div
      class="relative z-10 border-input border-r-0! rounded-l-md border py-1 px-3 h-9 -mr-2"
    >
      <X v-if="model.length > 0" @click.prevent="() => filter(true)" />
      <Search v-else @click.prevent="() => filter()" />
    </div>
    <Input
      v-model="model"
      class="relative z-0"
      @keyup.enter="() => filter()"
      v-bind="{ ...$attrs }"
    />
  </div>
</template>
