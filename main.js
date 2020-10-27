let json = [
    {
        date: "27-10-2020",
        data: {
            proceeds: "500 521",
            cash: "300 000",
            cashless: "100 000",
            creditCard: "100 521",
            middleCheck: "1 300",
            middleGuest: "1 200",
            deleteFromCheck: "1 000",
            deleteFromBill: "1 300",
            checkCount: "34",
            guestCount: "34"
        }
    },
    {
        date: "26-10-2020",
        data: {
            proceeds: "480 521",
            cash: "309 000",
            cashless: "103 000",
            creditCard: "100 521",
            middleCheck: "900",
            middleGuest: "800",
            deleteFromCheck: "1 100",
            deleteFromBill: "1 300",
            checkCount: "36",
            guestCount: "36"
        }
    },
    {
        date: "19-10-2020",
        data: {
            proceeds: "480 521",
            cash: "309 000",
            cashless: "103 000",
            creditCard: "100 521",
            middleCheck: "900",
            middleGuest: "800",
            deleteFromCheck: "900",
            deleteFromBill: "900",
            checkCount: "34",
            guestCount: "32"
        }
    }
]





























Highcharts.chart('container', {
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
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});