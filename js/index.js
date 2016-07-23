(function(){
	var oContainer = document.getElementById('container'),
		oPrev = document.getElementById('prev'),
		oNext = document.getElementById('next');

	var ROW = 4,//行数
		COL = 6,//列数
		NUM = ROW*COL,//总个数
		BIG_IMG_WIDTH = 750,
		BIG_IMG_HEIGHT = 500,
		THUMB_IMG_HEIGHT = THUMB_IMG_WIDTH = 125;

	var bClicked = false;
	var iNow = 0;
	//大图小图预加载
	var iLoaded = 0;
	for (var i = 1; i <= NUM; i++) {
		var oBigImg = new Image();
		oBigImg.onload = function(){
			if (++iLoaded == NUM*2) {
				loadSuccess();
			}
		};		
		oBigImg.src = 'imgs/'+i+'.jpg';//src写到onload的后面

		var oThumbImg = new Image();
		oThumbImg.onload = function(){
			if (++iLoaded == NUM*2) {
				loadSuccess();
			}
		};
		oThumbImg.src = 'imgs/thumbs/'+i+'.jpg';

	}

	function loadSuccess(){
		var index = 0;
		var iColGap = (oContainer.offsetWidth - COL*THUMB_IMG_WIDTH) / ( COL+1 ),
			iRowGap = (oContainer.offsetHeight - ROW*THUMB_IMG_HEIGHT) / ( ROW+1 );
		for (var i = 0; i < ROW; i++) {
			for (var j = 0; j < COL; j++) {
				var oDiv = document.createElement('div');
				oDiv.pos = {
					left:parseInt(iColGap + j*(iColGap + THUMB_IMG_WIDTH)),
					top:parseInt(iRowGap + i*(iRowGap + THUMB_IMG_HEIGHT))
				};
				oDiv.index = index;
				oDiv.matrix = {
					col:j,
					row:i
				}
				oDiv.className = 'img';
				oDiv.style.width = THUMB_IMG_WIDTH + 'px';
				oDiv.style.height = THUMB_IMG_HEIGHT + 'px'; 
				oDiv.style.top = (-Math.random()*300-200) + 'px';
				oDiv.style.left = (-Math.random()*300-200) + 'px';
				oDiv.style.background = 'url(imgs/thumbs/' + (index+1) +'.jpg)';
				oDiv.innerHTML = "<span></span>";	
				oContainer.appendChild(oDiv);
				index++;
			}
		};

		var aImg = document.getElementsByClassName('img');
		index--;

		var timer = setInterval(function(){
			aImg[index].style.left = aImg[index].pos.left + 'px';
			aImg[index].style.top = aImg[index].pos.top + 'px';
			setStyle3d(aImg[index],'transform','rotate('+(Math.random()*40-20)+'deg)');
			aImg[index].addEventListener('click',clickHandler,false);

			index--;
			if (index==-1) {
				clearInterval(timer);
			}
		},100)
		function clickHandler(){
			if (bClicked) {
				for (var i = 0; i < aImg.length; i++) {
					var oSpan = aImg[i].getElementsByTagName('span')[0];
					aImg[i].style.left = aImg[i].pos.left+'px';
					aImg[i].style.top = aImg[i].pos.top+'px';
					setStyle3d(aImg[i],'transform','rotate('+(Math.random()*40-20)+'deg)');
					aImg[i].className = "img";
					oSpan.style.opacity=0;
				}
				oPrev.style.display=oNext.style.display='none';
			}else{
				var bigPos = {
					left:(oContainer.offsetWidth - BIG_IMG_WIDTH)/2,
					top:(oContainer.offsetHeight - BIG_IMG_HEIGHT)/2
				}
				for (var i = 0; i < aImg.length; i++) { 
					var oSpan = aImg[i].getElementsByTagName('span')[0];
					oSpan.style.background = 'url(imgs/'+(this.index+1)+'.jpg) '+(-aImg[i].matrix.col*THUMB_IMG_WIDTH)+'px '+(-aImg[i].matrix.row*THUMB_IMG_HEIGHT)+'px';////////////////////两个空格
					oSpan.style.opacity = 1;
					aImg[i].style.left = bigPos.left + aImg[i].matrix.col*(THUMB_IMG_WIDTH+1)+'px';
					aImg[i].style.top = bigPos.top + aImg[i].matrix.row*(THUMB_IMG_HEIGHT+1)+'px';
					setStyle3d(aImg[i],'transform','rotate(0deg)');
					aImg[i].className = "img piece";
				}
				oPrev.style.display=oNext.style.display='block';
			}
				bClicked = !bClicked;
		}

		oPrev.onclick = oNext.onclick = function(){
			if (this == oPrev) {
				iNow--;
				if (iNow == -1) {
					iNow = NUM - 1;
				}
			}else{
				iNow++;
				if (iNow == NUM) {
					iNow = 0;
				}
			}
			var arr = [];
			for (var i = 0; i < NUM; i++) {
				arr.push(i);
			}

			arr.sort(function(){
				return Math.random()-0.5;
			});
			var timer = setInterval(function(){
				var item = arr.pop();
				console.log(item);
				aImg[item].getElementsByTagName('span')[0].style.background = 'url(imgs/'+(iNow+1)+'.jpg) '+(-aImg[item].matrix.col*THUMB_IMG_WIDTH)+'px '+(-aImg[item].matrix.row*THUMB_IMG_HEIGHT)+'px';
				if (arr.length==0) {
					clearInterval(timer);
				}
			},20)
		}

		function setStyle3d(elem,attr,value){
			['Webkit','Moz','Ms','o',''].forEach(function(prefix){
				elem.style[prefix+attr.charAt(0).toUpperCase()+attr.substr(1)] = value;
			});
		}
	}
})();





