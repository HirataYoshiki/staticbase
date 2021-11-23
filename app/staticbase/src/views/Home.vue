<template>
  <div id="home" class="justify-content-md-center">
    <h1>データ解析</h1>
    <h2>ファイルを選択してデータを読み込む</h2>
    <v-container fluid>
      <v-row justify="content-md-center">
        <v-col md="4" cols="12" class="mr-2">
          <v-form ref="form">
            <v-text-field
              v-model="input.title"
              label="Title"
            />
            <v-textarea
              v-model="input.description"
              label="Description"
              />
            <csvLoader
              :csvContentSetter="csvSetter"
            />
            <v-btn class="mr-4" @click="calculate" color="primary">Calculate</v-btn>
            <v-btn class="mr-4" @click="reset" color="pink">Reset</v-btn>
          </v-form>
          <v-data-table
            :headers="view.fields"
            :items="view.items"
            :items-per-page="10"
          />
        </v-col>
        <v-col md="4" cols="12" v-if="results">
          <Result :eda_items="results" :eda_headers="view.fields" :result_id="'preview'"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import csvLoader from '/app/staticbase/src/components/csvLoader.vue'
import Calcs from '@/statics/calcs.js'
import Result from '@/views/Result.vue'
  export default {
    name: 'Home',
    components: {
      csvLoader,
      Result
    },
    data () {
      return {
        input: {
          title: null,
          description: null
        },
        view: {
          items: [],
          fields: []
        },
        raw: {
          items: [],
          fields: []
        },
        results: null
      }
    },
    methods: {
      csvSetter: function (csv) {
        this.view.fields = csv[0].map((value) => {
          return {
            text: value,
            value: value
          }
        })
        this.raw.fields = csv[0]
        this.view.items = csv
        this.raw.items = csv
        this.view.items.shift()
        this.view.items.pop()
        this.view.items = this.view.items.map((line) => {
          var res = {}
          this.raw.fields.forEach((field,i) => {
            res[field] = line[i]
          })
          return res
        })
      },
      calculate () {
        var c = new Calcs(this.raw.fields, this.raw.items)
        this.results = c.getEDA()
      },
      reset () {
        this.input = {
          title: null,
          description: null
        }
        this.view.items = []
        this.raw.items = []
        this.view.fields = []
        this.raw.fields = []
        this.results = null
      }
    }
  }
</script>