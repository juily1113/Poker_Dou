$(function() {
	let music = document.getElementById('music');
	function deal() {
	
		$(".head_music").click(function() {
			if ($(this).hasClass("head_music on")) {
				$(this).removeClass("head_music on")
				$(this).addClass("head_music off")
				music.pause();
			} else if ($(this).hasClass("head_music off")) {
				$(this).removeClass("head_music off")
				$(this).addClass("head_music on")
				music.play();
			}
		})
		$(".start").click(function() {
			$(".right").animate({
				left: "-700px"
			}, 2000)
			$(".left").animate({
				right: "-900px"
			}, 2000)

			$(".start").css({
				display: "none"
			})
			$(".startcontent").animate({
				// 							background: "none",
				opacity: "0.1"
			}, 2000, function() {

				if ($("body div").eq(0).hasClass("startcontent one")) {
					$("body div").eq(0).removeClass("startcontent one");
					$("body div").eq(0).addClass("startcontent two");
				}
				$(".startcontent").animate({
					opacity: "0.9"
				}, 1000)

				$(".back").css({
					display: 'block',
				})

				$(".jindut").animate({
					width: "519px"
				}, 5000)
				$(".people img").animate({
					left: "580px"
				}, 5000, function() {
					location.href = "index.html";
					$(".head_music").css({
							display:"none"
					})
					music.pause();
				})
			})
		})
	}
	deal();
})
