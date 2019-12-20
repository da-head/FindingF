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

const yellow = '#f5f500'


const bgcolor = '#fff8e5' /*아이보리*/


const button = document.getElementById('change');
var current = 0;



// // json -> html로 데이터 어떻게 불러오는지 샘플
// const allMovies = await (await fetch('./src/data/films.json')).json();

// const movies = allMovies.filter(i => i.category === 'humour');
// document.getElementById('movie').innerHTML = `${movies.map(movie => `<p>${movie.id} - ${movie.name}</p>`).join('')}`;

async function onReady() {

    /*감독별 제작비*/
    drawChart_cost({
        id: 'production_cost',
        title: 'production_cost',
    });

    // /*배우 필모*/
    // drawChart_actor_filmo({
    //     id: 'actors_filmo'
    // })
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

    director_gender({
        id: 'man-director',
        title: '남성 감독의 여성 작가,배우 기용률',
        zero: 342,
        one: 204,
        two: 26,
    });

    director_gender({
        id: 'wom-director',
        title: '여성 감독의 여성 작가,배우 기용률',
        zero: 4,
        one: 37,
        two: 49,
    });

    //한국 영화산업, F-등급으로 다시보기
    changingData();
    button.onclick = function() {
        current = 1 - current;
        changingData();
    }

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
    });
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
        ['2009', { v: 3, f: '0' }, 30, { v: 3, f: '0' }],
        ['2011', { v: 3, f: '0' }, 60, 40],
        ['2013', { v: 3, f: '0' }, 145, { v: 3, f: '0' }],
        ['2014', { v: 3, f: '0' }, { v: 3, f: '0' }, 80],
        ['2015', 42, { v: 3, f: '0' }, { v: 3, f: '0' }],
        ['2018', { v: 3, f: '0' }, { v: 3, f: '0' }, 157],
    ]);

    var options = {
        chart: {
            title: '제작비 비교',
            subtitle: '비슷한 시기에 신인 감독상을 받은 감독들의 연도별 작품 제작비 비교 (단위: 억원)'
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
        bars: 'vertical',
        legend: {
            position: 'none',
        },
        tooltip: { trigger: 'both' },

        backgroundColor: {
            fill: 'none',
        },
        // crosshair: {
        //     color: '#fff',
        //     trigger: 'selection'
        // },

        showRowNumber: false,
        colors: [mainBlue, dimGray, mainGray],
    };

    const element = document.getElementById(id);
    var chart = new google.charts.Bar(element);
    chart.draw(data, options);
};

/*-------------------
01_2. 감독 제작비 비교 누적 bar
---------------------*/


/*-------------------
02. 배우 필모그라피  Top 20
---------------------*/

// async function drawChart() {
//     const filmo = await (await fetch('./src/data/actors_filmo.json')).json();

//     const actor = filmo.filter(i => i.주연배우 === '안성기');
//     // document.getElementById('actors_filmo').innerHTML = `${actor.map(actor => `<p>${actor.주연배우} - ${actor.필모갯수}</p>`).join('')}`;
//     const data = new google.visualization.DataTable();

//     data.addColumn(['string', '주연배우']);
//     data.addColumn(['number', '필모갯수']);
//     data.addColumn(['string', '배우필모']);

//         for (i in filmo) {
//             // var style = i.배우성별 == "여자" ? mainBlue : dimGray;
//             data.addRows([i.주연배우, i.필모갯수]);
//         };

//         const element = document.getElementById('actors_filmo');
//         var chart = new google.charts.Bar(element);

//         chart.draw(data);
//     }
// };


// function drawChart_actor_filmo({ id }) {
//     const data = google.visualization.arrayToDataTable([
//         ['year', '이경미', '김한민', '강형철'],
//         ['2008', 10, { v: 3, f: '0' }, 25],
//         ['2011', { v: 3, f: '0' }, 60, 40],
//         ['2013', { v: 3, f: '0' }, 145, { v: 3, f: '0' }],
//         ['2014', { v: 3, f: '0' }, { v: 3, f: '0' }, 80],
//         ['2015', 42, { v: 3, f: '0' }, { v: 3, f: '0' }],
//         ['2018', { v: 3, f: '0' }, { v: 3, f: '0' }, 157],
//     ]);
//     const options = {
//         chart: {
//             title: '제작비 비교',
//             subtitle: '비슷한 시기에 신인 감독상을 받은 감독들의 연도별 작품 제작비 비교'
//         },
//         hAxis: {
//             gridlines: 'none',
//             textPosition: 'none',
//         },
//         vAxis: {

//             gridlines: 'none',
//             title: '제작비(단위: 억원)',
//             format: 'decimal',
//             textPosition: 'none',
//         },
//         bar: { groupWidth: "90%" },
//         colors: [mainBlue, dimGray, subGray],

//         legend: {
//             position: 'bottom',
//             maxLines: 1,
//         },
//         tooltip: { trigger: 'both' }

//     };

//     const element = document.getElementById(id);
//     var chart = new google.charts.Bar(element);

//     chart.draw(data, options);

// };



/*-------------------
02. 직급 별 성별 분배 차트 그리기
---------------------*/
function drawChart1({ id, title, men, wom }) {
    const menPercent = Math.round(100 * men / (men + wom) * 10) / 10;
    const womPercent = Math.round(100 * wom / (men + wom) * 10) / 10;

    const data = google.visualization.arrayToDataTable([
        ['Element', 'Value', { type: 'string', role: 'tooltip', 'p': { 'html': true } }, { role: 'style' }],
        ['여자', womPercent, createCustomHTMLContent('여성', `${wom}`, `${womPercent}`), 'color: #0060ff'],
        ['남자', menPercent, createCustomHTMLContent('남성', `${men}`, `${menPercent}`), 'color: #979797'],
    ]);

    const options = {
        // fontName: 'CourierNewPSMT',
        // colors: ['#979797', '#0060ff', '#0060ff'],
        bar: { groupWidth: "70%" },
        legend: { position: "none" },
        pieHole: 0.6,

        slices: {
            0: { color: mainBlue },
            1: { color: dimGray },
        },

        pieStartAngle: 0,
        focusTarget: 'category',
        tooltip: { isHtml: true },
        backgroundColor: {
            fill: 'none',
        },
    };

    const element = document.getElementById(id);
    const chart = new google.visualization.PieChart(element);
    chart.draw(data, options);
};


function createCustomHTMLContent(gender, quantity, percentage) {
    if (gender == '여성') {
        return '<div style="padding: 10px 12px; text-align: left;">' +
            '<div><h6 style="color : #0060ff"><strong>' + gender + '</strong><h6></div><hr>' +
            '<div><h6>' + quantity + '명 </h6></div>' +
            '<div><h6>`' + percentage + '%`</h6></div>' +
            '</div>';
    };
    return '<div style="padding: 10px 12px; text-align: left;">' +
        '<div><h6 style="color : #c1c1c1"><strong>' + gender + '</strong><h6></div><hr>' +
        '<div><h6>' + quantity + '명 </h6></div>' +
        '<div><h6>`' + percentage + '%`</h6></div>' +
        '</div>';

};


function director_gender({ id, title, zero, one, two }) {

    const total = zero + one + two;

    const zeroPercent = Math.round(100 * zero / total * 10) / 10;
    const onePercent = Math.round(100 * one / total * 10) / 10;
    const twoPercent = Math.round(100 * two / total * 10) / 10;

    const data = google.visualization.arrayToDataTable([
        ['Element', 'Value', { type: 'string', role: 'tooltip', 'p': { 'html': true } }, { role: 'style' }],
        ['0명', zero, createCustomHTMLContent2('0명', `${zero}`, `${zeroPercent}`), 'color:' + dimGray],
        ['1명', one, createCustomHTMLContent2('1명', `${one}`, `${onePercent}`), 'color:' + subBlue],
        ['2명', two, createCustomHTMLContent2('2명', `${two}`, `${twoPercent}`), 'color:' + mainBlue],
    ]);

    const options = {
        // fontName: 'CourierNewPSMT',
        // colors: ['#979797', '#0060ff', '#0060ff'],
        legend: { position: "none" },
        pieHole: 0.6,

        slices: {
            0: { color: dimGray },
            1: { color: subBlue },
            2: { color: mainBlue },
        },

        pieStartAngle: 0,
        focusTarget: 'category',
        tooltip: { isHtml: true },
        backgroundColor: {
            fill: 'none',
        },
    };

    const element = document.getElementById(id);
    const chart = new google.visualization.PieChart(element);
    chart.draw(data, options);
};




function createCustomHTMLContent2(count, quantity, percentage) {
    if (count == '0명') {
        return '<div style="padding: 10px 12px; text-align: left;">' +
            '<div><h6 style="color :' + dimGray + ';"><strong>' + count + '</strong><h6></div><hr>' +
            '<div><h6>' + quantity + '명 </h6></div>' +
            '<div><h6>' + percentage + '%</h6></div>' +
            '</div>';
    };

    if (count == '1명') {
        return '<div style="padding: 10px 12px; text-align: left;">' +
            '<div><h6 style="color :' + dimBlue + ';"><strong>' + count + '</strong><h6></div><hr>' +
            '<div><h6>' + quantity + '건 </h6></div>' +
            '<div><h6>' + percentage + '%</h6></div>' +
            '</div>';
    };

    return '<div style="padding: 10px 12px; text-align: left;">' +
        '<div><h6 style="color :' + mainBlue + ';"><strong>' + count + '</strong><h6></div><hr>' +
        '<div><h6>' + quantity + '건 </h6></div>' +
        '<div><h6>' + percentage + '%</h6></div>' +
        '</div>';

};

/*-------------------
03. #23p. 영화제작(영화 수)과 배급(상영횟수)에서, 그리고 흥행(관객수) F등급 비율 차이 차트
---------------------*/
function changingData() {

    var rowData1 = [
        ['등급', { label: 'count', type: 'number' }],
        ['F-3', 49],
        ['F-2', 63],
        ['F-1', 208],
        ['F-0', 342],
    ];

    var rowData2 = [
        ['등급', { label: 'count', type: 'number' }],
        ['F-3', 4],
        ['F-2', 5],
        ['F-1', 23],
        ['F-0', 70],
    ];
    // Create and populate the data tables.
    var data = [];
    data[0] = google.visualization.arrayToDataTable(rowData1);
    data[1] = google.visualization.arrayToDataTable(rowData2);


    const options = {
        pieHole: 0.5,
        pieStartAngle: 0,
        // legend: 'none',
        // pieSliceText: 'none',
        // fontName: 'CourierNewPSMT',
        // fontSize: 'auto',
        slices: {
            0: { color: mainBlue },
            1: { color: subBlue },
            2: { color: subGray },
            3: { color: dimGray },
        },
        pieSliceTextStyle: {
            color: 'black',
        },
        backgroundColor: {
            fill: 'none',
        },
        animation: {
            duration: 1000,
            easing: 'out'
        },

    };

    // Create and draw the visualization.
    const element = document.getElementById('user-distribution');
    const chart = new google.visualization.PieChart(element);


    // Disabling the button while the chart is drawing.
    button.disabled = true;
    google.visualization.events.addListener(chart, 'ready',
        function() {
            button.disabled = false;
            button.value = (current ? '5년간 제작된 영화' : '5년 총 관람객') + ' 보기';
        });
    options['title'] = '단계별' + (current ? '총 제작 영화의' : '총 관람객의') + ' F등급 분포';
    chart.draw(data[current], options);
};


/*-------------------
03_2. changing data
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
        backgroundColor: {
            fill: 'none',
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
        pieHole: 0.5,
        pieStartAngle: 0,
        legend: 'none',
        // pieSliceText: 'none',
        // fontName: 'CourierNewPSMT',
        // fontSize: 12,
        slices: {
            0: { color: mainBlue },
            1: { color: dimGray },
        },
        backgroundColor: {
            fill: 'none'
        }
    };

    const element = document.getElementById(id);
    const chart = new google.visualization.PieChart(element);

    chart.draw(data, options);

};