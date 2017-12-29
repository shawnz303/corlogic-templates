<template>
    <div class="table__group">
        <div class="table-items">

            <div class="table-item table-item--md table-item--fluid">
                <p>{{ sessionDate | moment('MM/DD/YYYY') }}</p>
            </div><!-- /.table-item table-item-/-md table-item-/-fluid -->

            <div class="table-item table-item--md table-item--fluid">
                <h5>{{ name }}</h5>
            </div><!-- /.table-item table-item-/-md table-item-/-fluid -->

            <div class="table-item table-item--md table-item--fluid">
                <input
                    id="mrn"
                    ref="mrn"
                    maxlength="10"
                    size="12"
                    type="text"
                    v-if="mrnEdit"
                    @blur="disableMrnEdit"
                    :value="ptId"
                >
                <span v-else @click="enableMrnEdit">
                    <div v-if="ptId">{{ ptId }}</div>
                    <div v-else>
                        <img :src="pencilImgSrc" alt="Edit patient ID">
                    </div>
                </span>
            </div><!-- /.table-item table-item-/-md table-item-/-fluid -->

            <div class="table-item table-item--md table-item--fluid">
                <p>{{ manufacturer }}</p>
            </div><!-- /.table-item table-item-/-md table-item-/-fluid -->

            <div class="table-item table-item--md table-item--fluid">
                <p>{{ model }}</p>
            </div><!-- /.table-item table-item-/-md table-item-/-fluid -->

            <div class="table-item table-item--md table-item--fluid">
                <p>{{ serialNumber }}</p>
            </div><!-- /.table-item table-item-/-md table-item-/-fluid -->

            <div class="table-item table-item--sm table-item--fluid">
                <i class="ico-search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                        <path fill="#CED0DA" fill-rule="evenodd" d="M9.222 3.033a4.376 4.376 0 1 0-6.19 6.19 4.376 4.376 0 1 0 6.19-6.19m4.552 10.741a.877.877 0 0 1-1.239 0L9.78 11.017c-2.4 1.794-5.804 1.624-7.984-.557a6.126 6.126 0 0 1 0-8.665 6.126 6.126 0 0 1 8.665 0c2.181 2.18 2.351 5.584.557 7.984l2.757 2.757a.876.876 0 0 1 0 1.238"/>
                    </svg>
                </i>
            </div><!-- /.table-item table-item-/-sm table-item-/-fluid -->

            <div class="table-item table-item--sm table-item--fluid">
                <img :src="pencilImgSrc" alt="Edit transmission notes">
            </div><!-- /.table-item table-item-/-sm table-item-/-fluid -->

            <div class="table-item table-item--md table-item--fluid">
                <div v-if="sessionTypeHumanized">{{ sessionTypeHumanized }}</div>
            </div><!-- /.table-item table-item-/-md table-item-/-fluid -->

            <div class="table-item table-item--sm table-item--fluid">
                <div class="checkbox">
                    <input type="checkbox" :id="refName" :ref="refName"/>
                    <label class="form-label" :for="refName"></label>
                </div>
            </div><!-- /.table-item table-item-/-sm table-item-/-fluid -->

        </div><!-- /.table-items -->
    </div><!-- /.table__group -->
</template>

<script>
    import { mapActions } from 'vuex';
    import { alertsInfo } from './alerts';
    import { sessionTypesInfo } from './sessions';

    export default {
        props: [
            'id',
            'manufacturer',
            'model',
            'name',
            'serialNumber',
            'sessionDate',
            'sessionTrigger',
            'sessionType',
        ],
        data: () => ({
            mrnEdit: false,
            ptId: null,
            pencilImgSrc,
        }),
        computed: {
            refName() {
                return `import-${this.id}`;
            },
            sessionTypeHumanized() {
                return sessionTypesInfo[this.sessionType];
            },
        },
        methods: {
            ...mapActions([
                'import',
            ]),
            alertColour(alert) {
                return alertsInfo.find(elem => elem.code === alert).colour;
            },
            disableMrnEdit() {
                this.ptId = this.$refs.mrn.value;
                this.mrnEdit = false;
            },
            enableMrnEdit() {
                this.mrnEdit = true;
            },
            importIfSelected() {
                if (this.$refs[this.refName].checked) {
                    const body = {mrn: this.ptId};
                    const params = {
                        id: this.id,
                        body,
                    };
                    this.import(params);
                }
            },
        },
        created() {
            this.$bus.$on('importSelectedUploads', this.importIfSelected);
        },
    };
</script>
