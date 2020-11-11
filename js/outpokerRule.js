// 检查牌组的函数
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
function checkPoker(data) {
    // 为了方便牌型判断需要先把选中的牌组数据进行排序
    sortpoker(data.poker);

    let length = data.poker.length;       // 用于分析牌组的张数

    switch (length) {
        // 判断一张牌的情况
        case 1:
            data.type = 1;          // 设置当前选择牌的牌型
            // 判断是否为大小王
            if (data.poker[0].num == 14) {
                if (data.poker[0].color == 0) {
                    data.max = 14;
                } else {
                    data.max = 15;
                }
            } else {
                data.max = data.poker[0].num;
            }
            voicePlay(data);
            return true;        // 符合规则返回true
            break;

        // 判断两张牌的情况
        case 2:
            if (data.poker[0].num != data.poker[1].num) {
                return false;
            } else {
                // 判断是否为王炸
                if (data.poker[0].num == 14) {
                    data.type = 888;        // 设置牌型为王炸
                    data.max = 14;
					
                } else {
                    data.type = 2;          // 设置型为对子
                    data.max = data.poker[0].num;
                }
				voicePlay(data);
                return true;
            }
            break;

        // 判断三张牌的情况
        case 3:
            if (data.poker[0].num == data.poker[2].num) {
                data.type = 3;      // 设置牌型为3张
                data.max = data.poker[0].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }
            return false;
            break;

        // 判断四张牌的情况
        case 4:
            if (data.poker[0].num == data.poker[3].num) {
                data.type = 4;      // 设置牌型为普通炸弹
                data.max = data.poker[0].num;   // 设置牌型的判断值
				voicePlay(data)
               
				return true;
            } else if (data.poker[0].num == data.poker[2].num || data.poker[1].num == data.poker[3].num) {
                data.type = 5;      // 设置牌型为三带一
                data.max = data.poker[1].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }
            return false;
            break;

        // 判断五张牌的情况
        case 5:
            // 先判断是否为顺子
            if (checkStraight(data.poker)) {
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
                
				return true;
            }

            // 判断是否为三带二
            if (data.poker[0].num == data.poker[2].num && data.poker[3].num == data.poker[4].num ||
                data.poker[0].num == data.poker[1].num && data.poker[2].num == data.poker[4].num
            ) {
                data.type = 7;      // 设置牌型为顺子
                data.max = data.poker[2].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }
            return false;
            break;

        // 判断六张牌的情况
        case 6:
            // 先判断是否为顺子
            if (checkStraight(data.poker)) {
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
                
				return true;
            }

            // 判断是否为连对
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }

            // 判断是否为四带二
            if (data.poker[0].num == data.poker[3].num ||
                data.poker[1].num == data.poker[4].num ||
                data.poker[2].num == data.poker[5].num
            ) {
                data.type = 9;      // 设置牌型为四带二
                data.max = data.poker[2].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }

            // 判断是否为飞机
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[0].num * 1 + 1 == data.poker[3].num
            ) {
                data.type = 777;      // 设置牌型为飞机
                data.max = data.poker[5].num;   // 设置牌型的判断值
				airplane_texiao();
				voicePlay(data)
                return true;
            }
            return false;
            break;

        // 七张牌的情况
        case 7:
            // 先判断是否为顺子
            if (checkStraight(data.poker)) {
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
                
				return true;
            }

            return false;
            break;

        // 八张牌的情况
        case 8:
            // 先判断是否为顺子
            if (checkStraight(data.poker)) {
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
               
				return true;
            }

            // 判断是否为连对
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }

            /* 
                八张牌的飞机可能性
                33344456
                34555666
                33334446
                34445556
            */
            // 判断是否为飞机
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[0].num * 1 + 1 == data.poker[3].num ||   // 判断前6张牌是否连续

                data.poker[2].num == data.poker[4].num &&
                data.poker[5].num == data.poker[7].num &&
                data.poker[2].num * 1 + 1 == data.poker[5].num ||    // 判断后6张牌是否连续

                data.poker[1].num == data.poker[3].num &&
                data.poker[4].num == data.poker[6].num &&
                data.poker[1].num * 1 + 1 == data.poker[4].num   // 判断中间6张牌是否连续
            ) {
                data.type = 777;      // 设置牌型为飞机
                data.max = data.poker[5].num;   // 设置牌型的判断值
				voicePlay(data)
              
				return true;
            }

            // 判断四带两对
            /* 
                44445566
                44555566
                44556666
            */
            if (data.poker[0].num == data.poker[3].num &&
                data.poker[4].num == data.poker[5].num &&
                data.poker[6].num == data.poker[7].num      // 判断前四张
            ) {
                data.type = 10;      // 设置牌型为四带两对
                data.max = data.poker[0].num;   // 设置牌型的判断值
            }

            if (data.poker[2].num == data.poker[5].num &&
                data.poker[0].num == data.poker[1].num &&
                data.poker[6].num == data.poker[7].num      // 判断中间四张
            ) {
                data.type = 10;      // 设置牌型为四带两对
                data.max = data.poker[2].num;   // 设置牌型的判断值
            }

            if (data.poker[4].num == data.poker[7].num &&
                data.poker[0].num == data.poker[1].num &&
                data.poker[2].num == data.poker[3].num        // 判断后四张
            ) {
                data.type = 10;      // 设置牌型为四带两对
                data.max = data.poker[7].num;   // 设置牌型的判断值
				voicePlay(data)
				return true;
            }

            return false;
            break;
        case 9:
            if (checkStraight(data.poker)) {
                data.type = 8;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }
            break;
        case 10:
            if (checkStraight(data.poker)) {
                data.type = 8;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }
            // 判断是否为连对
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }

            //判断是否为飞机带两对
            /**
             * 3344555666
             * 5556667788
             * 4455566677
             */
            // 判断前6张牌是否连续
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[0].num * 1 + 1 == data.poker[3].num &&
                data.poker[6].num == data.poker[7].num &&
                data.poker[8].num == data.poker[9].num) {

                data.type = 7777;      // 设置牌型为飞机
                data.max = data.poker[5].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }
            // 判断后6张牌是否连续)
            if (data.poker[4].num == data.poker[6].num &&
                data.poker[7].num == data.poker[9].num &&
                data.poker[4].num * 1 + 1 == data.poker[7].num &&
                data.poker[0].num == data.poker[1].num &&
                data.poker[2].num == data.poker[3].num) {

                data.type = 7777;      // 设置牌型为飞机
                data.max = data.poker[9].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }
            // 判断中间6张牌是否连续
            if (data.poker[2].num == data.poker[4].num &&
                data.poker[5].num == data.poker[7].num &&
                data.poker[2].num * 1 + 1 == data.poker[5].num &&
                data.poker[0].num == data.poker[1].num &&
                data.poker[8].num == data.poker[9].num) {

                data.type = 7777;      // 设置牌型为飞机
                data.max = data.poker[7].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }

            break;
        case 11:
            if (checkStraight(data.poker)) {
                data.type = 8;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }
            break;

        case 12:
            if (checkStraight(data.poker)) {
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
               
				return true;
            }
            // 判断是否为连对
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }

            //判断是否是3连飞机带3张
            /**
             * 6667778889 10 11
             * 345666777888
             * 346667778889                    第3、5、9张
             * 56667778889 10
             * 566667777888
             * 666777788889
             * 666677778888
             * 666777888999
             */
            // 判断前9张牌是否连续
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[0].num * 1 + 1 == data.poker[3].num &&
                data.poker[3].num * 1 + 1 == data.poker[6].num 
                ) {

                data.type = 77777;      // 设置牌型为飞机
                data.max = data.poker[8].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }
            // 判断后9张牌是否连续)
            if (data.poker[3].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[9].num == data.poker[11].num &&
                data.poker[5].num * 1 + 1 == data.poker[6].num &&
                data.poker[6].num * 1 + 1 == data.poker[9].num 
               ) {

                data.type = 77777;      // 设置牌型为飞机
                data.max = data.poker[11].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }
            // 判断中间9张牌是否连续
            if (data.poker[2].num == data.poker[4].num &&
                data.poker[5].num == data.poker[7].num &&
                data.poker[8].num == data.poker[10].num &&
                data.poker[3].num * 1 + 1 == data.poker[5].num &&
                data.poker[5].num * 1 + 1 == data.poker[9].num ||

                data.poker[1].num == data.poker[3].num &&
                data.poker[4].num == data.poker[6].num &&
                data.poker[7].num == data.poker[9].num &&
                data.poker[3].num * 1 + 1 == data.poker[5].num &&
                data.poker[5].num * 1 + 1 == data.poker[9].num ||

                data.poker[1].num == data.poker[4].num &&
                data.poker[5].num == data.poker[8].num &&
                data.poker[9].num == data.poker[11].num &&
                data.poker[3].num * 1 + 1 == data.poker[5].num &&
                data.poker[5].num * 1 + 1 == data.poker[9].num ||

                data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[6].num &&
                data.poker[7].num == data.poker[10].num &&
                data.poker[3].num * 1 + 1 == data.poker[5].num &&
                data.poker[5].num * 1 + 1 == data.poker[9].num ||

                data.poker[0].num == data.poker[3].num &&
                data.poker[4].num == data.poker[7].num &&
                data.poker[8].num == data.poker[11].num &&
                data.poker[3].num * 1 + 1 == data.poker[5].num &&
                data.poker[5].num * 1 + 1 == data.poker[9].num 
                ) {

                data.type = 77777;      // 设置牌型为飞机
                data.max = data.poker[9].num;   // 设置牌型的判断值
				voicePlay(data)
               
				return true;
            }

            //判断特殊情况  666777888999
            if (data.poker[0].num == data.poker[2].num &&
                data.poker[3].num == data.poker[5].num &&
                data.poker[6].num == data.poker[8].num &&
                data.poker[9].num == data.poker[11].num &&
                data.poker[0].num * 1 + 1 == data.poker[3].num &&
                data.poker[3].num * 1 + 1 == data.poker[6].num &&
                data.poker[6].num * 1 + 1 == data.poker[11].num 
                ) {

                data.type = 77777;      // 设置牌型为飞机
                data.max = data.poker[8].num;   // 设置牌型的判断值
				voicePlay(data)
               
				return true;
            }
            break;
        case 14:
            // 判断是否为连对
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }
            break;
        case 16:
            // 判断是否为连对
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }
            break;
        case 18:
            // 判断是否为连对
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }
            break;
        case 20:
            // 判断是否为连对
            if (checkDouble(data.poker)) {
                data.type = 8;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length - 1].num;   // 设置牌型的判断值
				voicePlay(data)
                return true;
            }
            break;
        default:
            break;
    }

}

// 检查当前牌型是否为顺子
function checkStraight(poker) {
    for (let i = 0; i < poker.length - 1; i++) {
        if (poker[i].num * 1 + 1 != poker[i + 1].num) {
            return false;
        }
    }

    return true;
}

// 检查当前牌型是否为连对
function checkDouble(poker) {
    //  33445566
    for (let i = 0; i < poker.length - 2; i += 2) {
        if (poker[i].num != poker[i + 1].num || poker[i].num * 1 + 1 != poker[i + 2].num) {
            return false;
        }
    }
    return true;
}

// 检查当前手牌是否大于桌上的牌的函数
function checkVS() {
  
  
    // 如果出的牌是王炸的话可以直接打出
    if (gameData.select.type == 888) {
        gameData.multiple*=2
        console.log("e")
        return true;
    }

    // 出的是普通炸弹并且桌上的不是炸弹或者王炸就可以直接打出
    if (gameData.select.type == 4 && (gameData.desktop.type != 4 && gameData.desktop.type != 888)) {
        console.log("d")
        gameData.multiple*=2
        return true;
    }

      // 如果桌面上没有牌的话可以直接打出
    if (gameData.desktop.type == 0) {
        // console.log("f")
        return true;
    }

    // 如果桌面上的牌是王炸那无论是什么牌都不能打出
    if (gameData.desktop.type == 888) {
        console.log("c")
        return false;
    }

    // 一般组数据大小的判断
    if (gameData.select.type == gameData.desktop.type &&
        gameData.select.poker.length == gameData.desktop.poker.length &&
        gameData.select.max > gameData.desktop.max
    ) {
        if(gameData.select.type==4){
            gameData.multiple*=2
        }
        console.log("gameData.select.max:")
        console.log(gameData.select.max)
        console.log("gameData.desktop.max:")
        console.log(gameData.desktop.max)

        console.log("a")
        return true;
    } else {
        console.log("gameData.select.max:")
        console.log(gameData.select.max)
        console.log("gameData.desktop.max:")
        console.log(gameData.desktop.max)
        console.log("b")
        return false;
    }
}

function voicePlay(data){
	if(checkVS()){
		if(data.type==1){
			let single = document.getElementById("single"+data.max);
			console.log(data.type)
			single.play();
		}else if(data.type==2){
			let dui = document.getElementById("dui"+data.max);
			dui.play();
		}else if(data.type==888){
            rocket_texiao()
			let wangzha = document.getElementById("wangzha");
			wangzha.play();
		}else if(data.type==3){
			let sange = document.getElementById("sange");
			sange.play();
		}else if(data.type==4){
            bomb_texiao()
			let voice = document.getElementById("zhadan");
			voice.play();
		}else if(data.type==5){
			let voice = document.getElementById("sandaiyi");
			voice.play();
		}else if(data.type==6){
            sunzi_texiao()
			let voice = document.getElementById("shunzi");
			voice.play();
		}else if(data.type==7){
			let voice = document.getElementById("sandaier");
			voice.play();
		}else if(data.type==8){
			let voice = document.getElementById("liandui");
			voice.play();
		}else if(data.type==9){
			let voice = document.getElementById("sidaier");
			voice.play();
		}else if(data.type==10){
			let voice = document.getElementById("sidailiangdui");
			voice.play();
		}else if(data.type==777||data.type==7777||data.type==77777){
            airplane_texiao()
			let voice = document.getElementById("feiji");
			voice.play();
		}
		
	}
	
}
