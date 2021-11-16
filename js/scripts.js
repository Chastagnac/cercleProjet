/*!
* Start Bootstrap - Clean Blog v6.0.7 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function () {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if (currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

if (localStorage.length == 0) {
    localStorage.setItem('demi-pension', null);
    localStorage.setItem('petit-déjeuné', null);
    localStorage.setItem('hébergements-seuls', null);
    localStorage.setItem('pension-complète', null);
    localStorage.setItem('Tous-inclus', null);
    localStorage.setItem('All-inclusive', null);
}
google.charts.load('current', { 'packages': ['bar'] });
google.charts.setOnLoadCallback(drawStuff);

function drawStuff() {
    var data = new google.visualization.arrayToDataTable([
        ['Move', 'Percentage'],
        ["Demi-pension", 10],
        ["Petit-déjeuner", 20],
        ["Hébergements seuls", 30],
        ["Pension complète", 30],
        ["Tous-inclus", 20],
        ["All-inclusive", 10]
    ]);

    var options = {
        width: 800,
        legend: { position: 'none' },
        chart: {
            title: 'Statistiques',
            subtitle: 'Mots par minutes'
        },
        axes: {
            x: {
                0: { side: 'top', label: '' } // Top x-axis.
            }
        },
        bar: { groupWidth: "90%" }
    };

    var chart = new google.charts.Bar(document.getElementById('top_x_div'));
    // Convert the Classic options to Material options.
    chart.draw(data, google.charts.Bar.convertOptions(options));
};