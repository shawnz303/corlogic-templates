<template>
    <div class="header">
        <div class="header__head">
            <a href="#" class="logo"></a>
        </div><!-- /.header__head -->

        <div class="header__content">
            <div class="search">
                <div class="search__inner">
                    <label for="q" class="hidden">Search</label>
                    <input
                        type="text"
                        ref="q"
                        id="q"
                        class="search__field"
                        placeholder="Search by patient name, serial number, model number or product family…"
                        v-model="searchQuery"
                        @keypress.enter="search"
                    />

                    <button class="search__btn" @click="search">
                        <i class="ico-search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                <path fill="#CED0DA" fill-rule="evenodd" d="M9.222 3.033a4.376 4.376 0 1 0-6.19 6.19 4.376 4.376 0 1 0 6.19-6.19m4.552 10.741a.877.877 0 0 1-1.239 0L9.78 11.017c-2.4 1.794-5.804 1.624-7.984-.557a6.126 6.126 0 0 1 0-8.665 6.126 6.126 0 0 1 8.665 0c2.181 2.18 2.351 5.584.557 7.984l2.757 2.757a.876.876 0 0 1 0 1.238"/>
                            </svg>
                        </i>
                    </button>
                </div><!-- /.search__inner -->
            </div><!-- /.search -->
        </div><!-- /.header__content -->

        <div class="header__aside">
            <div class="header__actions">
                <router-link to="/uploads" class="btn btn--green">
                    Upload Sessions
                </router-link>
            </div><!-- /.header__actions -->

            <div class="header__nav">
                <header-avatar></header-avatar>
            </div><!-- /.header__nav -->
        </div><!-- /.header__aside -->
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import HeaderAvatar from './HeaderAvatar.vue';

    export default {
        components: {
            headerAvatar: HeaderAvatar
        },
        computed: {
            searchQuery: {
                get() {
                    return this.$store.state.searchQuery;
                },
                set(searchQuery) {
                    this.updateSearchQuery(searchQuery);
                },
            },
        },
        methods: {
            ...mapActions([
                'search',
            ]),
            ...mapMutations([
                'updateSearchQuery',
            ]),
        },
    };
</script>
