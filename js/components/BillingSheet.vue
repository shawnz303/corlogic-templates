<template>
    <div class="content__body">
        <modal name="clearAllConfirm"  height="15%" :clickToClose="false">
            <div class="modal--header">
                <h5>Are you sure you want to clear all the billing records?</h5>
            </div>
            <div class="btn--group__modal">
                <div class="btn btn--blue" @click="confirmClearAll">
                    Confirm
                </div>
                <div class="btn btn--blue" @click="$modal.hide('clearAllConfirm')">
                    Cancel
                </div>
            </div>
        </modal>

        <div class="profile">
            <div class="profile__head">
                <h4>{{ this.dataSource }}</h4>
                <transition-button
                    :callPromise="download"
                    :normalText="'Download'"
                    :transitionText="'Downloading'"
                    v-if="!lastSearchQuery"
                >
                </transition-button>
                <div
                    class="btn btn--blue"
                    @click="$modal.show('clearAllConfirm')"
                    v-if="!lastSearchQuery"
                >
                    Clear All
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
                                <h5>Name</h5>
                            </div><!-- /.table-item table-item-/-lg -->

                            <div class="table-item table-item--sm">
                                <h5>Pt #</h5>
                            </div><!-- /.table-item table-item-/-sm -->

                            <div class="table-item table-item--md">
                                <h5>Location</h5>
                            </div><!-- /.table-item table-item-/-md -->

                            <div class="table-item table-item--md">
                                <h5>Date of Birth</h5>
                            </div><!-- /.table-item table-item-/-md -->

                            <div
                                class="table-item table-item--md table__head--actionable"
                                @click="sortByDos"
                            >
                                <h5>Date of Service</h5>
                                <i class="ico-arrow-dropdown">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4">
                                        <path
                                            fill="#354052"
                                            fill-rule="evenodd"
                                            d="M3.536 2.657L1.059.18a.494.494 0 0 0-.705.002.504.504 0 0 0-.002.705L3.184 3.72a.493.493 0 0 0 .703 0L6.72.887c.2-.2.194-.51-.001-.705A.504.504 0 0 0 6.012.18L3.536 2.657z"
                                            opacity=".5"
                                            :transform="arrowTransform(sortOrderDos, 7, 4)"
                                        />
                                    </svg>
                                </i>
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

                            <div class="table-item table-item--md">
                            </div><!-- /.table-item table-item-/-lg -->

                        </div><!-- /.table-items -->
                    </div><!-- /.table__head -->

                    <div class="table__body">
                        <billing-record
                            v-for="b in records"

                            :id="b.id"
                            :archived="b.archived"
                            :cptCodes="b.cpt_codes"
                            :doctorName="b.doctor_name"
                            :dxCode="b.dx_code"
                            :dos="b.dos"
                            :patientDob="b.patient.dob"
                            :patientId="b.patient.id"
                            :patientLocation="b.patient.location"
                            :patientName="b.patient.name"
                            :patientNumber="b.patient.number"
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
        data: () => ({
            sortOrderDos: -1,
        }),
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
                'clearSearch',
            ]),
            ...mapMutations([
                'sortRecords',
            ]),
            arrowTransform(sortOrder, width, height) {
                const rotation = -sortOrder * 90 + 90;
                width = width || 0;
                height = height || 0;
                return `rotate(${rotation} ${width/2.} ${height/2.})`;
            },
            confirmClearAll() {
                this.archiveRecords();
                this.$modal.hide('clearAllConfirm');
            },
            download() {
                const url = '/api/v1/reports/billings/export/';
                return this.$http.get(url).then(res => {
                    const blob = new Blob([res.body], {type: 'application/csv'});
                    FileSaver.saveAs(blob, 'BillingsReport.csv')
                });
            },
            sortByDos() {
                this.sortOrderDos *= -1;
                this.sortRecords((sortOrder => (a, b) => {
                    const dos1 = a.dos.split(' ').slice(-1)[0].toLowerCase();
                    const dos2 = b.dos.split(' ').slice(-1)[0].toLowerCase();
                    return (
                        dos1 < dos2 ? -1 : dos1 == dos2 ? 0 : 1
                    ) * sortOrder;
                })(this.sortOrderDos));
            },
        },
    };
</script>
