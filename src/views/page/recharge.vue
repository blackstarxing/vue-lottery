<template>
	<div class="g-ct">
		<div class="m-recharge s-wh">
			<ul class="m-num-list f-cb">
				<li v-for="(money,index) in money_list" :class="{current:isCur==index}" @click="switchCash(index,money)">{{money}}元</li>
			</ul>
	    	<div class="m-other">
	    		<h3>其他金额</h3>
	    		<input type="number" step="0.01" v-model="custom_num" @keyup="updateValue">
	    	</div>
	  	</div>
	  	<button class="u-submit-btn" @click="pay">支付宝支付</button>
	</div>	
</template>
<script>
	export default {
  		data () {
    		return {
      			money_list:[10,30,50,100,300,500,800,1000],
      			isCur:0,
      			recharge_num:10,
      			custom_num:''
    		}
  		},
  		mounted:function(){

  		},
  		methods:{
  			// 高亮显示
  			switchCash:function(index,value){
	        	var _this = this;
	        	_this.isCur = index;
	        	_this.recharge_num = value;
       		},
       		// 校验
       		updateValue: function () {
       			this.recharge_num = 10;
       			this.isCur = 0;
       			// console.log(this.recharge_num.toString());
			    this.custom_num = this.custom_num.toString()
				// 删除两侧的空格符
		        .trim().replace(/[^\d.]/g,"")
		        // 保留 2 小数位
		        .slice(
		          0,
		          this.custom_num.toString().indexOf('.') === -1
		            ? this.custom_num.length
		            : this.custom_num.toString().indexOf('.') + 3
		        );
		        if(this.custom_num.toString().indexOf(".")< 0 && this.custom_num !=""){
			    //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
			    	if(this.custom_num.toString().length>6){
			    		this.custom_num = this.custom_num.toString().slice(0,6);
			    	}
			        this.custom_num= parseFloat(this.custom_num) + ''; 
			    }
			    if(!this.custom_num.toString()){
			    	this.custom_num = " ";
			    }
		    },
		    // 提交
		    pay:function(){
		    	var $money = this.custom_num?parseFloat(this.custom_num):this.recharge_num;
		    	// console.log($money);
		    	window.location.href = 'lotteryopen://recharge?money='+$money;
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
				text-indent: 0.2rem;
				.bordered;
			}
		}
	}
</style>