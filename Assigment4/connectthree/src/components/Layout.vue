<template>
    <div>
        <NavBar />
        <router-view />
    </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar.vue";

export default {
    components: {
        NavBar,
    },
};
</script>

<style>
/* Add any styling for the layout if needed */
</style>
