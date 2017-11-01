<template>
	<div class="g-ct">
		<div class="m-recharge s-wh">
			<ul class="m-num-list f-cb">
				<li v-for="(money,index) in money_list" :class="{current:isCur==index}" @click="switchCash(index)">{{money}}元</li>
			</ul>
	    	<div class="m-other">
	    		<h3>其他金额</h3>
	    		<input type="number" step="0.01" v-model="recharge_num" @keyup="updateValue">
	    		<!-- <currency-input v-model="recharge_num"></currency-input> -->
	    	</div>
	  	</div>
	  	<button class="u-submit-btn">支付宝支付</button>
	</div>	
</template>
<script>
	export default {
  		data () {
    		return {
      			money_list:[10,30,50,100,300,500,800,1000],
      			isCur:0,
      			recharge_num:''
    		}
  		},
  		mounted:function(){

  		},
  		components:{
  			'currency-input':{
  				template: '\
				    <input\
			        	ref="input"\
			        	type="number"\
			        	v-bind:value="value"\
			        	v-on:input="updateValue($event.target.value)"\
			      	>\
			  	',
			  	props: ['value'],
			  	methods: {
				    // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
				    updateValue: function (value) {
				    	console.log(value.toString().split('.'))
				    	var formattedValue = value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
					    // formattedValue = formattedValue.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
					    formattedValue = formattedValue.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
					    formattedValue = formattedValue.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
					    if(formattedValue.indexOf(".")< 0 && formattedValue !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
					        formattedValue= parseFloat(formattedValue); 
					    }
					    if(!value.toString().split('.')[0]){
					    	console.log(2333)
				    		formattedValue = '';
				    		this.$refs.input.value = formattedValue
				    	}
					    // var formattedValue = value
        	// 			// 删除两侧的空格符
				     //    .trim()
				     //    // 保留 2 小数位
				     //    .slice(
				     //      0,
				     //      value.indexOf('.') === -1
				     //        ? value.length
				     //        : value.indexOf('.') + 3
				     //    )
				      	// 如果值不统一，手动覆盖以保持一致
				      	if (formattedValue !== value) {
				        	this.$refs.input.value = formattedValue
				      	}
				      	// 通过 input 事件发出数值
				      	this.$emit('input', Number(formattedValue))
				    }
			  	}
			}
  		},
  		methods:{
  			switchCash:function(index,value){
	        	var _this = this;
	        	_this.isCur = index;
	        	_this.recharge_num = value;
       		},
       		updateValue: function () {
       			// console.log(this.recharge_num.toString());
			    this.recharge_num = this.recharge_num.toString()
				// 删除两侧的空格符
		        .trim().replace(/[^\d.]/g,"")
		        // 保留 2 小数位
		        .slice(
		          0,
		          this.recharge_num.toString().indexOf('.') === -1
		            ? this.recharge_num.length
		            : this.recharge_num.toString().indexOf('.') + 3
		        );
		        if(this.recharge_num.toString().indexOf(".")< 0 && this.recharge_num !=""){
			    //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
			        this.recharge_num= parseFloat(this.recharge_num) + ''; 
			    }
			    if(!this.recharge_num.toString()){
			    	this.recharge_num = 0;
			    }
		    }
  		}
	}
</script>
<style scoped lang="less">
	.bordered{
		border-radius: 0.026667rem;
		border:0.013333rem solid #e6e6e6;
		box-sizing: border-box;
	}
	.m-recharge{
		padding: 0 0.4rem 0.4rem;
		font-size: 0.426667rem;
		color:#333;
		// 充值金额列表
		.m-num-list{
			li{
				float: left;
				width: 2.093333rem;
				height: 1.066667rem;
				font-weight: bold;				
				margin-right: 0.266667rem;
				margin-top: 0.266667rem;
				line-height: 1.04rem;
				text-align: center;
				.bordered;
				&:nth-child(4n){
					margin-right: 0;
				}
				&.current{
					color: #fff;
					background: #d63327;
				}
			}
		}
		// 其他金额
		.m-other{
			margin-top: 0.8rem;
			input{
				width: 4.266667rem;
				height: 1.066667rem;
				line-height: 0.48rem;
				margin-top: 0.266667rem;
				background: #f6f6f6;
				.bordered;
			}
		}
	}
</style>