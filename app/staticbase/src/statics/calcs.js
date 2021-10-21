export default class Calcs {
  constructor (fields = [], items = []) {
    this.fields = fields
    this.items = this.validated(items)
  }

  validated (items) {
    return items.map((line) => {
      var keys = Object.keys(line)
      var values = []
      keys.forEach((key) => {
        values.push(Number(line[key]))
      })
      return values
    })
  }

  _getStraightLine (field) {
    var idx = this.fields.indexOf(field)
    return this.items.map((line)=> {
      return line[idx]
    })
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
      acc + (cur - average)^2
    })/num
  }

  _getStdev(array = [], pre = false) {
    return (this._getVariance(array, pre))^(1/2)
  }

  getEDA () {
    var counts = [{}]
    var averages = [{}]
    var variances = [{}]
    var stdevs = [{}]

    this.fields.forEach((field) => {
      var itemLine = this._getStraightLine(field)
      console.log(`straightLine: ${itemLine}, type: ${typeof(itemLine)}`)
      var cnt = itemLine.length
      var avg = this._getAverage(itemLine)
      var val = this._getVariance(itemLine)
      var std = this._getStdev(itemLine)

      counts[0][field] = cnt
      averages[0][field] = avg
      variances[0][field] = val
      stdevs[0][field] = std
    })
    return {counts,averages,variances,stdevs}
  }
}