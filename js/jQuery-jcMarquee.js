/*
 * jQuery - jcMarquee v0.10
 * Copyright(c) 2012 by Riddick-design 
 * Date: 2012-01-07
 * 鐩稿叧鍙傛暟 
   'marquee':'x',        \\ 璁剧疆婊氬姩鏂瑰悜锛屾彁渚� marquee:x 鎴� marquee:y
   'margin_bottom':'0',  \\ 璁剧疆margin_bottom鍊�
   'margin_right':'0',   \\ 璁剧疆margin_right鍊�
   'speed':'10'          \\ 璁剧疆婊氬姩閫熷害,鍗曚綅mm
 * 閲嶈鎻愰啋
   #Marquee_x ul li { float:left;} // 妯悜婊氬姩鏃跺繀椤昏鎵�鏈塴i宸︽诞鍔� 
 * HTML缁撴瀯
   <div id="Marquee"> 
         <ul> 
              <li> 
                  <div><img height="50" width="100" alt="鍥剧墖1" /></div>
              </li>
         </ul> 
   </div>  
 */
;(function($){
	$.fn.jcMarquee = function(options) {
		var defaults = {
			'marquee':'x',
			'margin_bottom':'0',
			'margin_right':'0',
            'speed':'10'
		};
		var options = $.extend(defaults,options);
		return this.each(function() {
	        var $marquee = $(this),
			    $marquee_scroll = $marquee.children('ul');
			$marquee_scroll.append("<li class='clone'>"+"</li>");
			$marquee_scroll.find('li').eq(0).children().clone().appendTo('.clone');
			var $marquee_left = $marquee_scroll.find('li');
			if (options.marquee == 'x') {
				var x = 0;
		        $marquee_scroll.css('width','1000%');
				$marquee_left.find('div').css({'margin-right':options.margin_right});
				$marquee_left.css({'margin-right':options.margin_right});
                function Marquee_x(){ 
	                $marquee.scrollLeft(++x);
					_margin = parseInt($marquee_left.find('div').css('margin-right'));
		            if(x==$marquee_left.width()+_margin) { x = 0 };
				};
		    	var MyMar=setInterval(Marquee_x,options.speed); 
                $marquee.hover(function(){
                    clearInterval(MyMar);
                },function(){
                    MyMar=setInterval(Marquee_x,options.speed);
                });
			}
			if (options.marquee == 'y') {
				var y = 0;
		        $marquee_scroll.css('height','1000%');
				$marquee_left.find('div').css('margin-bottom',options.margin_bottom);
				$marquee_left.css('margin-bottom',options.margin_bottom);
                function Marquee_y(){ 
	                $marquee.scrollTop(++y);
					_margin = parseInt($marquee_left.find('div').css('margin-bottom'));
		            if(y==$marquee_left.height()+_margin) { y = 0 };
				};
		    	var MyMar=setInterval(Marquee_y,options.speed); 
                $marquee.hover(function(){
                    clearInterval(MyMar);
                },function(){
                    MyMar=setInterval(Marquee_y,options.speed);
                });
			};
		});
	};
})(jQuery)