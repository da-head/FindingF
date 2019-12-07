// csv 데이터 불러오기 ajax

$(function() {
    var fileName = '../src/data/10billion_movie.csv';

    // 파일 이름
    var parseName = ""; // 파일 이름 + 숫자 (var -> int 할거)
    var parse = 0; // var형 i를 정수로 변환시킨 값을 담을 변수

    for (var i = 1; i < 3; i++) {
        parse = parseInt(i);
        parseName = fileName + parse + '.csv'; // 파일 경로 + sequence + 확장자

        $.ajax({
            url: parseName,
            dataType: 'text',
            success: function(data) {
                var allRow = data;
                //.split(/\r?\n|\r/)
                var textLine = "";
                for (var singleRow = 0; singleRow < allRow.length; singleRow++) {
                    var collapse = allRow[singleRow].split(",");

                    for (var count = 0; count < collapse.length; count++) {
                        textLine += collapse[count];
                    }
                }

                $('#textArea').append(textLine);
                $('#textArea').append("<br>");
            }
        });
    }

});