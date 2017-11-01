<template>
	<div class="box">
		<div>{{msg}}</div>
    	
  	</div>
</template>
<script>
	export default {
  		data () {
    		return {
      			msg: 'my'
    		}
  		}
	}
</script>
<style scoped lang="less">
	.box{
		background:#ccc;
		div{
			color:#effdda
		}
	}
</style>