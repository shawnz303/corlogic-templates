<template>
    <div class="main">
        <sidebar></sidebar>

        <div class="content">
            <billing-sheet></billing-sheet>
        </div>
    </div>
</template>

<script>
    import BillingSheet from './BillingSheet.vue';
    import Sidebar from './Sidebar.vue';

    export default {
        components: {
            billingSheet: BillingSheet,
            sidebar: Sidebar,
        },
    };
</script>
