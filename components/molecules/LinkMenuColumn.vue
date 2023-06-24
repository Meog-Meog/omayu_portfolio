<template>
    <div class="link-menu-column">
        <p class="text-link"><a :class="{ dark: dark }" @click="scrollTo">{{ heading }}</a></p>
        <p v-for="item of contents" class="text-link">
            <NuxtLink :class="{ dark: dark }" :to="item.url">
                {{ item.label }}
            </NuxtLink>
        </p>
    </div>
</template>

<script setup lang="ts">
interface Item
{
    label: string;
    url: string;
}
interface Props
{
    heading: string;
    contents: Item[];
    scrollTo: (payload: MouseEvent) => void;
    dark: boolean;
}
const Props = withDefaults(defineProps<Props>(), {
    heading: "",
    contents: () => [],
    scrollTo: () => { },
    dark: false
});

</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
    cursor: none;
}

.link-menu-column {
    margin: 0;

    >:first-child {
        margin-bottom: 30px;

        a {
            color: #101010;

            &.dark {
                color: #EEEEEE;
            }
        }
    }

    >*:not(:first-child) {
        margin-bottom: 25px;

        a {
            color: #9F9F9F;

            &.dark {
                color: #6A6A6A;
            }
        }
    }
}

p {
    margin: 0;
}
</style>