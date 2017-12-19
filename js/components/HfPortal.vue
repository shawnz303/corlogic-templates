<template>
    <div class="main">
        <sidebar></sidebar>

        <div class="content">
            <div class="content__head">
            </div>
            <transmissions-table v-if="!loadingRecords"></transmissions-table>
            <div class="box" v-else>
                <spinner class="box__spinner"></spinner>
            </div>
        </div>
    </div>
</template>

<script>
    import { Circle2 } from './vue-loading-spinner';
    import { mapActions, mapMutations, mapState } from 'vuex';
    import Sidebar from './Sidebar.vue';
    import TransmissionsTable from './TransmissionsTable.vue';

    export default {
        components: {
            spinner: Circle2,
            Sidebar,
            TransmissionsTable,
        },
        computed: {
            ...mapState([
                'records',
            ]),
        },
        computed: {
            ...mapState([
                'loadingRecords',
                'records',
                'searchQuery',
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
        mounted() {
            const params = {
                appName: 'reports',
                model: 'transmissions',
            };
            const args = {
                hfTransmissions: true,
            };
            this.updatePageData(params);
            this.refresh(args);
        },
    };
</script>
