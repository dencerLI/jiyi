function lltj(){
	this.tj=function(id){
		var data1={"id":id}
		$.ajax({
					url: '/users/tongji',
					type: 'post',
					data:data1,
					success: function(data) {
						
					}
			})
	}
	this.all=function(){
		var data1={"id":"all"}
		$.ajax({
					url: '/users/tongji',
					type: 'post',
					data:data1,
					success: function(data) {
						console.log(data)
					}
			})
	}
}
