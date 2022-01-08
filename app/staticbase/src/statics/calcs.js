var jStat = require('jstat')

export default class Calcs {
  constructor (fields = [], items = []) {
    this.fields = fields
    this.items = this._convertItems(items)
    this.fieldsForResult = this._getFieldsForResult(fields)
  }

  _convertItems (items) {
    var j = jStat.transpose(items)
    j = j.map((line) => {
      return line.map((e) => Number(e))
    })
    return j
  }

  _getFieldsForResult (fields = []) {
    var res = [{text: '', value: 'item'}]
    fields.forEach((field) => {
      res.push({text: field, value: field})
    })
    return res
  }

  _getStraightLine (field) {
    var idx = this.fields.indexOf(field)
    return this.items[idx]
  }

  _getAverage(array=[]) {
    let num = array.length
    var sum = array.reduce((acc, cur) => {
      return acc + cur
    })
    return sum/num
  }

  _getVariance(array=[], pre = false) {
    var num = array.length
    if (pre) {
      num += -1
    }
    var average = this._getAverage(array)
    return array.reduce((acc, cur) => {
      return acc + (cur - average)**2
    })/num
  }

  _getStdev(array = [], pre = false) {
    return (this._getVariance(array, pre))**(1/2)
  }

  getEDA () {
    var counts = {item: 'サンプル数'}
    var averages = {item: '平均'}
    var variances = {item: '分散'}
    var stdevs = {item: '標準偏差'}

    this.fields.forEach((field) => {
      var itemLine = this._getStraightLine(field)
      var cnt = itemLine.length
      var avg = this._getAverage(itemLine)
      var val = this._getVariance(itemLine)
      var std = this._getStdev(itemLine)

      counts[field]    = Math.round(cnt*100)/100
      averages[field]  = Math.round(avg*100)/100
      variances[field] = Math.round(val*100)/100
      stdevs[field]    = Math.round(std*100)/100
    })
    return [counts,averages,variances,stdevs]
  }

  getTukeyhsd(fields = ['column1', 'column2']) {
    var container = []
    fields.forEach((field) => {
      container.push(this._getStraightLine(field))
    })
    console.log(container[0])
    var jstat_turkey = jStat.tukeyhsd(container)
    return jstat_turkey
  }
}