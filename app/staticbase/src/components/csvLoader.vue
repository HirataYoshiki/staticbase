<template>
  <v-file-input
    label="Choose a csv file..."
    accept=".csv"
    v-model="csv"
    v-on:change="onFileChange"
  ></v-file-input>
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
      onFileChange: async function (file) {
        const result = await new Promise((resolve) => {
          var reader = new FileReader()
          reader.readAsText(file)
          reader.onload = () => {
            resolve(reader.result)
          }
        })

        if (!this.csv) {
          this.csvStructure = null
          return
        }
        this.csvStructure = result.split('\n').map((line) => {
          return line.split(',')
        })
        this.csvContentSetter(this.csvStructure)
    
      }
    }
  }  
</script>