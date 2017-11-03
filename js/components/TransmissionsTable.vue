<template>
    <div class="content__body">
        <div class="profile">
            <div class="profile__head">
                <h4>{{ dataSource }}</h4>
                <div class="btn" @click="clearSearch" v-if="lastSearchQuery">
                    Clear Search
                </div>
            </div><!-- /.profile__head -->

            <div class="profile__body">
                <div class="table">
                    <div class="table__head">
                        <div class="table-items">
                            <div class="table-item table-item--sm">
                            </div><!-- /.table-item table-item-/-sm -->

                            <div class="table-item table-item--lg">
                                <h5>Name of Patient</h5>
                            </div><!-- /.table-item table-item-/-lg -->

                            <div
                                class="table-item table-item--lg table__head--actionable"
                                @click="sortByAlert"
                            >
                                <h5>Alerts</h5>
                                <i class="ico-arrow-dropdown">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4">
                                        <path
                                            fill="#354052"
                                            fill-rule="evenodd" d="M3.536 2.657L1.059.18a.494.494 0 0 0-.705.002.504.504 0 0 0-.002.705L3.184 3.72a.493.493 0 0 0 .703 0L6.72.887c.2-.2.194-.51-.001-.705A.504.504 0 0 0 6.012.18L3.536 2.657z"
                                            opacity=".5"
                                            :transform="arrowTransform(sortOrderAlert, 7, 4)"/>
                                        />
                                    </svg>
                                </i>
                            </div><!-- /.table-item table-item-/-lg -->

                            <div class="table-item table-item--lg">
                                <h5>Date of Service</h5>
                            </div><!-- /.table-item table-item-/-lg -->

                            <div class="table-item table-item--lg">
                                <h5>Session Trigger</h5>
                            </div><!-- /.table-item table-item-/-lg -->

                            <div class="table-item table-item--lg">
                                <h5>Session Type</h5>
                            </div><!-- /.table-item table-item-/-lg -->

                            <div class="table-item table-item--lg">
                                <h5>Vendor</h5>
                            </div><!-- /.table-item table-item-/-lg -->

                            <div class="table-item table-item--lg">
                                <h5>Model</h5>
                            </div><!-- /.table-item table-item-/-lg -->

                            <div class="table-item table-item--md">

                            </div><!-- /.table-item table-item-/-md -->

                            <div class="table-item table-item--sm">

                            </div><!-- /.table-item table-item-/-sm -->
                        </div><!-- /.table-items -->
                    </div><!-- /.table__head -->

                    <div class="table__body">
                        <transmission-record
                            v-for="t in transmissions"

                            :id="t.id"
                            :alerts="t.hl7_alerts"
                            :archived="t.archived"
                            :manufacturer="t.patient.power_source.manufacturer"
                            :model="t.patient.power_source.model_id"
                            :name="t.patient.name"
                            :patientId="t.patient.id"
                            :reportDoc="t.report_doc"
                            :sessionDate="t.session_date"
                            :sessionType="t.session_type"
                            :sessionTrigger="t.session_trigger"
                        />
                    </div><!-- /.table__body -->
                </div><!-- /.table -->
            </div><!-- /.profile__body -->
        </div><!-- /.profile -->
    </div><!-- /.content__body -->
</template>

<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    import { alertsInfo } from './alerts';
    import TransmissionRecord from './TransmissionRecord.vue';

    export default {
        components: {
            transmissionRecord: TransmissionRecord
        },
        data: () => ({
            sortOrderAlert: -1,
        }),
        computed: {
            dataSource() {
                return this.lastSearchQuery ?
                    `Search results for "${this.lastSearchQuery}"` :
                    'New Transmissions';
            },
            ...mapState([
                'searchQuery',
                'lastSearchQuery',
                'transmissions',
            ]),
        },
        methods: {
            ...mapActions([
                'refresh',
            ]),
            ...mapMutations([
                'clearSearch',
                'remove',
                'sortTransmissions',
            ]),
            arrowTransform(sortOrder, width, height) {
                const rotation = -sortOrder * 90 + 90;
                width = width || 0;
                height = height || 0;
                return `rotate(${rotation} ${width/2.} ${height/2.})`;
            },
            sortByAlert() {
                this.sortOrderAlert = -this.sortOrderAlert;
                this.sortTransmissions((sortOrder => (a, b) => {
                    const colours1 = a.hl7_alerts.map(alert => {
                        return alertsInfo.find(elem => elem.code === alert).colour;
                    });
                    const colours2 = b.hl7_alerts.map(alert => {
                        return alertsInfo.find(elem => elem.code === alert).colour;
                    });
                    const reds1 = colours1.filter(colour => colour == 'red').length;
                    const reds2 = colours2.filter(colour => colour == 'red').length;
                    const yellow1 = colours1.filter(colour => colour == 'yellow').length;
                    const yellow2 = colours2.filter(colour => colour == 'yellow').length;
                    return (
                        reds1 > reds2 ? -1 :
                        reds1 == reds2 ?
                            yellow1 > yellow2 ? -1 :
                            yellow1 == yellow2 ? 0 :
                            1 :
                        1
                    ) * sortOrder;
                })(this.sortOrderAlert));
            },
        },
        mounted() {
            this.refresh();
        },
    };
</script>
