<template>
    <div class="main">
        <sidebar></sidebar>

        <div class="content">
            <div class="content__head">
                <overview-box></overview-box>
                <div class="tile tile--empty">
                    <div class="tile__inner">
                        <div class="tile__head">
                            <h4>Notes</h4>
                        </div><!-- /.tile__head -->
                    </div><!-- /.tile__inner -->
                </div><!-- /.tile -->
            </div><!-- /.content__head -->

            <transmissions-table></transmissions-table>
        </div>
    </div>
</template>

<script>
    import OverviewBox from './OverviewBox.vue';
    import Sidebar from './Sidebar.vue';
    import TransmissionsTable from './TransmissionsTable.vue';

    export default {
        components: {
            overviewBox: OverviewBox,
            sidebar: Sidebar,
            transmissionsTable: TransmissionsTable,
        },
    };
</script>
