class QueryService {
  constructor(){
    this.query = {}
  }

  singleDates(year, month, day){
    if (year) { this.query['properties.year'] = year }
    if (month) { this.query['properties.month'] = month }
    if (day) { this.query['properties.day'] = day }
  }

  betweenDates(yearStart, yearEnd, monthStart, monthEnd, dayStart, dayEnd){
    if (yearStart) {
      this.query['properties.year'] = {}
      this.query['properties.year']['$gte'] = yearStart
    }
    if (yearEnd) {
      if(this.query['properties.year'] === undefined) {this.query['properties.year'] = {} }
      this.query['properties.year']['$lte'] = yearEnd
    }

    if (monthStart) {
      this.query['properties.month'] = {}
      this.query['properties.month']['$gte'] = monthStart
    }
    if (monthEnd) {
      if(this.query['properties.month'] === undefined) {this.query['properties.month'] = {} }
      this.query['properties.month']['lte'] = monthEnd
    }

    if (dayStart) {
      this.query['properties.day'] = {}
      this.query['properties.day']['$gte'] = dayStart
    }
    if (dayEnd) {
      if(this.query['properties.day'] === undefined) {this.query['properties.day'] = {} }
      this.query['properties.day']['$lte'] = dayEnd
    }
  }

  getQuery(year,month,day,yearStart,yearEnd,monthStart,monthEnd,dayStart,dayEnd){
    this.query = {}

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
