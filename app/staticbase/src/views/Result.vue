<template>
  <div name="result">
    <div name="eda">
      <v-data-table
        :headers="headers"
        :items="items"
      />
    </div>
    <div name="line-graph">

    </div>
  </div>
</template>
<script>
 export default {
    name: 'result',
    props: {
      eda_headers: Array,
      eda_items: Array,
      result_id: String,
    },
    data () {
      return {
        headers: [],
        items: [],
        id: null
      }
    },
    watch:{
      result_id: function (val) {
        this.id = val
      },
      eda_headers: function (val) {
        this.headers = val
      },
      eda_items: function (val) {
        this.items = val
      }
    }
  }
</script>