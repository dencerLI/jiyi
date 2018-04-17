$(function() {
	var className = "all";
	var name = $.cookie("name");
	var data1 = {
		"nameD": name,
	}

	function imm() {
		//				$.ajax({
		//					url: '/users/cha',
		//					type: 'post',
		//					data: data1,
		//					success: function(data) {
		//						var isredata = JSON.parse(unescape(data))
		//						$("#myimg").attr("src", isredata.images)
		//					}
		//				})
		axios({
			method: 'post',
			url: '/users/cha',
			data: data1
		}).then(function(response) {
			var isredata = JSON.parse(unescape(response.data));
			new Vue({
				el: '#myimg',
				data: {
					message: isredata.images
				}
			})
		});
	}
	imm();
	var zui = new Vue({
		el: '#isre',
		data: {
			isdata: ''
		},
		methods: {
			greet: function(event) {
				// `this` 在方法里指向当前 Vue 实例
				// `event` 是原生 DOM 事件
				var isid = event.currentTarget.id;;
				if(isid != null && isid != "" && isid != undefined) {
					location.href = 'sidebar?id=' + isid + ''
				}
			},
			guo: function(str) {
				return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/@null/g, "").replace(/@img/g, "");
			}
		}
	})

	function xin() {
		var dataE = {
			"oall": "all",
			"od": "all"
		};

		axios({
			method: 'post',
			url: '/users/allwen',
			data: dataE
		}).then(function(response) {
			var pms = [];
			var data = JSON.parse(unescape(response.data));
			var temp1;
			for(var i = 0; i < data.length; i++) {
				for(var j = i + 1; j < data.length; j++) {
					if(data[i].tj < data[j].tj) {
						temp1 = data[i];
						data[i] = data[j];
						data[j] = temp1; // 两个数交换位置
					}
				}
			}

			zui.isdata = data;
		});
	}
	xin();
	var fenye = new Vue({
		el: "#app",
		data: {
			pageNo: '',
			pages: ''
		},
		methods: {
			pageList: function(curPage) {
				//根据当前页获取数据
				wenzhang(className, curPage);
				$('html, body').animate({
					scrollTop: 438
				}, 'slow');
				//this.pageNo = curPage;
				//console.log("当前页：" + this.pageNo);
			}
		}
	})
	//			function lth(h) {
	//				var dataE = {
	//					"od": h
	//				};
	//
	//				axios({
	//					method: 'post',
	//					url: '/users/allwen',
	//					data: dataE
	//				}).then(function(response) {
	//					var datal = JSON.parse(unescape(response.data)).lth;
	//					var tmt = 5;
	//					if(datal < 5) {
	//						tmt = datal;
	//					}
	//					fenye.pageNo=tmt;
	//					fenye.pages=datal;
	//				});
	//			}
	//
	//			lth(1);

	function wenzhang(f, h) {
		//var islist = '';
		var dataE = {
			"oall": f,
			"od": h
		};
		axios({
			method: 'post',
			url: '/users/allwen',
			data: dataE
		}).then(function(response) {
			var dataTm = JSON.parse(unescape(response.data)).allwen;
			var datal = JSON.parse(unescape(response.data)).lth;
			var tmt = 5;
			if(datal < 5) {
				tmt = datal;
			}
			fenye.pageNo = tmt;
			fenye.pages = datal;
			appp.mrdata = dataTm;
			appp.mrdata1 = dataTm.length;
		});
	}
	var appp = new Vue({
		el: '#islist',
		data: {
			mrdata: [],
			mrdata1: 0
		},
		methods: {
			safeStr: function(str) {
				return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/\~/g, '').replace(/@null/g, "").replace(/@img/g, "");
			},
			scr: function(event) {
				var isid = event.currentTarget.id;
				if(isid != null && isid != "" && isid != undefined) {
					location.href = 'sidebar?id=' + isid + ''
				}
			}

		}
	})
	wenzhang("all", 1);

	var h = $.cookie('name');
	if(h != null && h != '' && h != undefined) {
		$(".am-topbar-right").hide();
		$(".my-tx p").text(h);
		$(".my-tx").show();
		$(".menulist").html('<li class=""><a href="#">首页</a></li><li class=""><a href="/file">发表文章</a></li>')
	} else {
		//				$(".am-topbar-right").show();
		//				$(".my-tx p").text("");
		//				$(".my-tx").hide();
	}
	$("#login").click(function() {
		location.href = "login"
	})
	$("#register").click(function() {
		location.href = "register"
	})
	$("#tui").click(function() {
		$.cookie('name', '');
		location.href = "/"
	})
	$("#tui1").click(function() {
		location.href = "adminIndex"
	})
	$("#geren").click(function() {
		location.href = "adminIndex"
	})
	//			$(".detail-h3").click(function() {
	//				var isid = $(this).attr("id");
	//				if(isid != null && isid != "" && isid != undefined) {
	//					location.href = 'sidebar?id=' + isid + ''
	//				}
	//			})
	var shaf = new Vue({
		el: '#cgm',
		data: {
			guigeSpan: "0"
		},
		methods: {
			flei: function(event) {
				if(event.currentTarget.id == "all") {
					this.guigeSpan = "0"
				} else {
					this.guigeSpan = event.currentTarget.id;
				}
				var app=document.getElementById("app");
				var applist=app.childNodes[0].childNodes[0].childNodes.length;
				for(var i=0;i<applist;i++){
					if(app.childNodes[0].childNodes[0].childNodes[i].getAttribute("class")=="active"){
						app.childNodes[0].childNodes[0].childNodes[i].setAttribute("class","")
					}
				}
				app.childNodes[0].childNodes[0].childNodes[1].setAttribute("class","active")
				var mrid = event.currentTarget.id;
				className = event.currentTarget.id;
				wenzhang(mrid, 1);
				
			}

		}
	})
})

function safeStr(str) {
	return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}