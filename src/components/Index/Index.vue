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

        <Modal v-model="modal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>确认删除吗?</p>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="error" size="large" @click="del">确认</Button>
            </div>
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
        //模态框删除按钮
        del(){

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
</style>