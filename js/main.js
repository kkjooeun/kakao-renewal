//mb-top부분
var mbNavi = [
	"BRAND",
	"NEW",
	"GIFT",
	"FOR CAFE",
	"GLASSWARE",
	"KITCHEN",
	"HOME DECO",
	"FURNITURE",
	"LIGHTING",
	"OFFICE",
	"CRAFT",
	"COLLECT",
	"STILL-LIFE"
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
	$(this).css("color", "#ddd");
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
	src: "../img/glassware_main_pc.jpg"
}, {
	src: "../img/pierre_Jeanneret_pc.jpg"
}, {
	src: "../img/plyworks_main_pc_final.jpg"
}, {
	src: "../img/2019_pc_main_2.jpg"
}, {
	src: "../img/Brand_Driade_Main_pc_최종2.jpg"
}, {
	src: "../img/Ichendorf_color_pc.jpg"
}, {
	src: "../img/chapter1seoul_plustanpromotion_main_pc.jpg"
}, {
	src: "../img/paolac_main_pc.jpg"
}, {
	src: "../img/swissmobilia_main_pc_3.jpg"
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
		src: "../img/8b170d964a670af05cfefa19f45f0b8c.jpg",
		tit: "7월 CHAPTER1 DAY"
	},
	{
		src: "../img/3123b90a5001a1ed016bb260c6c7dfba.jpg",
		tit: "SUMMER - GLASSWARE"
	},
	{
		src: "../img/34f5ada22bef7c292e1bba5aab28b0e7.jpg",
		tit: "SUMMER - FAN"
	},
	{
		src: "../img/2434abbeea105142be3954f660df951b.jpg",
		tit: "CHAPTER1 SELECT<br>BEST ITEM"
	},
	{
		src: "../img/1f712d26c3a0d34e66ce99dd84091b77.jpg",
		tit: "CHAPTER1 COLLECT<br>BEST ITEM"
	},
	{
		src: "../img/64049d871e7b6694a30ad67e1b545a70.jpg",
		tit: "CHAPTER1 EDIT<br>BEST ITEM"
	},
	{
		src: "../img/f1d119a0ff277d4d3471932806890214.jpg",
		tit: "WYU BUBBLE CUP SET (2PCS) <br>&#8361; 50,000"
	},
	{
		src: "../img/3281_shop1_650612.jpg",
		tit: "BLACK BOX OFFICE TRAY <br>&#8361; 38,000"
	},
	{
		src: "../img/795_shop1_894818.jpg",
		tit: "TILL UMBRELLA STAND - BLACK <br>&#8361; 198,000"
	},
	{
		src: "../img/2f0f460d141c82a57663931455f3d662.jpg",
		tit: "TRE COFFEE TABLE - WHITH <br>&#8361; 320,000"
	},
	{
		src: "../img/3340_shop1_578880.jpg",
		tit: "[주문 후 4개월 소요] <br> COMFORTABLE SOFA ROUND <br> 3SEATER_BROWN <br>&#8361; 1,980,000"
	},
	{
		src: "../img/2a253eda57540c928f3987b8488daf47.jpg",
		tit: "ARNOLD CIRCUS STOOL, <br>PISTACHIO GREEN<br>&#8361; 220,000"
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
		src: "../img/965d07d15a5f4f98f69d7ddaae16ef2b.jpg",
		tit: "LINEA SOFA TABLE - WHITE",
		price: "&#8361;650,000",
		event: ""
	},
	{
		src: "../img/5a1991e0b5a8c2fbe3278e3749694129.jpg",
		tit: "LINEA SOFA TABLE - BLACK",
		price: "&#8361;650,000",
		event: ""
	},
	{
		src: "../img/ac31fc1fb8ce30a94caed592531ac269.jpg",
		tit: "LINEA SIDE BOARD - WALNUT",
		price: "&#8361;2,300,000",
		event: ""
	},
	{
		src: "../img/df6a346003b483731e9d3cdae226ed3a.jpg",
		tit: "COOL MESH MAT",
		price: "&#8361;78,000",
		event: ""
	},
	{
		src: "../img/1fa0bf9ab1053d6540dfce967bf763ab.jpg",
		tit: "BAMBOO SEERSUCKER BEDDING (홑겹)",
		price: "&#8361;69,000",
		event: ""
	},
	{
		src: "../img/a6c3cae523a841911ab9bab90c464661.jpg",
		tit: "MOLE ARMCHAIR BK BEECH",
		price: "",
		event: "[주문 후 4개월 소요]"
	},
	{
		src: "../img/93a1edfd9697391de9534f4f184b2a8d.jpg",
		tit: "MOLE ARMCHAIR BR IMBUIA",
		price: "",
		event: "[주문 후 4개월 소요]"
	},
	{
		src: "../img/bc1b16cf06d8ee5591c7e5d6ab46669b.jpg",
		tit: "민자 꼬리 컵",
		price: "&#8361;45,000",
		event: "[CHAPTER1 EDIT]"
	},
	{
		src: "../img/0d89487d199714d753ccac36641b5116.jpg",
		tit: "GLASS 4301 SET (2PCS)",
		price: "&#8361;89,000",
		event: ""
	},
	{
		src: "../img/964266c66e6525a3bcda32c21d60c1d2.jpg",
		tit: "PEBBLE MIRROR",
		price: "&#8361;190,000",
		event: ""
	},
	{
		src: "../img/6d80b62585addc8d34cc895badd224de.jpg",
		tit: "INCENSE STICK INCENSE BURBS",
		price: "&#8361;25,000",
		event: ""
	},
	{
		src: "../img/46926a308e3b1ffc8037a640ce6e9b03.jpg",
		tit: "TULIP WINE GOBLET",
		price: "&#8361;49,000",
		event: ""
	},
	{
		src: "../img/1be017dcb0b8207e3a0d3462f2a93f5a.jpg",
		tit: "TULIP CHAMPAGNE GOBLET",
		price: "&#8361;59,000",
		event: ""
	},
	{
		src: "../img/9a52fb37688faad8bd341ed818d20981.png",
		tit: "APRON S - APPLE",
		price: "&#8361;58,000",
		event: ""
	},
	{
		src: "../img/4ec3e0ec866336fef9acf553a45313ea.jpg",
		tit: "CUTLERY 3001 SET",
		price: "&#8361;69,000",
		event: ""
	},
	{
		src: "../img/a3dc0002737f6fcf3fef3ee62612bc24.jpg",
		tit: "HERBARIUM - GREEN FOREST",
		price: "&#8361;32,000",
		event: ""
	},
	{
		src: "../img/9c7ce5dec1783ddb3c1f4c55bd2eff59.jpg",
		tit: "USEFUL SHAPE MIDDLE STOOL DEEP GRREN",
		price: "&#8361;286,000",
		event: ""
	},
	{
		src: "../img/3ff6ae98beed1c9ac75cc62cfea265f6.jpg",
		tit: "USEFUL SHAPE LOW STOOL, DEEP RED",
		price: "&#8361;253,000",
		event: ""
	},
	{
		src: "../img/df6a346003b483731e9d3cdae226ed3a.jpg",
		tit: "MARBLE APPLE - WHITE",
		price: "&#8361;34,000",
		event: ""
	},
	{
		src: "../img/ad1048b9c1d645e092c928728ecf7f89.jpg",
		tit: "TRIPOD WATER GLASS",
		price: "&#8361;78,000",
		event: "[주문 후 3개월 소요예정]"
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