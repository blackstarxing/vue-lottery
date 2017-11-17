<template>
	<div class="box">
		<div>{{msg}}</div>
		<p>{{message}}</p>
    	<router-link to="/my">我的</router-link>
  	</div>
</template>
<script>
	export default {
  		data () {
    		return {
      			msg: '欢迎进入娱儿彩站'
    		}
  		},
  		props:{
  			message:{
  				default:'blackstar'
  			}
  		}
	}
</script>
<style scoped lang="less">
	// .box{
	// 	background:#ccc;
	// 	div{
	// 		color:#effdda
	// 	}
	// }
	@nice-blue: #5B83AD;
	@light-blue: @nice-blue + #111;

	.box {
	  	color: @light-blue;
	}
</style>