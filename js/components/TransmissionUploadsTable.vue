<template>
    <div class="content__head">
        <div class="preview">
            <div class="profile">
                <div class="profile__head">
                    <h4>Preview Sessions</h4>
                    <transition-button
                        :callPromise="importUploads"
                        :normalText="'Import Selected'"
                        :transitionText="'Importing'"
                        v-if="selected"
                    >
                    </transition-button>
                </div>
                <div class="profile__body">
                    <div class="table">
                        <div class="table__head">
                            <div class="table-items">
                                <div class="table-item table-item--md table-item--fluid">
                                    <h5>Session Date</h5>
                                </div>
                                <div class="table-item table-item--md table-item--fluid">
                                    <h5>Patient Name</h5>
                                </div>
                                <div class="table-item table-item--md table-item--fluid">
                                    <h5>Pt. ID</h5>
                                </div>
                                <div class="table-item table-item--md table-item--fluid">
                                    <h5>Manufacturer</h5>
                                </div>
                                <div class="table-item table-item--md table-item--fluid">
                                    <h5>Model</h5>
                                </div>
                                <div class="table-item table-item--md table-item--fluid">
                                    <h5>Serial No.</h5>
                                </div>
                                <div class="table-item table-item--sm table-item--fluid">
                                    <h5>PDF</h5>
                                </div>
                                <div class="table-item table-item--sm table-item--fluid">
                                    <h5>Notes</h5>
                                </div>
                                <div class="table-item table-item--md table-item--fluid">
                                    <h5>Session Type</h5>
                                </div>
                                <div class="table-item table-item--sm table-item--fluid">
                                    <h5>Import</h5>
                                </div>
                            </div>
                        </div>

                        <div class="table__body">
                            <transmission-preview
                                v-for="tp in records"

                                :id="tp.id"
                                :manufacturer="tp.data['Manufacturer']"
                                :model="tp.data['Model']"
                                :name="tp.data['Patient Name']"
                                :serialNumber="tp.data['Serial Number']"
                                :sessionDate="tp.data['Date of Service']"
                                :sessionTrigger="tp.data['Session Trigger']"
                                :sessionType="tp.data['Session Type']"
                            >
                            </transmission-preview>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { alertsInfo } from './alerts';
    import { sessionTypesInfo } from './sessions';
    import TransitionButton from './TransitionButton.vue';
    import TransmissionPreview from './TransmissionPreview.vue';

    export default {
        components: {
            TransitionButton,
            TransmissionPreview,
        },
        computed: {
            ...mapState([
                'records',
            ]),
            selected() {
                return true;
            },
        },
        methods: {
            importUploads() {
                return this.$bus.$emit('importSelectedUploads');
            },
        },
    };
</script>
