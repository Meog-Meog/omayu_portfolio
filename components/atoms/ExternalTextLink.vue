<template>
    <a v-if="url" class="external-text-link clickable" :class="{ 'external-text-link--large': large }" :href="url"
        target="_blank">
        <div class="clickable-area">
            <div class="external-text-link__label">
                <span>{{ label }}</span>
                <img v-if="large" class="external-text__icon" src="~/assets/image/icon/icon_tab_l.svg?url" />
                <img v-else class="external-text__icon" src="~/assets/image/icon/icon_tab_s.svg?url" />
            </div>
        </div>
    </a>
    <div v-else class="external-text-link" :class="{ 'external-text-link--large': large }">
        <div class="external-text-link__label">
            <span>{{ label }}</span>
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

    &--large {
        .external-text-link__label {
            font: normal normal bold 22px/26px ZenKakuGothicNew;
            letter-spacing: 0px;
            @include xd-line-height(22px, 26px);
        }
    }
}

.clickable-area {
    padding: 10px;
    margin: -10px;
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
    @include xd-line-height(13px, 26px);
}
</style>