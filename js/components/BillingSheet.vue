<template>
    <div class="content__body">
        <div class="profile">
            <div class="profile__head">
                <h4>Billing Sheet</h4>
                <a href="/api/v1/reports/billings/export/">
                    <div class="btn">
                            Export to CSV
                    </div>
                </a>
                <div class="btn" @click="archiveBillings">
                    Clear
                </div>
            </div><!-- /.profile__head -->

            <div class="profile__body">
                <div class="table">
                    <div class="table__head">
                        <div class="table-items">
                            <div class="table-item table-item--lg">
                                <h5>Name of Patient</h5>
                            </div><!-- /.table-item table-item-/-lg -->

                            <div class="table-item table-item--md">
                                <h5>Pt #</h5>
                            </div><!-- /.table-item table-item-/-md -->

                            <div class="table-item table-item--md">
                                <h5>Date of Service</h5>
                            </div><!-- /.table-item table-item-/-md -->

                            <div class="table-item table-item--md">
                                <h5>Doctor</h5>
                            </div><!-- /.table-item table-item-/-md -->

                            <div class="table-item table-item--md">
                                <h5>Processed By</h5>
                            </div><!-- /.table-item table-item-/-md -->

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
                            v-for="b in billings"

                            :id="b.pk"
                            :cptCodes="b.cpt_codes"
                            :doctorName="b.doctor_name"
                            :dxCode="b.dx_code"
                            :dos="b.dos"
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
    import { mapActions, mapMutations, mapState } from 'vuex';
    import BillingRecord from './BillingRecord.vue';

    export default {
        components: {
            billingRecord: BillingRecord
        },
        computed: {
            ...mapState([
                'billings',
            ]),
        },
        methods: {
            ...mapActions([
                'archiveBillings',
                'refreshBillings',
            ]),
        },
        mounted() {
            this.refreshBillings();
        },
    };
</script>
