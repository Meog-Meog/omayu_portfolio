<template>
    <a v-if="url" class="external-text-link clickable" :class="{ 'external-text-link--large': large }" :href="url"
        target="_blank">
        <div>
            <span class="external-text-link__label">{{ label }}</span>
            <img v-if="large" class="external-text__icon" src="~/assets/image/icon/icon_tab_l.svg?url" />
            <img v-else class="external-text__icon" src="~/assets/image/icon/icon_tab_s.svg?url" />
        </div>
    </a>
    <div v-else class="external-text-link" :class="{ 'external-text-link--large': large }">
        <div>
            <span class="external-text-link__label">{{ label }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props
{
    label: string;
    url: string;
    large: boolean;
}
const Props = withDefaults(defineProps<Props>(), {
    label: "",
    url: "",
    large: false
});
</script>

<style lang="scss" scoped>
.external-text-link {
    text-decoration: none;
    display: flex;
    align-self: center;
    transition-duration: 0.5s;
    cursor: none;

    div {
        padding: 10px;
        margin: -10px;
    }

    &--large {
        div {
            padding: 15px;
            margin: -15px;
        }

        div span.external-text-link__label {
            font: normal normal bold 22px/36px ZenKakuGothicNew;
            letter-spacing: 0.88px;
        }
    }
}

.clickable:hover {
    opacity: 0.3;
}

.external-text__icon {
    margin-left: 5px;
}

.external-text-link__label {
    font: normal normal normal 13px/26px ZenKakuGothicNew;
    letter-spacing: 0px;
    color: #EEEEEE;
}
</style>