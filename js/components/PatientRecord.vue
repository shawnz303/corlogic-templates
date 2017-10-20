<template>
    <div class="table__group">
      <div class="table-items">
          <div class="table-item table-item--lg">
              <router-link to="/patient-detail">
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
            'dob',
            'manufacturer',
            'model',
            'name',
        ],
    };
</script>
