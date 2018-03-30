var multer  = require('multer');
var storage=multer.diskStorage({
	destination:"luyan",
	filename:function(req,file,cb){
		var fileFormat=file.originalname.split(".");
		cb(null,file.fieldname+'-'+Date.now()+'.'+fileFormat[fileFormat.length-1]);
	}
});
var upload=multer({storage:storage});
module.exports=upload;
