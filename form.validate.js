var gShowTip=2;//0不显示，1弹出，2吸附
var idCount=0;
function setError(ele,msg,showTip)
{
	var $parent=ele.parent();
	var eleId=ele.attr("id");
	if(eleId==undefined)
	{
		eleId=ele.attr("name")+idCount;
		ele.attr("id",eleId);
		idCount++;
	}
	if(showTip)
	{
		layer.tips(msg,'#'+eleId,{tipsMore: true});
	}else
	{
		if(gShowTip==1)
		{
			layer.msg(msg);
		}
		
		if(gShowTip==2)
		{
			layer.tips(msg,'#'+eleId,{tipsMore: true});
		}
	}
	$parent.append('<span class="onError" style="display:none"></span>');
	ele.addClass("errorIpt");
}
function hasError(formId)
{
	if(formId)
	{
		$("#"+formId).find(":text,:password,select,textarea").blur();
		return $("#"+formId).find('.onError').length>0;
	}else
	{
		$(":text,:password,select,textarea").blur();
		return $('.onError').length>0;
	}
}
function validate(obj,config)
{
	var $obj=$(obj);
	var $parent=$obj.parent();
	$obj.removeClass("errorIpt");
	$parent.find(".onError").remove();
	if($obj.attr("disabled"))
		return;
	if(config.req)//不能为空
	{
		if(isBlank($obj.val())||$obj.val()==null)
		{
			setError($obj,'不能为空',config.tips);
			return;
		}
	}
	
	if(config.sel)//不能为空
	{
		if(isBlank($obj.val())||$obj.val()==null)
		{
			setError($obj,'请选择',config.tips);
			return;
		}
	}
	
	if(config.allInt)//整数
	{
		if(!isAllInt($obj.val()))
		{
			setError($obj,'请输入整数',config.tips);
			return;
		}
	}
	if(config.double)//小数
	{
		if(!isDouble($obj.val()))
		{
			setError($obj,'请输入数值',config.tips);
			return;
		}
	}
	if(config.int)//正整数(包括0)
	{
		if(!isInt($obj.val()))
		{
			setError($obj,'请输入整数',config.tips);
			return;
		}
	}
	if(config.Pint)//正数
	{
		if(!isPint($obj.val()))
		{
			setError($obj,'请输入正整数',config.tips);
			return;
		}
	}
	if(config.mobile)//手机
	{
		if(!isMobile($obj.val()))
		{
			setError($obj,'请输入有效手机号',config.tips);
			return;
		}
	}
	if(config.email)//邮箱
	{
		if(!isEmail($obj.val()))
		{
			setError($obj,'请输入有效手机号',config.tips);
			return;
		}
	}
	
	if(config.$fn)//自定义
	{
		config.$fn(obj);
	}
}
function isInt(strText)
{
	var num = /(^[1-9]\d*$)|(^0$)/;   //验证数字正则表达式
	if(strText==""||num.test(strText))
	{
		return true;
	}else
	{
		return false;
	}
}
function isPint(strText)
{
	var num = /^[1-9]\d*$/;   //验证数字正则表达式
	if(strText==""||num.test(strText))
	{
		return true;
	}else
	{
		return false;
	}
}
function isAllInt(strText)
{
	var num = /(^-?[1-9]\d*$)|(^0$)/;   //验证数字正则表达式
	if(strText==""||num.test(strText))
	{
		return true;
	}else
	{
		return false;
	}
}
function isDouble(strText)
{
	var num = /^([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$|^[1-9]\d*$/;//验证数字正则表达式
	if(strText==""||num.test(strText))
	{
		return true;
	}else
	{
		return false;
	}
}
function isBlank(strText)
{
	if(strText.replace(/^\s*|\s*$/,"").length==0)
	{
		return true;
	}else
	{
		return false;
	}
}
function isNotBlank(strText)
{
	if(strText.replace(/^\s*|\s*$/,"").length==0)
	{
		return false;
	}else
	{
		return true;
	}
}
function trimStr(strText)
{
	return strText.replace(/^\s*|\s*$/,"");
}
function isMobile(strPhone)
{
	var p = /^(13|15|18)\d{9}$/;
	if(strPhone==''||p.test(strPhone))
	{
		return true;
	}else
	{
		return false;
	}
}
function isTel(strTel)
{
	var p = /^0\d{2,3}-\d{7,8}$/;
	if(strTel==''||p.test(strTel))
	{
		return true;
	}else
	{
		return false;
	}
}
function isChar(str)
{
	var p = /^\w+$/;
	if(str==''||p.test(str))
	{
		return true;
	}else
	{
		return false;
	}
}
function isEmail(strEmail)
{
	var p = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	if(strEmail==''||p.test(strEmail))
	{
		return true;
	}else
	{
		return false;
	}
}
function valLen(obj,maxLen)
{
	var $obj=$(obj);
	var $parent=$obj.parent();
	$parent.find(".onError").remove();
	if($obj.attr("disabled"))
		return;
	if(trimStr($obj.val()).length>maxLen)
	{
		$parent.append("<span class='onError'>不能超"+maxLen+"</span>");
		return;
	}
}

function validateName(filename,allowFile)
{
	if(filename=="")
	{
		return true;
	}
	try
	{
		var objs=filename.split(".");
		var fileSuffix=objs[objs.length-1];
		fileSuffix=fileSuffix.toLowerCase();
		if(allowFile.indexOf(fileSuffix)==-1)
		{
			showMsg('只能上传'+allowFile+'文件');
			return false;
		}
	}catch(e)
	{
		return false;
	}
	return true;
}