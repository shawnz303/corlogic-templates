<template>
    <div>
        <label class="btn--select">
            <div class="btn btn--blue">
                <span v-if="value">Selected File: {{value.name}}</span>
                <span v-else>+ Add Session Manually</span>
            </div>
            <input type="file" @change="handleFileChange"/>
        </label>
        <transmission-preview v-if="fileOpened"></transmission-preview>
    </div>
</template>

<script>
    import TransmissionPreview from './TransmissionPreview.vue';

    export default {
        data: () => ({
            fileOpened: false,
        }),
        components: {
            TransmissionPreview,
        },
        methods: {
            handleFileChange(e) {
                this.fileOpened = true;
                this.$emit('input', e.target.files[0]);
            },
        },
    };
</script>
