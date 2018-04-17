$(function(){
			var ho = 0;
			$(".yc").click(function() {
				$("#uploadForm").append('<input tsb=' + ho + ' id="mlist' + ho + '" type="file" style="display:none;" name="likun" onchange="showPicture(this)" />');
				$("#mlist" + ho).click();
				ho++;
			})

			var h = $.cookie('name');
			var reuser = '';
			if(h == null || h == '' || h == undefined) {
				location.href = "/"
			} else {
				var dataU = {
					'name': h
				}
				$.ajax({
					url: '/users/chauser',
					type: 'post',
					data: dataU,
					success: function(data) {
						reuser = data.username;
					},
					error: function(data) {
						alert("出错了，请刷新页面重试，如有其它疑问请联系管理员QQ348695165")
					}
				});
			}
			$("#fa").click(function() {
				for(var t = 0; t < $("#uploadForm input[type='file']").length; t++) {
					if($("#meimg" + t).length < 0 || $("#meimg" + t).length == 0) {
						$("#mlist" + t).remove();
					}
				}
				var n = $("#tit").val();
				for(var t = 0; t < $("#tet div").length; t++) {
					$("#tet div").eq(t).append('<small style="display:none;">@null</small>')
				}
				for(var t = 0; t < $("#tet p").length; t++) {
					$("#tet p").eq(t).append('<small style="display:none;">@null</small>')
				}
				for(var t = 0; t < $("#tet br").length; t++) {
					$("#tet br").eq(t).append('<small style="display:none;">@null</small>')
				}for(var t = 0; t < $("#tet img").length; t++) {
					$("#tet img").eq(t).append('<span style="display:none;">@img</span>')
				}
				var m = $("#tet").text();
				n = htmlEncodeJQ(n);
				m = htmlEncodeJQ(m);
				var L=$("#xxk ").val();
				//return false;
				var b = $.cookie("id")
				if(n.length == 0) {
					alert("请输入标题");
					return false;
				}
				if(n.length > 35) {
					alert("标题不能大于35个字");
					return false;
				}
				if(m.length < 50 || m.length > 5000) {
					alert("文章内容不得小于50个字且不能大于5000个字");
					return false;
				}
				if(b == null || b == '' || b == undefined) {
				     alert("请重新登陆");
					location.href = "/"
					return false;
				}if(L=='a'){
				   alert("请选择您发表的文章的类型");
					return false;
				}
				$("#deng").show();
				if($("#uploadForm input[type='file']").length > 0) {
					$("#shang").click();
					var isOnLoad = true;
					$("#miss").load(function() {
						isOnLoad = false; // 加载完成 
						var fng = JSON.stringify($.parseJSON($("#miss").contents().find("pre").text()).list);
						var fng1 = $.parseJSON($("#miss").contents().find("pre").text()).list[0];

						var cn = $.cookie("message")
						var imgs = $.cookie("myurl");
						var data = {
							'title': n,
							'content': m,
							'bj': b,
							'name': h,
							'username': reuser,
							'mess': cn,
							'imgs': imgs,
							'imgl': fng,
							'imgl1': fng1,
							'lei':L
						}

						$.ajax({
							url: '/users/fa',
							type: 'post',
							data: data,
							success: function(data) {
								$("#deng").hide();
								if(data == "发表成功") {
									alert(data)
									location.href = "/"
								}else if(data == "请重新登陆"){
									alert(data)
									location.href = "login"
								} else {
                                    alert(data)
								}
							},
							error: function(data) {
								$("#deng").hide();
								alert("出错了，请刷新页面重试，如有其它疑问请联系管理员QQ348695165")
							}
						});
					});
				} //这上面是有图片的时候
				else {

					var n = $("#tit").val();
					$("#tet img").siblings().text("@img")
					var m = $("#tet").text();
					var fng = "";
					var fng1 = "";

					var cn = $.cookie("message")
					var imgs = $.cookie("myurl");
					var data = {
						'title': n,
						'content': m,
						'bj': b,
						'name': h,
						'username': reuser,
						'mess': cn,
						'imgs': imgs,
						'imgl': fng,
						'imgl1': fng1,
						'lei':L
					}
					$.ajax({
						url: '/users/fa',
						type: 'post',
						data: data,
						success: function(data) {
							$("#deng").hide();
							if(data == "发表成功") {
									alert(data)
									location.href = "/"
								}else if(data == "请重新登陆"){
									alert(data)
									location.href = "login"
								} else {
                                    alert(data)
								}
						},
						error: function(data) {
							$("#deng").hide();
							alert("出错了，请刷新页面重试，如有其它疑问请联系管理员QQ348695165")

						}
					});

				}
			})
})

var mho = 0;
			function showPicture(imgFile) {
				/*获取上传文件的路径*/
				var intUrl = window.URL.createObjectURL(imgFile.files[0]);
				$("#tet").append('<p><img tsb=' + mho + ' id="meimg' + mho + '" src="" style="max-width:100%;"/><span class="wuji" style=""></span></p>');
				$("#meimg" + mho).attr("src", intUrl);
				mho++;
			}
			
function htmlEncodeJQ(str) {
				return $('<span/>').text(str).html();
			}