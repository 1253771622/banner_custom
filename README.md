一个轮播小插件 只需要一个自定义标签 部分js代码即可调用
	简单的例子
	<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="./index.css">
	<script src="./index.js"></script>
</head>
<body>
	<carrousel></carrousel>
</body>
	<script>
		var banner=new banner({
			el:'carrousel',
			data:["/plugin/img/img1.jpg","/plugin/img/img2.jpg","/plugin/img/img3.jpg"]	
		})
	</script>
</html>
