<template>
    <div class="table__group">
        <div class="table-items">
            <div class="table-item table-item--sm table-item--fluid">
                <h5>
                    <a :href="reportDoc" target="_blank">
                        <img :src="eyeImgSrc" alt="See report">
                    </a>
                </h5>
            </div><!-- /.table-item table-item-/-sm table-item-/-fluid -->

            <div class="table-item table-item--lg table-item--fluid">
                <h5>
                    <router-link :to="patientDetailLink">
                        {{ name }}
                    </router-link>
                </h5>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--lg table-item--fluid">
                <p>{{ dob | moment('MM/DD/YYYY') }}</p>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--lg table-item--fluid">
                <ul>
                    <li v-if="sessionTypeHumanized">{{ sessionTypeHumanized }}</li>
                    <li v-if="sessionTrigger">{{ sessionTrigger }}</li>
                </ul>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--lg table-item--fluid">
                <p>{{ model }}</p>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--lg table-item--fluid">
                <p>{{ sessionDate | moment('MM/DD/YYYY') }}</p>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--lg table-item--fluid">
                <span
                    class="tag"
                    v-for="alert in alerts"
                    :class="{
                        'tag--red': alertColor(alert) == 'red',
                        'tag--yellow': alertColor(alert) == 'yellow',
                    }"
                >
                    {{ alert }}
                </span>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--lg table-item--fluid">
                <p>{{ manufacturer }}</p>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--md table-item--center">
                <div v-if="archived">
                    <p>Archived</p>
                </div>
                <div v-else>
                    <a
                        class="btn"
                        :class="{ 'btn--blue': !archiving, 'btn--gray': archiving }"
                        @click="archive"
                    >
                        {{ archiving ? 'Archiving...' : 'Archive' }}
                    </a>
                </div>
            </div>

            <div class="table-item table-item--sm table-item--center">
                <a :href="transmissionReportLink(id, {full_name: true})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15">
                    <path fill="#C5D0DE" fill-rule="evenodd" d="M7.241 10.711a1 1 0 0 0 .708.293c.013 0 .023-.007.036-.007L8 11c.337 0 .62-.177.801-.431l2.894-2.882a.997.997 0 0 0 0-1.414 1.004 1.004 0 0 0-1.417 0L9 7.544V1a1 1 0 1 0-2 0v6.62L5.691 6.281a1.003 1.003 0 0 0-1.416 0 .997.997 0 0 0 0 1.414l2.966 3.016zM15 9a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 1 0-2 0v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3a1 1 0 0 0-1-1z"/>
                </svg>
                </a>
            </div><!-- /.table-item table-item-/-sm table-item-center -->
        </div><!-- /.table-items -->
    </div><!-- /.table__group -->
</template>

<script>
    import queryString from 'query-string';
    import { alertsInfo } from './alerts';
    import { sessionTypesInfo } from './sessions.js';

    export default {
        props: [
            'id',
            'alerts',
            'archived',
            'dob',
            'manufacturer',
            'model',
            'name',
            'patientId',
            'reportDoc',
            'sessionDate',
            'sessionTrigger',
            'sessionType',
        ],
        data: () => ({
            archiving: false,
            eyeImgSrc,
        }),
        computed: {
            sessionTypeHumanized() {
                return sessionTypesInfo[this.sessionType];
            },
            patientDetailLink() {
                return `/patient-detail/${this.patientId}/`;
            },
        },
        methods: {
            alertColor(alert) {
                return alertsInfo.find(elem => elem.code === alert).colour;
            },
            archive() {
                this.archiving = true;
                this.$store.dispatch('archive', this.id).then(() => {
                    this.archiving = false
                });
            },
            transmissionReportLink(txId, params) {
                const baseUrl = `/api/v1/reports/transmissions/${txId}/full-report/`;
                const queryParams = queryString.stringify(params);
                return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
            },
        },
    };
</script>
