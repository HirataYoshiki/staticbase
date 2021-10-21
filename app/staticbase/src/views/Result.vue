<template>
  <div name="result">
    <h1>{{result_id}}</h1>
  </div>
</template>
<script>
 export default {
    name: 'result',
    props: {
      result_id: {
        type: String
      }
    },
    watch:{
      result_id: function (val) {
        this.result_id = val
      }
    }
  }
</script>