function calVolume(ele)
{
	var tr=$(ele).parent().parent();
		var l=tr.find("[name='flength']").val();
		var w=tr.find("[name='fwidth']").val();
		var h=tr.find("[name='fheight']").val();
		if(l!=""&&w!=""&&h!="")
		{
			var v=parseInt(l)*parseInt(w)*parseInt(h);
			tr.find("[name='fvolume']").val(v/1000000.00);
		}
}
function specCal(v)//特殊情况
{

	if(v<=0.064)
	{
		fee=(22-0.5)/(0.064-0.001)*(v-0.001)+0.5;
        return fee;
	}
	
	if(v>0.064)
	{
		fee=(250-22)/(1-0.064)*(v-0.064)+22;
        return fee;
	}
	

}

function getQty(cls)
{
	var vals=0.0;
	$("."+cls).each(function(){
		if(this.value=="")
		{
			return true;
		}else
		{
			try
			{
				vals+=parseFloat(this.value);
			}catch (e) {
				vals="";
				return false;
			}
		}
	});
	return vals;
}
function getVol(cls)
{
	var vals=0.0;
	$("."+cls).each(function(){
		if(this.value=="")
		{
			return true;
		}else
		{
			try
			{
				var $qty=$(this).parent().parent().find(".qty");
				var tqty=1;
				if($qty.val()!="")
				{
					try
					{
						tqty=parseFloat($qty.val());
					}catch (e)
					{
						tqty=1;
					}
				}
				vals=vals+parseFloat(this.value)*tqty;
			}catch (e) {
				vals="";
				return false;
			}
		}
	});
	return vals;
}
function calFee()
{
	var qty=getQty("qty");
	var v=getVol("vol");
	var fee=0;
	var lfee=0.5
	var lowFee=parseFloat(lfee);
	var para=312.5;
	var lowV=0.064;
	if(v!=""&&qty!="")
	{
		var v=parseFloat(v);
		qty=parseInt(qty);
		$("#calTotal").html("总体积："+v.toFixed(3)+"　包裹数："+qty);
		v=parseFloat(v);
		fee=v/lowV*lowFee;
		if(v>1)
			{
				fee=v*275;
			}else
			{
				fee=specCal(v,lowV);
			}

		if(fee<lowFee)
			fee=lowFee;
        totalFee=fee;
		$("#fpayTotal").html("AUD $"+totalFee.toFixed(2));
	}else
	{
		layer.msg("请填写完整正确信息才能自动计算");
	}
}
function cpTr(ele)
{
	var html='<tr>';
	html+='<td>';
	html+='<input name="flength" value="" class="form-control" maxlength="10" onblur="validate(this,{tips:true,Pint:true});calVolume(this);" type="text">';
	html+='</td>';
	html+='<td>';
	html+='<input name="fwidth" value="" class="form-control" maxlength="10" onblur="validate(this,{tips:true,Pint:true});calVolume(this);" type="text">';
	html+='</td>';
	html+='<td>';
	html+='<input name="fheight" value="" class="form-control" maxlength="10" onblur="validate(this,{tips:true,Pint:true});calVolume(this);" type="text">';
	html+='</td>';
	html+='<td><input name="fvolume" value="" class="form-control vol" maxlength="10" type="text"></td>';
	html+='<td><input name="fcargoQty" value="" class="form-control qty" maxlength="10" onblur="validate(this,{tips:true,Pint:true})" type="text"></td>';
	html+='<td class="cp" onclick="$(this).parent().remove()"><i class="twa twa-lg twa-heavy-minus-sign"></i></td>';
	html+='</tr>';
	$(".dataTable").append(html);
}