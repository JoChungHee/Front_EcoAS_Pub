$(document).ready(function(){
    // 메뉴 select
    $('.menu-list').on('change', function() {
        var url = $(this).val();

        $(this).blur();

        if (url) {
            window.location.href = url;
        }
    });

    // ### 로그인 카운트 START
    var timerInterval; // 타이머 변수
    var $count = $('.count');

    function startTimer() {
        clearInterval(timerInterval); // 기존 타이머 정지

        var timeText = $count.data('count');
        var parts = timeText.split(':');
        var minutes = parseInt(parts[0]);
        var seconds = parseInt(parts[1]);
        var totalSeconds = minutes * 60 + seconds;

        updateDisplay(totalSeconds); // 초기 표시

        timerInterval = setInterval(function() {
        totalSeconds--;
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            $count.text('00:00');
            
            // 추후 해당 영역에 로그아웃 개발 필요
            alert("시간이 종료되어 로그아웃 됩니다.");

            return;
        }
            updateDisplay(totalSeconds);
        }, 1000);
    }

    // 업데이트
    function updateDisplay(totalSeconds) {
        var min = Math.floor(totalSeconds / 60);
        var sec = totalSeconds % 60;
        var display = 
        (min < 10 ? '0' + min : min) + ':' + 
        (sec < 10 ? '0' + sec : sec);
        $count.text(display);
    }

    // 카운트 최초 실행
    startTimer();

    // 시간연장 btn
    $('.time-extend').on('click', function() {
        startTimer();
    });

    // ### 로그인 카운트 END

    // ### 공통 페이지 Tab Swiper
    var swiper = new Swiper(".page-tab", {
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: true,
    });

    // ### 공통 페이지 Tab active 설정
    $(".page-tab").each(function(){
        var $tab = $(this);

        $tab.on('click', '.page-tab-link', function(e){
            e.preventDefault();
            var $clicked = $(this);

            $tab.find('.page-tab-link').removeClass('active');
            $clicked.addClass('active');
        });
    });
    
});
