function tab(obj)
{
	var $this=$(obj);
	var $sel=$this.siblings(".sel");
	$sel.removeClass("sel");
	$this.addClass("sel");
	
	var selDisDiv=$sel.attr("dis")
	if(selDisDiv!=undefined)
	{
		$("#"+selDisDiv).hide().find("input").attr("disabled",true);
	}
	var thisDisDiv=$this.attr("dis")
	if(thisDisDiv!=undefined)
	{
		$("#"+thisDisDiv).show().find("input").attr("disabled",false);
	}
}

function toHtml(content)  
{  
    var string = content;  
    try{
        string=string.replace(/\r\n/g,"<br>")  
        string=string.replace(/\n/g,"<br>");  
    }catch(e){
    	string="";
    }  
    return string;  
}

function moveMenuflag(tabli)
{
	var $obj=$(tabli);
	var flag=$("#menuflag");
	flag.stop(true,false);
	flag.width($obj.width());
	flag.animate({left:$obj.offset().left},300);
}

function backMenu(load)
{
	var $obj=$(".topnav").find(".sel");
	if($obj.length>0)
	{
		var flag=$("#menuflag");
		flag.width($obj.outerWidth());
		if(load)
		{
			flag.css("left",$obj.offset().left+"px");
		}else
		{
			flag.animate({left:$obj.offset().left},300);
		}
	}
}