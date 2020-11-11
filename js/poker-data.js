/**
 * 初始化玩家数据
 */
let player = [{
	name: 'zhangwei',
	img: '../images/user0.jpg',
	gold: 10000,
	poker: []
},
{
	name: 'zhuaoli',
	img: '../images/user1.jpg',
	gold: 10000,
	poker: []
},
{
	name: 'songbing',
	img: '../images/user2.jpg',
	gold: 10000,
	poker: []
}
];
// 用于保存当局游戏的数据
let gameData = {
	boss: null, // 当前哪位玩家是地主
	play: null, // 当前到哪位玩家出牌
	// selectPoker:[]      // 当前玩家选择中的牌的数据
	select: {
		type: 0, // 选中牌的牌型
		poker: [], // 选中牌的数据
		max: 0 // 选中牌的牌型中用于判断大小的值
	},
	// 当前桌面牌组数据
	desktop: {
		type: 0, // 选中牌的牌型
		poker: [], // 选中牌的数据
		max: 0 // 选中牌的牌型中用于判断大小的值
	},
	multiple: 1 // 本局游戏结算的倍数
}

/**
 * 牌数据生成
 */

function produce_poker() {
	let all_poker = [] //扑克牌数组  （54张）
	for (let i = 1; i <= 13; i++) {
		for (let j = 0; j < 4; j++) {
			all_poker.push({
				num: i,
				color: j
			})
		}
	}
	all_poker.push({
		num: 14,
		color: 0
	})
	all_poker.push({
		num: 14,
		color: 1
	})
	return all_poker
}
/**
 * 生成手牌的HTML
 */
function makePoker(poker) {
	// 普通花色的坐标数据
	let color = [];
	if (poker.num > 5 && poker.num < 10 || poker.num == 11) {
		color = [{
			x: -13.3,
			y: -9.3,
			bgsize_x: 200,
			bgsize_y: 283
		}, // 黑桃花色的坐标
		{
			x: -110,
			y: -9.3,
			bgsize_x: 200,
			bgsize_y: 283
		}, // 红桃花色的坐标
		{
			x: -13.3,
			y: -144,
			bgsize_x: 200,
			bgsize_y: 283
		}, // 梅花花色的坐标
		{
			x: -110,
			y: -144,
			bgsize_x: 200,
			bgsize_y: 283.3
		}, // 方块花色的坐标  
		];
	} else {
		color = [{
			x: 0,
			y: 0,
			bgsize_x: 176,
			bgsize_y: 255
		}, // 黑桃花色的坐标
		{
			x: -94.7,
			y: 0,
			bgsize_x: 176,
			bgsize_y: 255
		}, // 红桃花色的坐标
		{
			x: 0,
			y: -133,
			bgsize_x: 176,
			bgsize_y: 255
		}, // 梅花花色的坐标
		{
			x: -94.7,
			y: -132,
			bgsize_x: 176,
			bgsize_y: 255
		}, // 方块花色的坐标  
		];
	}

	let x, y, bgsize_x, bgsize_y;

	if (poker.num != 14) {
		x = color[poker.color].x
		y = color[poker.color].y
		bgsize_x = color[poker.color].bgsize_x;
		bgsize_y = color[poker.color].bgsize_y;
	} else {
		if (poker.color == 0) {
			x = -106;
			y = -15.3;
			bgsize_x = 200;
			bgsize_y = 280;
		} else {
			x = -14.7;
			y = -15.3;
			bgsize_x = 200;
			bgsize_y = 280;
		}
	}

	return '<li data-num="' + poker.num + '" data-color="' + poker.color +
		'" data-select=0 style="width: 81.5px; height: 123.3px; background: url(./images/' + poker.num + '.png) ' + x + 'px ' +
		y +
		'px;background-size:' + bgsize_x + 'px ' + bgsize_y + 'px;position:absolute;"></li>';
}

/**
 * 牌排序
 */
function sortpoker(pokers) {
	pokers.sort(function (x, y) {
		if (x.num != y.num) {
			return x.num - y.num
		} else {
			return x.color - y.num
		}
	})
	return pokers
}

/**
 * 抢地主
 */

//记录抢地主的次数


let num = 0 //用于记录抢了多少次
let log = 1 //用于记录是否需要有第四次抢地主
let cry = 0
let flag //记录cryOrget的返回值
function getboss(random, get_data) {
	if (random == undefined) {
		random = Math.floor(Math.random() * 3)
	}

	num = num == undefined ? 0 : num //记录抢地主次数
	get_data = get_data == undefined ? [null, null, null] : get_data; //记录玩家抢地主
	random = random > 2 ? 0 : random
	$(".btn_get").css({
		"display": "none"
	})
	$(".countdown").css({
		"display": "none"
	})
	$(".btn_get").off() //接触绑定
	$(".btn_get").empty()
	//显示该玩家抢地主的按钮	




	if (num == 0) { //区分叫地主与抢地主
		$(".player" + random + " .btn_get").css({
			"display": "inline"
		})
		$(".player" + random + " .bosscount").css({
			"display": "inline"
		})
		// console.log(random)
		flag = cryOrget(random) //叫或抢地主

		let t = 9; //设置定时器
		$(".bosscount p").text(t + 1);
		let time = setInterval(function () {
			if (t < 0) {
				window.clearInterval(time);
				t = 9;
				$(".player" + random + " .buqiang").click();
			} else {
				$(".bosscount p").text(t);
				t--;
				// console.log(t)
			}

		}, 1000)
		$(".player" + random + " .qiang").on("click", function () {
			bossVoicePlay(1);
			cry++
			alertYes(flag)
			num++
			get_data[random] = 1
			gameData.multiple *= 2
			window.clearInterval(time);
			t = 9
			$(".tipbox").css({
				"display": "none"
			})
			$(".player" + random + " .tipbox").css({
				"display": "inline"
			})
			$(".player" + random + " .tipbox p").text("叫地主");
			getboss(++random, get_data)
			return true

		})
		$(".player" + random + " .buqiang").on("click", function () {
			bossVoicePlay(0);
			alertNo(flag)
			num++
			get_data[random] = 0
			window.clearInterval(time);
			t = 9
			$(".tipbox").css({
				"display": "none"
			})
			$(".player" + random + " .tipbox").css({
				"display": "inline"
			})
			$(".player" + random + " .tipbox p").text("不叫");
			getboss(++random, get_data)
			return true
		})
	} else {
		let t = 9;
		$(".bosscount p").text(t + 1);
		let time = setInterval(function () {
			if (t < 0) {
				window.clearInterval(time);
				t = 9;

				$(".player" + random + " .buqiang").click();
			} else {
				$(".bosscount p").text(t);
				t--;
				// console.log(t)
			}

		}, 1000)
		if (num == 3 && log == 1) {
			if (get_data[0] == get_data[1] && get_data[1] == get_data[2]) { //三家同样的操作
				if (get_data[0] == 0) {
					alert("本局无人抢地主，流局！！")
					window.location.href = window.location.href;
				} else {
					log = 0
					num++

					window.clearInterval(time);
					t = 9
					if (random == 0) {
						$(".tipbox").css({
							"display": "none"
						})
						$(".player2 .tipbox").css({
							"display": "inline"
						})
						if (get_data[2] == 0) {
							$(".player2 .tipbox p").text("不叫");
						} else {
							$(".player2 .tipbox p").text("抢地主");
						}
					} else {
						$(".tipbox").css({
							"display": "none"
						})
						$(".player" + (random - 1) + " .tipbox").css({
							"display": "inline"
						})
						if (get_data[random - 1] == 0) {
							$(".player" + (random - 1) + " .tipbox p").text("不叫");
						} else {
							$(".player" + (random - 1) + " .tipbox p").text("抢地主");
						}
					}

					getboss(random, get_data);
					return true
				}
			} else { //三家不一样的操作
				console.log("一人抢地主！")
				if (get_data[0] == 1 && get_data[1] == 0 && get_data[2] == 0) {
					$(".player0 .king").css({
						"display": "inline"
					})
					window.clearInterval(time);
					setboss(0)
					return true
				} else if (get_data[0] == 0 && get_data[1] == 1 && get_data[2] == 0) {
					$(".player1 .king").css({
						"display": "inline"
					})
					window.clearInterval(time);
					setboss(1)
					
					return true
				} else if (get_data[0] == 0 && get_data[1] == 0 && get_data[2] == 1) {
					$(".player2 .king").css({
						"display": "inline"
					})
					window.clearInterval(time);
					setboss(2)
					return true
				} else {
					log = 0
					num++
					window.clearInterval(time);
					t = 9
					getboss(random, get_data);
					return true
				}

			}
		}

		if (num == 4) {
			// console.log(random)
			// console.log(get_data[random] + "zhi")
			if (get_data[random] == 0) { //如果 下家没抢跳过
				random = ++random > 2 ? 0 : random

				$(".btn_get").css({
					"display": "none"
				})
				$(".bosscount").css({
					"display": "none"
				})
				$(".player" + random + " .btn_get").css({
					"display": "inline"
				})
				$(".player" + random + " .bosscount").css({
					"display": "inline"
				})
				flag = cryOrget(random)

				$(".player" + random + " .qiang").on("click", function () {
					bossVoicePlay(1);
					cry++
					alertYes(flag)
					num++
					get_data[random] = 1
					$(".player" + random + " .king").css({
						"display": "inline"
					})
					gameData.multiple *= 2
					window.clearInterval(time);
					setboss(random)
					return true

				})
				$(".player" + random + " .buqiang").on("click", function () {
					bossVoicePlay(0);
					alertNo(flag)
					num++
					get_data[random] = 0
					random = --random < 0 ? 2 : random
					random = --random < 0 ? 2 : random
					$(".player" + random + " .king").css({
						"display": "inline"
					})
					setboss(random)
					window.clearInterval(time);
					return true
				})
			} else {
				// console.log("标记")
				$(".player" + random + " .btn_get").css({
					"display": "inline"
				})
				$(".player" + random + " .bosscount").css({
					"display": "inline"
				})
				flag = cryOrget(random)
				// console.log("cry" + cry + "flag" + flag)
				$(".player" + random + " .qiang").on("click", function () {
					bossVoicePlay(1);
					cry++
					alertYes(flag)
					num++
					get_data[random] = 1
					$(".player" + random + " .king").css({
						"display": "inline"
					})
					gameData.multiple *= 2
					window.clearInterval(time);
					setboss(random)
					return true

				})
				$(".player" + random + " .buqiang").on("click", function () {
					bossVoicePlay(0);
					alertNo(flag)
					num++
					get_data[random] = 0
					random = --random < 0 ? 2 : random
					if (get_data[random] == 0) { //判断上一个是否抢了 没抢继续上一个
						random = --random < 0 ? 2 : random
					}
					$(".player" + random + " .king").css({
						"display": "inline"
					})
					window.clearInterval(time);
					setboss(random)
					return true
				})
			}
			if (get_data[0] == get_data[1] && get_data[1] == get_data[2] == 1) {

			}
		} else {
			$(".player" + random + " .bosscount").css({
				"display": "inline"
			})
			$(".player" + random + " .btn_get").css({
				"display": "inline"
			})
			flag = cryOrget(random)

			$(".player" + random + " .qiang").on("click", function () {
				bossVoicePlay(1);
				cry++
				alertYes(flag)
				num++
				get_data[random] = 1

				gameData.multiple *= 2
				window.clearInterval(time);
				t = 5
				$(".tipbox").css({
					"display": "none"
				})
				$(".player" + random + " .tipbox").css({
					"display": "inline"
				})
				$(".player" + random + " .tipbox p").text("抢地主");
				getboss(++random, get_data)
				return true

			})
			$(".player" + random + " .buqiang").on("click", function () {
				bossVoicePlay(0);
				alertNo(flag)
				num++
				get_data[random] = 0
				window.clearInterval(time);
				t = 5
				$(".tipbox").css({
					"display": "none"
				})
				$(".player" + random + " .tipbox").css({
					"display": "inline"
				})
				$(".player" + random + " .tipbox p").text("不抢");
				getboss(++random, get_data)
				return true
			})
		}

	}
}

/**
 * 判断是叫地主还是抢地主
 */
function cryOrget(random) {
	if (cry == 0) {
		$(".btn_get").empty()
		$(".player" + random + " .qiang").text("叫地主")
		$(".player" + random + " .buqiang").text("不叫")
		return true
	} else {
		$(".btn_get").empty()
		$(".player" + random + " .qiang").text("抢地主")
		$(".player" + random + " .buqiang").text("不抢")
		return false
	}
}
/**
 * 播放叫地主，抢地主音效
 */
function bossVoicePlay(num) {
	if (cry == 0) {
		if (num == 1) {
			let voice = document.getElementById("jiaodizhu");
			voice.play();
		} else if (num == 0) {
			let voice = document.getElementById("bujiao");
			voice.play();
		}
	} else {
		if (num == 1) {
			let voice = document.getElementById("qiangdizhu");
			voice.play();
		} else if (num == 0) {
			let voice = document.getElementById("buqiang");
			voice.play();
		}
	}
}


/**
 * 弹出叫地主还是抢地主
 * @param {*标记cryOrget的返回值} num 
 */
function alertYes(num) {
	if (num) {
		// alert("叫地主")
	} else {
		// alert("抢地主")
	}
}
/**
 * 弹出不叫还是不抢
 * @param {*标记cryOrget的返回值 } num 
 */

function alertNo(num) {
	if (num) {
		// alert("不叫")
	} else {
		// alert("不抢")
	}
}

/**
 * 设置地主
 */
function setboss(num) {

	$(".btn_get").css({ "display": "none" })
	$(".countdown").css({ "display": "none" })
	$(".btn_get").off()
	$(".tipbox").css({ "display": "none" })

	gameData.boss = num				//数据上设置地主
	// console.log($('#deck .poker').eq(0))
	$('#deck .poker').eq(0).animate({ "left": "150px" })
	$('#deck .poker').eq(2).animate({ "left": "-150px" }, () => {
		// 最后三张牌的数据放到地主玩家挡手牌中
		player[gameData.boss].poker.push(all_poker[0], all_poker[1], all_poker[2])
		sortpoker(player[gameData.boss].poker)

		// 动画与页面
		$('#deck .poker').remove()
		for (let i = 0; i < all_poker.length; i++) {

			$("#deck").append(makePoker(all_poker[i]))
			if (i == 0) {
				$('#deck li:last').css({ left: "150px" })
			} else if (i == 2) {
				$('#deck li:last').css({ left: "-150px" })
			}
		}

		$("#deck").animate({ "top": "10px" }, 500)


		setTimeout(function () {
			if (num == 1) {		//地主为1时不要旋转
				$(".player" + gameData.boss + " li").remove()		//删除地主手牌
				// console.log(player[gameData.boss].poker.length)

				for (let i = 0; i < player[gameData.boss].poker.length; i++) {			//翻面
					$(".player" + gameData.boss + " >ul").append('<li class="poker" style="left:' + (i * 26 - 50) + 'px"></li>')
				}
				setTimeout(function () {
					$(".player" + gameData.boss + " li").remove()			//        删除                                                                         
					for (let i = 0; i < player[gameData.boss].poker.length; i++) {

						$(".player" + gameData.boss + " >ul").append(makePoker(player[gameData.boss].poker[i]))  //上真牌
						$(".player" + gameData.boss + " >ul li:last").css({ "left": (i * 26 - 50) })
					}
					gameData.play = gameData.boss
					outpoker(0)
				}, 500)

			} else if (num == 0) {		//地主为0时牌旋转90度
				$(".player" + gameData.boss + " li").remove()
				console.log(player[gameData.boss].poker.length)
				for (let i = 0; i < player[gameData.boss].poker.length; i++) {
					$(".player" + gameData.boss + " >ul").append('<li class="poker" style="top:' + (i - 1) * 20 + 'px"></li>')
					$(".player" + gameData.boss + " >ul li:last").css({ "transform": "rotate(90deg)", "top": (i - 1) * 20 })
				}

				setTimeout(function () {
					$(".player" + gameData.boss + " li").remove()
					for (let i = 0; i < player[gameData.boss].poker.length; i++) {

						$(".player" + gameData.boss + " >ul").append(makePoker(player[gameData.boss].poker[i]))
						$(".player" + gameData.boss + " >ul li:last").css({ "transform": "rotate(90deg)", "top": (i - 1) * 20, "right": "145px" })

					}
					gameData.play = gameData.boss
					outpoker(0)
				}, 500)
			} else if (num == 2) {		//地主为2时牌旋转90度
				$(".player" + gameData.boss + " li").remove()
				// console.log(player[gameData.boss].poker.length)
				for (let i = 0; i < player[gameData.boss].poker.length; i++) {
					$(".player" + gameData.boss + " >ul").append('<li class="poker" style="top:' + (i - 1) * 20 + 'px"></li>')
					$(".player" + gameData.boss + " >ul li:last").css({ "transform": "rotate(-90deg)", "top": (i - 1) * 20 })
				}

				setTimeout(function () {
					$(".player" + gameData.boss + " li").remove()
					for (let i = 0; i < player[gameData.boss].poker.length; i++) {

						$(".player" + gameData.boss + " >ul").append(makePoker(player[gameData.boss].poker[i]))
						$(".player" + gameData.boss + " >ul li:last").css({ "transform": "rotate(-90deg)", "top": (i - 1) * 20, "right": "145px", "z-index": 100 - i })
					}
					gameData.play = gameData.boss
					outpoker(0)
				}, 500)
			} else {
				alert("错误")
			}

		}, 500)


	})

}
let t1 = 40;
function outpoker(pass) {
	$(".out-poker button").off()
	$(".out-poker button").hide()
	$(".out-poker .countdown").hide()
	$(".player" + gameData.play + " .out-poker button").show()
	$(".player" + gameData.play + " .out-poker .countdown").show()
	//设置定时器
	$(".out-poker .countdown p").text(t1 - 1);
	t1 = t1 - 1;
	for (let i = 1; i < 4; i++) {
		clearInterval(i);
	}

	let times = setInterval(function () {
			if(t1 ==37 && gameData.play !=gameData.boss){
				console.log("bendanjiqiren")
				hint()
				if(gameData.select.poker != 0){
					$(".player" + gameData.play + " .out-poker .out").click()
				}else{
					$(".player" + gameData.play + " .out-poker .no").click()
				}
			
			}else if (t1 < 0) {

			if (gameData.desktop.poker == 0) {
				hint()
				$(".player" + gameData.play + " .out-poker .out").click()
			} else {
				window.clearInterval(times);
				console.log("清除定时器")
				t1 = 40;
				$(".player" + gameData.play + " .out-poker .no").click()
			}

		} else {
			$(".out-poker .countdown p").text(t1);

			t1--;
			console.log(t1)
		}

	}, 1000)

	// console.log("pass:" + pass + " gameData.play:" + gameData.play)
	if (pass == 2) { //有两人过牌
		window.clearInterval(times);
		gameData.desktop.type = 0;
		gameData.desktop.poker = [];
		gameData.desktop.max = 0;
		pass = 0
		outpoker(0)
		return
	} else {
		// console.log("gameData.play")
		// console.log(gameData.play)
		select_poker(gameData.play)
		$(".player" + gameData.play + " .out-poker .out").on("click", function () {

			// console.log("出牌")
			$(".player" + gameData.play + " .out-poker .out").hide()
			$(".player" + gameData.play + " .out-poker .out").off("click")
			$(".out-poker" + gameData.play + " .countdown").hide()


			if (!checkPoker(gameData.select)) {
				console.log("不符合规则")
				alert("不符合规则")
				window.clearInterval(times);
				outpoker(pass)
				return
			} else {





				if (checkVS()) { //检查打的起不
					console.log(gameData.select.type)
					console.log(gameData.desktop.type)
					window.clearInterval(times);
					console.log("清除定时器")
					t1 = 40;
					gameData.desktop.poker = [];
					for (let i = 0; i < gameData.select.poker.length; i++) { //出牌后选中的牌变成了桌面的牌
						gameData.desktop.poker[i] = {};
						gameData.desktop.poker[i].num = gameData.select.poker[i].num;
						gameData.desktop.poker[i].color = gameData.select.poker[i].color;
					}
					gameData.desktop.type = gameData.select.type
					console.log(gameData.select.max)
					gameData.desktop.max = gameData.select.max

					gameData.select.poker = [] //选中的牌清空
					gameData.select.type = 0
					gameData.select.max = 0
					//遍历手牌删除已经出了的牌
					for (let i = 0; i < gameData.desktop.poker.length; i++) {
						for (let j = 0; j < player[gameData.play].poker.length; j++) {

							if (gameData.desktop.poker[i].num == player[gameData.play].poker[j].num && gameData.desktop.poker[i].color ==
								player[gameData.play].poker[j].color) {
								player[gameData.play].poker.splice(j, 1)

							}
						}
					}


					$(".player" + gameData.play + " li").remove() //更新手牌		删除显示操作
					for (let i = 0; i < player[gameData.play].poker.length; i++) {

						$(".player" + gameData.play + " >ul").append(makePoker(player[gameData.play].poker[i]))

						switch (gameData.play) {
							case 0:
								$(".player" + gameData.play + " >ul li:last").css({
									"transform": "rotate(90deg)",
									"top": (i - 1) * 20,
									"right": "143px"
								})
								break;
							case 1:
								$(".player" + gameData.play + " >ul li:last").css({
									"left": (i * 26 - 50)
								})
								break;
							case 2:
								$(".player" + gameData.play + " >ul li:last").css({
									"transform": "rotate(-90deg)",
									"top": (i - 1) * 20,
									"right": "145px"
								})
								break;
						}
					}
					go_desk()
					if (end(player[gameData.play])) {
						return
					}


					gameData.play = ++gameData.play > 2 ? 0 : gameData.play;

					outpoker(0)
					return
				} else {
					alert("打不起")
					window.clearInterval(times);
					outpoker(pass)
					return
				}
			}


		})

		$(".player" + gameData.play + " .out-poker .no").on("click", function () { //过牌
			$(".out-poker" + gameData.play + " .countdown").hide()

			if (gameData.desktop.type == 0) {
				console.log("你必须出牌")
				alert("你必须出牌")
				window.clearInterval(times);
				outpoker(pass)
				return
			} else {
				pass++
				console.log("过牌")
				pokerVoicePlay(0)
				window.clearInterval(times);
				console.log("清除定时器")
				t1 = 40;
				$(".player" + gameData.play + " .out-poker .no").hide()
				$(".player" + gameData.play + " .out-poker .bosscount").hide()
				$(".player" + gameData.play + " .out-poker .no").off("click")
				gameData.select.poker = []
				$(".player" + gameData.play + " li").removeClass("on")
				gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
				outpoker(pass)
				return
			}

		})
	}


}
/**
 * 播放出牌音效
 */
function pokerVoicePlay(num) {
	if (num == 0) {
		let voice = document.getElementById("buyao1");
		voice.play();
	} else {
		let voice = document.getElementById("chupai");
		voice.play();
	}
}


function select_poker(num) { //加入选牌数据
	// console.log("select")
	$("li").off()
	$(".player" + num + " li").on("click", function () {
		let poker = {}
		poker.num = $(this).attr("data-num") * 1
		poker.color = $(this).attr("data-color") * 1

		if ($(this).attr("data-select") == 0) {
			$(this).attr("data-select", 1)
			$(this).addClass("on")

			gameData.select.poker.push(poker)
			// console.log("gameData.select.poker:")
			// console.log(gameData.select.poker)
		} else { //删除已选牌数据
			$(this).attr("data-select", 0)
			$(this).removeClass("on")

			for (let i = 0; i < gameData.select.poker.length; i++) {
				if (poker.num == gameData.select.poker[i].num && poker.color == gameData.select.poker[i].color) {
					gameData.select.poker.splice(i, 1)
					console.log("gameData.select.poker:")
					console.log(gameData.select.poker)
					break
				}
			}

		}

	})
}
/**
 * 出的牌上牌桌
 */

function go_desk() {
	pokerVoicePlay(1)
	switch (gameData.play) {
		case 0:
			$(".desk-poker ul li").remove()
			for (let i = 0; i < gameData.desktop.poker.length; i++) {
				$(".player0 .desk-poker ul").append(makePoker(gameData.desktop.poker[i]))
				$(".player0 .desk-poker ul li:last").css({
					"left": i * 30 + 120,
					"top": "80%"
				})
			}
			break;
		case 1:
			console.log("桌面牌")
			$(".desk-poker ul li").remove()
			for (let i = 0; i < gameData.desktop.poker.length; i++) {
				$(".player1 .desk-poker ul").append(makePoker(gameData.desktop.poker[i]))
				$(".player1 .desk-poker ul li:last").css({
					"left": i * 30,
					"top": "-22px"
				})
			}
			break;
		case 2:
			$(".desk-poker ul li").remove()
			sortforplayer2(gameData.desktop.poker)
			for (let i = 0; i < gameData.desktop.poker.length; i++) {
				$(".player2 .desk-poker ul").append(makePoker(gameData.desktop.poker[i]))
				$(".player2 .desk-poker ul li:last").css({
					"right": i * 30 + 120,
					"z-index": 100 - i,
					"top": "80%"
				})
			}
			sortpoker(gameData.desktop.poker)
			break;
	}

}
/**
 * 
 *为了让玩家二出牌不溢出
 *他出的牌重新排序成从大到小
 */
function sortforplayer2(poker) {

	poker.sort(function (x, y) {
		if (x.num != y.num) {
			return y.num - x.num
		} else {
			return y.num - x.color
		}
	})
	return poker

}
function setintegral() {
	if (JSON.stringify(localStorage) == "{}") {
		for (let i = 0; i < 3; i++) {
			$(".player" + i + " .user-gold").text(10000)
		}
	} else {
		for (let i = 0; i < 3; i++) {
			$(".player" + i + " .user-gold").text(localStorage.getItem("player" + i))
		}
	}

}
function end(player) {
	if (player.poker.length == 0) {
		$("button").off()
		$("button").hide()
		$(".account button").show();

		let sum0 = $("table tr td").eq(4);
		let sum1 = $("table tr td").eq(9);
		let sum2 = $("table tr td").eq(14);
		let play0_gold = parseInt($(".player0 .user-gold").text())
		let play1_gold = parseInt($(".player1 .user-gold").text())
		let play2_gold = parseInt($(".player2 .user-gold").text())
		// 		let play0_gold = parseInt(localStorage.getItem("player0"));
		// 		let play1_gold = parseInt(localStorage.getItem("player1"));
		// 		let play2_gold = parseInt(localStorage.getItem("player2"));
		console.log(parseInt(localStorage.player0))
		console.log(localStorage.getItem("player2"))
		// alert("游戏结束玩家" + player.name + "胜利 倍数为" + gameData.multiple)
		let name = player.name;
		$(".account_content").css({
			"display": "block",
		})
		$("table tr td").eq(2).text(gameData.multiple);
		$("table tr td").eq(7).text(gameData.multiple);
		$("table tr td").eq(12).text(gameData.multiple);
		if (name == 'zhuaoli') {
			$(".pic").attr("class", "pic_x");

			$(".account").css({
				background: "linear-gradient(to right, rgba(17,139,172, 0.1) 0%, rgba(17,139,172, 0.8) 40%, rgba(17,139,172, 0.8) 50%, rgba(17,139,172, 0.8) 60%, rgba(17,139,172, 0.1) 100%)"
			})
			for (let i = 0; i < 3; i++) {
				$("table tr td").eq(3).text(gameData.multiple * -500 * 2);
				$("table tr td").eq(8).text(gameData.multiple * 500)
				$("table tr td").eq(13).text(gameData.multiple * 500)
			}
			if (gameData.boss == 1) {
				$("table tr td img").eq(0).attr('src', 'img/farmer1.png');
				$("table tr td img").eq(2).attr('src', 'img/farmer1.png');
				$("table tr td img").eq(1).attr('src', 'img/boss.png');
				$("table tr td").eq(3).text(gameData.multiple * -500);
				$("table tr td").eq(8).text(gameData.multiple * 500 * 2)
				$("table tr td").eq(13).text(gameData.multiple * -500)
				sum0.text(gameData.multiple * -500 + play0_gold);
				sum1.text(gameData.multiple * 500 * 2 + play1_gold)
				sum2.text(gameData.multiple * -500 + play2_gold)

			} else if (gameData.boss == 0) {
				$("table tr td img").eq(1).attr('src', 'img/farmer.png');
				$("table tr td img").eq(2).attr('src', 'img/farmer.png');
				$("table tr td img").eq(0).attr('src', 'img/boss1.png');
				$("table tr td").eq(3).text(gameData.multiple * -500 * 2);
				$("table tr td").eq(8).text(gameData.multiple * 500)
				$("table tr td").eq(13).text(gameData.multiple * 500)
				sum2.text(gameData.multiple * 500 + play2_gold);
				sum0.text(gameData.multiple * -500 * 2 + play0_gold)
				sum1.text(gameData.multiple * 500 + play1_gold)
			} else {
				$("table tr td img").eq(1).attr('src', 'img/farmer.png');
				$("table tr td img").eq(0).attr('src', 'img/farmer.png');
				$("table tr td img").eq(2).attr('src', 'img/boss1.png');
				$("table tr td").eq(13).text(gameData.multiple * -500 * 2);
				$("table tr td").eq(8).text(gameData.multiple * 500)
				$("table tr td").eq(3).text(gameData.multiple * 500)
				sum0.text(gameData.multiple * 500 + play0_gold);
				sum2.text(gameData.multiple * -500 * 2 + play2_gold)
				sum1.text(gameData.multiple * 500 + play1_gold)
			}

		} else if (name != 'zhuaoli') {
			$(".pic_x").attr("class", "pic")
			$(".account").css({
				background: "linear-gradient(to right, rgba(172, 113, 83, 0.1) 0%, rgba(172, 113, 83, 0.8) 40%, rgba(172, 113, 83, 0.8) 50%, rgba(172, 113, 83, 0.8) 60%, rgba(17,139,172, 0.1) 100%)"
			})
			if (gameData.boss == 1) {
				$("table tr td img").eq(0).attr('src', 'img/farmer.png');
				$("table tr td img").eq(2).attr('src', 'img/farmer.png');
				$("table tr td img").eq(1).attr('src', 'img/boss1.png');
				$("table tr td").eq(3).text(gameData.multiple * 500);
				$("table tr td").eq(8).text(gameData.multiple * 500 * -2)
				$("table tr td").eq(13).text(gameData.multiple * 500)
				sum0.text(gameData.multiple * 500 + play0_gold);
				sum1.text(gameData.multiple * 500 * -2 + play1_gold)
				sum2.text(gameData.multiple * 500 + play2_gold)
			} else if (gameData.boss == 0) {
				$("table tr td img").eq(1).attr('src', 'img/farmer1.png');
				$("table tr td img").eq(2).attr('src', 'img/farmer1.png');
				$("table tr td img").eq(0).attr('src', 'img/boss.png');
				$("table tr td").eq(3).text(gameData.multiple * 500 * 2);
				$("table tr td").eq(8).text(gameData.multiple * -500)
				$("table tr td").eq(13).text(gameData.multiple * -500)
				sum0.text(gameData.multiple * 500 * 2 + play0_gold);
				sum1.text(gameData.multiple * -500 + play1_gold)
				sum2.text(gameData.multiple * -500 + play2_gold)
			} else {
				$("table tr td img").eq(1).attr('src', 'img/farmer1.png');
				$("table tr td img").eq(0).attr('src', 'img/farmer1.png');
				$("table tr td img").eq(2).attr('src', 'img/boss.png');
				$("table tr td").eq(13).text(gameData.multiple * 500 * 2);
				$("table tr td").eq(8).text(gameData.multiple * -500)
				$("table tr td").eq(3).text(gameData.multiple * -500)
				sum2.text(gameData.multiple * 500 * 2 + play2_gold);
				sum1.text(gameData.multiple * -500 + play1_gold)
				sum0.eq(4).text(gameData.multiple * -500 + play0_gold)
			}
		}
		$(".account button").eq(1).click(function () {
			$(".account_content").css({
				"display": "none",
			})
			// 			$(".player0 .user-gold").text(sum0.text());
			// 			$(".player1 .user-gold").text(sum1.text());
			// 			$(".player2 .user-gold").text(sum2.text());
			localStorage.setItem("player0", sum0.text().toString())
			localStorage.setItem("player1", sum1.text().toString())
			localStorage.setItem("player2", sum2.text().toString())

			setintegral()
			window.location.href = window.location.href;
		})
		$(".account button").eq(0).click(function () {
			localStorage.setItem("player0", sum0.text().toString())
			localStorage.setItem("player1", sum1.text().toString())
			localStorage.setItem("player2", sum2.text().toString())

			setintegral()
			location.href = "startpage.html";
		})
		return true
	}
}

/* 
	牌型分类：
	1       单张
	2       对子
	3       三张
	4       普炸
	5       三带一
	6       顺子
	7       三带二
	8       连对
	9       四带二
	10      四带两对
	777     飞机   
	7777    两飞机带两对
	77777   三飞机带三张
	888     王炸
*/
let index = 0

function hint() {
	let index
	let that = $(".player" + gameData.play + " >ul li")

	switch (gameData.desktop.type) {
		case 0:
			index = find_one(0)
			addOremove(that, index)
			break
		case 1:					//单张
			index = find_one();

			addOremove(that, index)

			break;
		case 2: 			//对子

			index = find_two()

			if (index == false) {
				let zhadan = pom()
				console.log(zhadan)
				for (let i = zhadan.num; i < zhadan.num + zhadan.type; i++) {
					addOremove(that, i)
				}
				return false
			}
			addOremove(that, index)
			addOremove(that, index + 1)
			break;

		case 3:			//三张
			index = find_three()

			if (index == false) {
				let zhadan = pom()
				console.log(zhadan)
				for (let i = zhadan.num; i < zhadan.num + zhadan.type; i++) {
					addOremove(that, i)
				}
				return false
			}
			addOremove(that, index)
			addOremove(that, index + 1)
			addOremove(that, index + 2)
			break

		case 5:			//三带一
			index = find_threeTone()

			if (index == false) {
				let zhadan = pom()
				console.log(zhadan)
				for (let i = zhadan.num; i < zhadan.num + zhadan.type; i++) {
					addOremove(that, i)
				}
				return false
			}
			addOremove(that, index.three)
			addOremove(that, index.three + 1)
			addOremove(that, index.three + 2)
			addOremove(that, index.one)
			break

		case 6:			//顺子
			let indexArray = find_straight()

			if (indexArray == false) {
				let zhadan = pom()
				console.log(zhadan)
				for (let i = zhadan.num; i < zhadan.num + zhadan.type; i++) {
					addOremove(that, i)
				}
				return false
			}
			console.log(indexArray)
			for (let i = 0; i < indexArray.length; i++) {
				addOremove(that, indexArray[i])
			}
			break
		case 7:			//三带二
			index = find_threeTwo()

			if (index == false) {
				let zhadan = pom()
				console.log(zhadan)
				for (let i = zhadan.num; i < zhadan.num + zhadan.type; i++) {
					addOremove(that, i)
				}
				return false
			}
			addOremove(that, index.three)
			addOremove(that, index.three + 1)
			addOremove(that, index.three + 2)
			addOremove(that, index.two)
			addOremove(that, index.two + 1)

			break
		default:
			
			break

	}
}

function addOremove(that, index) {
	let poker = {}

	poker.num = that.eq(index).attr("data-num") * 1
	poker.color = that.eq(index).attr("data-color") * 1

	if (that.eq(index).attr("data-select") == 0) {
		that.eq(index).attr("data-select", 1)
		that.eq(index).addClass("on")

		gameData.select.poker.push(poker)
		// console.log("gameData.select.poker:")
		// console.log(gameData.select.poker)
	} else {									//删除已选牌数据
		that.eq(index).attr("data-select", 0)
		that.eq(index).removeClass("on")

		for (let i = 0; i < gameData.select.poker.length; i++) {
			if (poker.num == gameData.select.poker[i].num && poker.color == gameData.select.poker[i].color) {
				gameData.select.poker.splice(i, 1)
				console.log("gameData.select.poker:")
				console.log(gameData.select.poker)
				break
			}
		}

	}
	
}
