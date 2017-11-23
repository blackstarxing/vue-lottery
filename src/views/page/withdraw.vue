<template>
	<div class="g-ct">
		<div class="m-withdraw s-wh">
			<div class="m-form">
				<label for="">用户名</label>
				{{user_info.username}}
			</div>
			<div class="m-form">
				<label for="">可提现金额</label>
				{{user_info.useraccount}}元
			</div>
			<div class="m-form">
				<label for="">提款金额</label>
				<input type="number" :disabled="!parseFloat(user_info.useraccount)" placeholder="请输入提款金额" step="0.01" v-model="withdrawNum" @keyup="updateValue">
			</div>
			<div class="m-form">
				<label for="">支付密码</label>
				<input type="password" placeholder="请输入支付密码" v-model="password">
			</div>
		</div>
		<button class="u-submit-btn" :class="withdrawNum>=10&&password?'':'disabled'" @click="withdraw">申请提款</button>
		<div class="m-explain">
			<h3>提款说明:</h3>
			<p>1.提现账号必须真实有效；</p>
			<p>2.提现单笔最小10元，最大不超过10万元，提现需求超过最大限额，请分多笔提现；</p>
			<p>3.为防止利用平台进行套现或洗钱等违法行为，充值金额均不允许提现；</p>
			<p>4.中奖金额可全额提现；</p>
			<p>5.提现到账时间：不超过7个工作日；</p>
		</div>
	</div>	
</template>
<script>
	export default {
  		data () {
    		return {
    			user_info:{
    				username:'',
    				useraccount:'',
    				token:''
    			},
      			withdrawNum:'',
      			password:''
    		}
  		},
  		mounted:function(){
  			this.user_info.username = this.$route.query.username?this.$route.query.username:'';
  			this.user_info.useraccount = this.$route.query.useraccount?this.$route.query.useraccount:0;
  			this.user_info.token = this.$route.query.token?this.$route.query.token:'';
  		},
  		methods:{
  			// 校验
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
			    	if(this.withdrawNum.toString()>100000){
			    		this.withdrawNum = 100000;
			    	}
			        this.withdrawNum= parseFloat(this.withdrawNum) + ''; 
			    }
			    if(!this.withdrawNum.toString()){
			    	this.withdrawNum = " ";
			    }
		    },
		    // 提现
		    withdraw:function(){
		    	this.$http.post('/api/userAccount/withdrawals',{token:this.user_info.token,money:this.withdrawNum,payPwd:this.password}).then(function(response) {
		    		if(response.data.code==200){
		    			this.$toast.show({
				    		text:'提现成功',
				    		position:'middle'
				    	})
		    		}else{
		    			this.$toast.show({
				    		text:response.data.msg,
				    		position:'middle'
				    	})
		    		}               	
	            }, function(response) {
	                console.log(response);
	            });
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
	.disabled{
		background: rgba(214,51,39,0.5);
	}
</style>