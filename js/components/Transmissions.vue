<template>
    <div class="main">
        <sidebar></sidebar>

        <div class="content">
            <div class="content__head">
                <overview-box></overview-box>
            </div>
            <transmission-uploader></transmission-uploader>
            <transmissions-table v-if="records.length"></transmissions-table>
            <div class="box" v-else>
                <spinner class="box__spinner"></spinner>
            </div>
        </div>
    </div>
</template>

<script>
    import { Circle2 } from './vue-loading-spinner';
    import { mapActions, mapMutations, mapState } from 'vuex';
    import OverviewBox from './OverviewBox.vue';
    import Sidebar from './Sidebar.vue';
    import TransmissionsTable from './TransmissionsTable.vue';
    import TransmissionUploader from './TransmissionUploader.vue';

    export default {
        components: {
            spinner: Circle2,
            overviewBox: OverviewBox,
            sidebar: Sidebar,
            transmissionsTable: TransmissionsTable,
            transmissionUploader: TransmissionUploader,
        },
        computed: {
            ...mapState([
                'records',
            ]),
        },
        computed: {
            ...mapState([
                'records',
            ]),
        },
        methods: {
            ...mapActions([
                'refresh',
            ]),
            ...mapMutations([
                'updatePageData',
            ]),
        },
        created() {
            const params = {
                appName: 'reports',
                model: 'transmissions',
            };
            this.updatePageData(params);
            this.refresh();
        },
    };
</script>
