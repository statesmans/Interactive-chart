
let dataBase = [
    {
        date: "27-10-2020",
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
        date: "26-10-2020",
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
        date: "19-10-2020",
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
]

dataBase = JSON.stringify(dataBase)

window.addEventListener('load', renderAllStatistics(),renderChart(null))

if(window.innerWidth <= 580) {
    renderChart()
}


function getJSON() {
    // Emulation fetch
    return JSON.parse(dataBase);
}

function findIndexOfDays() {

    let currentDate =  new Date('2020, 2')

    // Today
    let currentDay = ''
    if(currentDate.getDate() <= 9) {
        currentDay = '0' + currentDate.getDate()
    } else {
        currentDay = currentDate.getDate()
    }

    let currentMonth = ''
    if(currentDate.getMonth() <= 9) {
        currentMonth = '0' + currentDate.getMonth()
    } else {
        currentMonth = currentDate.getMonth()
    }

    let currentDateJSON = currentDay + '-' + currentMonth + '-' + currentDate.getUTCFullYear()

    // Yesterday
    let yesterday = ''
    let yesterdayMonth = ''
    let yesterdayYear = currentDate.getFullYear()

    if(currentDate.getDate() - 1 <= 0) {
        let date = new Date(`${currentDate.getUTCFullYear()},
                             ${currentDate.getMonth() + 1}`)
        yesterday = date.getDate()
        if(currentDate.getMonth() - 1 <= 0) {
        
            yesterdayMonth = 12
            yesterdayYear = currentDate.getFullYear() - 1
        }
    }else if(currentDate.getDate() - 1 <= 9) {
        yesterday = '0' + (currentDate.getDate() - 1)
    } else {
        yesterday = currentDate.getDate() - 1
    }

    if(currentDate.getMonth() - 1 <= 9) {
        yesterdayMonth = '0' + currentDate.getMonth()
    } else {
        yesterdayMonth = currentDate.getMonth()
    }
    
    let yesterdayDateJSON = yesterday + '-' + yesterdayMonth + '-' + yesterdayYear
//
    data.forEach(day => {
        // Current day
        if(day.date === currentDateJSON) {

        }

        if(day.date === yesterdayDateJSON) {

        }
    });
}

let massiveIndex = [0,1,2]

function renderAllStatistics() {
    let data = getJSON()
    let massiveIndex = [0,1,2]
    let tableTop = Array.from(document.getElementById('table1').getElementsByTagName('tr')[1].getElementsByTagName('td'))
    let tableBottom = Array.from(document.getElementsByTagName('tr'))
    console.log(tableBottom)
/*     for(i = 0; i < tableTop.length - 1; i++) {
        if(massiveIndex[i - 1]) {

            tableTop[i + 1].innerHTML = `${data[massiveIndex[i]].data.proceeds}`

           let difference = (Number(data[massiveIndex[0]].data.proceeds) - Number(data[massiveIndex[1]].data.proceeds)) / Number(data[massiveIndex[0]].data.proceeds) * 100

            if(difference > 0) {
                tableTop[i].classList.add('proceeds-block')
                tableTop[i].appendChild(document.createElement('span')).classList.add('proceeds-percent')
            } else {
                tableTop[i].classList.add('loss-block')
                tableTop[i].appendChild(document.createElement('span')).classList.add('loss-percent')
            }

            tableTop[i].getElementsByTagName('span')[0].innerHTML = `${difference} %`
        } else {
            tableTop[i + 1].innerHTML = `${data[massiveIndex[i]].data.proceeds}`
        }
    } */

    // Table under chart
    tableBottom.forEach(el => {
        let tdEl = el.getElementsByClassName('table-content')
        let rowId = el.id
        for(i = 0; i < tdEl.length; i++) {
            let originStr = data[massiveIndex[i]].data[rowId].split('')
            let convertStr = []
            if(originStr.length > 3) {
                originStr.reverse().forEach((el, i) => {
                    if(i === 3) {
                       convertStr.push(el + ' ')
                    } else {
                        convertStr.push(el)
                    }
                })
                convertStr = convertStr.reverse().join('')
            } else {
                convertStr = originStr.join('')
            }
            if(i >= 1) {
                tdEl[i].innerHTML = `${convertStr}`
                
                let difference = ''
                if(Number(data[massiveIndex[i - 1]].data[rowId]) > Number(data[massiveIndex[i]].data[rowId])) {
                    let a = Number(data[massiveIndex[i - 1]].data[rowId]) / Number(data[massiveIndex[i]].data[rowId]) - 1
              
                    difference = Math.ceil(a * 100) 
                } else if(Number(data[massiveIndex[i - 1]].data[rowId]) < Number(data[massiveIndex[i]].data[rowId])){
                    let a = Number(data[massiveIndex[i]].data[rowId]) / Number(data[massiveIndex[i - 1]].data[rowId]) - 1
                     difference = Math.ceil(a * -100)
                }if(data[massiveIndex[i - 1]].data[rowId] === data[massiveIndex[i]].data[rowId]) {
                    difference = ''
                }

                if(difference > 0) {
                    if(difference >= 10) {
                        tdEl[i].classList.add('proceeds-block')
                    }
                    tdEl[i].appendChild(document.createElement('span')).classList.add('proceeds-percent')
                    tdEl[i].getElementsByTagName('span')[0].innerHTML = `+${difference} %`
                } else if(difference < 0){
                    if(difference <= -10) {
                        tdEl[i].classList.add('loss-block')
                    }
                    tdEl[i].appendChild(document.createElement('span')).classList.add('loss-percent')
                    tdEl[i].getElementsByTagName('span')[0].innerHTML = `${difference} %`
                } 
    
            } else {
                tdEl[i].innerHTML = `${convertStr}`
            }
        }
    })

}






document.getElementById('refreshButton').addEventListener('click', renderAllStatistics())

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

Array.from(document.getElementsByClassName('table-row')).forEach(row => {
    row.addEventListener('click', (e) => {
        if(document.getElementById('deleteButton').classList.contains('header__setting-button--active')) {
            row.classList.add('table-row--deleted')
        } else {
            let data = getJSON()
            let targetId = e.target.parentNode.id
            let valueForChart = []
    
            for(i = 0; i < massiveIndex.length; i++) {
                valueForChart.push(Number(data[massiveIndex[i]].data[targetId]))
            }
            valueForChart.reverse()
            renderChart(valueForChart)
        }
    })
})
























function renderChart(data){
    let mediaHeight = 400
    if(!data) {
        data = []
    }

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

