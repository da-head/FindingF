// 영화 진흥원 api 불러오기 ajax
var key = 'b19151aac96092ae5b1b2b0fe82f9aff'

$(function() {
    $('#call').click(function() {
        $('#show').html('....loading...');

        $.ajax({
            type: "GET",
            url: "https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=" + key + "&targetDt=20171110",
            success: function(data) {
                $('#show').html(JSON.stringify(data));
            }
        })
    })
})