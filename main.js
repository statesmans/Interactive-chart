// Here may be your database
let dataBase = [
    {
        date: "26-10-2020",
        data: {
            proceeds: "500521",
            cash: "300000",
            cashless: "100000",
            creditCard: "100521",
            middleCheck: "1300",
            middleGuest: "1200",
            deleteFromCheck: "1000",
            deleteFromBill: "1300",
            checkCount: "34",
            guestCount: "34"
        }
    },
    {
        date: "01-11-2020",
        data: {
            proceeds: "480521",
            cash: "309000",
            cashless: "103000",
            creditCard: "103537",
            middleCheck: "900",
            middleGuest: "800",
            deleteFromCheck: "1100",
            deleteFromBill: "1391",
            checkCount: "36",
            guestCount: "36"
        }
    },
    {
        date: "02-11-2020",
        data: {
            proceeds: "480521",
            cash: "309000",
            cashless: "103000",
            creditCard: "100521",
            middleCheck: "900",
            middleGuest: "800",
            deleteFromCheck: "900",
            deleteFromBill: "900",
            checkCount: "34",
            guestCount: "32"
        }
    }
];

dataBase = JSON.stringify(dataBase) 


function getJSON() {
    // Emulation fetch
    return JSON.parse(dataBase)
}

function findIndexOfDays() {
    let data = getJSON()
    let currentDate =  new Date()
    let dayInMs = 86400000;
    // Today date
        let todayDay = currentDate.getDate()
        let todayMonth = currentDate.getMonth() + 1
        if(todayDay <= 9) {
            todayDay = '0' + currentDate.getDate()
        }
        if(todayMonth <= 9) {
            todayMonth = '0' + currentDate.getMonth()
        }
    
    let todayDateString = todayDay + '-' + todayMonth + '-' + currentDate.getFullYear()
    
    
    //Yesterday date
    let yesterdaySub = currentDate.getTime() - dayInMs
    let yesterdayTime = new Date(yesterdaySub)
    let yesterdayDay = yesterdayTime.getDate()
    let yesterdayMonth = yesterdayTime.getMonth() + 1
    
    if(yesterdayDay <= 9) {
        yesterdayDay = '0' + yesterdayTime.getDate()
    }
    if(yesterdayMonth <= 9) {
        yesterdayMonth = '0' + yesterdayTime.getMonth()
    }
    
    let yesterdayDateString = yesterdayDay + '-' + yesterdayMonth + '-' + yesterdayTime.getFullYear()
    
    
    //WeekAgo date
    let weekAgoSub = currentDate.getTime() - (7 * dayInMs)
    let weekAgoTime = new Date(weekAgoSub)
    let weekAgoDay = weekAgoTime.getDate()
    let weekAgoMonth = weekAgoTime.getMonth() + 1
    
    if(weekAgoDay <= 9) {
        weekAgoDay = '0' + weekAgoTime.getDate()
    }
    if(weekAgoMonth <= 9) {
        weekAgoMonth = '0' + weekAgoTime.getMonth()
    }
    
    let weekAgoDateString = weekAgoDay + '-' + weekAgoMonth + '-' + weekAgoTime.getFullYear()

    //Find indeces of entered days
    let dateIndices = []

    data.forEach((day, i) => {
        if(day.date === todayDateString) {
            dateIndices[0] = i
        }
        if(day.date === yesterdayDateString) {
            dateIndices[1] = i
        }
        if(day.date === weekAgoDateString) {
            dateIndices[2] = i
        }
    });
    
    return [dateIndices, data]
}

function renderAllStatistics() {
    let table = Array.from(document.getElementsByTagName('tr'))
    let [dateIndices, data] = findIndexOfDays()

    // Table under chart
    table.forEach(row => {
        // Get cell which must be filled
        let cell = row.getElementsByClassName('table-content')
        // Get row id which matches with key in JSON
        let rowId = row.id

        // Write value of key every cell in row
        for(i = 0; i < cell.length; i++) {
            // Change the value that have space after three numeral
            let originStr = data[dateIndices[i]].data[rowId].split('')
            let convertStr = []
            if(originStr.length > 3) {
                originStr.reverse().forEach((row, i) => {
                    if(i === 3) {
                       convertStr.push(row + ' ')
                    } else {
                        convertStr.push(row)
                    }
                })
                convertStr = convertStr.reverse().join('')
            } else {
                convertStr = originStr.join('')
            }

            // If (i > 1) start compare previous cell with current
            if(i >= 1) {
                cell[i].innerHTML = `${convertStr}`
                
                let cellDifference = ''
                if(Number(data[dateIndices[i - 1]].data[rowId]) > Number(data[dateIndices[i]].data[rowId])) {
                    let percent = Number(data[dateIndices[i - 1]].data[rowId]) / Number(data[dateIndices[i]].data[rowId]) - 1
                    cellDifference = Math.ceil(percent * 100) 

                } else if(Number(data[dateIndices[i - 1]].data[rowId]) < Number(data[dateIndices[i]].data[rowId])){
                    let percent = Number(data[dateIndices[i]].data[rowId]) / Number(data[dateIndices[i - 1]].data[rowId]) - 1
                    cellDifference = Math.ceil(percent * -100)

                }if(data[dateIndices[i - 1]].data[rowId] === data[dateIndices[i]].data[rowId]) {
                    cellDifference = ''
                }

                // write sign depending on the sign of the number
                if(cellDifference > 0) {

                    // Add a class with some color
                    if(cellDifference >= 10) {
                        cell[i].classList.add('proceeds-block')
                    }
                    cell[i].appendChild(document.createElement('span')).classList.add('proceeds-percent')
                    cell[i].getElementsByTagName('span')[0].innerHTML = `+${cellDifference} %`
                    
                } else if(cellDifference < 0){

                    // Add a class with some color
                    if(cellDifference <= -10) {
                        cell[i].classList.add('loss-block')
                    }
                    cell[i].appendChild(document.createElement('span')).classList.add('loss-percent')
                    cell[i].getElementsByTagName('span')[0].innerHTML = `${cellDifference} %`
                } 
    
            } else {
                cell[i].innerHTML = `${convertStr}`
            }
        }
    })
}

function renderChart(data = ['1','0','1']){
    Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: ''
        },

        yAxis: {
            title: {
                text: ''
            },
            lineWidth: 2,
            labels: {
                format: '<div class="Y-dot"> </div>',
                useHTML: true,
            },
            gridLineColor: '#ffffff',
        },

        xAxis: [{
            lineWidth: 2,
            labels: {
                format: '<div class="X-dot"> </div>',
                useHTML: true,
            },
            categories: true 
        }],
    
        legend: {
            enabled: false
        },

        exporting: {
            enabled: false
        },

        series: [{
            name: '',
            data: data
        }],


    });
}


// HENDLERS

window.addEventListener('load', renderAllStatistics(),renderChart())

// Button for refresh table
document.getElementById('refreshButton').addEventListener('click', () => {
    Array.from(document.getElementsByClassName('table-row')).forEach(row => {
        row.classList.remove('table-row--deleted')
    })

    renderAllStatistics()
})


// Handler for delete button that active (delete-mode)
let deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', (e) => {
    if(!deleteButton.classList.contains('header__setting-button--active')) {
        deleteButton.classList.add('header__setting-button--active')

        Array.from(document.getElementsByClassName('table-row')).forEach(row => {
            row.classList.add('table-row--delete-mode')
        })
    } else {
        deleteButton.classList.remove('header__setting-button--active')

        Array.from(document.getElementsByClassName('table-row')).forEach(row => {
            row.classList.remove('table-row--delete-mode')
        })
    }
})

// Listener for rows 
Array.from(document.getElementsByClassName('table-row')).forEach(row => {
    row.addEventListener('click', (e) => {
        // If active delete mode
        if(document.getElementById('deleteButton').classList.contains('header__setting-button--active')) {
            row.classList.add('table-row--deleted')
        } else {
            // If delete mode disabled clicks work for render chart
            let [dateIndices ,data] = findIndexOfDays()
            let targetId = e.target.parentNode.id
            let valueForChart = []
            for(i = 0; i < dateIndices.length; i++) {
                valueForChart.push(Number(data[dateIndices[i]].data[targetId]))
            }
            valueForChart.reverse()
            renderChart(valueForChart)
        }
    })
})

