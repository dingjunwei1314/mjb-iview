<template>
	<div v-show="imgUrl" class="uploadImgCon">
      <img  :src="imgUrl"alt="">
      <div class="upWap">
        <Icon type="android-search" @click.native="previewImg"></Icon>
        <i v-if="isShowDelete" @click="deleteImg" class="el-icon-delete"></i>
      </div>
    </div>
</template>

<script>
	export default {
		name:'',
		components:{

		},
		props:{
			imgUrl:{
        type:String,
        default:''
	    },
	    isShowDelete:{
	    	type:Boolean,
	    	default:true
	    }
		},
		data(){
			return{
			}
		},
		methods:{
			previewImg(){
        console.log(1)
	    	this.$emit('previewImg')
	    },
	    deleteImg(){
	    	this.$emit('deleteImg')
	    },
		}
	}
</script>

<style scoped>
    .uploadImgCon{
      display: inline-block;
      width: 148px;
      height: 148px;
      border-radius: 5px;
      overflow:hidden;
      position: relative;
      cursor: pointer;
      margin-right: 20px;
      box-shadow: 0px 0px 10px #666
    }
    .uploadImgCon .upWap{
      font-size: 14px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0,0,0,.5);
      text-align: center;
      opacity: 0;
      transition: all .5s;
    }
    .uploadImgCon .upWap i{
      color: #f1f1f1;
      font-size: 28px;
      line-height: 148px;
    }
    .uploadImgCon .upWap i:nth-child(2){
      /*margin-left: 10px*/
    }
    .uploadImgCon img{width: 100%!important;height: 100%}
    .uploadImgCon:hover .upWap{opacity: 1;}
</style>