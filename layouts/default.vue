<template>
    <div>
        <mouse-stalker />
        <hamburger-button class="float-button-container" />
        <menu-modal />
        <profile-modal />
        <slot />
    </div>
</template>

<style scoped>
.float-button-container {
    position: fixed;
    top: 30px;
    right: 45px;
}
</style>