$(function(){
	function htmlEncodeJQ ( str ) {  
    return $('<span/>').text( str ).html();  
}  
	$(".pinglun").click(function(){
		if($.cookie("name")==null||$.cookie("name")==""||$.cookie("name")==undefined){
			alert("请先登录");return false;
		}
		$(".ispl").slideDown()
	})
	
	//评论提交
	$("#pltj").click(function(){
		var Pcontent = $("#pl").val();
		Pcontent=htmlEncodeJQ(Pcontent)
		var wenID=$("#myname").attr("tem");
		var userid = $.cookie("id");
		var li = $.cookie("name");
		var message=$.cookie("message");
		if(Pcontent!=null&&Pcontent!=""&&Pcontent!=undefined){
			var data1={'file':Pcontent,'wenID':wenID,'userid':userid,'li':li,'message':message}
				$.ajax({
					url: '/users/pinglun',
					type: 'post',
					data:data1,
					success: function(data) {
					alert(data)
					  if(data=='评论成功'){
					  	location.href = ""
					  }
					}
				})
		}else{
			alert("请检查是否有评论内容或者内容是否违法")
		}
	})
})
