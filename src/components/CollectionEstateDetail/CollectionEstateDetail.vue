<template>
  <div class="collectionEstateDetail">
    <Row style="border:1px solid #ccc;padding:20px" v-show="showDetailContainer">
      <h4 style="margin-left:20px;margin-bottom:10px">当前楼盘名称：普华浅水湾</h4>
      <!-- <Form :label-width="100">
        <FormItem label="照片状态">
          <RadioGroup v-model="form.progress">
            <Radio label="1">未提交审核</Radio>
            <Radio label="2">待审核</Radio>
            <Radio label="3">通过入库</Radio>
            <Radio label="4">待重拍</Radio>
            <Radio label="5">已驳回</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="照片分类">
          <Select v-model="form.progress" style="width:200px">
            <Option  value="1">评分照片</Option>
            <Option  value="2">进度照片</Option>
            <Option  value="3">资料照片</Option>
          </Select>
          <Select v-model="form.progress" style="width:200px">
            <Option  value="1">工程</Option>
            <Option  value="2">景观·新盘</Option>
            <Option  value="3">景观·二手盘</Option>
            <Option  value="3">物业</Option>
            <Option  value="3">物业·周边</Option> 
            <Option  value="3">物业·二手</Option>
          </Select>
        </FormItem>
        <FormItem label="评测点标签">
          <CheckboxGroup v-model="form.progress">
            <Checkbox label="0">全部</Checkbox>
            <Checkbox label="1">一户一档</Checkbox>
            <Checkbox label="2">需整改</Checkbox>
            <Checkbox label="3">已整改</Checkbox>
            <Checkbox label="4">未整改</Checkbox>
            <Checkbox label="5">加分项/亮点</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="质量问题">
          <Select v-model="form.progress" style="width:200px">
            <Option  value="1">评分照片</Option>
            <Option  value="2">进度照片</Option>
            <Option  value="3">资料照片</Option>
          </Select>
          <Select v-model="form.progress" style="width:200px">
            <Option  value="1">评分照片</Option>
            <Option  value="2">进度照片</Option>
            <Option  value="3">资料照片</Option>
          </Select>
          <Select v-model="form.progress" style="width:200px">
            <Option  value="1">评分照片</Option>
            <Option  value="2">进度照片</Option>
            <Option  value="3">资料照片</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="房间信息">
          <Select v-model="form.progress" placeholder="请选择期数" style="width:120px">
            <Option  value="1">一期</Option>
          </Select>
          <Select v-model="form.progress" placeholder="请选择楼栋" style="width:120px">
            <Option  value="1">一期</Option>
          </Select>
          <Select v-model="form.progress" placeholder="请选择单元" style="width:120px">
            <Option  value="1">一期</Option>
          </Select>
          <Select v-model="form.progress" placeholder="请选择楼层" style="width:120px">
            <Option  value="1">一期</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="部位构件">
          <Select @on-change="formChange" v-model="form.progress" placeholder="一级评分点" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select @on-change="formChange" v-model="form.progress" placeholder="二级评分点" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="拍照人">
          <Select @on-change="formChange" v-model="form.progress" placeholder="一级评分点" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="拍照/上传时间">
          <DatePicker type="date" format="yyyy-MM-dd" v-model="form.btime" :options="dateBOptions" @on-change="changBeginTime" placeholder="开始时间" style="width: 200px"></DatePicker>
          <span>至</span>
          <DatePicker type="date" format="yyyy-MM-dd" v-model="form.etime" :options="dateEOptions" @on-change="changEndTime" placeholder="结束时间" style="width: 200px"></DatePicker>
        </FormItem>
      </Form> -->
      <Row style="border:1px solid #ccc;padding:20px;margin: 10px 0px">
        <span style="display:inline-block;width:78px">批量操作</span>
        <Checkbox v-model="handForm.selectAll" @on-change="selectAll">全选</Checkbox>
        <Checkbox v-model="handForm.selectReverse" @on-change="selectReverse">反选</Checkbox>
        <Button type="ghost" @click="batchSubmit">批量提交审核</Button>
        <Button type="ghost" @click="batchEdit">批量修改</Button>
        <Button type="warning" @click="batchDelete">批量删除</Button>
        
      </Row>
      <Row :gutter="16">
        <Col span="8" v-for="(item,index) in estateProgressInfoListData.list" :key="index">
          <CardBuild :item="item" @estateProInView="estateProInView">
            <div class="card-check" slot="checkItem">
              <Checkbox v-model="item.check" @on-change="selectItem(index)"></Checkbox>
            </div>
          </CardBuild>
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
  name: 'collectionEstateDetail',
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
      handForm:{
        selectAll:false,
        selectReverse:false,
        selectArr:[],
      },
      estateProgressInfoListData:{
        list:[
        {
          id:1,
          check:false,
          imgSrc:'/static/img/test.jpg',
          name:'一期/1幢3单元/12层6户/卧2墙3',
          per1:'小明',
          pers:'小李',
          time1:'2017-08-05 10:10:10',
          time2:'2017-08-05 10:10:10'
        },
        {
          id:2,
          check:false,
          imgSrc:'/static/img/test.jpg',
          name:'一期/1幢3单元/12层6户/卧2墙3',
          per1:'小明',
          pers:'小李',
          time1:'2017-08-05 10:10:10',
          time2:'2017-08-05 10:10:10'
        },
        {
          id:3,
          check:false,
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
  watch:{
    'handForm.selectArr':{
      handler(val){
        if(val.length == this.estateProgressInfoListData.list.length){
          this.handForm.selectAll = true;
        }else{
          this.handForm.selectAll = false;
        }
      },
      deep:true
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
    //全选
    selectAll(val){
      this.estateProgressInfoListData.list.forEach(item => {
        if(val){
          item.check = true;
          this.handForm.selectArr = [];
          this.estateProgressInfoListData.list.forEach(item => {
            this.handForm.selectArr.push(item.id)
          })
        }else{
          item.check = false;
          this.handForm.selectArr = [];
        }
      })
    },
    //反选
    selectReverse(val){
      let setSelect = new Set(this.handForm.selectArr);
      this.estateProgressInfoListData.list.forEach(item => {
        item.check = item.check? false:true;
        if(setSelect.has(item.id)){
          setSelect.delete(item.id);
        }else{
          setSelect.add(item.id);
        }
      })
      this.handForm.selectArr = Array.from(setSelect);
    },
    //单选
    selectItem(index){
      let setSelect = new Set(this.handForm.selectArr),
      item = this.estateProgressInfoListData.list[index];

      if(item.check){
        setSelect.add(item.id);
      }else{
        setSelect.delete(item.id);
      }
      this.handForm.selectArr = Array.from(setSelect);
    },
    //批量提交审核
    batchSubmit(){
      let _this = this;
      this.$Modal.confirm({
        content:'确认提交吗？',
        onOk(){
          let body = _.cloneDeep(_this.form);
          _this.spinShow = true;
          this.$http('/user/login',{},body,{}).then((res) => {
            _this.spinShow = false;
            if(res.data.code === '200'){
              if(res.data.interfaceStatus === '启用'){
                if(res.data.response.status === '000'){
                  _this.$Message.success('提交成功')
                  _this.$router.push('/index/rolemanagement')    
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
        }
      })
    },
    //批量修改
    batchEdit(){

    },
    //批量删除
    batchDelete(){
      let _this = this;
      this.$Modal.confirm({
        content:'确认删除吗？',
        onOk(){
          let body = _.cloneDeep(_this.form);
          _this.spinShow = true;
          this.$http('/user/login',{},body,{}).then((res) => {
            _this.spinShow = false;
            if(res.data.code === '200'){
              if(res.data.interfaceStatus === '启用'){
                if(res.data.response.status === '000'){
                  _this.$Message.success('提交成功')
                  _this.$router.push('/index/rolemanagement')    
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
        }
      })
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
    //返回列表
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
    this.$store.dispatch('secondLevelAction','个人面板')
    this.$store.dispatch('threeLevelAction','采集楼盘列表')
    this.$store.dispatch('secondRouteAction','/index/collectionestatemanagement')
    this.$store.dispatch('activeNameAction','/index/collectionestatemanagement')
    this.$store.dispatch('openNamesAction',['1'])
  }
}
</script>

<style scoped>
  .card-check{
    position:absolute;
    left:0px;
    top:-30px
  }
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
