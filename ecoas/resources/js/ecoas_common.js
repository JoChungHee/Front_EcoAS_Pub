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
    
    /* 리스트 테이블 전체선택 check 공통 */
    $(".check-all").on('change', function(){
        var thisName = $(this).attr("name");
        var checkName = thisName.replace("All", "");

        $("input[name='" + checkName +"']").prop("checked", $(this).prop("checked"));
    });

    $(".check-con").on("change", function(){
        var checkConName = $(this).attr("name");
        var checkAllBox = $("input[name='" + checkConName + "All']");
        var checkTotal = $("input[name='" + checkConName + "']").length;
        var checkedCon = $("input[name='" + checkConName + "']:checked").length;

        checkAllBox.prop("checked", checkTotal === checkedCon);
    });

    /* list table 위치 계산 */
    listTblHeightSet();

    $(window).resize(function(){
        listTblHeightSet();
        layerListTblHeightSet();
    });

    /* list table filter date */
    $(".filter-canlendar").click(function(){
        var targetDate = $(this).closest(".filter-con").find(".filter-date");

        if (targetDate[0].showPicker) {
            targetDate[0].showPicker();
        } else {
            targetDate.focus();
        }
        
    });

});

/* 공통 list table filter on/off */
function listTblSearch(){
    $(".list-tbl .tbl-filter").toggleClass('active');
}

/* list table 위치 계산 */
function listTblHeightSet(){
    if ($(".list-tbl-box").length) {
        var headerHeight = $(".header-form").outerHeight(true) || 0;
        var pageTitleHeight = $(".contents .page-title").outerHeight(true) || 0;
        var pageTabHeight = $(".contents .page-tab").outerHeight(true) || 0;
        var listTopHeight = $(".list-form .list-top").outerHeight(true) || 0;

        var windowHeight = $(window).height();
        var listBoxHeight = windowHeight - (headerHeight + pageTitleHeight + pageTabHeight + listTopHeight + 67);

        $(".list-tbl-box").css("height", listBoxHeight + "px");
        $(".contents").css("padding-bottom", 24 + "px");
    }

}

/* layer pop table 위치 계산 */
function layerListTblHeightSet(){
    if ($(".layer-list-tbl").length) {
        $(".layer-pop").each(function(){
            var $pop = $(this);
            var headerHeight = $pop.find(".layer-header").outerHeight(true) || 0;
            var searchHeight = $pop.find(".layer-body .list-search").outerHeight(true) || 0;
            var bottomHeight = $pop.find(".layer-bottom").outerHeight(true) || 0;

            var popHeight = $pop.height();
            var listBoxHeight = popHeight - (headerHeight + searchHeight + bottomHeight + 40);

            $pop.find(".layer-list-box").css("max-height", listBoxHeight + "px");
        });
    }

}

/* layer pop open scroll set */
function layerOpenScorllSet(){
    $('body').css("overflow","hidden");
}

function layerCloseScorllSet(){
    $('body').css("overflow","auto");
}

/* layer pop close */
function layerClose(){
    $(".layer-pop").fadeOut();
    layerCloseScorllSet();
}

























