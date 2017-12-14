<template>
    <transmission-preview v-if="fileUploadPreview"></transmission-preview>
</template>

<script>
    import { mapState } from 'vuex';
    import TransmissionPreview from './TransmissionPreview.vue';

    export default {
        components: {
            TransmissionPreview,
        },
        computed: {
            ...mapState([
                'fileUploadPreview',
            ]),
        },
    };
</script>
