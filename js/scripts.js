demiPension = "demi pension"
petitDejeuner = "petit déjeuné"
herbergementsSeuls = "hébergement seul"
pensionComplète = "pension complète"
toutInclus = "tous inclus"
allInclusive = "all-inclusive"
if (localStorage.length == 0) {
    localStorage.setItem('boucle', 0);
    localStorage.setItem(demiPension, 0);
    localStorage.setItem(petitDejeuner, 0);
    localStorage.setItem(herbergementsSeuls, 0);
    localStorage.setItem(pensionComplète, 0);
    localStorage.setItem(toutInclus, 0);
    localStorage.setItem(allInclusive, 0);
}

const socket = new WebSocket("ws://192.168.3.219:5000");

socket.addEventListener("open", function (event) {
    console.log("Connecté WS serveur");
});

socket.addEventListener("close", function (event) {
    console.log("Déconnecté WS serveur");
});

socket.addEventListener("message", function (event) {
    console.log("Serveur : Data receive");
    UpdateData(JSON.parse(event.data));
});
function UpdateData(CpuJson) {

    if (localStorage.getItem('boucle') == 0) {
        checkWord(CpuJson['CPUdata']['Text'][0])
    }
    if (CpuJson['CPUdata']['Text'] == "") {
        startBoucle()
    }
    // let str = CpuJson['CPUdata']['Text'][0]
    // console.log(str)
    // if (str.includes('demi pension')) {
    //     console.log('CA MARCHE')
    // }

    document.getElementById("text").innerText = CpuJson['CPUdata']['Text']
    document.getElementById("date").innerText =
        CpuJson["CPUdata"]["Date"];
    document.getElementById("temp").innerText =
        CpuJson["CPUdata"]["Temperature"] + "°C";
    document.getElementById("espace").innerText =
        CpuJson["CPUdata"]["DiskSpace"][3];
    document.getElementById("cpu").innerText =
        CpuJson["CPUdata"]["CpuUsage"] + "%";
    document.getElementById("ram").innerText =
        CpuJson["CPUdata"]["RAMUsage"] + "/3.7Go";
}

function stopBoucle() {
    localStorage.setItem('boucle', 1)
}
function startBoucle() {
    localStorage.setItem('boucle', 0)
}
function ok() {
    document.getElementById('success').style.display = "block"
}

function checkWord(word) {
    if (word.includes('bonjour')) {
        document.getElementById('panelword').style.display = "block"
    }
    else if (word.includes('demi pension')) {
        stopBoucle()
        $("#getCodeModal").modal('show');
        i = localStorage.getItem(demiPension)
        i++
        localStorage.setItem(demiPension, i);
    }
    else if (word.includes('petit déjeuné')) {
        stopBoucle()
        $("#getCodeModal").modal('show');
        i = localStorage.getItem(petitDejeuner)
        i++
        localStorage.setItem(petitDejeuner, i);
    }
    else if (word.includes('hébergement seuls')) {
        stopBoucle()
        $("#getCodeModal").modal('show');
        i = localStorage.getItem(herbergementsSeuls)
        i++
        localStorage.setItem(herbergementsSeuls, i);
    }
    else if (word.includes('pension complète')) {
        stopBoucle()
        $("#getCodeModal").modal('show');
        i = localStorage.getItem(pensionComplète)
        i++
        localStorage.setItem(pensionComplète, i);
    }
    else if (word.includes('tous inclus')) {
        stopBoucle()
        $("#getCodeModal").modal('show');
        i = localStorage.getItem(toutInclus)
        i++
        localStorage.setItem(toutInclus, i);
    }
    else if (word.includes('all inclusive')) {
        stopBoucle()
        $("#getCodeModal").modal('show');
        i = localStorage.getItem(allInclusive)
        i++
        localStorage.setItem(allInclusive, i);
    }
    else if (word.includes('au revoir')) {
        document.getElementById('panelword').style.display = "none"
    }
}

const count = {
    demiPensionCount: localStorage.getItem(demiPension),
    petitDejeunCount: localStorage.getItem(petitDejeuner),
    hebergementSeulCount: localStorage.getItem(herbergementsSeuls),
    pensionCompleteCount: localStorage.getItem(pensionComplète),
    toutInlcusCount: localStorage.getItem(toutInclus),
    allInclusiveCount: localStorage.getItem(allInclusive),
};


var barChartDataHours = {
    labels: [
        "Demi-pension",
        "Petit-déjeuner",
        "Hébergements seuls",
        "Pension complète",
        "Tous inclus",
        "All inclusive",
    ],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(21,186,103,0.4)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(21,186,103,0.2)",
            highlightStroke: "rgba(21,186,103,0.2)",
            data: [count['demiPensionCount'], count['petitDejeunCount'], count['hebergementSeulCount'], count['pensionCompleteCount'], count['toutInlcusCount'], count['allInclusiveCount']],
        },
    ],
};

var barChartDataDay = {
    labels: [
        "Demi-pension",
        "Petit-déjeuner",
        "Hébergements seuls",
        "Pension complète",
        "Tous inclus",
        "All inclusive",
    ],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(21,186,103,0.4)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(21,186,103,0.2)",
            highlightStroke: "rgba(21,186,103,0.2)",
            data: [count['demiPensionCount'], count['petitDejeunCount'], count['hebergementSeulCount'], count['pensionCompleteCount'], count['toutInlcusCount'], count['allInclusiveCount']],
        },
    ],
};

window.onload = function () {
    // var ctx3 = $(".bar-chart-minutes")[0].getContext("2d");
    // window.myLine = new Chart(ctx3).Bar(barChartDataMinutes, {
    //     responsive: true,
    //         showTooltips: true
    // });
    var ctx3 = $(".bar-chart-hours")[0].getContext("2d");
    window.myLine = new Chart(ctx3).Bar(barChartDataHours, {
        responsive: true,
        showTooltips: true,
    });
    var ctx3 = $(".bar-chart-day")[0].getContext("2d");
    window.myLine = new Chart(ctx3).Bar(barChartDataDay, {
        responsive: true,
        showTooltips: true,
    });
};


(function (jQuery) {
    Chart.defaults.global.pointHitDetectionRadius = 1;
    Chart.defaults.global.customTooltips = function (tooltip) {
        var tooltipEl = $('#chartjs-tooltip');
        if (!tooltip) {
            tooltipEl.css({
                opacity: 0
            });
            return;
        }
        tooltipEl.removeClass('above below');
        tooltipEl.addClass(tooltip.yAlign);

        var innerHtml = '';
        if (undefined !== tooltip.labels && tooltip.labels.length) {
            for (var i = tooltip.labels.length - 1; i >= 0; i--) {
                innerHtml += [
                    '<div class="chartjs-tooltip-section">',
                    '   <span class="chartjs-tooltip-key" style="background-color:' + tooltip.legendColors[i].fill + '"></span>',
                    '   <span class="chartjs-tooltip-value">' + tooltip.labels[i] + '</span>',
                    '</div>'
                ].join('');
            }
            tooltipEl.html(innerHtml);
        }

        tooltipEl.css({
            opacity: 1,
            left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
            top: tooltip.chart.canvas.offsetTop + tooltip.y + 'px',
            fontFamily: tooltip.fontFamily,
            fontSize: tooltip.fontSize,
            fontStyle: tooltip.fontStyle
        });
    };
    var randomScalingFactor = function () {
        return Math.round(Math.random() * 100);
    };
    var lineChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            fillColor: "rgba(21,186,103,0.4)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(66,69,67,0.3)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [18, 9, 5, 7, 4.5, 4, 5, 4.5, 6, 5.6, 7.5]
        }, {
            label: "My Second dataset",
            fillColor: "rgba(21,113,186,0.5)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [4, 7, 5, 7, 4.5, 4, 5, 4.5, 6, 5.6, 7.5]
        }]
    };

});

var barChartDataMinutes = {
    labels: ["Demi-pension", "Petit-déjeuner", "Hébergements seuls", "Pension complète", "Tous inclus", "All inclusive"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(21,186,103,0.4)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(21,186,103,0.2)",
            highlightStroke: "rgba(21,186,103,0.2)",
            data: [10, 10, 10, 10, 10, 10, 10]
        },
    ]
};


(jQuery);