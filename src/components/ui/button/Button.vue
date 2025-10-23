<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { ButtonVariants } from ".";

import LoaderWhite from "../loader/LoaderWhite.vue";

import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";
import { buttonVariants } from ".";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        buttonVariants({ variant, size }),
        props.class,
        'flex items-center justify-center relative'
      )
    "
  >
    <div :class="{ 'opacity-0': isLoading }">
      <slot />
    </div>
    <div
      class="absolute h-full w-full flex items-center justify-center opacity-0"
      :class="{ 'opacity-100': isLoading }"
    >
      <LoaderWhite />
    </div>
  </Primitive>
</template>
