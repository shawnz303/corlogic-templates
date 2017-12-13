<template>
    <div class="main">
        <sidebar></sidebar>

        <div class="content">
            <billing-sheet></billing-sheet>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import BillingSheet from './BillingSheet.vue';
    import Sidebar from './Sidebar.vue';

    export default {
        components: {
            billingSheet: BillingSheet,
            sidebar: Sidebar,
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
                model: 'billings',
            };
            this.updatePageData(params);
            this.refresh();
        },
    };
</script>
