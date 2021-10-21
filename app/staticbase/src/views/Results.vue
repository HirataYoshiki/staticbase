<template>
  <div class="results">
    <h1>This is a result page</h1>
    <div name="results_table">
      <b-table hover selectable :items="results" head-variant="dark" @row-clicked="goToResult" select-mode="single"></b-table>
      <router-view/>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'results',
    data () {
      return {
        results: [
          {
            result_id: "gsadrgseh",
            name: "test data 1 count",
            bq_table_name: 'test1',
            type: 'avg',
            status: 'saved',
            created_at: '2021-10-17',
            value: {
              data_count: 30,
              average: 2.3
            }
          },
          {
            result_id: "55d",
            name: "test data 2 count",
            bq_table_name: 'test2',
            type: 't-score',
            status: 'saved',
            created_at: '2021-10-17',
            value: {
              result: true,
              score: 0.034
            }
          }
        ],
        selected_result_id: ''
      }
    },
    methods: {
      goToResult (item) {
        if (this.selected_result_id == item.result_id) {
          return
        }
        this.selected_result_id = item.result_id
        this.$router.push({name: 'Result', params: {result_id: item.result_id}})
      }
    }
  }
</script>