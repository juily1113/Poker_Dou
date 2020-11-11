function require() {

}
require("./js/jquery-3.2.1.min.js")

let $db = $("#deckbox")
let $video = $("#video")
/* 牌组 */
let $deck = $("#deck")
/*用于存储牌的字符串 */
let decks = ''

setintegral();
$video.trigger("play")      //背景视频播放
$video.muted=false
/**
 * 生成桌面堆叠的牌组
 */
getDecks()
function getDecks() {
    for (i = 0; i < 54; i++) {
        decks += '<li class="poker" style="top:-' + i / 2 + 'px"></li>'
    }
    $deck.html(decks)
}
let chatclick=0;
chat();
function chat(){
    $(".chat").on("click", function () {
        if(chatclick==0){
             $(".chat .chatbox").css({"display":"inline"});
             chatclick=1;
        }else{
            $(".chat .chatbox").css({"display":"none"});
             chatclick=0;
        }
           
       
    })

    for(let i =0;i<$(".chat .chatbox li").length;i++){
        $(".chat .chatbox li").eq(i).on("click", function () {
            let voice = document.getElementById("chat"+i);
            console.log(i);
		    	voice.play();
         })  
    }
    
}
bgMusicPlay();
function bgMusicPlay(){
    console.log("come")
    $(".voice").on("click", function () {
        let bgmusic = document.getElementById("bgmusic");
        bgmusic.pause();
        console.log("no")
        $(".voice").css({"display":"none"});
        $(".novoice").css({"display":"inline"});
    })    
    $(".novoice").on("click", function () {
        let bgmusic = document.getElementById("bgmusic");
        
        bgmusic.play();
        console.log("yes")
        $(".novoice").css({"display":"none"});
        $(".voice").css({"display":"inline"});
    })
}

/**
 * 点击发牌洗牌
 */

$db.on("click",shuffle)
// 特殊牌型特效

function airplane_texiao() {
	// 飞机动画
	$(".content_poker").css({
		opacity: "1",
		zIndex: "100"
	})
	let feiji_bgm = document.getElementById("music");
	feiji_bgm.load() //重头开始
	feiji_bgm.play()

	$(".airplane").css({
		'animation': 'airplane_run 2.5s linear',
		'animation-delay': 0.7 + 's'
	})
	setTimeout(() => {
		$(".feiji").animate({
			top: "400px"

		}, 800, function() {
			$(".feiji").animate({
				top: "0px"
			}, 800)
		})

	}, 1700)

	setTimeout(() => {
		$(".airplane").css({
			'animation': '',
			'animation-delay': ''
		}) //删除动画效果
		feiji_bgm.pause()
		$(".content_poker").css({
			opacity: "0",
			zIndex: "-1"
		})
	}, 4000)

}

function rocket_texiao() {
	//火箭动画
	$(".content_poker").css({
		opacity: "1",
		zIndex: "100"
	})
	let rocket_bgm = document.getElementById("rmusic");
	rocket_bgm.load()
	rocket_bgm.play()
	$(".rocket").css({
		'animation': 'rocket_run 2s linear',
		'animation-delay': 1 + 's'
	})
	setTimeout(() => {
		$(".rocket").css({
			'animation': '',
			'animation-delay': ''
		}) //删除动画效果
		rocket_bgm.pause()
		$(".content_poker").css({
			opacity: "0",
			zIndex: "-1"
		})
	}, 3000)

}

function bomb_texiao() {
	// 炸弹动画
	$(".content_poker").css({
		opacity: "1",
		zIndex: "100"
	})
	$(".bomb").animate({
		opacity: "1",

	}, 400, function() {
		$(".bomb").css({
			"background": "url(img/bomb2.png) no-repeat",
			backgroundSize: "100%"
		})
	})
	let bomb_bgm = document.getElementById("bmusic");
	bomb_bgm.load();
	$(".bomb1").css({
		'animation': 'bomb_run 0.3s linear forwards',
		'animation-delay': 0.5 + 's',
	})

	setTimeout(() => {
		bomb_bgm.play();
		$(".bomb1").css({
			'animation': '',
			'animation-delay': ''
		}) //删除动画效果	
		$(".bomb").animate({
			opacity: "0"
		})
		$(".fire").animate({
			opacity: "1"

		}, 1000, function() {
			$(".fire").animate({
				opacity: "0"

			}, 500)
		})

	}, 900)
	setTimeout(() => {
		$(".content_poker").css({
			opacity: "0",
			zIndex: "-1"
		})
	}, 2500)
	bomb_bgm.pause();
	$(".bomb").css({
		background: "url(img/bomb1.png) no-repeat",
		backgroundSize: "100%"

	})

}


function sunzi_texiao() {
	//顺子动画
	$(".content_poker").css({
		opacity: "1",
		zIndex: "100"
	})
	$(".shunzi").css({
		'animation': 'shunzi_run 1.5s linear',
		'animation-delay': 0.3 + 's'
	})
	setTimeout(() => {
		$(".shunzi").css({
			'animation': '',
			'animation-delay': ''
		}) //删除动画效果
		$(".content_poker").css({
			opacity: "0",
			zIndex: "-1"
		})
	}, 1800)

}