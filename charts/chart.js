google.charts.load('current', {
    packages: ['corechart', 'bar', 'line']
});

google.charts.setOnLoadCallback(onReady);

/*Color pallete*/
const mainBlue = '#0060ff'
const subBlue = '#7daeff'
const dimBlue = '#c5dbff'

const mainGray = '#979797' /*진함*/
const subGray = '#c1c1c1'
const dimGray = '#dadada' /*연함*/


async function onReady() {
    // // json -> html로 데이터 어떻게 불러오는지 샘플
    // const allMovies = await (await fetch('./src/data/films.json')).json();

    // const movies = allMovies.filter(i => i.category === 'humour');
    // document.getElementById('movie').innerHTML = `${movies.map(movie => `<p>${movie.id} - ${movie.name}</p>`).join('')}`;

    //감독별 제작비
    drawChart_cost({
        id: 'production_cost',
        title: 'production_cost',
    });

    // drawChart1 - 직군별 성비
    drawChart1({
        id: 'chart-director',
        title: '감독 성비',
        men: 572,
        wom: 90,
    });
    drawChart1({
        id: 'chart-writer',
        title: '작가 성비',
        men: 503,
        wom: 159,
    });
    drawChart1({
        id: 'chart-actor',
        title: '배우 성비',
        men: 436,
        wom: 226,
    });

    // #23p. 영화제작(영화 수)과 배급(상영횟수)에서, 그리고 흥행(관객수) F등급 비율 차이 차트
    drawChart2({
        id: 'donut-filmmaking',
        title: '제작 단계에서 F등급 비율',
        f0: 51.02,
        f1: 32.51,
        f2: 8.89,
        f3: 7.58
    });

    drawChart2({
        id: 'donut-distribution',
        title: '배급 단계에서 F등급 비율',
        f0: 65,
        f1: 25,
        f2: 7,
        f3: 1.46
    });

    drawChart2({
        id: 'donut-screening',
        title: '상영 단계에서 F등급 비율',
        f0: 70.24,
        f1: 23.5,
        f2: 5.4,
        f3: 1
    });

    drawChart3({
        id: 'top10-donut',
        title: '전체 상영횟수의 87%를 차지하는 상위 10대 배급사'
    })
};

/*----------------------------------------*/
/*----------------------------------------*/
/*----------------------------------------*/
/*----------------------------------------*/
/*----------------------------------------*/



/*-------------------
01. 감독 제작비 비교 bar
---------------------*/
function drawChart_cost({ id, title }) {
    const data = google.visualization.arrayToDataTable([
        ['year', '이경미', '김한민', '강형철'],
        ['2008', 10, { v: 3, f: '0' }, 25],
        ['2011', { v: 3, f: '0' }, 60, 40],
        ['2013', { v: 3, f: '0' }, 145, { v: 3, f: '0' }],
        ['2014', { v: 3, f: '0' }, { v: 3, f: '0' }, 80],
        ['2015', 42, { v: 3, f: '0' }, { v: 3, f: '0' }],
        ['2018', { v: 3, f: '0' }, { v: 3, f: '0' }, 157],
    ]);
    const options = {
        chart: {
            title: '제작비 비교',
            subtitle: '비슷한 시기에 신인 감독상을 받은 감독들의 연도별 작품 제작비 비교'
        },
        hAxis: {
            gridlines: 'none',
            textPosition: 'none',
        },
        vAxis: {

            gridlines: 'none',
            title: '제작비(단위: 억원)',
            format: 'decimal',
            textPosition: 'none',
        },
        bar: { groupWidth: "90%" },
        colors: [mainBlue, dimGray, subGray],

        legend: {
            position: 'bottom',
            maxLines: 1,
        },
        tooltip: { trigger: 'both' }
        // crosshair: {
        //     color: '#fff',
        //     trigger: 'selection'
        // },

        // showRowNumber: true,
    };

    const element = document.getElementById(id);
    var chart = new google.charts.Bar(element);

    chart.draw(data, options);
};

/*-------------------
02. 배우 필모그라피  Top 20
---------------------*/






/*-------------------
02. 직급 별 성별 분배 차트 그리기
---------------------*/
function drawChart1({ id, title, men, wom }) {
    const menPercent = Math.round(100 * men / (men + wom) * 10) / 10;
    const womPercent = Math.round(100 * wom / (men + wom) * 10) / 10;

    const data = google.visualization.arrayToDataTable([
        ['Element', 'Value', { type: 'string', role: 'tooltip' }, { role: 'style' }],
        ['남자', menPercent, `${men}명\n${menPercent}%`, 'color: #979797'],
        ['여자', womPercent, `${wom}명\n${womPercent}%`, 'color: #0060ff'],
    ]);

    const options = {
        title,
        // fontName: 'CourierNewPSMT',
        // colors: ['#979797', '#0060ff', '#0060ff'],
        bar: { groupWidth: "70%" },
        legend: { position: "none" },
        hAxis: {
            title: '',
            minorGidelines: {
                color: '#0060ff'
            }
        },
        vAxis: {
            title: '',
            textStyle: { color: '#fff' },
            gridlines: { color: 'white' },
            baselineColor: 'white'
        },
        // tooltip: { isHtml: true }
    };

    const element = document.getElementById(id);
    const chart = new google.visualization.ColumnChart(element);
    chart.draw(data, options);
};

/*-------------------
03. #23p. 영화제작(영화 수)과 배급(상영횟수)에서, 그리고 흥행(관객수) F등급 비율 차이 차트
---------------------*/
function drawChart2({ id, title, f0, f1, f2, f3 }) {

    const data = google.visualization.arrayToDataTable([
        ['등급', '비율', { type: 'string', role: 'tooltip' }],
        ['F-3', f3, `f-3: ${f3}%`],
        ['F-2', f2, `f-2: ${f2}%`],
        ['F-1', f1, `f-1: ${f1}%`],
        ['F-0', f0, `f-0: ${f0}%`],
    ]);

    const options = {
        // title,
        pieHole: 0.5,
        pieStartAngle: 0,
        legend: 'none',
        // pieSliceText: 'none',
        // fontName: 'CourierNewPSMT',
        fontSize: 12,
        slices: {
            0: { color: mainBlue },
            1: { color: subBlue },
            2: { color: subGray },
            3: { color: dimGray },
        },
        pieSliceTextStyle: {
            color: 'black',
        },
    };

    const element = document.getElementById(id);
    const chart = new google.visualization.PieChart(element);

    chart.draw(data, options);
};

/*-------------------
04. TOP 배급사 - 87%
---------------------*/
function drawChart3({ id, title }) {

    const data = google.visualization.arrayToDataTable([
        ['배급사', '숫자', { type: 'string', role: 'tooltip' }],
        ['상위 10대', 87, `상위 10대 배급사: 87%`],
        ['기타', 13, `이 외 배급사 13%`],
    ]);

    const options = {
        title,
        pieHole: 0.5,
        pieStartAngle: 0,
        legend: 'none',
        // pieSliceText: 'none',
        // fontName: 'CourierNewPSMT',
        // fontSize: 12,
        slices: {
            0: { color: mainBlue },
            1: { color: subGray },
        }
    };

    const element = document.getElementById(id);
    const chart = new google.visualization.PieChart(element);

    chart.draw(data, options);

}