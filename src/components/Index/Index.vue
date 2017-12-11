<template>
    <div class="Index">
	  	<div class="layout" :class="{'layout-hide-text': spanLeft < 4,'con-left':spanLeft < 4}">
	        <Row type="flex" style="height:100%">
	            <Col :span="spanLeft" class="layout-menu-left">
	            	<LayoutMenuLeft />
	            </Col>
	            <Col :span="spanRight" style="position:relative">
	                <LayoutHeader  @toggleClick = "toggleClick" />
	                <LayoutBreadcrumb />
					<LayoutContent />
	            </Col>
	        </Row>
	    </div>  

        <Modal v-model="modal" class="img-modal" :mask-closable="false" :closable="false">
            <img :src="modalImgSrc" style="width:100%" alt="">
            <Icon type="close-round" class="close-icon" @click.native="modalClose"></Icon>
            <p slot="footer">
                
            </p>
        </Modal>
    </div>
</template>
<script>
import LayoutMenuLeft from '../LayoutMenuLeft/LayoutMenuLeft'
import LayoutHeader from '../LayoutHeader/LayoutHeader'
import LayoutBreadcrumb from '../LayoutBreadcrumb/LayoutBreadcrumb'
import LayoutContent from '../LayoutContent/LayoutContent'
export default {
	name:'Index',
	components:{
		LayoutMenuLeft,
		LayoutHeader,
		LayoutBreadcrumb,
		LayoutContent
	},
    data () {
        return {
            spanLeft: 4,
            spanRight: 20,
            openNames:[1]
        }
    },
    computed: {
        iconSize () {
            return this.spanLeft === 4 ? 14 : 24;
        },
        modal(){
            return this.$store.getters.GetModal;
        },
        modalImgSrc(){
            return this.$store.getters.GetModalImgSrc;
        }
    },
    methods: {
        //左右切换
        toggleClick () {
            if (this.spanLeft === 4) {
                this.spanLeft = 2;
                this.spanRight = 22;
            } else {
                this.spanLeft = 4;
                this.spanRight = 20;
            }
        },
        //模态框关闭
        modalClose(){
            this.$store.dispatch('modalAction',false)
        },
        //tab路由切换
		route(path){
			this.$router.push({path})
		}
    }
}
</script>

<style scoped>
	.Index{height: 100%}
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin-top: 15px;
        overflow-x: hidden;
        overflow-y: scroll;
        background: #fff;
        border-radius: 4px;
        position: absolute;
        left: 0;
        right: 0;
        top: 90px;
        bottom: 0;
		padding:20px;
    }

    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
		height:100%
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    
</style>

<style>
    .layout-hide-text .layout-text{
        display: none!important;
    }
    .con-left .ivu-menu-submenu-title-icon{
        display: none!important
    }
    .ivu-menu-item{
        height: 52px!important;
        overflow-y: hidden;
        position: relative;
    }
    .ivu-menu-item .layout-text{
        height: 24px;
        line-height: 24px;
        white-space: nowrap;
        overflow: hidden;
        padding-left: 30px;  
    }
    .ivu-menu-item>i{
        position: absolute;
    }
    .img-modal{
        position: relative;
        /*padding-top: 30px*/
    }
    .img-modal .ivu-modal-body{
        padding-top: 40px
    }
    .img-modal .close-icon{
        position:absolute;
        right:10px;
        top:10px;
        font-size:20px;
        cursor: pointer;
    }
    .img-modal .close-icon:hover{
        color: #2b85e4
    }
    .img-modal .ivu-modal-footer{
        display: none;
    }
</style>