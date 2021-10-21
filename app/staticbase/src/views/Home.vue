<template>
  <div class="home">
    <h1>データ解析</h1>
    <h2>ファイルを選択してデータを読み込む</h2>
    <b-container fluid>
      <b-row class="justify-content-md-center">
        <b-col lg="9" cols="12">
          <b-form>
            <b-form-group>
              <b-button @click="calculate">calculate</b-button>
            </b-form-group>
            <b-form-group>
              <csvLoader
                :csvContentSetter="csvSetter"
              />
            </b-form-group>
            <b-form-group>
              <b-table hover sticky-header :items="items" :fields="fields"/>
            </b-form-group>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import csvLoader from '/app/staticbase/src/components/csvLoader.vue'
import Calcs from '@/statics/calcs.js'
  export default {
    name: 'Home',
    components: {
      csvLoader
    },
    data () {
      return {
        items: [],
        fields: [],
        results: null
      }
    },
    methods: {
      csvSetter: function (csv) {
        this.fields = csv[0]
        this.items = csv
        this.items.shift()
        this.items.pop()
        this.items = this.items.map((line) => {
          var res = {}
          this.fields.forEach((field,i) => {
            res[field] = line[i]
          })
          return res
        })
      },
      calculate () {
        var c = new Calcs(this.fields, this.items)
        this.results = c.getEDA()
      }
    }
  }
</script>
