<template>
	<div class="g-ct">
		<div class="g-vip">
			<div class="m-leaguer-top m-top" v-if="isLeaguer">
				<p>到期时间：2017-10-12  17:53:18</p>
			</div>
			<div class="m-common-top m-top" v-else></div>
			<div class="m-rule">
				<h3>{{isLeaguer?'续费升级':'购买规则'}}</h3>
				<div class="rules">
					<p>1.铂金会员一次性购买90天及以上的，66.66元/天，合计2000元/月。</p>
					<p>2.钻石会员一次性购买90天及以上的，166.66元/天，合计5000元/月。</p>
					<p>3.铂金会员体验价，150元/天（24小时）。</p>
					<p>4.充值会员90天起，可按月付款。（例如：于2016年8月10日11:00:00充值铂金会员90天，立即付款2000元，到下个月的9号 11点前，需要再支付2000元以保证您可以正常使用服务。如果超过9号的11点还没有续费，那么下次充值时会扣除应的天数。扣除的天数取决于中间未缴费的时间。11月9号11点之后，充值恢复正常即不扣除天数。）</p>
					<p>5.铂金会员升级钻石会员时，已享受服务的时间按天收费（见规则1，2），剩余的将以补差价的方式缴费。</p>
				</div>
			</div>
			<div class="m-btns" v-if="isLeaguer">
				<button class="u-vip-btn renew" @click="showPay">续费铂金会员</button>
			</div>
			<div class="m-btns" v-else>
				<button class="u-vip-btn" @click="showPay(0)">包月订阅  ￥2000</button>
				<button class="u-vip-btn" @click="showPay(1)">包季订阅  ￥6000</button>
			</div>
		</div>
		<div class="m-pop" v-if="show" @click="hidePay">
			<div class="pay-window leaguer-renew" v-if="isLeaguer>0">
				<ul>
					<li class="choose-month">充值数量<span id="targetInputTime">{{selectMonth}}</span></li>
					<li>铂金会员资费<span>2000/月</span></li>
					<li>付款金额<span>{{2000*month}}元</span></li>
				</ul>
				<button class="u-vip-btn">确认购买</button>
				<p>已享受服务时间按天数收费，剩余的将以补差价的方式续费</p>	
			</div>	
			<div class="pay-window" v-else>
				<ul>
					<li>铂金会员<span>2000/月</span></li>
					<li>充值数量<span>一个月(30天)</span></li>
					<li>充值金额<span>2000元</span></li>
				</ul>
				<button class="u-vip-btn">确认购买</button>
				<p>已享受服务时间按天数收费，剩余的将以补差价的方式续费</p>
			</div>		
		</div>
		<div id='targetContainer'></div>
	</div>	
</template>
<script>
	import MultiPicker from '../../assets/MultiPicker.js'
	export default {
  		data () {
    		return {
      			isLeaguer:1,
      			show:false,
      			month:1,
      			selectMonth:'一个月(30天)'
    		}
  		},
  		mounted:function(){
  			var _this = this;
  			new MultiPicker({
	            "input":"targetInputTime",
	            "container":"targetContainer",
	            "jsonData":[
	              {
	                'id':1,
	                'value':'1个月(30天)',
	              },
	              {
	                'id':2,
	                'value':'2个月(60天)',
	              },
	              {
	                'id':3,
	                'value':'3个月(90天)',
	              },
	            ],
	            "success":function(arr){
	            	if(arr[0].id=='1'){
	            		_this.selectMonth = '一个月(30天)';
	            		_this.month = 1;
	            	}else if(arr[0].id=='2'){
	            		_this.selectMonth = '两个月(60天)';
	            		_this.month = 2;
	            	}else{
	            		_this.selectMonth = '三个月(90天)';
	            		_this.month = 3;
	            	}
	            }
	        });
	        // console.log(this.API)
	        // this.$http.get(BASE_URL).then(function(response) {
                
         //    }, function(response) {
         //        console.log(response);
         //    });
  		},
  		methods:{
  			showPay:function(type){
  				this.show = true;
  			},
  			hidePay:function(e){
  				if(e.target.className == 'm-pop'){
  					this.show = false;
  				} 				
  			}
  		}
	}
</script>
<style scoped lang="less">
	@import '../../assets/MultiPicker.css';
	// 头部图片
	.m-top{
		height: 4.666667rem;
		position: relative;
		p{
			font-size: 0.346667rem;
			color:#fff;
			font-weight: bold;
			position: absolute;
			bottom: 0.266667rem;
			left: 1.533333rem;
		}
	}
	.m-common-top{
		background: url(../../assets/images/general_bg.png) no-repeat;
		background-size: cover;
	}
	.m-leaguer-top{
		background: url(../../assets/images/leaguer_bg.png) no-repeat;
		background-size: cover;
	}
	.m-rule{
		padding:0.426667rem 0.266667rem 0;
		font-size: 0.4rem;
		color:#666;
		// 标题
		h3{
			background: url(../../assets/images/leaguer_icon.png) no-repeat;
			background-size: 0.68rem 0.546667rem;
			font-size: 0.453333rem;
			color:#333;
			font-weight: bold;
			text-indent: 0.946667rem;
		}
		// 规则
		.rules{
			height: 5.666667rem;
			overflow: auto;
			margin-top: 0.426667rem;
			p{
				margin-bottom: 0.426667rem;
			}
		}
	}
	.m-btns{
		margin-top: 0.96rem;
		.renew{
			margin-top: 1.533333rem;
		}
	}
	// 支付弹窗
	.pay-window{
		position: absolute;
		bottom: 0;
		height: 6.4rem;
		width: 100%;
		background: #fff;
		padding:0.4rem 0.466667rem;
		box-sizing: border-box;
		li{
			line-height: 1.066667rem;
			font-size: 0.426667rem;
			color:#666;
			span{
				color:#f75819;
				float:right;
			}
		}
		.u-vip-btn{
			width: 9.066667rem;
			margin:0.48rem auto 0.266667rem;
		}
		p{
			font-size: 0.32rem;
			color:#999;
			text-align: center;
		}
	}
	// 会员续费
	.leaguer-renew{
		height: 6.933333rem;
		padding:0;
		ul{
			background: #f0f3f7;
			li{
				border-bottom: 0.013333rem solid #e6e6e6;
				line-height: 1.333333rem;
				padding:0 0.466667rem;
				background: #fff;
				&.choose-month{
					border-bottom: none;
					margin-bottom: 0.266667rem;
					span{
						padding-right: 0.48rem;
						color:#333;
						background: url(../../assets/images/arrow.png) right center no-repeat;
						background-size: 0.213333rem 0.426667rem;
					}
				}
			}
		}
	}
</style>