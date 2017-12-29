<template>
    <div class="main">
        <sidebar></sidebar>

        <div class="content">
            <div class="content__head"></div>
            <transmission-uploads-table v-if="!loadingRecords"></transmission-uploads-table>
            <div class="box" v-else>
                <spinner class="box__spinner"></spinner>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import Sidebar from './Sidebar.vue';
    import TransmissionUploadsTable from './TransmissionUploadsTable.vue';

    export default {
        components: {
            Sidebar,
            TransmissionUploadsTable,
        },
        methods: {
            ...mapActions([
                'refresh',
            ]),
            ...mapMutations([
                'updatePageData',
            ]),
        },
        mounted() {
            const params = {
                appName: 'reports',
                model: 'transmissions',
                subModel: 'uploads',
            };
            this.updatePageData(params);
            this.refresh();
        },
    };
</script>
