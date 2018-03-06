<template>
    <div class="table__group">
        <div class="table-items">
            <div class="table-item table-item--sm table-item--fluid">
                <h5>
                    <a :href="transmissionReportLink(id, {full_name: true, should_open: true})" target="_blank">
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

            <div class="table-item table-item--lg">
                <span
                    class="tag"
                    v-for="alert in alerts"
                    :class="{
                        'tag--red': alertColour(alert) == 'red',
                        'tag--yellow': alertColour(alert) == 'yellow',
                    }"
                    :title="alertDescription(alert)"
                >
                    {{ alert }}
                </span>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--lg table-item--fluid">
                <p>{{ sessionDate | moment('MM/DD/YYYY') }}</p>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--lg table-item--fluid">
                <div v-if="sessionTrigger">{{ sessionTrigger }}</div>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--lg table-item--fluid">
                <div v-if="sessionTypeHumanized">{{ sessionTypeHumanized }}</div>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--lg table-item--fluid">
                <p>{{ manufacturer }}</p>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--lg table-item--fluid">
                <p>{{ model }}</p>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--md table-item--center">
                <div v-if="archived">
                    <p>Archived</p>
                </div>
                <div v-else>
                    <transition-button
                        :callPromise="archive"
                        :normalText="'Archive'"
                        :transitionText="'Archiving'"
                    >
                    </transition-button>
                </div>
            </div>

            <div class="table-item table-item--sm table-item--center">
                <img :src="pencilImgSrc" alt="Edit transmission notes" @click="editTransmission(false)">
                <img :src="downloadImgSrc" alt="Edit and download transmission notes" @click="editTransmission(true)">
            </div><!-- /.table-item table-item-/-sm table-item-center -->
        </div><!-- /.table-items -->
    </div><!-- /.table__group -->
</template>

<script>
    import queryString from 'query-string';
    import { alertsInfo } from './alerts';
    import { sessionTypesInfo } from './sessions';
    import TransitionButton from './TransitionButton.vue';

    export default {
        props: [
            'id',
            'alerts',
            'archived',
            'manufacturer',
            'model',
            'name',
            'notes',
            'patientId',
            'reportDoc',
            'sessionDate',
            'sessionTrigger',
            'sessionType',
            'billed',
            'billingId,'
        ],
        components: {
            transitionButton: TransitionButton
        },
        data: () => ({
            eyeImgSrc,
            pencilImgSrc,
            downloadImgSrc,
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
            alertColour(alert) {
                return alertsInfo.find(elem => elem.code === alert).colour;
            },
            alertDescription(alert) {
                return alertsInfo.find(elem => elem.code === alert).desc;
            },
            archive() {
                return this.$store.dispatch('archive', this.id);
            },
            editTransmission(withDownload) {
                this.$modal.show('txNoteEdit', {
                    txEdit: {
                        id: this.id,
                        notes: this.notes,
                        patientId: this.patientId,
                        patientName: this.name,
                        sessionDate: this.sessionDate,
                        withDownload: withDownload,
                        billed: this.billed,
                        billingId: this.billingId,
                    }
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
