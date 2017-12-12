<template>
    <div class="table__group">
        <div class="table-items">

            <div class="table-item table-item--lg table-item--fluid">
                <h5>
                    <router-link :to="patientDetailLink">
                        {{ patientName }}
                    </router-link>
                </h5>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--sm table-item--fluid">
                <p>{{ patientNumber }}</p>
            </div><!-- /.table-item table-item-/-sm table-item-/-fluid -->

            <div class="table-item table-item--md table-item--fluid">
                <p>{{ patientLocation }}</p>
            </div><!-- /.table-item table-item-/-md table-item-/-fluid -->

            <div class="table-item table-item--md table-item--fluid">
                <p>{{ patientDob | moment('MM/DD/YYYY') }}</p>
            </div><!-- /.table-item table-item-/-md table-item-/-fluid -->

            <div class="table-item table-item--md table-item--fluid">
                <p>{{ dos | moment('MM/DD/YYYY') }}</p>
            </div><!-- /.table-item table-item-/-md table-item-/-fluid -->

            <div class="table-item table-item--md table-item--fluid">
                <p>{{ doctorName }}</p>
            </div><!-- /.table-item table-item-/-md table-item-/-fluid -->

            <div class="table-item table-item--sm table-item--fluid">
                <p>{{ processedByLabel }}</p>
            </div><!-- /.table-item table-item-/-sm table-item-/-fluid -->

            <div class="table-item table-item--md table-item--fluid">
                <ul><li v-for="c of cptCodes">{{ c }}</li></ul>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

            <div class="table-item table-item--lg table-item--fluid">
                <select v-model="dxCodeSelection">
                    <option :selected="!dxCode" value>
                        (None)
                    </option>
                    <option v-for="c of dxCodes" :selected="dxCode === c.value" :value="c.value">
                        {{ c.description }}
                    </option>
                </select>
            </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

        </div><!-- /.table-items -->
    </div><!-- /.table__group -->
</template>

<script>
    import { mapActions } from 'vuex';
    import { dxCodes } from './dx-codes.js';
    import { processorLabels } from './processor-labels.js';

    export default {
        props: [
            'id',
            'cptCodes',
            'doctorName',
            'dxCode',
            'dos',
            'patientDob',
            'patientId',
            'patientLocation',
            'patientName',
            'patientNumber',
            'processedBy',
        ],
        computed: {
            dxCodeSelection: {
                get() {
                    return this.dxCode;
                },
                set(dxCode) {
                    const params = {
                        id: this.id,
                        body: {dx_code: dxCode},
                    };
                    this.updateSingleRecord(params);
                },
            },
            dxCodes() {
                return Object.keys(dxCodes).map(
                    value => ({
                        value,
                        description: dxCodes[value]
                    })
                );
            },
            patientDetailLink() {
                return `/patient-detail/${this.patientId}/`;
            },
            processedByLabel() {
                return processorLabels.find(elem => elem.code == this.processedBy).label;
            },
        },
        methods: {
            ...mapActions([
                'updateSingleRecord',
            ]),
        },
    };
</script>
