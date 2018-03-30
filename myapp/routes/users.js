var db = require("./add");
var testm = db.connection;
var express = require('express');
var crypto = require("crypto");
var router = express.Router();
var multer = require('./multerUtil');
var multer1 = require('multer');
var upload1 = multer1({
	dest: 'imglist'
}).array("likun");
var fs = require("fs");
var nodemailer = require('nodemailer');
/* GET users listing. */
var mac = {};
var zmac = {};
var mu = {};
var fan = {};
var yzm = {};
var myqq = {};
var mulist = {};

function safeStr(str) {
	return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
//登录
router.post('/baozi', function(req, res, next) {
	var name = req.body.name;
	var pass = req.body.pass;
	var md5 = crypto.createHash("md5");
	var newPas = md5.update(pass).digest("hex");
	mac = {}
	registerUse(name, newPas, function(mac) {
		res.send(mac)
	})
});
//注册
router.post('/zhuce', function(req, res, next) {
	var name = req.body.name;
	var pass = req.body.pass;
	var age = req.body.age;
	var myyzm = req.body.myyzm;
	var md5 = crypto.createHash("md5");
	var newPas = md5.update(pass).digest("hex");
	console.log(newPas)
	if(name != myqq) {
		zmac.message = "验证码不正确"
		res.send(zmac);
		return false;
	}
	if(myyzm != yzm) {
		zmac.message = "验证码不正确"
		res.send(zmac);
		return false;
	}
	zmac = {}
	registerUse1(name, newPas, age, function(mac) {
		res.send(zmac)
	})
});
//个人资料修改
router.post('/gai', function(req, res, next) {
	var Ename = req.body.name;
	var Euser = req.body.myuser;
	var Ejianjie = req.body.jianjie;
	var Eintma = req.body.mess;
	Ejianjie = safeStr(Ejianjie);
	Euser = safeStr(Euser);
	var sql17 = "SELECT * FROM ?? WHERE ?? = ?";
	var inserts17 = ['yanzheng', 'Uname', Ename];
	sql17 = testm.format(sql17, inserts17);
	testm.query(sql17, function(err, rows, fields) {
		if(rows[0] == undefined) {

		} else {
			if(rows[0].intma == Eintma) { //如果匹配验证码成功那就执行
				var sql18 = "SELECT * FROM ?? WHERE ?? = ?";
				var inserts18 = ['wo', 'name', Ename];
				sql18 = testm.format(sql18, inserts18);
				testm.query(sql18, function(err, rows, fields) {
					if(rows[0] != undefined) {
						var sql19 = "UPDATE ?? SET ?? = ?,?? = ? WHERE ?? = ? AND ?? = ?";
						var inserts19 = ['wo', 'file', Ejianjie, 'username', Euser, 'name', Ename, 'intma', Eintma];
						sql19 = testm.format(sql19, inserts19);
						testm.query(sql19, function(err, result) {
							try {
								var sql118 = "SELECT * FROM ?? WHERE ?? = ?";
								var inserts118 = ['wo', 'name', Ename];
								sql118 = testm.format(sql118, inserts118);
								testm.query(sql118, function(err, rows, fields) {
									res.send(escape(JSON.stringify(rows[0])))
								})
								console.log(Ename)
								var sql20 = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
								var inserts20 = ['usern', 'username', Euser, 'name', Ename];
								sql20 = testm.format(sql20, inserts20);
								testm.query(sql20, function(err, result) {
									try {
										console.log(result)
									} catch(e) {

										//								res.send('更新失败')
										console.log(e)
									}

								});
								var sql24 = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
								var inserts24 = ['Hmefile', 'username', Euser, 'name', Ename];
								sql24 = testm.format(sql24, inserts24);
								testm.query(sql24, function(err, result) {
									try {
										console.log(result)
									} catch(e) {

										//								res.send('更新失败')
										console.log(e)
									}

								});
							} catch(e) {

								res.send('更新失败')
								console.log(e)
							}

						});

					}
				});
			}
		}
	})
})

function p(s) {
	return s < 10 ? '0' + s : s;
}
//提交回复功能
router.post('/hui', function(req, res, next) {
	var Emyurl = req.body.myurl;
	var Econtent = req.body.content;
	var Eyouid = req.body.youid;
	var Emeid = req.body.meid;
	var EwenID = req.body.wenID;
	var Enicheng = req.body.nicheng;
	var Elei = req.body.lei;
	var EpinglunID = req.body.pinglunID;
	if(EpinglunID == undefined) {
		console.log("wocao")
		EpinglunID = "没有";
	}
	//	if(Eyouid==Emeid){
	//		res.send('你不能回复自己的评论');
	//		return false;
	//	}
	var Ename = req.body.name;
	var Eintma2 = req.body.message;
	var day2 = new Date();
	day2.setTime(day2.getTime());
	var Es2 = day2.getFullYear() + "-" + p(day2.getMonth() + 1) + "-" + p(day2.getDate()) + "  " + p(day2.getHours()) + ":" + p(day2.getMinutes()) + ":" + p(day2.getSeconds());
	Econtent = safeStr(Econtent);
	var Emyfile = {
		file: Econtent,
		images: Emyurl,
		yid: Eyouid,
		mid: Emeid,
		wenID: EwenID,
		Ttime: Es2,
		username: Enicheng,
		pinglunID: EpinglunID,
		fenlei: Elei,
		name: Ename
	}
	console.log(Emyfile)
	var sql21 = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
	var inserts21 = ['yanzheng', 'Uname', Ename, 'intma', Eintma2];
	sql21 = testm.format(sql21, inserts21);
	testm.query(sql21, function(err, rows, fields) {
		if(rows[0] == undefined) {
			res.send('请重新登陆再发表评论')
			return false;
		} else {
			if(rows[0].intma == Eintma2) { //如果匹配验证码成功那就执行
				console.log("能走到这一步？")
				var sql22 = "INSERT INTO ?? SET ?";
				var inserts22 = ['Hmefile', Emyfile];
				sql22 = testm.format(sql22, inserts22);
				testm.query(sql22, function(err, result) {
					try {
						res.send('回复成功')
					} catch(e) {

						res.send('回复失败')
						console.log(e)
					}

				});
			}else{
			 res.send('请重新登陆再发表评论')
			}
		}
	})

})
//查询回复功能
router.post('/huicha', function(req, res, next) {
	var id = req.body.id;
	var sql23 = "SELECT * FROM ??";
	var inserts23 = ['Hmefile'];
	sql23 = testm.format(sql23, inserts23);
	testm.query(sql23, function(err, rows, fields) {
		if(rows[0] == undefined) {
			res.send('没有回复')
		} else {
			res.send(escape(JSON.stringify(rows)))
		}
	})
})

//提交评论功能
router.post('/pinglun', function(req, res, next) {
	var EwenID = req.body.wenID;
	var Eintma1 = req.body.message;
	var ETname = req.body.li;
	var Efile = req.body.file;
	var Euserid = req.body.userid;
	var day2 = new Date();
	day2.setTime(day2.getTime());
	var Es2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate() + "  " + day2.getHours() + ":" + day2.getMinutes() + ":" + day2.getSeconds();
	Efile = safeStr(Efile);
	var Emyfile = {
		wenID: EwenID,
		file: Efile,
		userid: Euserid,
		endtime: Es2.toString()
	}
	var sql16 = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
	var inserts16 = ['yanzheng', 'Uname', ETname, 'intma', Eintma1];
	sql16 = testm.format(sql16, inserts16);
	testm.query(sql16, function(err, rows, fields) {
		console.log("这一步不执行")
		if(rows[0] == undefined) {
		    res.send('请重新登陆再发表评论')
			return false;
		} else {
			if(rows[0].intma == Eintma1) { //如果匹配验证码成功那就执行
				console.log("能走到这一步？")
				testm.query('insert into mefile set ?', Emyfile, function(err, result) {
					try {
						res.send('评论成功')
					} catch(e) {

						res.send('评论失败')
						console.log(e)
					}

				});
			}else{
			 res.send('请重新登陆再发表评论')
			}
		}
	})

})
//查询评论功能
router.post('/selectPL', function(req, res, next) {
	var id = req.body.id;
	var sql15 = "SELECT * FROM ?? WHERE ?? = ?";
	var inserts15 = ['mefile', 'wenID', id];
	sql15 = testm.format(sql15, inserts15);
	testm.query(sql15, function(err, rows, fields) {
		if(rows[0] == undefined) {
			res.send('没有评论')
		} else {
			res.send(rows)
		}
	})
})
//查询用户昵称
router.post('/chauser', function(req, res, next) {
	var name = req.body.name;
	var sql14 = "SELECT * FROM ?? WHERE ?? = ?";
	var inserts14 = ['wo', 'name', name];
	sql14 = testm.format(sql14, inserts14);
	testm.query(sql14, function(err, rows, fields) {
		if(rows[0] == undefined) {
			res.send('用户名不存在')
		} else {
			res.send(rows[0])
		}
	})
})
//发表文章
router.post('/fa', function(req, res, next) {
	var Etitle = req.body.title;
	Etitle = safeStr(Etitle);
	var Econ = req.body.content;
	Econ = safeStr(Econ);
	var Ebj = req.body.bj;
	var Ename = req.body.name;
	var Emess = req.body.mess;
	var Eusername = req.body.username;
	var Eimgs = req.body.imgs;
    var EimgL = req.body.imgl;
    var EimgL1 = req.body.imgl1;
     var Elei = req.body.lei;
     var day2 = new Date();
	day2.setTime(day2.getTime());
     var Es2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate() + "  " + day2.getHours() + ":" + day2.getMinutes() + ":" + day2.getSeconds();
	if(Ename == null || Ename == '' || Ename == undefined) {
		res.send('请重新登陆')
		return false;
	}
	var sql11 = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
	var inserts11 = ['yanzheng', 'Uname', Ename, 'intma', Emess];
	sql11 = testm.format(sql11, inserts11);
	testm.query(sql11, function(err, rows, fields) {
		if(rows[0] == undefined) {

		} else {
			if(rows[0].intma == Emess) { //如果匹配验证码成功那就执行
				var sql12 = "SELECT * FROM ?? WHERE ?? = ?";
				var inserts12 = ['usern', 'bt', Etitle];
				sql12 = testm.format(sql12, inserts12);
				testm.query(sql12, function(err, rows, fields) {
					var EusernC = {
						bt: Etitle,
						file: Econ,
						add: Ebj,
						name: Ename,
						username: Eusername,
						images: Eimgs,
						imgL:EimgL,
						imgL1:EimgL1,
						lei:Elei,
						sinTime:Es2
					}
					if(rows[0] == undefined) {
						var sql13 = "INSERT INTO ?? SET ?";
						var inserts13 = ['usern', EusernC];
						sql13 = testm.format(sql13, inserts13);
						testm.query(sql13, function(err, result) {
							try {
								console.log(result)
								res.send('发表成功')
							} catch(e) {

								res.send('发表失败')
								console.log(e)
							}

						});
					} else {
						res.send('文章名已经存在了')
					}
				})
			}
		}
	})

})
//查询全部文章
router.post('/allwen', function(req, res, next) {
	var od = req.body.od;
	var oall=req.body.oall;
	console.log(oall)
	
	if(oall=="all"){
	testm.query('select * from usern order by id desc', function(err, rows, fields) {
		try {
			var n = rows.length;
			var ml = parseInt(n / 10);
			if(ml < (n / 10)) {
				ml = ml + 1;
			}

			if(od != "all") {
				var mtd = {};
				var mtt = [];
				if(od==1){
				for(var h = (od - 1) * 9; h < od * 10; h++) {
					if(rows[h] != undefined) {
						mtt.push(rows[h]);
					}
				}
				}//第一次请求
				else{
				  for(var h = (od - 1) * 10; h < od * 10; h++) {
					if(rows[h] != undefined) {
						mtt.push(rows[h]);
					}
				  }
				}
				mtd.allwen = mtt;
				mtd.lth = ml;

				res.send(escape(JSON.stringify(mtd)))
			} else {
				res.send(escape(JSON.stringify(rows)))
			}
		} catch(e) {

			console.log(e)
		}

	})
	}//查询全部
	else{
	var sql111 = "SELECT * FROM ?? WHERE ?? = ? ORDER BY ID DESC";
				var inserts111 = ['usern', 'lei', oall];
				sql111 = testm.format(sql111, inserts111);
	testm.query(sql111, function(err, rows, fields) {
		try {
		console.log(oall)
			var n = rows.length;
			var ml = parseInt(n / 10);
			if(ml < (n / 10)) {
				ml = ml + 1;
			}

			if(od != "all") {
				var mtd = {};
				var mtt = [];
				if(od==1){
				for(var h = (od - 1) * 9; h < od * 10; h++) {
					if(rows[h] != undefined) {
						mtt.push(rows[h]);
					}
				}
				}//第一次请求
				else{
				  for(var h = (od - 1) * 10; h < od * 10; h++) {
					if(rows[h] != undefined) {
						mtt.push(rows[h]);
					}
				  }
				}
				mtd.allwen = mtt;
				mtd.lth = ml;

				res.send(escape(JSON.stringify(mtd)))
			} else {
				res.send(escape(JSON.stringify(rows)))
			}
		} catch(e) {

			console.log(e)
		}

	})
	}
})

//查询指定文章
router.post('/Twen', function(req, res, next) {
	var id = req.body.id;
	var sql = "SELECT * FROM ?? WHERE ?? = ?";
	var inserts = ['usern', 'id', id];
	sql = testm.format(sql, inserts);
	testm.query(sql, function(err, rows, fields) {
		//		console.log(rows[0])
		try {
			res.send(rows)
		} catch(e) {

			console.log(e)
		}

	})
})

//查询个人文章
router.post('/indexcha', function(req, res, next) {
	var filename = req.body.name;
	var sql = "SELECT * FROM ?? WHERE ?? = ?";
	var inserts = ['usern', 'name', filename];
	sql = testm.format(sql, inserts);
	testm.query(sql, function(err, rows, fields) {
		//		console.log(rows[0])
		try {
			res.send(escape(JSON.stringify(rows)))
		} catch(e) {

			console.log(e)
		}

	})
})

//删除个人文章
router.post('/indexDel', function(req, res, next) {
	var fileid = req.body.isid;
	var sql = "DELETE FROM ?? WHERE ?? = ? ";
	var inserts = ['usern', 'id', fileid];
	sql = testm.format(sql, inserts);
	testm.query(sql, function(err, rows, fields) {
		//		console.log(rows[0])
		try {
			res.send("删除成功")
		} catch(e) {

			console.log(e)
		}

	})
})

//查询发表文章的用户
router.post('/pipei', function(req, res, next) {
	var id = req.body.id;
	var sql = "SELECT * FROM ?? WHERE ?? = ?";
	var inserts = ['wo', 'id', id];
	sql = testm.format(sql, inserts);
	testm.query(sql, function(err, rows, fields) {
		try {
			res.send(rows[0])
		} catch(e) {

			console.log(e)
		}
	})
})
//查询图片
router.post('/cha', function(req, res, next) {
	var name = req.body.nameD;
	var id = req.body.id;
	var sql = "SELECT * FROM ?? WHERE ?? = ?";
	var inserts = ['wo', 'name', name];
	sql = testm.format(sql, inserts);
	testm.query(sql, function(err, rows, fields) {
		try {
			res.send(escape(JSON.stringify(rows[0])))
		} catch(e) {

			console.log(e)
		}

	})
})
//上传多图片
var uploadDir = 'imglist/';
router.post('/profilelist', function(req, res, next) {
	mulist = {};
	upload1(req, res, function(err) {

		if(err) {
			console.error('[System] ' + err.message);
		} else {
             var mull=[];
			var fileCount = req.files.length;
			console.log(fileCount)
			for(var j = 0; j < fileCount; j++) {
				
				var oldP = req.files[j].path;
				var newP = uploadDir+req.files[j].fieldname + '-' + Date.now() + '.' + req.files[j].originalname.split(".")[1];
				mull.push("/"+newP);
//              var newP = uploadDir+req.files[j].fieldname + '-' + Date.now() + '.png';
				console.log(newP)
				fs.renameSync(oldP, newP);
				console.log('副本替换成功!')
						if(j==fileCount-1){
							mulist.list=mull;
			                mulist.message="上传成功";
			               res.send(mulist);
						}
              
			}
			
			
		}

	})
});
//上传图片
router.post('/profile', function(req, res, next) {
	mu = {};
	var upload = multer.single('pic')
	upload(req, res, function(err) {

		if(err) {
			mu.type = "error";
			mu.message = "提交失败！";
			res.send(mu);
			//			console.log("提交失败了")
		} else {
			var f = req.file;
			console.log(req.file.path)
			mu.type = "success";
			mu.message = "提交成功！";
			mu.images = req.file.path;
			console.log(req.file.pat)
			res.send(mu);
			//			console.log("提交成功了")
		}

	})
});
router.post('/userImg', function(req, res, next) {
	fan = {};
	var Ename = req.body.nameD;
	var EimageUrl = req.body.imgurl;
	var Emess = req.body.message;
	//如果提交成功先查询数据库是否有IMG如果有返回并删除
	endimg(Ename, EimageUrl, Emess, function(mac) {
		res.send(fan)
	})
})
var endimg = function(Ename, EimageUrl, Emess, callback) {
	var sql1 = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
	var inserts1 = ['wo', 'name', Ename, 'intma', Emess];
	sql1 = testm.format(sql1, inserts1);
	testm.query(sql1, function(err, rows, fields) {
		try {

			if(rows.length == 0) {
				fan.message = "用户名出错了";
				callback(fan);
			} else if(rows[0].images != null && rows[0].images != undefined) {
				//				fs.unlinkSync(rows[0].images);
				var filepath = rows[0].images;
				console.log(filepath)
				fs.unlink(filepath, function(err) {
					try {
						console.log('文件:' + filepath + '删除成功！');
					} catch(e) {

						console.log(e);
					}

				})
				var sql2 = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
				var inserts2 = ['wo', 'images', EimageUrl, 'name', Ename];
				sql2 = testm.format(sql2, inserts2);
				testm.query(sql2, function(err, result) {
					try {
						console.log("更新成功")
						fan.message = "更新成功";
						callback(fan);
					} catch(e) {

						console.log(e);
					}

				});
				var sql3 = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
				var inserts3 = ['usern', 'images', EimageUrl, 'name', Ename];
				sql3 = testm.format(sql3, inserts3);
				testm.query(sql3, function(err, result) {
					try {
						console.log("更新成功")

					} catch(e) {

						console.log(e);
					}

				});
				var sql33 = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
				var inserts33 = ['Hmefile', 'images', EimageUrl, 'name', Ename];
				sql33 = testm.format(sql33, inserts33);
				testm.query(sql33, function(err, result) {
					try {
						console.log("更新成功")

					} catch(e) {

						console.log(e);
					}

				});
			} else {
				var sql4 = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
				var inserts4 = ['wo', 'images', EimageUrl, 'name', Ename];
				sql4 = testm.format(sql4, inserts4);
				testm.query(sql4, function(err, result) {
					try {
						console.log("更新成功")
						fan.message = "更新成功";
						callback(fan);
					} catch(e) {

						console.log(e);
					}
				});
			}
		} catch(e) {

			console.log(e)
			fan.message = "查询出错了";
			callback(fan);
		}

	});
}

var registerUse = function(username, pass, callback) {
	var sql5 = "SELECT * FROM ?? WHERE ?? = ?";
	var inserts5 = ['wo', 'name', username];
	sql5 = testm.format(sql5, inserts5);
	testm.query(sql5, function(err, rows, fields) {
		try {
			var n = 0;
			for(var i = 0; i < rows.length; i++) {
				if(rows[i].password == pass) {
					n = 1;
				}
			}

			if(n == 1) {
				mac = rows;
				//mac.message = "查找成功";
				var t1 = '';
				for(var i = 0; i < 6; i++) {
					t1 += Math.floor(Math.random() * 10);
				}
				var md5 = crypto.createHash("md5");
				var newM = md5.update(t1).digest("hex");
				console.log(username)
				var sql6 = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
				var inserts6 = ['yanzheng', 'intma', newM, 'Uname', username];
				sql6 = testm.format(sql6, inserts6);
				testm.query(sql6, function(err, result) {
					try {
						console.log(result)
					} catch(e) {
						console.log('生成失败')
						console.log(e)
					}

				});
				var sql7 = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
				var inserts7 = ['wo', 'intma', newM, 'name', username];
				sql7 = testm.format(sql7, inserts7);
				testm.query(sql7, function(err, result) {
					try {
						console.log(result)
					} catch(e) {
						console.log('生成失败')
						console.log(e)
					}

				});
				mac[0].message = newM;
				callback(mac);
			} else {
				mac.message = "查找失败";
				callback(mac)
			}
		} catch(e) {

			console.log(e)
		}

	});

}

var registerUse1 = function(username, password, age, callback) {
	var sql8 = "SELECT * FROM ?? WHERE ?? = ?";
	var inserts8 = ['wo', 'name', username];
	sql8 = testm.format(sql8, inserts8);
	testm.query(sql8, function(err, rows, fields) {
		try {
			if(rows.length == 0) {
				var usr = {
					name: username,
					password: password,
					age: age
				};
				var usr1 = {
					Uname: username
				}
				//testm.query('alter table usern add column addr varchar(20) not null;', function(err, rows, fields) {});
				var sql9 = "INSERT INTO ?? SET ?";
				var inserts9 = ['wo', usr];
				sql9 = testm.format(sql9, inserts9);
				testm.query(sql9, function(err, result) {
					try {
						var sql10 = "INSERT INTO ?? SET ?";
						var inserts10 = ['yanzheng', usr1];
						sql10 = testm.format(sql10, inserts10);
						testm.query(sql10, function(err, result) {
							try {

							} catch(e) {
								//TODO handle the exception
							}
						});
						zmac.type = "success";
						zmac.message = "注册成功";
						zmac.loginName = result;
						callback(zmac)
					} catch(e) {

						console.log(e)
					}

				});
			} else {
				zmac.type = "error";
				zmac.message = "用户名已存在";
				zmac.loginName = null;
				callback(zmac);
			}
		} catch(e) {

			console.log(e)
		}
	});

}

//qq邮箱验证
router.post('/faso', function(req, res, next) {
	var name = req.body.email;
	var t = '';
	for(var i = 0; i < 6; i++) {
		t += Math.floor(Math.random() * 10);
	}
	//	console.log(t);
	var transporter = nodemailer.createTransport({
		service: 'qq',
		auth: {
			user: '348695165@qq.com',
			pass: 'raqzimjkotkcbhcd' //授权码,通过QQ获取  
		}
	});

	var mailOptions = {
		from: '348695165@qq.com', // 发送者  
		to: name, // 接受者,可以同时发送多个,以逗号隔开  
		subject: '记忆网注册码发送', // 标题  
		//text: 'Hello world', // 文本  
		html: `<h2>验证码为 ` + t + ` </h2> `
	};

	transporter.sendMail(mailOptions, function(err, info) {
		try {
			yzm = t;
			myqq = name;
			console.log('发送成功');
			res.send(yzm);
		} catch(e) {

			console.log(e);
		}
		//		if(err) {
		//			console.log(err);
		//			return;
		//		}
		//		yzm = t;
		//		console.log('发送成功');
		//		res.send(yzm);
	});
})
module.exports = router;