;(function($){
	var Wxgd = function(poster){
		var self = this;
		//保存单个无限滚动对象
		this.poster = poster;
		this.picShowarea = poster.find("div.wxgd-picshow");
		this.wxgdList = poster.find("ul.wxgd-list");
		this.wxgdItems = poster.find("li.wxgd-item");
		this.wxgdPicWrap = poster.find("li.wxgd-item>a");
		this.picMb = poster.find("div.mb");
		this.prevBtn = poster.find("div.wxgd-prev-btn");
		this.nextBtn = poster.find("div.wxgd-next-btn");
		this.rotateFlag = true;
		this.Index = this.wxgdItems.css("z-index");


		//默认配置参数
		this.setting = {
			"changeStyle":0,//1代表1px滑动，0代表板块滚动
			"speed":1000,//切换速度
			"delay":3000,//每一次动画间隔时间
			"autoPlay":false,//是否自动播放
			"oneormore":0,//0代表每一次移动一张图片，1代表每次切换一版
			"scale":1//图片缩放比例
		};

		$(window).resize(function(){
			window.clearInterval(self.timer);
			var curIndex = self.poster.find("li.wxgd-item").css("z-index");
			if(curIndex != self.Index){
				self.Index = curIndex;
				var cellWidth = self.wxgdItems.width();	
				self.picShowarea.css({
					width:curIndex*cellWidth
				});	
				if(self.setting.changeStyle === 0){
					self.wxgdList.css({
						left:0
					});
				}else if(self.setting.changeStyle === 1){					
					self.wxgdList.prepend(self.wxgdItems.slice(-curIndex).clone(true));
					self.wxgdList.append(self.wxgdItems.slice(0,curIndex).clone(true));
					var picNum = self.poster.find("li.wxgd-item").size();
					self.wxgdList.css({
						width:cellWidth*picNum,
						left:-cellWidth*curIndex
					});
				}	
			}
		});



		$.extend(this.setting,this.getSetting());			
		//设置配置参数值
		this.setSettingValue();
		if(this.setting.changeStyle === 0){
			if(self.wxgdItems.size()%self.Index !== 0){
				alert("为了使效果更好，请确保需要显示图片的数目能被图片总数量整除");
				return;
			}
		}
		this.nextBtn.click(function(){
			if(self.rotateFlag === true && self.setting.changeStyle === 0){
				self.rotateFlag = false;
				self.animatePlay("right");
			}else if(self.setting.changeStyle === 1){
				window.clearInterval(self.timer);
				self.timer = window.setInterval(function(){
					self.animatePlay("right");
				},25)
			}		
		});
		this.prevBtn.click(function(){
			if(self.rotateFlag === true && self.setting.changeStyle === 0){
				self.rotateFlag = false;
				self.animatePlay("left");
			}else if(self.setting.changeStyle === 1){
				window.clearInterval(self.timer);
				self.timer = window.setInterval(function(){
					self.animatePlay("left");
				},25)
			}		
		});
		var wxgdItems = this.poster.find("li.wxgd-item");
		var wxgdPicWrap =  this.poster.find("li.wxgd-item>a");
		wxgdItems.each(function(){
			var _this = $(this);
			var oriw = self.wxgdPicWrap.width();
			var orih = self.wxgdPicWrap.height();
			_this.hover(function(){
				var cIndex = _this.index();
				$(wxgdItems).eq(cIndex).addClass("active");
				$(wxgdPicWrap).eq(cIndex).animate({
					width:self.wxgdItems.width()*self.setting.scale,
					height:self.wxgdItems.height()*self.setting.scale
				},self.setting.speed/10);
			},function(){
				var cIndex = _this.index();
				$(wxgdItems).eq(cIndex).removeClass("active");
				$(wxgdPicWrap).eq(cIndex).animate({
					width:oriw,
					height:orih
				},self.setting.speed/10);
			});
		});
		if(this.setting.changeStyle === 0 && this.setting.autoPlay){
			this.autoPlay();
			this.poster.hover(function(){
				window.clearInterval(self.timer);
			},function(){
				self.autoPlay();
			});	
		};
		if (this.setting.changeStyle === 1) {
			this.nextBtn.click();
			this.poster.hover(function(){
				window.clearInterval(self.timer);
			},function(){
				self.nextBtn.click();
			});
		};
	};

	Wxgd.prototype = {
		//自动播放
		autoPlay:function(){
			var self = this;
			this.timer = window.setInterval(function(){
				self.nextBtn.click();
			},self.setting.delay);
		},
		//执行动画
		animatePlay:function(dir){
			var _this_ = this;
			var listIndex = _this_.wxgdItems.css("z-index");
			console.log(listIndex);
			var cellWidth = _this_.wxgdItems.width();
			if(_this_.setting.changeStyle === 0){
				var picNum = _this_.wxgdItems.size();
				if(dir === "right"){
					var offset = parseFloat(_this_.wxgdList.css("left"))+(picNum-listIndex)*cellWidth;
					if(_this_.setting.oneormore === 0){						
						if(offset === 0){
							_this_.wxgdList.animate({
								left:0
							},_this_.setting.speed,function(){
								_this_.rotateFlag = true;
							});
						}else{
							_this_.wxgdList.animate({
								left:"-="+cellWidth
							},_this_.setting.speed,function(){
								_this_.rotateFlag = true;
							});
						}
					}else if(_this_.setting.oneormore === 1){
						if(offset === 0){
							_this_.wxgdList.animate({
								left:0
							},_this_.setting.speed,function(){
								_this_.rotateFlag = true;
							});
						}else{
							_this_.wxgdList.animate({
								left:"-="+listIndex*cellWidth
							},_this_.setting.speed,function(){
								_this_.rotateFlag = true;
							});
						}				
					}
				}else if(dir === "left"){
					var offset = parseFloat(_this_.wxgdList.css("left"));
					if(_this_.setting.oneormore === 0){						
						if(offset === 0){
							_this_.wxgdList.animate({
								left:-(picNum-listIndex)*cellWidth
							},_this_.setting.speed,function(){
								_this_.rotateFlag = true;
							});
						}else{
							_this_.wxgdList.animate({
								left:"+="+cellWidth
							},_this_.setting.speed,function(){
								_this_.rotateFlag = true;
							});
						}
					}else if(_this_.setting.oneormore === 1){
						if(offset === 0){
							_this_.wxgdList.animate({
								left:-(picNum-listIndex)*cellWidth
							},_this_.setting.speed,function(){
								_this_.rotateFlag = true;
							});
						}else{
							_this_.wxgdList.animate({
								left:"+="+listIndex*cellWidth
							},_this_.setting.speed,function(){
								_this_.rotateFlag = true;
							});
						}				
					}
				}
			}else if(this.setting.changeStyle === 1){
				var picNum = this.poster.find("li.wxgd-item").size();
				if(dir === "right"){
					_this_.wxgdList.css({
						left:"-="+1
					});
					if(parseFloat(_this_.wxgdList.css("left"))<=-(picNum-listIndex)*cellWidth){
						_this_.wxgdList.css({
							left:-listIndex*cellWidth
						});
					}
				}else if(dir === "left"){
					_this_.wxgdList.css({
						left:"+="+1
					});
					if(parseFloat(_this_.wxgdList.css("left"))>=-listIndex*cellWidth){
						_this_.wxgdList.css({
							left:-(picNum-listIndex)*cellWidth
						});
					}
				}
			}
		},
		//设置默认属性
		setSettingValue:function(){
			var listIndex = this.wxgdItems.css("z-index");
			var cellWidth = this.wxgdItems.width();	
			this.picShowarea.css({
				width:listIndex*cellWidth
			});		
			if(this.setting.changeStyle === 0){				
				var picNum = this.wxgdItems.size();
				this.wxgdList.css({
					width:cellWidth*picNum
				});
			}else if(this.setting.changeStyle === 1){
				this.wxgdList.prepend(this.wxgdItems.slice(-listIndex).clone(true));
				this.wxgdList.append(this.wxgdItems.slice(0,listIndex).clone(true));
				var picNum = this.poster.find("li.wxgd-item").size();
				this.wxgdList.css({
					width:cellWidth*picNum,
					left:-cellWidth*listIndex
				});
			}			
		},
		//获取人工配置参数
		getSetting:function(){		
			var setting = this.poster.attr("data-setting");
			if(setting&&setting!=""){
				return $.parseJSON(setting);
			}else{
				return {};
			};
		}
	};

	//初始化
	Wxgd.init = function(posters){
		var _this_ = this;
		posters.each(function(){
			new  _this_($(this));
		});
	};
	window["Wxgd"] = Wxgd;
})(jQuery)