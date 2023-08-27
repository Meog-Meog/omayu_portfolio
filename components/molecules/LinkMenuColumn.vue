<template>
    <div class="link-menu-column">
        <p><a class="text-link dark" @click="scrollTo">{{ heading }}</a></p>
        <p v-for="item of contents">
            <a v-if="isCurrentUrl(item.url)" class="text-link dark" @click="closeModalsAndScrollToTop">
                {{ item.label }}
            </a>
            <NuxtLink v-else class="text-link dark" :to="item.url">
                {{ item.label }}
            </NuxtLink>
        </p>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const showProfileModal = useState('showProfileModal', () => false)
const showModal = useState('showModal', () => false)
const dark = useState('dark', () => false)
const darkGrad = useState('darkGrad', () => false)
const smoother = useState<ScrollSmoother>('smoother')

function isCurrentUrl(url: string): boolean
{
    return route.path === url;
}
function closeModalsAndScrollToTop(): void
{
    showProfileModal.value = false;
    showModal.value = false;
    dark.value = false;
    darkGrad.value = false;
    smoother.value.scrollTop(0);
}

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
}
const Props = withDefaults(defineProps<Props>(), {
    heading: "",
    contents: () => [],
    scrollTo: () => { },
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
        margin-bottom: 20px;

        a {
            color: #101010;

            &.dark {
                color: #EEEEEE;
            }
        }
    }

    >*:not(:first-child) {
        margin-bottom: 20px;

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