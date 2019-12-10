google.charts.load('current', {
    packages: ['corechart', 'bar']
});
google.charts.setOnLoadCallback(onReady);

async function onReady() {
    const allMovies = await (await fetch('./src/data/films.json')).json();

    const movies = allMovies.filter(i => i.category === 'humour');
    document.getElementById('movie').innerHTML = `
        ${movies.map(movie => `
            <p>${movie.id} - ${movie.name}</p>
        `).join('')}
    `;

    drawChart({
        id: 'chart-director',
        title: '감독 성비',
        men: 572,
        wom: 90,
    });
    drawChart({
        id: 'chart-writer',
        title: '작가 성비',
        men: 503,
        wom: 159,
    });
    drawChart({
        id: 'chart-actor',
        title: '배우 성비',
        men: 436,
        wom: 226,
    });
}

function drawChart({ id, title, men, wom }) {
    const menPercent = Math.round(100 * men / (men + wom) * 10) / 10;
    const womPercent = Math.round(100 * wom / (men + wom) * 10) / 10;

    const data = google.visualization.arrayToDataTable([
        ['Element', 'Value', { type: 'string', role: 'tooltip' }, { role: 'style' }],
        ['남자', menPercent, `${men}명\n${menPercent}%`, 'color: gray'],
        ['여자', womPercent, `${wom}명\n${womPercent}%`, 'color: blue'],
    ]);

    const options = {
        title,
        // colors: ['#979797', '#0060ff', '#0060ff'],
        bar: { groupWidth: "70%" },
        legend: { position: "none" },
        /*     hAxis: {
              title: '',
              viewWindow: {
                min: [7, 30, 0],
                max: [17, 30, 0]
              },
              minorGidelines: {
                color: '#0060ff'
              }
            },
            vAxis: {
              title: '',
              textStyle : {color : '#fff'},
              gridlines: {
                color: 'white'
              },
              baselineColor: 'white'
            }
             */
    };

    const element = document.getElementById(id);
    const chart = new google.visualization.ColumnChart(element);
    chart.draw(data, options);
}