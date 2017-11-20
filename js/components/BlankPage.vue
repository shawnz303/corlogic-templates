<template>
    <div class="main">
        <sidebar></sidebar>

        <div class="content content--patient">
            <div class="content__body">
            </div><!-- /.content__body -->
        </div><!-- /.content -->
    </div><!-- main -->
</template>

<script>
    import Sidebar from './Sidebar.vue';

    export default {
        components: {
            sidebar: Sidebar,
        },
    };
</script>
