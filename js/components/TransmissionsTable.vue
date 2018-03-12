<template>
    <div class="content__body">

        <modal
            name="txBillAction"
            :height="'75px'"
            :width="'250px'"
            :resizable="true"
        >
            <div class="modal--header">
                <h5>Bill this transmission?</h5>
            </div>
            <div class="btn--group__modal">
                <div class="btn btn--green" @click="billTransmsission( txEdit.id )">
                    Yes
                </div>
                <div class="btn btn--blue" @click="$modal.hide('txBillAction')">
                    No
                </div>
            </div>
        </modal>
        <modal
            name="txNoteEdit"
            :clickToClose="true"
            :resizable="true"
            :height="auto"
            @before-open="txNoteEdit"
        >
            <div class="modal--header">
                <h5>Transmission Note</h5>
                <ul>
                    <li>Patient: {{ txEdit.patientName }}</li>
                    <li>Transmission date: {{ txEdit.sessionDate | moment('MM/DD/YYYY') }}</li>
                </ul>
            </div>
            <textarea class="textarea__modal" ref="txNote" rows="4">{{ txEdit.notes }}</textarea>
            <div class="btn--group__modal" v-if="txEdit.withDownload">
                <label class="form-check-label">
                    <input style="margin-left:12em;" class="form-check-input" type="checkbox" id="archiveCheckbox" :checked="booleanValue" :value="false" v-model="txEdit.archived">Archive
                </label>
                <br/>
                <div class="row">
                    <div class="col-md-6 btn btn--blue" @click="saveTxNote">
                        Save and Close
                    </div>
                    <div class="col-md-6 btn btn--green" @click="saveTxNote(true)">
                        Save and Download
                    </div>
                </div>
            </div>
            <div class="btn--group__modal" v-if="!txEdit.withDownload">
                <div class="btn btn--blue" @click="saveTxNote">
                    Save and Close
                </div>
                <div class="btn btn--blue" @click="$modal.hide('txNoteEdit')">
                    Cancel
                </div>
            </div>
        </modal>

        <div class="profile">
            <div class="profile__head">
                <h4>{{ dataSource }}</h4>
                <div class="btn btn--blue" @click="clearSearch" v-if="lastSearchQuery">
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
                                <h5>Name</h5>
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

                            <div
                                class="table-item table-item--lg table__head--actionable"
                                @click="sortByDateOfService"
                            >
                                <h5>Date of Service</h5>
                                <i class="ico-arrow-dropdown">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4">
                                        <path
                                            fill="#354052"
                                            fill-rule="evenodd" d="M3.536 2.657L1.059.18a.494.494 0 0 0-.705.002.504.504 0 0 0-.002.705L3.184 3.72a.493.493 0 0 0 .703 0L6.72.887c.2-.2.194-.51-.001-.705A.504.504 0 0 0 6.012.18L3.536 2.657z"
                                            opacity=".5"
                                            :transform="arrowTransform(sortOrderDateOfService, 7, 4)"/>
                                        />
                                    </svg>
                                </i>
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
                            v-for="t in records"

                            :id="t.id"
                            :alerts="t.hl7_alerts"
                            :archived="t.archived"
                            :manufacturer="t.patient.power_source.manufacturer"
                            :model="t.patient.power_source.model_id"
                            :name="t.patient.name"
                            :notes="t.notes"
                            :patientId="t.patient.id"
                            :reportDoc="t.report_doc"
                            :sessionDate="t.session_date"
                            :sessionType="t.session_type"
                            :sessionTrigger="t.session_trigger"
                            :billable="isBillable(t)"
                            :billed="isBilled(t)"
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
    import queryString from 'query-string';

    export default {
        props: {
            header: {
                default: 'New Transmissions',
            },
        },
        components: {
            transmissionRecord: TransmissionRecord
        },
        data: () => ({
            sortOrderAlert: -1,
            sortOrderDateOfService: -1,
            txEdit: {
                id: -1,
                notes: '',
                patientId: -1,
                patientName: '',
                sessionDate: '',
                billable: false,
                billed: false,
            },
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
                    this.header;
            },
        },
        methods: {
            ...mapActions([
                'clearSearch',
                'refresh',
                'updateSingleRecord',
                'archive',
                'bill',
            ]),
            ...mapMutations([
                'remove',
                'sortRecords',
            ]),
            arrowTransform(sortOrder, width, height) {
                const rotation = -sortOrder * 90 + 90;
                width = width || 0;
                height = height || 0;
                return `rotate(${rotation} ${width/2.} ${height/2.})`;
            },
            sortByAlert() {
                this.sortOrderAlert *= -1;
                this.sortRecords((sortOrder => (a, b) => {
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
            sortByDateOfService() {
                this.sortOrderDateOfService *= -1;
                this.sortRecords((sortOrder => (a, b) => {
                    return (
                        a.session_date < b.session_date ? -1 :
                        a.session_date > b.session_date ? 1 :
                        0
                    ) * sortOrder;
                })(this.sortOrderDateOfService));
            },
            saveTxNote(withDownload) {
                const params = {
                    id: this.txEdit.id,
                    body: {notes: this.$refs.txNote.value, archived:this.txEdit.archived},
                };
                if (this.txEdit.billable && this.txEdit.billed === false){
                    this.$modal.show('txBillAction', {txEdit: this.txEdit})
                }
                this.updateSingleRecord(params)
                    .then(() => {
                        const url = `/api/v1/reports/transmissions/update-latest-cover/`;
                        const params = {patient_id: this.txEdit.patientId};
                        this.$http.get(url, {params});
                    })
                    .then(() =>{
                            this.$modal.hide('txNoteEdit');
                            if (this.txEdit.archived===true){
                                this.archive(this.txEdit.id);
                            }
                            if (withDownload===true){
                                window.open(this.transmissionReportLink(this.txEdit.id, {full_name: true}), '_blank');
                            }
                        }
                    );
            },
            txNoteEdit(e) {
                this.txEdit = e.params.txEdit;
            },
            transmissionReportLink(txId, params) {
                const baseUrl = `/api/v1/reports/transmissions/${txId}/full-report/`;
                const queryParams = queryString.stringify(params);
                return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
            },
            billTransmsission(id){
                this.$modal.hide('txBillAction');
                this.bill(id); // yes, transmission id is also the billing id

            },
            isBillable(t){
                return t.billing ? true : false;
            },
            isBilled(t){
                return (t.billing && t.billing.billed) ? true : false;
            }

        },
    };
</script>
