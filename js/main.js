//mb-top부분
var mbNavi = [
	"전체",
	"테마 기획전",
	"토이",
	"리빙",
	"잡화",
	"문구",
	"의류",
	"파자마",
	"여행/레져",
	"생활테크",
	"폰 액세서리",
	"식품"
];
var html = '';
var scTop = 0;
var $bg = $(".mb-top-bg");
var $wrap = $(".mb-top-wrap");
var $bar = $(".mb-top-wrap .fa-bars");
var $time = $(".mb-top-wrap .fa-times");

//모바일 navi 생성
for (var i in mbNavi) {
	html = '<li class="mb-navi py-1 f-125">' + mbNavi[i] + '';
	html += '</li>';
	$(".mb-navis").append(html);
}

// 모바일 navi top 이벤트
$(".mb-navi").mouseenter(function () {
	$(this).css("color", "#fff");
});
$(".mb-navi").mouseleave(function () {
	$(this).css("color", "#555");
});

// 아이콘 모양 바꾸기, 아이콘클릭
$wrap.find(".fas").click(function () {
	if ($(this).hasClass("fa-bars")) {
		$(this).removeClass("fa-bars").addClass("fa-times");
		$(window).off("scroll");
		$(".mb-navi-wrap").css("display", "block");
		if (scTop < 50) {
			$(".mb-top-wrap > .mb-top-logo ").css("opacity", 1);
			$(".mb-top-wrap > .mb-top-bg").css("background-color", "#555");
			$(".mb-top-wrap").css("background-color", "#fff");
		}	
	} 
	else {
		$(this).removeClass("fa-times").addClass("fa-bars");
		$(window).on("scroll", scrollFn);
		$(".mb-navi-wrap").css("display", "none");
		if (scTop < 50) {
			$(".mb-top-wrap > .mb-top-logo ").css("opacity", 0);
			$(".mb-top-wrap > .mb-top-bg").css("background-color", "");
			$(".mb-top-wrap").css("background-color", "");
			$(".mb-sub-logo").css("display", "block");
		}
		else $(window).trigger("scroll");
	}
});

// 아이콘 Hover
$bar.mouseenter(function () {
	console.log(scTop);
	if (scTop < 50) {
		$bar.css("color", "#eee");
		$bg.css("background-color", "#444");
	}
});
$bar.mouseleave(function () {
	if (scTop < 50) {
		$bar.css("color", "#555");
		$bg.css("background-color", "");
	}
});



function mobileInit() {

}


//스크롤이벤트
$(window).on("scroll", scrollFn);

function scrollFn() {
	scTop = $(window).scrollTop();

	if (scTop >= 200) {
		
	//pc navi
	$(".tops").css("background-color", "#fff");
	} 

	else if (scTop >= 100 && scTop < 200) {
		//스크롤조금진행
	//pc navi
	$(".top-logo").css("display", "block");
	$(".top-sub-logo").css("display", "none");
	$(".tops").css("background-color", "");
	//모바일
	$(".mb-sub-logo").css("display", "none");
	$(".mb-top-wrap > .mb-top-logo ").css("opacity", 1);
	$(".mb-top-wrap > .mb-top-bg").css("background-color", "#555");
	$(".mb-top-wrap > .fa-bars").css("color", "#eee");
	$(".mb-top-wrap").css("background-color", "#fff");
	} 

	else {
		//top에 있을때
	//pc
	$(".top-logo").css("display", "none");
	$(".top-sub-logo").css("display", "block");
	//모바일
	$(".mb-sub-logo").css("display", "block");
	$(".mb-top-wrap > .mb-top-logo ").css("opacity", 0);
	$(".mb-top-wrap > .mb-top-bg").css("background-color", "");
	$(".mb-top-wrap > .fa-bars").css("color", "#555");
	$(".mb-top-wrap").css("background-color", "");
	}
}

// pc버전 navi

// top-navi부분
$(".navi-tit").mouseenter(function () {
	$(this).children(".navi-sub").css("display", "block");
	$(this).children(".navi-sub").stop().animate({
		"opacity": 0.9,
		"top": 0
	}, 400);
	$(this).find(".navi-bar").css("width", "100%");
});
$(".navi-tit").mouseleave(function () {
	$(this).children(".navi-sub").css("display", "none");
	$(this).children(".navi-sub").stop().animate({
		"opacity": 0,
		"top": "80px"
	}, 700);
	$(this).find(".navi-bar").css("width", 0);
});


// top-bans부분

var bans = [{
	src: "../img/ban1.png"
},{
	src: "../img/ban2.png"
}, {
	src: "../img/ban3.png"
}, {
	src: "../img/ban4.png"
}];


var banNow = 1;
var banSpeed = 500;
var banGap = 3000;
var banIntevarl;

//초기화
for (var i in bans) {
	var html = '<li class="ban-img position-absolute w-100" style="top:0"><img src="' + bans[i].src + '" alt="" class="w-100"></li>';
	$(".banner .bans").append(html);
	if (i == 0) $(".pager").append('<li class="cir-sel"></li>');
	else $(".pager").append('<li class="cir"></li>');
}
$(".banner .bans").append($(".bans > .ban-img").eq(0).clone());

$(".ban-img").each(function (i) {
	$(this).css({
		"left": (i * 100) + "%"
	});
});

//resize
$(window).resize(function () {
	$(".bans").parent().outerHeight($(".bans > .ban-img").eq(0).outerHeight());
});

$(".bans").imagesLoaded(function () {
	$(window).trigger("resize");
});

//반복
function banShow() {
	$(".bans").stop().animate({
		"left": -(banNow * 100) + "%"
	}, banSpeed, function () {
		$(".pager > li").removeClass("cir-sel").addClass("cir");
		if (banNow == bans.length) {
			$(".bans").css({
				"left": 0
			});
			$(".pager > li").eq(0).removeClass("cir").addClass("cir-sel");
			banNow = 1;
		} else {
			$(".pager > li").eq(banNow).removeClass("cir").addClass("cir-sel");
			banNow++
		}
	});
}

banIntevarl = setInterval(banShow, banGap);

//event
$(".pager").mouseenter(function () {
	clearInterval(banIntevarl);
});
$(".pager").mouseleave(function () {
	clearInterval(banIntevarl);
	banIntevarl = setInterval(banShow, banGap);
});
$(".pager > li").click(function () {
	banNow = $(this).index();
	clearInterval(banIntevarl);
	banIntevarl = setInterval(banShow, banGap);
	banShow();
});

//best-item 부분
var bestItem = [{
		src: "../img/best1.jpg",
		tit: "찍찍, 치즈프렌즈"
	},
	{
		src: "../img/best2.jpg",
		tit: "어서와, 2020년은 처음이지?"
	},
	{
		src: "../img/best3.jpg",
		tit: "존재감 뿜뿜 <br> 귀여움도 사이즈도 자이언트"
	},
	{
		src: "../img/best4.jpg",
		tit: "보들보들 포근포근 <br> 폼폼프렌즈의 겨울이야기"
	},
	{
		src: "../img/best5.jpg",
		tit: "프렌즈템 선물하고 <br> 센스쟁이 되기"
	},
	{
		src: "../img/best6.jpg",
		tit: "어서와, 2020년은 처음이지?"
	},
	{
		src: "../img/best7.jpg",
		tit: "찍찍, 치즈프렌즈"
	},
	{
		src: "../img/best8.jpg",
		tit: "프렌즈템 선물하고 <br> 센스쟁이 되기"
	},
	{
		src: "../img/best9.jpg",
		tit: "우리 붕붕이, 좋은거 다해"
	},
	{
		src: "../img/best10.jpg",
		tit: "찍찍, 치즈프렌즈"
	},
	{
		src: "../img/best11.jpg",
		tit: "자이언트 라이언이 다 하는 <br> 내 방 무드"
	},
	{
		src: "../img/best12.jpg",
		tit: "보들보들 포근포근 <br> 폼폼프렌즈의 겨울이야기"
	}
];

for (var i in bestItem) {
	var html = '<li class="best-item position-relative pointer">';
	html += '<img src="' + bestItem[i].src + '" alt="" class="w-100">';
	html += '<div class="position-absolute justify-content-center align-items-center pt-koserif" style="top:0; left: 0; width: 100%; height: 100%;">' + bestItem[i].tit + '';
	html += '</div>';
	html += '</li>';
	$(".best-items").append(html);
}

$(".best-item").mouseenter(function () {
	$(this).find("div").stop().animate({
		opacity: 1
	}, 400);
});
$(".best-item").mouseleave(function () {
	$(this).find("div").stop().animate({
		opacity: 0
	}, 600);
});

// new부분
var newArrival = [{
		src: "../img/new1.jpg",
		tit: "칫솔살균기 리틀라이언",
		price: "&#8361;25,000",
		event: ""
	},
	{
		src: "../img/new2.jpg",
		tit: "칫솔살균기 리틀어피치",
		price: "&#8361;25,000",
		event: ""
	},
	{
		src: "../img/new3.jpg",
		tit: "LINEA SIDE BOARD - WALNUT",
		price: "&#8361;2,300,000",
		event: ""
	},
	{
		src: "../img/new4.jpg",
		tit: "화끈라면_라이언",
		price: "&#8361;1,900",
		event: ""
	},
	{
		src: "../img/new5.jpg",
		tit: "봉골라면_어피치",
		price: "&#8361;1,900",
		event: ""
	},
	{
		src: "../img/new6.jpg",
		tit: "주차번호판_리틀라이언",
		price: "&#8361;10,000",
		event: "[무료배송 이벤트]"
	},
	{
		src: "../img/new7.jpg",
		tit: "주차번호판_리틀어피치",
		price: "&#8361;10,000",
		event: "[무료배송 이벤트]"
	},
	{
		src: "../img/new8.jpg",
		tit: "리틀라이언 피규어디퓨저",
		price: "&#8361;24,000",
		event: "[특별세일중]"
	},
	{
		src: "../img/new9.jpg",
		tit: "리틀어피치 피규어디퓨저",
		price: "&#8361;24,000",
		event: "[특별세일중]"
	},
	{
		src: "../img/new10.jpg",
		tit: "지퍼백 10P Set-어피치",
		price: "&#8361;7,000",
		event: ""
	},
	{
		src: "../img/new11.jpg",
		tit: "지퍼백 10P Set-라이언",
		price: "&#8361;7,000",
		event: ""
	},
	{
		src: "../img/new12.jpg",
		tit: "치즈 동전지갑 라이언",
		price: "&#8361;13,000",
		event: ""
	},
	{
		src: "../img/new13.jpg",
		tit: "치즈 동전지갑 어피치",
		price: "&#8361;13,000",
		event: ""
	},
	{
		src: "../img/new14.jpg",
		tit: "치즈 에어팟케이스 라이언",
		price: "&#8361;19,000",
		event: ""
	},
	{
		src: "../img/new15.jpg",
		tit: "치즈 케이블보호캡 라이언",
		price: "&#8361;12,000",
		event: ""
	},
	{
		src: "../img/new16.jpg",
		tit: "치즈 케이블보호캡 어피치",
		price: "&#8361;12,000",
		event: ""
	},
	{
		src: "../img/new17.jpg",
		tit: "치즈_프렌즈코인초콜릿세트",
		price: "&#8361;14,000",
		event: ""
	},
	{
		src: "../img/new18.jpg",
		tit: "글리터 케이스_리틀라이언",
		price: "&#8361;15,000",
		event: ""
	},
	{
		src: "../img/new19.jpg",
		tit: "글리터 케이스_리틀어피치",
		price: "&#8361;15,000",
		event: ""
	},
	{
		src: "../img/new20.jpg",
		tit: "치즈_빌리지 브릭피규어",
		price: "&#8361;49,000",
		event: "[온라인 단독 한정판매]"
	}
];

var newNow = 1;
var newSpeed = 500;
var newGap = 3000;
var newIntevarl;

for (var i in newArrival) {
	html = '<ul class="arrival-items mb-5">';
	html += '<li class="arrivla-item-img">';
	html += '<img src="' + newArrival[i].src + '" alt="" class="w-100">';
	html += '</li>';
	html += '<li class="arrival-item-event mt-2">' + newArrival[i].event + '</li>';
	html += '<li class="arrival-item-tit">' + newArrival[i].tit + '</li>';
	html += '<li class="arrival-item-pri">' + newArrival[i].price + '</li>';
	html += '</ul>';
	$(".arrivals").append(html);
}

//val부분
$(".val-box").mouseenter(function () {
	// $(this).css({"background-size": "105% auto"});
	$(this).find(".val-box-tit").css("opacity", "1");
	$(this).find(".val-box-bar").css({
		"opacity": "1",
		"width": "90%"
	});
	$(this).find(".val-box-cont").css("opacity", "1");
});
$(".val-box").mouseleave(function () {
	// $(this).css({"background-size": "100% auto"});
	$(this).find(".val-box-tit").css("opacity", "0.6");
	$(this).find(".val-box-bar").css({
		"opacity": "0.5",
		"width": "45%"
	});
	$(this).find(".val-box-cont").css("opacity", "0.6");
});


//footer부분

//go-top부분
$(".go-tops").click(function () {
	$("html, body").stop().animate({
		"scrollTop": 0
	}, 500);
});