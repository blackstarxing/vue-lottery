<template>
    <transition :name="fadeIn">
        <div class="alertBox" v-show="show">
            <div class="alert-mask" v-show="isShowMask"></div>
            <transition :name="translate">
                <div class="toast" :class="position" v-show="show">{{text}}</div></transition>
        </div>
    </transition>
</template>
<script>
	export default {
	    data() {
	        return {
	        	// 定时器
	        	timers:[]
	        }
	    },
	    props: {
	        show: { // 是否显示此toast
	        	default:false
	        },
	        text: { // 提醒文字
	        	default:'loading'
	        },
	        position: { // 提醒容器位置
	        	default:'center'
	        },
	        isShowMask: { // 是否显示遮罩层
	        	default:false
	        },
	        time: { // 显示时间
	        	default:3000
	        },
	        transition: { // 是否开启动画
	        	default:true
	        }
	    },
	    methods:{
	    	countdown () {
	    		if(this.show){
	    			setTimeout(() => {
					   this.show = false
					}, this.time)
	    		}		    
			}
	    },
	    computed: {
	        translate() { // 根据props，生成相对应的动画
	            if (!this.transition) {
	                return ''
	            } else {
	                if (this.position === 'top') {
	                    return 'translate-top'
	                } else if (this.position === 'middle') {
	                    return 'translate-middle'
	                } else if (this.position === 'bottom') {
	                    return 'translate-bottom'
	                }
	            }
	        },
	        fadeIn() { // 同上
	            if (!this.transition) {
	                return ''
	            } else {
	                return 'fadeIn'
	            }
	        }
	    },
	    watch:{
	    	show:function(){
				this.timers.forEach((timer) => {
			      	window.clearTimeout(timer)
			    })
			    this.timers = []
			    this.countdown()
	    	}
	    }
	}
</script>

<style>
.toast {
	position:fixed;
	top:50%;
	left:50%;
	padding:0 0.133333rem;
	/*强制不换行*/
	max-width: 9.333333rem;
	white-space: nowrap;
	transform: translate(-50%,-50%);
	background:rgba(0,0,0,.5);
	text-align:center;
	line-height:1.066667rem;
	font-size:0.32rem;
	z-index:5000;
	color:#fff;
	border-radius: 0.133333rem;
}
.toast.top {
	top:50px;
	margin-top:0;
}
.toast.center {
	top:50%;
	transform:translateY(-100%);
}
.toast.bottom {
	top:auto;
	bottom:50px;
	margin-top:0;
}
.alert-mask {
	position:fixed;
	left:0;
	top:0;
	bottom:0;
	right:0;
	background:rgba(0,0,0,.5);
	z-index:4999;
}
.fadeIn-enter-active,.fadeIn-leave-active {
	transition:opacity .3s;
}
.fadeIn-enter,.fadeIn-leave-active {
	opacity:0;
}
.translate-top-enter-active,.translate-top-leave-active {
	transition:all 0.3s cubic-bezier(.36,.66,.04,1);
}
.translate-top-enter,.translate-top-leave-active {
	transform:translate(-50%,-50);
	opacity:0;
}
.translate-middle-enter-active,.translate-middle-leave-active {
	transition:all 0.3s cubic-bezier(.36,.66,.04,1);
}
.translate-middle-enter,.translate-middle-leave-active {
	transform:translate(-50%,80%);
	opacity:0;
}
.translate-bottom-enter-active,.translate-bottom-leave-active {
	transition:all 0.3s cubic-bezier(.36,.66,.04,1);
}
.translate-bottom-enter,.translate-bottom-leave-active {
	transform:translate(-50%,100%);
	opacity:0;
}
</style>