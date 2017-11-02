<template>
    <div class="main main--detail">
        <sidebar></sidebar>

        <div class="content content--list">
            <div class="content__inner">
                <div class="content__head">
                    <div class="tile tile--full-width">
                        <div class="tile__inner">
                            <div class="tile__head">

                                <div class="tile__entry">
                                    <h4>Patient Information</h4>
                                    <span>
                                        Last Session: {{ lastSessionDate | moment('LLLL') }}
                                    </span>
                                </div><!-- /.tile__entry -->

                                <div class="tile__entry">
                                    <label for="physician">Physician</label>
                                    <select id="physician" v-model="physicianSelection">
                                        <option :selected="!physician" value>
                                            (None)
                                        </option>
                                        <option
                                            v-for="p of physicians"
                                            :selected="physician === p.id"
                                            :value="p.id"
                                        >
                                            {{ p.name }}
                                        </option>
                                    </select>

                                    <label for="mrn">MRN/Chart #</label>
                                    <input
                                        id="mrn"
                                        ref="mrn"
                                        maxlength="10"
                                        size="12"
                                        type="text"
                                        v-if="mrnEdit"
                                        @blur="disableMrnEdit"
                                        :value="patientDetail.mrn"
                                    >
                                    <span v-else @click="enableMrnEdit">
                                        {{ patientDetail.mrn || "(Not set)"}}
                                    </span>
                                </div><!-- /.tile__entry -->

                            </div><!-- /.tile__head -->

                            <div class="tile__content">
                                <div class="services">
                                    <div class="service service--list">
                                        <div class="service__inner">
                                            <div class="service__head service__head--width">
                                                <h1>{{ patientName }}</h1>

                                                <h6>PATIENT NAME</h6>
                                            </div><!-- /.service__head -->
                                        </div><!-- /.service__inner -->
                                    </div><!-- /.service -->

                                    <div class="service service--list">
                                        <div class="service__inner">
                                            <div class="service__head">
                                                <h1>{{ vendor }}</h1>

                                                <h6>VENDOR</h6>
                                            </div><!-- /.service__head -->
                                        </div><!-- /.service__inner -->
                                    </div><!-- /.service -->

                                    <div class="service service--list">
                                        <div class="service__inner">
                                            <div class="service__head">
                                                <h1>{{ device }}</h1>

                                                <h6>DEVICE</h6>
                                            </div><!-- /.service__head -->
                                        </div><!-- /.service__inner -->
                                    </div><!-- /.service -->
                                </div><!-- /.services -->
                            </div><!-- /.tile__content -->
                        </div><!-- /.tile__inner -->
                    </div><!-- /.tile -->
                </div><!-- /.content__head -->

                <div class="content__body">
                    <div class="profile profile--list">
                        <div class="profile__body">
                            <div class="table table--list">
                                <div class="table__head">
                                    <div class="table-items">
                                        <div class="table-item table-item--lg">
                                            <h5>Session Date</h5>
                                        </div><!-- /.table-item table-item-/-lg -->

                                        <div class="table-item table-item--lg">
                                            <h5>Session Type</h5>
                                        </div><!-- /.table-item table-item-/-md -->

                                        <div class="table-item table-item--lg">
                                            <h5>Session Trigger</h5>
                                        </div><!-- /.table-item table-item-/-md -->

                                        <div class="table-item table-item--sm">
                                        </div><!-- /.table-item table-item-/-md -->
                                    </div><!-- /.table-items -->
                                </div><!-- /.table__head -->

                                <div class="table__body" v-for="tx of patientDetail.transmissions">
                                    <div class="table__group">
                                        <div class="table-items">
                                            <div class="table-item table-item--lg">
                                                <a
                                                    :href="transmissionReportLink(tx.id, {
                                                        should_open: true,
                                                    })"
                                                    target="_blank"
                                                >
                                                    <h5>{{ tx.session_date | moment('MM/DD/YYYY') }}</h5>
                                                </a>
                                            </div><!-- /.table-item table-item-/-lg -->

                                            <div class="table-item table-item--lg">
                                                <p>{{ sessionType(tx.session_type) }}</p>
                                            </div><!-- /.table-item table-item-/-lg -->

                                            <div class="table-item table-item--lg">
                                                <p>{{ tx.session_trigger }}</p>
                                            </div><!-- /.table-item table-item-/-lg -->

                                            <div class="table-item table-item--sm">
                                                <p>
                                                    <a
                                                        :href="transmissionReportLink(tx.id, {
                                                            full_name: true
                                                        })"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15">
                                                            <path fill="#C5D0DE" fill-rule="evenodd" d="M7.241 10.711a1 1 0 0 0 .708.293c.013 0 .023-.007.036-.007L8 11c.337 0 .62-.177.801-.431l2.894-2.882a.997.997 0 0 0 0-1.414 1.004 1.004 0 0 0-1.417 0L9 7.544V1a1 1 0 1 0-2 0v6.62L5.691 6.281a1.003 1.003 0 0 0-1.416 0 .997.997 0 0 0 0 1.414l2.966 3.016zM15 9a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 1 0-2 0v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3a1 1 0 0 0-1-1z"/>
                                                        </svg>
                                                    </a>
                                                </p>
                                            </div><!-- /.table-item table-item-/-lg -->
                                        </div>
                                    </div>
                                </div><!-- /.table__body -->
                            </div><!-- /.table -->
                        </div><!-- /.profile__body -->
                    </div><!-- /.profile -->
                </div><!-- /.content__body -->
            </div><!-- /.content__inner -->

            <div class="content__aside">
                <div class="tile-grey">
                    <div class="tile__inner">
                        <div class="tile__head">
                            <h4>Patient Notes</h4>
                            <span>{{ lastEditedMsg }}</span>
                        </div><!-- /.tile__head -->

                        <div class="tile__content">
                            <div class="box box--notes">
                                <div class="box__inner">
                                    <textarea
                                        id="new-note"
                                        rows="4"
                                        @keyup.esc="disableAddNewNote"
                                        v-if="addingNewNote"
                                        v-model="newNote"
                                    />
                                    <div
                                        class="btn btn--blue"
                                        @click="addNewNote"
                                        v-if="addingNewNote"
                                    >
                                        Add
                                    </div>
                                    <div
                                        class="btn btn--blue btn--symbol"
                                        @click="enableAddNewNote"
                                        v-else
                                    >
                                        +
                                    </div>
                                </div><!-- /.box__inner -->
                            </div>

                            <div class="box box--notes" v-for="n of patientDetail.notes">
                                <i>{{ n.modified | moment('LLLL') }}</i>
                                <div class="ico-close" @click="archivePatientNote(n.id)"></div>
                                <div class="box__inner">
                                    <div class="box__body">
                                        {{ n.content }}
                                    </div>
                                </div><!-- /.box__inner -->
                            </div><!-- /.box -->

                            <div class="box box--notes">
                                <div class="box__inner">
                                    <div class="box__body">
                                        <ul class="list-checks">
                                            <li>
                                                <div class="checkbox">
                                                    <input
                                                        type="checkbox"
                                                        id="anti-coagulated"
                                                        v-model="antiCoagulated"
                                                    />
                                                    <label for="anti-coagulated" class="form-label">
                                                        Anti-coagulated
                                                    </label>
                                                </div><!-- /.checkbox -->
                                            </li>
                                            <li>
                                                <div class="checkbox">
                                                    <input
                                                        type="checkbox"
                                                        id="rate-controlled"
                                                        v-model="rateControlled"
                                                    />
                                                    <label for="rate-controlled" class="form-label">
                                                        Rate Controlled
                                                    </label>
                                                </div><!-- /.checkbox -->
                                            </li>
                                            <li>
                                                <div>
                                                    <label for="has-bled-score" class="form-label">
                                                        HAS-BLED Score
                                                    </label>
                                                    <input
                                                        type="button"
                                                        id="has-bled-score"
                                                        value="Calculate"
                                                    >
                                                </div><!-- /.checkbox -->
                                            </li>
                                        </ul><!-- /.list-checks -->
                                    </div><!-- /.box__body -->
                                </div><!-- /.box__inner -->
                            </div><!-- /.box -->

                            <div class="box box--notes">
                                <div class="box__inner">
                                    <div class="btn btn--blue" @click="transmissionUpdateCover">
                                        UPDATE COVERSHEET
                                    </div><!-- /.box__body -->
                                </div><!-- /.box__inner -->
                            </div><!-- /.box -->

                        </div><!-- /.tile__content -->
                    </div><!-- /.tile__inner -->
                </div><!-- /.tile-grey -->

            </div><!-- /.content__aside -->
        </div><!-- /.content -->
    </div><!-- main -->
</template>

<script>
    import moment from 'moment';
    import queryString from 'query-string';
    import { mapActions, mapMutations, mapState } from 'vuex';
    import { sessionTypesInfo } from './sessions.js';
    import Sidebar from './Sidebar.vue';

    export default {
        components: {
            sidebar: Sidebar,
        },
        data: () => ({
            addingNewNote: false,
            mrnEdit: false,
            newNote: '',
        }),
        computed: {
            ...mapState([
                'patientDetail',
                'physicians',
            ]),
            antiCoagulated: {
                get() {
                    return this.patientDetail.anti_coagulated;
                },
                set(antiCoagulated) {
                    const body = {anti_coagulated: antiCoagulated};
                    const params = {
                        id: this.patientId,
                        body,
                    };
                    this.updatePatientDetail(params);
                },
            },
            rateControlled: {
                get() {
                    return this.patientDetail.rate_control;
                },
                set(rateControlled) {
                    const body = {rate_control: rateControlled};
                    const params = {
                        id: this.patientId,
                        body,
                    };
                    this.updatePatientDetail(params);
                },
            },
            lastEditedMsg() {
                if (this.lastNote) {
                    const timestamp = moment(this.lastNote.modified).format('LLLL');
                    const { first_name: firstName, last_name: lastName } = this.lastNote.modified_by;
                    return `Last edited by: ${firstName} ${lastName} on ${timestamp}`;
                } else {
                    return 'No active notes';
                }
            },
            lastSessionDate() {
                return (this.lastTransmission) ? this.lastTransmission.session_date : '--';

            },
            lastTransmission() {
                return (
                    this.patientDetail.transmissions &&
                    this.patientDetail.transmissions.length > 0
                ) ? this.patientDetail.transmissions[0] : null;
            },
            device() {
                return (
                    this.patientDetail.power_source &&
                    this.patientDetail.power_source.model_id
                );
            },
            lastNote() {
                return (
                    this.patientDetail.notes &&
                    this.patientDetail.notes.length > 0
                ) ? this.patientDetail.notes[0] : '';
            },
            patientId() {
                return this.$route.params.id;
            },
            patientName() {
                return (
                    this.patientDetail.name &&
                    this.patientDetail.name.trim().toUpperCase()
                );
            },
            vendor() {
                return (
                    this.patientDetail.power_source &&
                    this.patientDetail.power_source.manufacturer
                );
            },
            physician() {
                return this.patientDetail.cardiologist;
            },
            physicianSelection: {
                get() {
                    return this.patientDetail.cardiologist;
                },
                set(physician) {
                    const params = {
                        id: this.patientId,
                        body: {cardiologist: physician},
                    };
                    this.updatePatientDetail(params);
                },
            },
        },
        methods: {
            ...mapActions([
                'refreshPatientDetail',
                'refreshPhysicians',
                'createPatientNote',
                'updatePatientDetail',
                'updatePatientNote',
            ]),
            ...mapMutations([
                'removeNote',
            ]),
            addNewNote() {
                const body = {
                    content: this.newNote,
                    patient: this.patientId,
                };
                this.createPatientNote(body).then(() =>{
                    this.clearNewNote();
                    this.disableAddNewNote();
                    this.refreshPatientDetail(this.patientId);
                });
            },
            disableAddNewNote() {
                this.addingNewNote = false;
            },
            enableAddNewNote() {
                this.addingNewNote = true;
            },
            clearNewNote() {
                this.newNote = ''
            },
            archivePatientNote(noteId) {
                const body = {archived: true};
                const params = {
                    id: noteId,
                    body,
                };
                this.updatePatientNote(params).then(() => {
                    this.removeNote(noteId);
                });
            },
            disableMrnEdit() {
                const body = {mrn: this.$refs.mrn.value};
                if (body.mrn.match(/^[0-9]*$/)) {
                    this.mrnEdit = false;
                    const params = {
                        id: this.patientId,
                        body,
                    };
                    this.updatePatientDetail(params);
                }
            },
            enableMrnEdit() {
                this.mrnEdit = true;
            },
            sessionType(sessionCode) {
                return sessionTypesInfo[sessionCode];
            },
            transmissionReportLink(txId, params) {
                const baseUrl = `/api/v1/reports/transmissions/${txId}/full-report/`;
                const queryParams = queryString.stringify(params);
                return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
            },
            transmissionUpdateCover() {
                const url = `/api/v1/reports/transmissions/update-latest-cover/`;
                const params = {patient_id: this.patientId};
                this.$http.get(url, {params});
            },
        },
        mounted() {
            this.refreshPatientDetail(this.patientId);
            this.refreshPhysicians();
        },
    };
</script>
