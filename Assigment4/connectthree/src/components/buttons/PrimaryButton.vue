<template>
    <base-button
        :type="type"
        :size="size"
        class="inline-flex items-center justify-center rounded-md border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto"
        :class="[
            'text-' + textColor + ' bg-' + color + '-400 hover:bg-' + color + '-600 focus:ring-' + color + '-400',
            absolute ? 'absolute' : 'relative',
        ]"
    >
        <div
            v-if="$slots.icon"
            class="absolute bottom-0 left-0 top-0 flex items-center justify-center bg-gray-800 bg-opacity-20"
            :class="[size == 'sm' || size == 'md' || size == 'lg' ? 'px-1 md:px-2' : 'px-1']"
        >
            <slot name="icon"></slot>
        </div>
        <div
            
            :class="[
                $slots.icon && (size == 'sm' || size == 'md' || size == 'lg') ? 'pl-6 md:pl-8' : '',
                $slots.icon && size == 'xs' ? 'pl-6' : '',
            ]"
        >
            <slot />
        </div>
    </base-button>
</template>

<script>
import BaseButton from "@/components/buttons/BaseButton.vue"

export default {
    components: { BaseButton },

    props: {
        type: {
            type: String,
            default: "submit",
        },
        color: {
            type: String,
            default: "blue",
        },
        textColor: {
            type: String,
            default: "white",
        },
        size: {
            default: "md",
        },
        absolute: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
