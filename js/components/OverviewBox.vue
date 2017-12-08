<template>
    <div class="tile">
        <div class="tile__inner">
            <div class="tile__head">
                <div class="tile__entry">
                    <h4>Overview</h4>

                    <span>{{ new Date() | moment('dddd, MMMM Do YYYY') }}</span>
                </div><!-- /.tile__entry -->

                <a href="#">
                    <i class="ico-dots"></i>
                </a>
            </div><!-- /.tile__head -->

            <div class="tile__content">
                <div class="services">
                    <div class="service">
                        <div class="service__image">
                            <i class="ico-transmission">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                                    <defs>
                                        <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="98.485%">
                                            <stop offset="0%" stop-color="#2EA1F8"/>
                                            <stop offset="100%" stop-color="#1990EA"/>
                                        </linearGradient>
                                    </defs>
                                    <g fill="none" fill-rule="evenodd">
                                        <rect width="60" height="60" fill="url(#a)" rx="30"/>
                                        <rect width="50" height="50" x="5" y="5" stroke="#FFF" stroke-width="2" opacity=".203" rx="25"/>
                                        <path fill="#FFF" d="M23 40h2v-4h-2v4zm4 0h2v-8h-2v8zm8 0h2V20h-2v20zm-4 0h2V26h-2v14z"/>
                                    </g>
                                </svg>
                            </i>
                        </div><!-- /.service__image -->

                        <div class="service__inner">
                            <div class="service__head">
                                <h1>{{ newTransmissionsCount }}</h1>

                                <h6>NEW TRANSMISSIONS</h6>
                            </div><!-- /.service__head -->
                        </div><!-- /.service__inner -->
                    </div><!-- /.service -->

                    <div class="service">
                        <div
                            class="service__image service__image--actionable"
                            @click="filterRecords(urgentTransmissionsFilter)"
                        >
                            <i class="ico-urgent">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                                    <defs>
                                        <linearGradient id="b" x1="50%" x2="50%" y1="95.358%" y2="2.081%">
                                            <stop
                                                offset="0%"
                                                :stop-color="recordsFiltered ? '#FFF' : '#b41515'"
                                            />
                                            <stop
                                                offset="100%"
                                                :stop-color="recordsFiltered ? '#FFF' : '#d94646'"
                                            />
                                        </linearGradient>
                                    </defs>
                                    <g fill="none" fill-rule="evenodd">
                                        <rect width="60" height="60" fill="url(#b)" rx="30"/>
                                        <rect width="50" height="50" x="5" y="5" stroke="#FFF" stroke-width="2" opacity=".203" rx="25"/>
                                        <path
                                            :fill="recordsFiltered ? '#000' : '#FFF'"
                                            d="M38 29h-3.712a.504.504 0 0 0-.354.146l-1.401 1.402a.5.5 0 0 1-.785-.101l-2.335-3.987a1 1 0 0 0-1.57-.201l-.499.498.008.014-2.083 2.083a.504.504 0 0 1-.354.146H22v-6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6zm0 8a1 1 0 0 1-1 1H23a1 1 0 0 1-1-1v-6h3.745c.133 0 .26-.053.354-.146l1.84-1.841a.5.5 0 0 1 .785.101c2.198 3.752 1.76 3.001 2.319 3.964a1 1 0 0 0 1.57.206l2.148-2.138a.495.495 0 0 1 .352-.146H38v6zm0-17H22a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V22a2 2 0 0 0-2-2z"
                                        />
                                    </g>
                                </svg>
                            </i>
                        </div><!-- /.service__image -->

                        <div class="service__inner">
                            <div class="service__head">
                                <h1>{{ urgentTransmissionsCount }}</h1>

                                <h6>URGENT TRANSMISSIONS</h6>
                            </div><!-- /.service__head -->
                        </div><!-- /.service__inner -->
                    </div><!-- /.service -->

                    <div class="service">
                        <div class="service__image">
                            <i class="ico-login">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                                    <defs>
                                        <linearGradient id="c" x1="50%" x2="50%" y1="97.784%" y2="1.559%">
                                            <stop offset="0%" stop-color="#fd9a18"/>
                                            <stop offset="100%" stop-color="#f8c95d"/>
                                        </linearGradient>
                                    </defs>
                                    <g fill="none" fill-rule="evenodd">
                                        <rect width="60" height="60" fill="url(#c)" rx="30"/>
                                        <rect width="50" height="50" x="5" y="5" stroke="#FFF" stroke-width="2" opacity=".203" rx="25"/>
                                        <path fill="#FFF" d="M34 25c0-2.206-1.794-4-4-4s-4 1.794-4 4 1.794 4 4 4 4-1.794 4-4zm6 14h-5v-2h2.784c-.826-3.786-3.999-6-7.784-6-3.785 0-6.958 2.214-7.784 6H25v2h-5c0-4.555 2.583-7.952 6.242-9.327A5.983 5.983 0 0 1 24 25a6 6 0 1 1 9.758 4.673C37.417 31.048 40 34.445 40 39zm-7.586-5.243l1.414 1.415L30 39l-2.828-2.828 1.414-1.415L30 36.172l2.414-2.415z"/>
                                    </g>
                                </svg>
                            </i>
                        </div><!-- /.service__image -->

                        <div class="service__inner">
                            <div class="service__head">
                                <h1>{{ lastLogin | moment("from", true) }}</h1>

                                <h6>SINCE LAST LOGIN</h6>
                            </div><!-- /.service__head -->
                        </div><!-- /.service__inner -->
                    </div><!-- /.service -->
                </div><!-- /.services -->
            </div><!-- /.tile__content -->
        </div><!-- /.tile__inner -->
    </div><!-- /.tile -->
</template>

<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    import { alertsInfo } from './alerts';

    export default {
        created() {
            this.updateUserInfo()
        },
        computed: {
            ...mapState([
                'cachedRecords',
                'lastLogin',
                'recordsFiltered',
                'searchQuery',
                'urgentOnly',
            ]),
            newTransmissionsCount() {
                return this.cachedRecords.length;
            },
            urgentTransmissionsFilter() {
                const redAlertCodes = alertsInfo
                    .filter(alert => alert.colour == 'red')
                    .map(alert => alert.code);
                return tx => tx.hl7_alerts.find(alert => redAlertCodes.indexOf(alert) != -1);
            },
            urgentTransmissions() {
                return this.cachedRecords.filter(this.urgentTransmissionsFilter);
            },
            urgentTransmissionsCount() {
                return this.urgentTransmissions.length;
            },
        },
        methods: {
            ...mapActions([
                'filterRecords',
                'updateUserInfo',
            ]),
            ...mapMutations([
                'restoreCachedRecords',
                'updateRecords',
            ]),
        },
    };
</script>
