<template>
	<div class="g-ct">
		<div class="m-withdraw s-wh">
			<div class="m-form">
				<label for="">用户名</label>
				blackstar
			</div>
			<div class="m-form">
				<label for="">可提现金额</label>
				10000.00元
			</div>
			<div class="m-form">
				<label for="">提款金额</label>
				<input type="number" placeholder="请输入提款金额" step="0.01" v-model="withdrawNum" @keyup="updateValue">
			</div>
			<div class="m-form">
				<label for="">支付密码</label>
				<input type="password" placeholder="请输入支付密码">
			</div>
		</div>
		<button class="u-submit-btn">申请提款</button>
		<div class="m-explain">提款说明:</div>
	</div>	
</template>
<script>
	export default {
  		data () {
    		return {
      			withdrawNum:''
    		}
  		},
  		mounted:function(){

  		},
  		methods:{
  			updateValue: function () {
			    this.withdrawNum = this.withdrawNum.toString()
				// 删除两侧的空格符
		        .trim().replace(/[^\d.]/g,"")
		        // 保留 2 小数位
		        .slice(
		          0,
		          this.withdrawNum.toString().indexOf('.') === -1
		            ? this.withdrawNum.length
		            : this.withdrawNum.toString().indexOf('.') + 3
		        );
		        if(this.withdrawNum.toString().indexOf(".")< 0 && this.withdrawNum !=""){
			    //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
			        this.withdrawNum= parseFloat(this.withdrawNum) + ''; 
			    }
			    if(!this.withdrawNum.toString()){
			    	this.withdrawNum = 0;
			    }
		    }
  		}
	}
</script>
<style scoped lang="less">
	.m-withdraw{
		.m-form{
			height: 1.333333rem;
			line-height: 1.333333rem;
			font-size: 0.426667rem;
			color: #333;
			border-bottom: 0.013333rem solid #e6e6e6;
			label{
				display: inline-block;
				width: 2.4rem;
				padding-left: 0.4rem;
			}
		}
	}
</style>