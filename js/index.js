window.onload = function() {
	bannerAnimation();
}



/*轮播图*/
function bannerAnimation() {
	var banner = document.querySelector(".jd_banner");
	var bannerWidth = banner.offsetWidth;
	/*我们需要滚动的是里面的ul图片集*/
	var imgBox = banner.querySelector("ul:first-child");
	/*获取所有标记li*/
	var lis = banner.querySelector("ul:last-child").querySelectorAll("li");
	/* 设置当前图片的索引,索引为1是因为已经有了一个默认的偏移*/
	var index = 1;
	var timerId;
	/*监听页面是否激活
	 * IE10+，Firefox10+,Chrome14+,Opera12.1+,Safari7.1+
	 */
	var visibilityEvent = function() {
		var hiddenProperty = 'hidden' in document ? 'hidden' :
			'webkitHidden' in document ? 'webkitHidden' :
			'mozHidden' in document ? 'mozHidden' :
			null;
		var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
		var onVisibilityChange = function() {
			if (!document[hiddenProperty]) {
				console.log('页面激活1');
				timerId = setInterval(function() {
					index++;
					/* 添加过渡*/
					openTransition();
					/*偏移imgBox*/
					/*设置偏移样式的时候，一定要记得写单位*/
					setTransform(-index * bannerWidth);
				}, 2000);

			} else {
				console.log('页面非激活1')
				clearInterval(timerId);
			}
		}
		document.addEventListener(visibilityChangeEvent, onVisibilityChange);
	}

	/*设置标记*/
	var setIndicator = function(index) {
		/*排他*/
		/*将所有li标签的样式清除*/
		for (var i = 0; i < lis.length; i++) {
			lis[i].classList.remove("now");
		}
		/*为当前索引位置的li标签添加样式*/
		lis[index - 1].classList.add("now");
	}

	/*开启过渡效果*/
	var openTransition = function() {
		imgBox.style.transition = "all .2s";
		imgBox.style.webkitTransition = "all .2s";
	}

	/*移除过渡效果*/
	var removeTransition = function() {
		imgBox.style.transition = "none";
		imgBox.style.webkitTransition = "none";
	}

	/*设置偏移*/
	var setTransform = function(distance) {
		imgBox.style.transform = "translateX(" + (distance) + "px)";
		imgBox.style.webkitTransform = "translateX(" + (distance) + "px)";
	}

	/*当屏幕的大小进行缩放的时候，需要重新计算当前banner的宽度，并且将当前的偏移值重新计算 */
	window.onresize = function() {
		/*重新获取宽度*/
		bannerWidth = banner.offsetWidth;
		/*重新设置偏移*/
		imgBox.style.transform = "translateX(" + (-index * bannerWidth) + "px)";
	}

	/*让图片轮播*/
	var timerId = setInterval(function() {
		visibilityEvent();
		/* 让索引+1*/
		index++;
		/*添加过渡*/
		openTransition();
		/*偏移imgBox*/
		/*设置偏移样式的时候，一定要记得写单位*/
		setTransform(-index * bannerWidth);
	}, 2000);

	/*当过渡结束之后的处理*/
	var transitionEndOpt = function() {
		if (index == 0) {
			index = 8;
		} else if (index == 9) {
			index = 1;
		}
		/*设置标记*/
		setIndicator(index);
		/*设置偏移--绝对不能添加过渡*/
		/*移除过渡效果*/
		removeTransition();
		/*设置偏移*/
		setTransform(-index * bannerWidth);
	}

	swiper.addTransitionEnd(imgBox, transitionEndOpt);

	/*添加滑动开始*/
	imgBox.addEventListener("mousedown", function(e) {
		/*清除定时器*/
		clearInterval(timerId);
		console.log(index);
		/*获取手指的起始位置*/
	});

	imgBox.addEventListener("mouseup", function(e) {
				console.log(index);
		openTransition();
		/*重新开启时钟*/
		timerId = setInterval(function() {
			/* 5.1让索引+1*/
			index++;
			/*5.2 添加过渡*/
			openTransition();
			/*5.3偏移imgBox*/
			/*设置偏移样式的时候，一定要记得写单位*/
			setTransform(-index * bannerWidth);
		}, 2000);
	});
}