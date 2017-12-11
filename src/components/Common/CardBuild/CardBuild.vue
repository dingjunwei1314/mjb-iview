<template>
	<div>
		<Card>
			<div class="img-container" :style="{backgroundImage:'url('+item.imgSrc+')'}">
			  <Tag class="img-tag" checkable color="green">审核通过</Tag>
			  <Tag class="img-tag" checkable color="green" style="background:black">待审核</Tag>
			  <Tag class="img-tag" checkable color="green" style="background:#ed3f14">未提交审核</Tag>
			  <Tag class="img-tag" checkable color="green" style="background:#f90">待重拍</Tag>
			  <Tag class="img-tag2" type="border">拍照照片</Tag>
			  <Tag class="img-tag2" type="border">上传照片</Tag>

			  <slot  name="checkItem"></slot>
			  <p class="img-msg">{{item.name}}</p>
			</div>
			<Row style="font-size:12px;padding:5px">
			  <Row style="margin-top:5px">
			    <Tag type="border" color="yellow">楼进度</Tag>
			  </Row>  
			  <Row style="margin-top:5px">
			    <span>质量问题：</span>
			    <span>基础桩基工程>地基沉淀>现场是否有明显不均</span> 
			  </Row>
			  <Row style="margin-top:5px">
			    <span>拍照人员：</span>
			    <span>{{item.per1}}</span> 
			    <span style="margin-left:10px">拍照时间：</span>
			    <span>{{item.time1}}</span>
			  </Row>
			  <Row>
			    <span>审核人员：</span>
			    <span>{{item.per2}}</span> 
			    <span style="margin-left:10px">审核时间：</span>
			    <span>{{item.time2}}</span>
			  </Row>
			  <div style="text-align:center;margin-top:10px">
			    <Button type="ghost" @click="estateProInView">查看</Button>
			    <Button type="ghost" @click="estateProInView">提交审核</Button>
			    <Button type="ghost" @click="estateProInView">编辑</Button>
			    <Button type="ghost" @click="estateProInView">删除</Button>
			  </div>
		</Row>
		</Card>
	</div>
</template>
<script>
	export default{
		name:'cardBuild',
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			estateProInView(){
				this.$emit('estateProInView')
			}
		}
	}
</script>
<style scoped>
  .img-container{
  	margin-top: 20px;
    height: 180px;
    position: relative;
    background-position: center center;
    background-repeat: no-repeat;
    background-size:cover; 
  }
  .img-tag{
    margin-top: 5px;
    margin-left: 5px;
  }
  .img-tag2{
    float: right;
    margin-top: 5px;
    margin-right: 5px;
    background: transparent!important;
    color: white!important;
  }
  .img-msg{
    position: absolute;
    bottom: 0px;
    left: 0px;
    color: #fff;
    background: rgba(0,0,0,.5);
    width: 100%;
    font-size: 12px;
    line-height: 30px;padding-left: 10px
  }
</style>