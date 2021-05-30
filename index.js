// Your code here
let employeeRecords = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300],
    ["Byron", "Poodle", "Mascot", 3],
    ["Julius", "Caesar", "General", 27],
    ["Rafiki", "", "Aide", 10],
    ["Simba", "", "King", 100]
  ]
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

//  console.log(createEmployeeRecord(employeeRecords[0]))
//  {
//      firstName: 'Thor',
//          familyName: 'Odinsson',
//              title: 'Electrical Engineer',
//                  payPerHour: 45,
//                      timeInEvents: [],
//                          timeOutEvents: []
//  }

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

//console.log(createEmployeeRecords(employeeRecords))
    //[
    //    {
    //        firstName: 'Thor',
    //        familyName: 'Odinsson',
    //        title: 'Electrical Engineer',
    //        payPerHour: 45,
    //        timeInEvents: [],
    //        timeOutEvents: []
    //    },....and so on for each Array in the Array
    //  ]   

let createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

//  let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
//  console.log(createTimeInEvent(bpRecord, "2014-02-28 1400"))
//      {
//          firstName: 'Byron',
//              familyName: 'Poodle',
//                  title: 'Mascot',
//                      payPerHour: 3,
//                          timeInEvents: [{ time: 'TimeIn', hour: 1400, date: '2014-02-28' }],
//                              timeOutEvents: []
//      }

let createTimeOutEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

//  console.log(createTimeOutEvent(bpRecord, "2015-02-28 1700"))
//  {
//      firstName: 'Byron',
//          familyName: 'Poodle',
//              title: 'Mascot',
//                  payPerHour: 3,
//                      timeInEvents: [],
//                          timeOutEvents: [{ type: 'TimeOut', hour: 1700, date: '2015-02-28' }]
//  }

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e) {
        return e.date === soughtDate
    })

    return ((outEvent.hour - inEvent.hour) / 100)
}

//  cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
//  updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
//  updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
//  console.log(hoursWorkedOnDate(cRecord, "0044-03-15"))
//      => 2

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour
    return parseFloat(rawWage.toString())
}

//  console.log(wagesEarnedOnDate(cRecord, "0044-03-15"))
//      => 54

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

//  updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
//  updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
//  console.log(allWagesFor(cRecord))
//      => 378

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

//  let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
//  let sRecord = createEmployeeRecord(["Simba", "", "King", 100])
//  
//  let sTimeData = [
//      ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
//      ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
//  ]
//  
//  let rTimeData = [
//      ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
//      ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
//  ]
//  
//  sTimeData.forEach(function (d) {
//      let [dIn, dOut] = d
//      sRecord = createTimeInEvent(sRecord, dIn)
//      sRecord = createTimeOutEvent(sRecord, dOut)
//  })
//  
//  rTimeData.forEach(function (d, i) {
//      let [dIn, dOut] = d
//      rRecord = createTimeInEvent(rRecord, dIn)
//      rRecord = createTimeOutEvent(rRecord, dOut)
//  })
//  
//  let employees = [sRecord, rRecord]
//  console.log(calculatePayroll(employees))
//      => 700

