<template>
  <div class="estateEditAndView">
    <Row class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
      <Tabs type="card" :animated="false" :value="$route.query.activePage.toString()">
        <TabPane label="楼盘基础信息" name="1">
          <EstateBasicInfo />
        </TabPane>
        <TabPane label="楼盘进度信息" name="2">
          <EstateProgressInfo />
        </TabPane>
        <TabPane label="评分信息" name="3">
          <EstateScoreInfo />
        </TabPane>
        <TabPane label="一户一档" name="4">
          <EstateStallsInfo />
        </TabPane>
      </Tabs>
    </Row>
  </div>
</template>
<script>
import EstateBasicInfo from '../EstateBasicInfo/EstateBasicInfo';
import EstateProgressInfo from '../EstateProgressInfo/EstateProgressInfo';
import EstateScoreInfo from '../EstateScoreInfo/EstateScoreInfo';
import EstateStallsInfo from '../EstateStallsInfo/EstateStallsInfo';
export default {
  name: 'estateEditAndView',
  components:{
    EstateBasicInfo,
    EstateProgressInfo,
    EstateScoreInfo,
    EstateStallsInfo
  },
  data () {
    return {
      provinceIdsList:[],
      cityIdsList:[],
      buidingList:[],
      areaIdsList:[],

      tableLoading:false,
      form:{
        province:'',
        city:'',
        area:'',
        buildingName:'',
        gman:'',
        gb:'',
        pageIndex:0,
        pageSize:10
      },
      data1:[
        {
          id:1,
          name:'大名楼',
          address:'北京市',
          isf:'是',
          tman:'丁军伟',
          time:'2017-9-1'
        }
      ]
    }
  },
  computed:{

  },
  methods: {
    //获取楼盘数据
    getEstateListData(){
      let _this = this;
      this.tableLoading = true;
      this.$http('/role/getAllRole').then((res) => {
        _this.tableLoading = false;
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
        _this.tableLoading = false;
        _this.$Message.warning('网络请求失败')
      })
    },
    //操作
    handle(p,type){
      this.$router.push({
        path:'/index/acquisitionviewandedit',
        query:{
          type,
        }
      })
    }
  },
  created(){
    this.$store.dispatch('secondLevelAction','楼盘管理');
    if(this.$route.query.type === 'edit'){
      this.$store.dispatch('threeLevelAction','楼盘信息编辑');
    }else{
      this.$store.dispatch('threeLevelAction','楼盘信息详情');
    }
    this.$store.dispatch('secondRouteAction','/index/estatemanagement');
    this.$store.dispatch('activeNameAction','/index/estatemanagement');
    this.$store.dispatch('openNamesAction',['3']);
  }
}
</script>

<style scoped>
  .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
        height: 120px;
        margin-top: -16px;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
        background: #fff;
        padding: 16px;
    }

    .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
        border-color: transparent;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
        border-color: #fff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
        border-radius: 0;
        background: #fff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
        border-top: 1px solid #3399ff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #3399ff;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
