/**
 * 找单牌
 */

function find_one(a) {
    let end
    let isFirst = true
    let startbig
    for (let i = 0; i < player[gameData.play].poker.length; i++) {
        if (gameData.desktop.max < player[gameData.play].poker[i].num || a == 0) {
            if (isFirst) {            //记录第一张比max大的坐标
                startbig = i
                isFirst = false
            }

            if (i + 1 < player[gameData.play].poker.length && player[gameData.play].poker[i].num == player[gameData.play].poker[i + 1].num) {           //判断是不是对子
                i++             //是对子跳过对子
            } else {
                return i
            }
        }
        if (gameData.desktop.max == 14 && player[gameData.play].poker[i].num == 14) {
            console.log("大王判定")
            if (player[gameData.play].poker[i].color == 1) {
                return i
            }
        }
        end = i
    }
    return startbig
}

/**
 * 找对子
 */
function find_two(a) {
    for (let i = 0; i < player[gameData.play].poker.length; i++) {
        if (gameData.desktop.max < player[gameData.play].poker[i].num || a == 0) {
            index = i
            let temp = i + 1
            if (temp < player[gameData.play].poker.length && player[gameData.play].poker[i].num == player[gameData.play].poker[temp].num) {
                return i
            }

        }

    }
    return false
}

/**
 * 找三张
 */
function find_three() {
    for (let i = 0; i < player[gameData.play].poker.length; i++) {
        if (gameData.desktop.max < player[gameData.play].poker[i].num) {
            if (i + 2 < player[gameData.play].poker.length && player[gameData.play].poker[i].num == player[gameData.play].poker[i + 2].num) {
                return i
            }
        }
    }
    return false
}

/**
 * 找三带一     
 */

function find_threeTone() {
    let threeTone = {}
    if (find_three()) {
        threeTone.three = find_three()
        threeTone.one = find_one(0)
        return threeTone
    } else {
        return false
    }


}
/**
 * 找顺子  返回数组 排序后使用  
 */

function find_straight() {
    let shunzi = []
    for (let i = 0; i < player[gameData.play].poker.length; i++) {
        if (gameData.desktop.max < player[gameData.play].poker[i].num) {
            console.log(gameData.desktop.max)
            console.log(player[gameData.play].poker[i].num)
            if (player[gameData.play].poker[i].num >= 13) {
                break                       //2和王不能当顺子
            }
            console.log("i" + i)
            let j = i
            let length = j - gameData.desktop.poker.length
            if (player[gameData.play].poker[length + 1].num == undefined) {
                console.log("chaoguo ")
                return false
            }
            for (j; j > length; j--) {
                console.log("j" + j)
                if (player[gameData.play].poker[j].num == player[gameData.play].poker[j - 1].num) {
                    console.log("数据" + j)
                    length--
                    continue
                }
                else if (player[gameData.play].poker[j].num * 1 - 1 == player[gameData.play].poker[j - 1].num) {
                    shunzi.push(j)
                    console.log("顺子数组" + shunzi)
                } else {
                    shunzi = []
                    break
                }
            }
            if (shunzi.length == gameData.desktop.poker.length) {
                console.log("可以出顺子shunzi这个数组后遍历到前")
                return shunzi
            }else{
                return  false;
            }


        }

    }
}

/**
 * 三带二
 */
function find_threeTwo() {
    let threeTwo = {}
    if (find_three()) {
        threeTwo.three = find_three()
        threeTwo.two = find_two(0)
        return threeTwo
    } else {
        return false
    }

}

/**
 * 连对
 */
function find_lianPair() {
    for (let i = 0; i < player[gameData.play].poker.length; i++) {
        if (gameData.desktop.max < player[gameData.play].poker[i].num) {

        }

    }
}


/**
* 判断有无炸弹 王炸
*/

function pom() {
    for (let i = 0; i < player[gameData.play].poker.length; i++) {

        if (player[gameData.play].poker[player[gameData.play].poker.length - 1].num == 14 && player[gameData.play].poker[player[gameData.play].poker.length - 2].num == 14) {
            let pomw = {}
            pomw.type = 2
            pomw.num = player[gameData.play].poker.length - 2
            console.log("王炸")
            return pomw			//加入王炸
        }
        if (i + 1 < player[gameData.play].poker.length && i + 2 < player[gameData.play].poker.length && i + 3 < player[gameData.play].poker.length && player[gameData.play].poker[i].num == player[gameData.play].poker[i + 3].num) {
            let pom4 = {}
            pom4.type = 4
            pom4.num = i
            console.log(pom4)
            return pom4			//加入普炸
        }


    }
    console.log("没炸")
    return false
}