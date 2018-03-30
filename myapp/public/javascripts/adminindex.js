$(function() {
	var h = $.cookie('name');
	if(h == null || h == '' || h == undefined) {
		location.href = "/"
	}
	var name = $.cookie("name");
	//console.log(name)
	$("#myN").text(name);
	var data1 = {
		"nameD": name,
	}

	function imm() {
		$.ajax({
			url: '/users/cha',
			type: 'post',
			data: data1,
			success: function(data) {
				//console.log(data)
				var data = JSON.parse(unescape(data))
				$("#myimg").attr("src", data.images);
				$("#myimg1").attr("src", data.images);
				$.cookie("myurl", data.images);
				$("#user-email").val(data.name);

				$("#user-QQ").val(data.name.split("@")[0]);
				$("#user-name").val(data.username);
				$("#user-intro").val(data.file);
			}
		})
	}
	imm();

	function showPicture(imgFile) {
		// alert(window.URL.createObjectURL(imgFile.files[0]));
		/*获取上传文件的路径*/
		var intUrl = window.URL.createObjectURL(imgFile.files[0]);
		$(".InImg img").attr("src", intUrl)
	}
	var message = $.cookie('message');
	//console.log(message)
	$("#pic").click(function() {
		var nameD = $("#myN").text();
		var formData = new FormData($("#uploadForm")[0]);
		$.ajax({
			url: '/users/profile',
			type: 'post',
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function(data) {
				if(data.type == "success") {
					//console.log(data.images)
					var path = data.images;
					$(".InImg img").attr("src", path)
					var regex = /\\/g;
					path = path.replace(regex, "\\\\");
					//console.log(path);
					var data = {
						"nameD": nameD,
						"imgurl": path,
						"message": message
					}
					$.ajax({
						url: '/users/userImg',
						type: 'post',
						data: data,
						success: function(data) {
							//console.log(data)
							alert(data.message)
							imm();
						},
						error: function(data) {

						}
					});
				}
			},
			error: function(data) {

			}
		});
	})

	$("#tijiao").click(function() {
		var myuser = $("#user-name").val();
		//				var phone=$("#user-phone").val();
		var jianjie = $("#user-intro").val();
		if(myuser == null || myuser == "") {
			alert("请填写您的昵称");
			return false;
		}
		if(myuser.length > 15) {
			alert("昵称长度不得大于15个字");
			return false;
		}
		if(jianjie.length < 4 || jianjie.length > 25) {
			alert("简介不得少于4个字且不得大于25个字");
			return false;
		}
		var mess = $.cookie("message");
		var Sdata = {
			"name": name,
			"myuser": myuser,
			"jianjie": jianjie,
			"mess": mess
		}
		$.ajax({
			url: '/users/gai',
			type: 'post',
			data: Sdata,
			success: function(data) {
				var data = JSON.parse(unescape(data))
				if(data.username == $("#user-name").val()) {
					$.cookie("nicheng", data.username);
					$.cookie("myurl", data.images);
					location.href = 'adminIndex'
				}
			},
			error: function(data) {

			}
		});
	})

	$("#isme").click(function() {
		$(".admin-content-body").hide();
		$(".admin-content-body").eq(0).show();
	})
	var misapp = new Vue({
		el: '#listfile',
		data: {
			message: []
		},
		methods: {
			greet: function(event) {
				// `this` 在方法里指向当前 Vue 实例
				// `event` 是原生 DOM 事件
				var self = event.currentTarget;
				console.log(self.parentNode.parentNode)
				var isid = event.currentTarget.id;
				var dataG={"isid":isid}
				axios({
					method: 'post',
					url: '/users/indexDel',
					data: dataG
				}).then(function(response) {
					var metdata = response.data;
					console.log(metdata)
					if(metdata=="删除成功"){
					   self.parentNode.parentNode.remove();
					}
					
				});
			},
			guo: function(str) {
				return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/@null/g, "").replace(/@img/g, "");
			}
		}
	})
	$("#mefile").click(function() {
		var names = $.cookie("name");
		var data1 = {
			"name": names
		}
		axios({
			method: 'post',
			url: '/users/indexcha',
			data: data1
		}).then(function(response) {
			var isredata = JSON.parse(unescape(response.data));
			console.log(isredata)
			misapp.message = isredata;
			//  console.log(response.data);
			//  console.log(response.status);
			//  console.log(response.statusText);
			//  console.log(response.headers);
			//  console.log(response.config);
		});
		$(".admin-content-body").hide();
		$(".admin-content-body").eq(1).show();
	})
})