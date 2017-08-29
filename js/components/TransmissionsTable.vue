<template>
    <div class="content__body">
        <div class="profile">
            <div class="profile__head" @click="refresh">
                <h4>New Transmissions</h4>
            </div><!-- /.profile__head -->

            <div class="profile__body">
                <div class="table">
                    <div class="table__head">
                        <div class="table-items">
                            <div class="table-item table-item--lg">
                                <h5>Name of Patient</h5>
                            </div><!-- /.table-item table-item-/-lg -->

                            <div class="table-item table-item--lg">
                                <h5>Transmission Type</h5>
                            </div><!-- /.table-item table-item-/-lg -->

                            <div class="table-item table-item--md">
                                <h5>Date of Birth</h5>
                            </div><!-- /.table-item table-item-/-md -->

                            <div class="table-item table-item--md">
                                <h5>Device</h5>
                            </div><!-- /.table-item table-item-/-md -->

                            <div class="table-item table-item--md">
                                <h5>Created</h5>
                            </div><!-- /.table-item table-item-/-md -->

                            <div class="table-item table-item--md">
                                <a href="#">

                                    <h5>Alerts</h5>

                                    <i class="ico-arrow-dropdown">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4">
                                            <path fill="#354052" fill-rule="evenodd" d="M3.536 2.657L1.059.18a.494.494 0 0 0-.705.002.504.504 0 0 0-.002.705L3.184 3.72a.493.493 0 0 0 .703 0L6.72.887c.2-.2.194-.51-.001-.705A.504.504 0 0 0 6.012.18L3.536 2.657z" opacity=".5"/>
                                        </svg>
                                    </i>
                                </a>

                            </div><!-- /.table-item table-item-/-md -->

                            <div class="table-item table-item--md">
                                <h5>Vendor</h5>
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
                            :dob="t.patient.dob"
                            :manufacturer="t.patient.power_source.manufacturer"
                            :model="t.patient.power_source.model_id"
                            :name="t.patient.name"
                            :sessionDate="t.session_date"
                            :sessionType="t.session_type"

                            @txArchived="refresh"
                        />
                    </div><!-- /.table__body -->
                </div><!-- /.table -->
            </div><!-- /.profile__body -->
        </div><!-- /.profile -->
    </div><!-- /.content__body -->
</template>

<script>
    import TransmissionRecord from './TransmissionRecord.vue';

    export default {
        data: () => ({
            transmissions: []
        }),
        components: {
            transmissionRecord: TransmissionRecord
        },
        methods: {
            refresh() {
                this.$http.get('/api/v1/reports/transmissions/').then(
                    res => {
                        this.transmissions = res.body;
                    }
                );
            },
        },
    };
</script>
