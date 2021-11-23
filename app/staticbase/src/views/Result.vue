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
        headers: null,
        items: null
      }
    },
    watch:{
      result_id: function (val) {
        this.result_id = val
      },
      eda_headers: function (val) {
        this.eda_headers = val
        this.headers = this.eda_headers
        this.headers.unshift(
          {
            text: '',
            value: 'item'
          }
        )
      },
      eda_items: function (val) {
        const itemList = ['サンプル数','平均', '分散', '標準偏差']
        this.eda_items = val
        this.items = this.eda_items
        this.items.forEach((obj,i) => {
          obj.item = itemList[i]
        })
      }
    }
  }
</script>