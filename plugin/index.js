function banner(options){
	var that=this
	this.el=options.el //获取标签名
	this.data=options.data //获取数据
	this.obj_time={} //声明一个对象 控制时间函数开关
	this.dot_class_data=[] //小圆点是否是正在运行的图片 判断变量
	this.duration=2000
	if(options.duration){
		this.duration=options.duration
	}
	document.createElement(this.el)
	var el=document.getElementsByTagName(this.el) //获取el节点
	var el_LENGTH=document.getElementsByTagName(this.el).length //获取el节点长度
	//for循环拼接
	function getListImg(){
		var list=""
		for(var i=0;i<that.data.length;i++){
		var item="<div class='banner_item'><img src="+that.data[i]+"></img></div>"
			list+=item
		}
		return list
	}
	//获取非行内样式
	this.getStyle=function(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr]
		}else{
			return getComputedStyle(obj,false)[attr]
		}
	}
	// 设置行内样式
	this.setStyle=function(obj,attr,value){
		obj.style[attr]=value
		// console.log(arguments)
	}
	//轮播函数
	this.move=function(index,width,item){
		var count=that.data.length
		var index=index
		var i=0
		that.obj_time[index]=setInterval(function(){
			// i++
			// console.log(i)
			if(i<count-1){
				i++
				var left='-'+parseInt(width)*i+'px'
				that.setStyle(item,'left',left)
			}else{
				i=0
				var left='-'+parseInt(width)*i+'px'
				that.setStyle(item,'left',left)
			}
			that.setDotClassName(index,i) //设置圆点的状态
		},that.duration)		
	}
	// 设置小圆点
	this.setDots=function(index,width,item){
		console.log(this)
		var count=that.data.length
		for(var i=0;i<count;i++){
			var span=document.createElement("span")
			span.className="dot"
			var left=parseInt(width)/2+i*15+'px'
			that.setStyle(span,'left',left)
			document.getElementsByClassName("banner_wrap")[index].appendChild(span)
		}
		console.log(arguments)
	}
	//设置 自定义标签的HTML代码
	this.set_el_html=function(){
		var list_img=getListImg()
		var outerHTML="<div class='banner_wrap'>"+
			"<div class='banner_list'>"+list_img+"</div>"
		"</div>"
		//获取代替标签名的HTML代码
		console.log(el_LENGTH)
		for(var i=0;i<el_LENGTH;i++){
			el[0].outerHTML=outerHTML
		}
		return this
	}()
	this.setDotClassName=function(index,classIndex){
		var len=this.data.length
		var data_dom=document.querySelectorAll(".banner_wrap .dot")
		var data_dom_length=document.querySelectorAll(".banner_wrap .dot").length
		var sum=data_dom_length/len
		// console.log(sum)
		for(var i=0;i<sum;i++){
			// console.log(sum)
			for(var j=0;j<this.dot_class_data[i].length;j++){
				// console.log(j)
				j==classIndex?this.dot_class_data[i][j].isActive=true:this.dot_class_data[i][j].isActive=false
				//给对像赋值  判断是否添加active类
			}
			console.log(this.dot_class_data[i])
			this.setReadyName() //将对象的值赋给dom节点
		}
		console.log(this.dot_class_data,classIndex)
		
	}
	this.setReadyName=function(){ //将对象的值赋给dom节点
		var len=this.data.length
		var data_dom=document.querySelectorAll(".banner_wrap .dot")
		for(var i=0;i<this.dot_class_data.length;i++){
			var index=0
			index=i*len
			for(var j=0;j<this.dot_class_data[i].length;j++){
				
				console.log(index)
				this.dot_class_data[i][j].isActive?data_dom[index].classList.add("active"):data_dom[index].classList.remove("active")
				index++
			}
		}		
	}	// 设置轮播相关操作
	this.setBannerOperation=function(){
		var total=el_LENGTH //一共几个自定义标签
		console.log(this)
		var sum=that.data.length //用户一共传了几张图片
		var total_item=document.getElementsByClassName("banner_item")//页面存在的所有标签的图片--数组
		var total_sum=document.getElementsByClassName("banner_item").length //页面存在的所有标签的图片总和
		var move_container=document.getElementsByClassName("banner_list") //移动的 容器--数组
		console.log(move_container.length)
		for(var i=0;i<move_container.length;i++){
			var total_dot=[]
			for(var j=0;j<sum;j++){
				var item_dot={isActive:false}
				if(j==0){// 设置初始化  0为 active类
					item_dot={isActive:true}
				}
				total_dot.push(item_dot)
			}
			that.dot_class_data.push(total_dot)
			var item_width=that.getStyle(move_container[i],'width')
			move_container[i].style.width=parseInt(item_width)*sum+'px'
			console.log(item_width)
			that.move(i,item_width,move_container[i]) //调用时间函数等相关操作
			that.setDots(i,item_width,move_container[i]) //设置小圆点
		}
		that.setReadyName()	//将对象的值赋给dom节点
	}()

}