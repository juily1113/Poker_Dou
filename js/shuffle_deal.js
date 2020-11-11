let click = 1

let all_poker = []
$(".player0")
$(".player1")
$(".player2")
let state = 0;
/**
 * 洗牌动画
 */
function shuffle() {
if(state==0){
    if (click != 1) {
        all_poker = produce_poker()         //生成54张牌的数据
        //打乱牌组数据
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                all_poker.sort(function (x, y) {
                    return Math.random() - 0.5
                })
            }
        } 

       
        deal()
        return false
    }
    state=1;
    let backups = $db.html()   //备份

   $deck.remove()      //删除牌组
    let temp_deck = ''   //新建空白的牌组做洗牌动画
	temp_deck+='<ul id="deck" style= "position : relative ;">'
	for (i = 0; i < 54; i++) {
	    temp_deck += '<li class="poker" style="top:-' + i / 2 + 'px"></li>'
	}
	temp_deck += '</ul>'
	$db.append(temp_deck)
	for (let i = 0; i < 54; i++) { 
		let num=i%3;//将牌交叉分为三组
		switch (num) {
			case 0:
				$(".poker").eq(i).animate({ left: "150px",top:'-'+(i+1)/5+'px'}, i*20);	
				break;
			case 1:
				$(".poker").eq(i).animate({ left: "0px",top:'-'+(i+1)/5+'px'}, i*20);
				break;
			case 2:
				$(".poker").eq(i).animate({ left: "-150px",top:'-'+(i+1)/5+'px'}, i*20);
				break;
			default :
				console.log(num)
		}
	} 
	for (let i = 53; i >=0; i--) { 
		let num=i%4;//将牌交叉分为三组
		switch (num) {
			case 0:
				$(".poker").eq(i).animate({ left: "175px",top:'-'+(i+1)/5+'px'}, (54-i)*20);	
				break;
			case 1:
				$(".poker").eq(i).animate({ left: "55px",top:'-'+(i+1)/5+'px'}, (54-i)*20);
				break;
			case 2:
				$(".poker").eq(i).animate({ left: "-55px",top:'-'+(i+1)/5+'px'}, (54-i)*20);
				break;
			case 3:
				$(".poker").eq(i).animate({ left: "-175px",top:'-'+(i+1)/5+'px'}, (54-i)*20);
				break;
			default :
				console.log(num)
		}
	}
	for (let i = 53; i >=0; i--) { 
		let num=i%2;//将牌交叉分为三组
		switch (num) {
			case 0:
				$(".poker").eq(i).animate({ left: "75px",top:'-'+(i+1)/5+'px'}, i*30);	
				break;
			case 1:
				$(".poker").eq(i).animate({ left: "-75px",top:'-'+(i+1)/5+'px'}, i*30);
				break;
			default :
				console.log(num)
		}
	}
	
	for (let i = 0; i <54; i++) { 
		let num=i%2;//将牌交叉分为三组
		switch (num) {
			case 0:
				$(".poker").eq(i).animate({left: "0px",top:'-'+i/2+'px'}, (54-i)*20);	
				break;
			case 1:
				$(".poker").eq(i).animate({left: "0px",top:'-'+i/2+'px'}, (54-i)*20);
				break;
			default :
				console.log(num)
		}
	}

    setTimeout(function () {                                                //牌组还原
        $db.html(backups)
        click++
        state=0;
    }, 2920)
}
    
}


/**
 * 发牌
 */
function deal() {
    go()
    let num = 0
    let poker_html = ''
    /**
     * 发16轮 留三张地主牌
     */
    function go() {

        $("#deck li:last ").animate({ left: "-450px", top: "150px" }, 100, function () {  //给左边发牌
            $("#deck li:last ").remove()
            player[0].poker.push(all_poker.pop())
            poker_html = makePoker(player[0].poker[player[0].poker.length - 1]);
            $(".player0 >ul").append(poker_html)
            $(".player0 >ul li:last").css({ top: num * 23 + 'px', right: 145 + 'px', transform: "rotate(90deg)" })
            $("#deck li:last ").animate({ top: "400px" }, 100, function () {    //给中间发牌
                $("#deck li:last ").remove();

                player[1].poker.push(all_poker.pop())       //玩家1得牌
                poker_html = makePoker(player[1].poker[player[1].poker.length - 1]);
                $(".player1 >ul").append(poker_html)
                $(".player1 >ul li:last").css({ left: num * 28 + 'px' })

                $("#deck li:last ").animate({ left: "450px", top: "150px" }, 100, function () {   //给右边发牌
                    $("#deck li:last ").remove();

                    player[2].poker.push(all_poker.pop())     //玩家2得牌
                    poker_html = makePoker(player[2].poker[player[2].poker.length - 1]);
                    $(".player2 >ul").append(poker_html)
                    $(".player2 >ul li:last").css({ top: num * 23 + 'px', right: 145 + 'px', transform: "rotate(-90deg)","z-index":100-i})



                    if (++num <= 16) {
                        
                        go()
                    } else {
                        $db.off()

                        sortpoker(player[0].poker)
                        sortpoker(player[1].poker)
                        sortpoker(player[2].poker)
                      

                        setTimeout(() => {
                            $(".player0 >ul li").css({ "background": "" }).addClass("poker")
                            $(".player1 >ul li").css({ "background": "" }).addClass("poker")
                            $(".player2 >ul li").css({ "background": "" }).addClass("poker")


                            setTimeout(() => {
                                $(".player0 >ul li").remove()

                                $(".player1 >ul li").remove()
                                $(".player2 >ul li").remove()

                                for (let i = 0; i < player[0].poker.length; i++) {
                                    $('.player0 >ul').append(makePoker(player[0].poker[i]))
                                    $(".player0 li:last").css({ top: i * 23 + 'px', right: 145 + 'px', transform: "rotate(90deg)" })
                                    $('.player1 >ul').append(makePoker(player[1].poker[i]))
                                    $(".player1 li:last").css({ left: i * 28 + 'px' })
                                    $('.player2 >ul').append(makePoker(player[2].poker[i]))
                                    $(".player2 li:last").css({ top: i * 23 + 'px', right: 145 + 'px', transform: "rotate(-90deg)","z-index":100-i})
                                }
                                    getboss()
                                    
                            }, 500)
                        }, 500)


                    }
                })
            })
        })



        /*  $(".poker").last().animate({ left: "-600px" }, 200, function () {
            //给左边发牌
             $(".poker").last().remove()
             console.log($(".poker"))
            
             //给中间发牌
             $(".poker").last().animate({ top: "600px" }, 200, function () {
                 $(".poker").last().remove()
                 console.log($(".poker"))
                
                 //给右边发牌
                 $(".poker").last().animate({ left: "600px", top: "250px" }, 200, function () {
                     $(".poker").last().remove()
                     console.log("num")
                     
                     if(++num<=16){
                         console.log(num)
                         go()
                     }
                 })
             })
         })*/



    }


}