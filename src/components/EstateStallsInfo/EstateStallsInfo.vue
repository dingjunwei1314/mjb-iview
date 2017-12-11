<template>
  <div class="estateStallsInfo">
    <Row style="border:1px solid #ccc;padding:20px" v-show="showDetailContainer">
      <h4 style="margin-left:20px;margin-bottom:10px">当前楼盘名称：普华浅水湾</h4>
      <Form :label-width="70">
        <FormItem prop="user" label="期 数">
          <CheckboxGroup @on-change="formChange" v-model="form.progress">
            <Checkbox label="0">全部</Checkbox>
            <Checkbox label="1">一期</Checkbox>
            <Checkbox label="2">二期</Checkbox>
            <Checkbox label="3">三期</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="user" label="幢  号">
          <CheckboxGroup @on-change="formChange" v-model="form.progress">
            <Checkbox label="0">全部</Checkbox>
            <Checkbox label="1">1幢</Checkbox>
            <Checkbox label="2">2幢</Checkbox>
            <Checkbox label="3">3幢</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="user" label="单  元">
          <CheckboxGroup @on-change="formChange" v-model="form.progress">
            <Checkbox label="0">全部</Checkbox>
            <Checkbox label="1">一单元</Checkbox>
            <Checkbox label="2">二单元</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="user" label="楼  层">
          <CheckboxGroup @on-change="formChange" v-model="form.progress">
            <Checkbox label="0">全部</Checkbox>
            <Checkbox label="1">1层</Checkbox>
            <Checkbox label="2">2层</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="user" label="时间">
          <RadioGroup @on-change="formChange" v-model="form.progress">
            <Radio label="1">正序</Radio>
            <Radio label="2">倒序</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem prop="user" label="问题">
          <Select @on-change="formChange" v-model="form.progress" placeholder="一级评分点" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select @on-change="formChange" v-model="form.progress" placeholder="二级评分点" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select @on-change="formChange" v-model="form.progress" placeholder="三级评分点" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
      </Form>
      <p class="tit-lab">
        
      </p>
      <Row :gutter="16">
        <Col span="8" v-for="(item,index) in estateProgressInfoListData.list" :key="index">
          <CardBuild :item="item" @estateProInView="estateProInView"/>
        </Col>
      </Row>
      <Page
        style = "text-align:center;margin-top:40px" 
        :total = "50"
        :page-size = "10"
        :current.sync = "current"
        show-total
        show-elevator
        @on-change = "pageChange"
        >
      </Page>
    </Row>
    
    <Row style="border:1px solid #ccc;padding:20px" v-show="!showDetailContainer">
      <h4 style="margin-left:20px">当前楼盘名称：普华浅水湾</h4>
      <p class="tit-lab2">
        查看照片
      </p>
      <Form style="padding-left:20px" :label-width="150">
        <FormItem prop="user" label="所在地区：">

        </FormItem>
        <FormItem prop="user" label="进度：">
          
        </FormItem>
        <FormItem prop="user" label="期数：">
          
        </FormItem>
        <FormItem prop="user" label="楼幢号：">
          
        </FormItem>
        <FormItem prop="user" label="单元号：">
          
        </FormItem>
        <FormItem prop="user" label="楼   层：">
          
        </FormItem>
        <FormItem prop="user" label="门牌号：">
          
        </FormItem>
        <FormItem prop="user" label="部位构件：">
          
        </FormItem>
        <FormItem prop="user" label="照片：">
          <ImgPreview :imgUrl="estateProgressInfoListData.list[0].imgSrc" @previewImg="previewImg(estateProgressInfoListData.list[0].imgSrc)"/>
        </FormItem>
        <FormItem prop="user" label="照片备注：">
          
        </FormItem>
        <FormItem prop="user" label="照片状态：">
          
        </FormItem>
        <FormItem prop="user" label="拍照人：">
          
        </FormItem>
        <FormItem prop="user" label="拍照时间：">
          
        </FormItem>
        <FormItem prop="user" label="审核人：">
          
        </FormItem>
        <FormItem prop="user" label="审核时间：">
          
        </FormItem>
        <FormItem>
          <Button type="ghost" @click="backToList">关闭</Button>
        </FormItem>
      </Form>
    </Row>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>
<script>
import ImgPreview from '../Common/ImgPreview/ImgPreview';
import CardBuild from '../Common/CardBuild/CardBuild';
export default {
  name: 'estateStallsInfo',
  components:{
    ImgPreview,
    CardBuild
  },
  data () {
    return {
      current:1,
      spinShow:false,
      showDetailContainer:true,
      form:{
        progress:[],
        pageIndex:0,
        pageSize:10
      },
      estateProgressInfoListData:{
        list:[
        {
          imgSrc:'/static/img/test.jpg',
          name:'一期/1幢3单元/12层6户/卧2墙3',
          per1:'小明',
          pers:'小李',
          time1:'2017-08-05 10:10:10',
          time2:'2017-08-05 10:10:10'
        },
        {
          imgSrc:'/static/img/test.jpg',
          name:'一期/1幢3单元/12层6户/卧2墙3',
          per1:'小明',
          pers:'小李',
          time1:'2017-08-05 10:10:10',
          time2:'2017-08-05 10:10:10'
        },
        {
          imgSrc:'/static/img/test.jpg',
          name:'一期/1幢3单元/12层6户/卧2墙3',
          per1:'小明',
          pers:'小李',
          time1:'2017-08-05 10:10:10',
          time2:'2017-08-05 10:10:10'
        }
        ]
      },
    }
  },
  computed:{
    type:function(){
      return this.$route.query.type;
    }
  },
  methods: {
    //获取详情数据
    getEstateProgressInfoListData(){
      let _this = this;
      this.spinShow = true;
      this.$http('/role/getAllRole').then((res) => {
        _this.spinShow = false;
        if(res.data.code === '200'){
          if(res.data.interfaceStatus === '启用'){
            if(res.data.response.status === '000'){
              _this.roleList = res.data.response.data
            }else{
              _this.$Message.warning(res.data.response.message)
            }
          }else{
            _this.$Message.warning('接口维护中')
          }
        }else{
          _this.$Message.warning(res.data.message)
        }
      }).catch(err => {
        console.log(err)
        _this.spinShow = false;
        _this.$Message.warning('网络请求失败')
      })
    },
    //类型切换
    formChange(val){
      this.form.pageIndex = 0;
      this.current = 1;
      this.getEstateProgressInfoListData();
    },
    //页码切换
    pageChange(page){
      this.form.pageIndex = page-1;
      this.getEstateProgressInfoListData();
    },
    //查看详情
    estateProInView(){
      let _this = this;
      this.spinShow = true;
      this.$http('/role/getAllRole').then((res) => {
        _this.spinShow = false;
        if(res.data.code === '200'){
          if(res.data.interfaceStatus === '启用'){
            if(res.data.response.status === '000'){
              _this.roleList = res.data.response.data
              this.showDetailContainer = true;
            }else{
              _this.$Message.warning(res.data.response.message)
            }
          }else{
            _this.$Message.warning('接口维护中')
          }
        }else{
          _this.$Message.warning(res.data.message)
        }
      }).catch(err => {
        console.log(err)
        _this.spinShow = false;
        _this.$Message.warning('网络请求失败')
      })
    },
    backToList(){
      this.showDetailContainer = false;
    },
    //查看图片
    previewImg(src){
      console.log(src)
      this.$store.dispatch('modalAction',true)
      this.$store.dispatch('modalImgSrcAction',src)
    },
    //返回
    back(){
      this.$router.push('/index/estatemanagement')
    }
  },
  created(){
    // this.getEstateProgressInfoListData();
  }
}
</script>

<style scoped>
  .tit-lab,.tit-lab2{
    background: #eee;
    margin: 20px 0px;
  }
  .tit-lab2{
    height: 32px;
    line-height: 32px;
    padding-left: 20px;
  }
  .ivu-form-item{
    margin-bottom: 10px
  }
</style>
