<template>
    <button :type="type" :class="sizeClassName" class="w-full truncate whitespace-nowrap">
        <slot />
    </button>
</template>

<script>
export default {
    name: "BaseButton",

    props: {
        type: {
            type: String,
            default: "submit",
        },
        size: {
            default: "md",
        },
    },

    computed: {
        sizeClassName() {
            switch (this.size) {
                case "lg":
                    return "px-3 py-2 md:px-4 md:py-3 leading-4 text-sm md:text-base text-semibold";
                case "sm":
                    return "px-2 py-1 md:px-3 md:py-2 leading-3 text-xxs md:text-xs text-normal";
                case "xs":
                    return "px-1 py-0 md:px-2 md:py-1 leading-2 text-xxs text-normal";
                default:
                    return "px-3 py-2 md:px-4 md:py-3 leading-4 text-xs md:text-sm text-semibold";
            }
        },
    },
};
</script>

<style scoped>
@media (max-width: 639px) {
    button {
        font-size: 12px !important;
        padding: 8px 10px;
    }
}
</style>
