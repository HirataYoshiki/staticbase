<template>
  <b-form-file
    v-model="csv"
    :state="Boolean(csv)"
    placeholder="Choose a file or drop it here..."
    accept=".csv"
    @change="onFileChange"
  ></b-form-file>
</template>
<script>
  export default {
    name: 'csvLoader',
    props: {
      csvContentSetter: Function
    },
    data () {
      return {
        csv: null,
        csvStructure: null,
        encoders: [
          'utf-8',
          'cp-932',
          'ms-932'
        ],
        selectedEncoder: 'utf-8'
      }
    },
    methods: {
      onFileChange: async function (e) {
        var c = e.target.files[0]
        c.text().then((text) => {
          var csvStructure = text.split('\n').map((line) => {
            return line.split(',')
          })
          this.csvStructure = csvStructure
          this.csvContentSetter(csvStructure)
        })
      }
    } 
  }  
</script>