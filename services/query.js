class QueryService {
  constructor(){
    this.query = {}
  }

  singleDates(year, month, day){
    if (year) { this.query['properties.year'] = parseInt(year) }
    if (month) { this.query['properties.month'] = parseInt(month) }
    if (day) { this.query['properties.day'] = parseInt(day) }
  }

  betweenDates(yearStart, yearEnd, monthStart, monthEnd, dayStart, dayEnd){
    if (yearStart) {
      this.query['properties.year'] = {}
      this.query['properties.year']['$gte'] = parseInt(yearStart)
    }
    if (yearEnd) {
      if(this.query['properties.year'] === undefined) {this.query['properties.year'] = {} }
      this.query['properties.year']['$lte'] = parseInt(yearEnd)
    }

    if (monthStart) {
      this.query['properties.month'] = {}
      this.query['properties.month']['$gte'] = parseInt(monthStart)
    }
    if (monthEnd) {
      if(this.query['properties.month'] === undefined) {this.query['properties.month'] = {} }
      this.query['properties.month']['lte'] = parseInt(monthEnd)
    }

    if (dayStart) {
      this.query['properties.day'] = {}
      this.query['properties.day']['$gte'] = parseInt(dayStart)
    }
    if (dayEnd) {
      if(this.query['properties.day'] === undefined) {this.query['properties.day'] = {} }
      this.query['properties.day']['$lte'] = parseInt(dayEnd)
    }
  }

  getQuery(year,month,day,yearStart,yearEnd,monthStart,monthEnd,dayStart,dayEnd){
    if(this.query === false){
      this.query = {}
    }

    if((year||month||day) && (yearStart||yearEnd||monthStart||monthEnd||dayStart||dayEnd)){
      this.query = false
    } else if (year || month || day) {
      this.singleDates(year, month, day)
    } else if (yearStart||yearEnd||monthStart||monthEnd||dayStart||dayEnd) {
      this.betweenDates(yearStart, yearEnd, monthStart, monthEnd, dayStart, dayEnd)
    }

    return this.query
  }
}

module.exports = new QueryService()
