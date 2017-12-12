<template>
    <div class="content__body">
        <div class="profile">
            <div class="profile__head">
                <h4>{{ this.dataSource }}</h4>
                <transition-button
                    :callPromise="download"
                    :normalText="'Download'"
                    :transitionText="'Downloading'"
                >
                </transition-button>
                <div class="btn btn--blue" @click="archiveRecords">
                    Clear
                </div>
                <div class="btn btn--blue" @click="clearSearch" v-if="lastSearchQuery">
                    Clear Search
                </div>
            </div><!-- /.profile__head -->

            <div class="profile__body">
                <div class="table">
                    <div class="table__head">
                        <div class="table-items">
                            <div class="table-item table-item--lg">
                                <h5>Name of Patient</h5>
                            </div><!-- /.table-item table-item-/-lg -->

                            <div class="table-item table-item--sm">
                                <h5>Pt #</h5>
                            </div><!-- /.table-item table-item-/-sm -->

                            <div class="table-item table-item--md">
                                <h5>Location</h5>
                            </div><!-- /.table-item table-item-/-md -->

                            <div class="table-item table-item--md">
                                <h5>Pt Date of Birth</h5>
                            </div><!-- /.table-item table-item-/-md -->

                            <div class="table-item table-item--md">
                                <h5>Date of Service</h5>
                            </div><!-- /.table-item table-item-/-md -->

                            <div class="table-item table-item--md">
                                <h5>Doctor</h5>
                            </div><!-- /.table-item table-item-/-md -->

                            <div class="table-item table-item--sm">
                                <h5>Processed By</h5>
                            </div><!-- /.table-item table-item-/-sm -->

                            <div class="table-item table-item--md">
                                <h5>CPT Codes</h5>
                            </div><!-- /.table-item table-item-/-md -->

                            <div class="table-item table-item--lg">
                                <h5>DX Codes</h5>
                            </div><!-- /.table-item table-item-/-lg -->
                        </div><!-- /.table-items -->
                    </div><!-- /.table__head -->

                    <div class="table__body">
                        <billing-record
                            v-for="b in records"

                            :id="b.id"
                            :cptCodes="b.cpt_codes"
                            :doctorName="b.doctor_name"
                            :dxCode="b.dx_code"
                            :dos="b.dos"
                            :patientDob="b.patient_dob"
                            :patientId="b.patient_id"
                            :patientLocation="b.patient_location"
                            :patientName="b.patient_name"
                            :patientNumber="b.patient_number"
                            :processedBy="b.processed_by"
                        />
                    </div><!-- /.table__body -->
                </div><!-- /.table -->
            </div><!-- /.profile__body -->
        </div><!-- /.profile -->
    </div><!-- /.content__body -->
</template>

<script>
    import FileSaver from 'file-saver';
    import { mapActions, mapMutations, mapState } from 'vuex';
    import BillingRecord from './BillingRecord.vue';
    import TransitionButton from './TransitionButton.vue';

    export default {
        components: {
            billingRecord: BillingRecord,
            transitionButton: TransitionButton,
        },
        computed: {
            ...mapState([
                'searchQuery',
                'lastSearchQuery',
                'records',
            ]),
            dataSource() {
                return this.lastSearchQuery ?
                    `Search results for "${this.lastSearchQuery}"` :
                    'Billing Sheet';
            },
        },
        methods: {
            ...mapActions([
                'archiveRecords',
            ]),
            ...mapMutations([
                'clearSearch',
            ]),
            download() {
                const url = '/api/v1/reports/billings/export/';
                return this.$http.get(url).then(res => {
                    const blob = new Blob([res.body], {type: 'application/csv'});
                    FileSaver.saveAs(blob, 'BillingsReport.csv')
                });
            },
        },
    };
</script>
