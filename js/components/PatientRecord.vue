<template>
    <div class="table__group">
      <div class="table-items">
          <div class="table-item table-item--lg">
              <router-link :to="patientDetailLink">
                  <h5>{{ name }}</h5>
              </router-link>
          </div><!-- /.table-item table-item-/-lg table-item-/-fluid -->

          <div class="table-item table-item--lg">
              <h5>{{ dob | moment('MM/DD/YYYY') }}</h5>
          </div><!-- /.table-item table-item-/-md table-item-/-fluid -->

          <div class="table-item table-item--lg">
              <h5>{{ manufacturer }}</h5>
          </div><!-- /.table-item table-item-/-md table-item-/-fluid -->

          <div class="table-item table-item--lg">
              <p>{{ model }}</p>
          </div><!-- /.table-item table-item-/-md table-item-/-fluid -->
      </div><!-- /.table-items -->
    </div><!-- /.table__group -->
</template>

<script>
    export default {
        props: [
            'id',
            'dob',
            'manufacturer',
            'model',
            'name',
        ],
        computed: {
            patientDetailLink() {
                return `/patient-detail/${this.id}/`;
            },
        },
    };
</script>
