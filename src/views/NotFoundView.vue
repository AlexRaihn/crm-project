<script setup lang="ts">
import { computed } from "vue";

import { ShieldAlert } from "lucide-vue-next";

import Card from "@/components/ui/card/Card.vue";
import Button from "@/components/ui/button/Button.vue";
import NotFound from "@/components/ui/not-fount/NotFound.vue";

type Props = {
  noAccess?: boolean;
};

const props = defineProps<Props>();

const message = computed(() => {
  return props.noAccess
    ? "У вас нет доступа к этой странице"
    : "Страница не найдена";
});

const linkName = computed(() => {
  return props.noAccess ? "HomeView" : "PrivateView";
});
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <Card class="p-10 flex-col gap-4 flex justify-center items-center">
      <NotFound :message="message">
        <template #icon v-if="props.noAccess">
          <ShieldAlert :size="80" />
        </template>
      </NotFound>
      <RouterLink :to="{ name: linkName }">
        <Button v-text="'На главную'" />
      </RouterLink>
    </Card>
  </div>
</template>
