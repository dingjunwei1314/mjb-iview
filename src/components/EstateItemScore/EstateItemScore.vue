<template>
  <div class="estateItemScore">
    <Row class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
      <Tabs type="card" :animated="false">
        <TabPane label="工程" name="1">
          <Table border :loading="tableLoading" :columns="columns1" :data="data1" style="margin-top:20px"></Table>
        </TabPane>
        <TabPane label="规划·周边" name="2">
          <Table border :loading="tableLoading" :columns="columns1" :data="data1" style="margin-top:20px"></Table>
        </TabPane>
        <TabPane label="规划·二手" name="3">
          <Table border :loading="tableLoading" :columns="columns1" :data="data1" style="margin-top:20px"></Table>
        </TabPane>
        <TabPane label="景观·新盘" name="4">
          <Table border :loading="tableLoading" :columns="columns1" :data="data1" style="margin-top:20px"></Table>
        </TabPane>
        <TabPane label="景观·二手" name="5">
          <Table border :loading="tableLoading" :columns="columns1" :data="data1" style="margin-top:20px"></Table>
        </TabPane>
        <TabPane label="物业" name="6">
          <Table border :loading="tableLoading" :columns="columns1" :data="data1" style="margin-top:20px"></Table>
        </TabPane>
      </Tabs>
    </Row>
  </div>
</template>
<script>

export default {
  name: 'estateItemScore',
  components:{
   
  },
  data () {
    return {
      tableLoading:false,
      columns1:[
        {
            title: '一级评分项',
            key: 'id',
        },  
        {
            title: '大项评分值',
            key: 'name',
        },
        {
            title: '二级评分项',
            key: 'name',
        },
        {
            title: '三级评分点',
            key: 'address',
        },
        {
            title: '评测结果',
            key: 'address',
        },
        {
            title: '评分值',
            key: 'isf',
        },
        {
            title: '照片量',
            key: 'isf',
        },
        {
            title: '最近一次更新时间',
            key: 'isf',
        },
        {
            title:'操作',
            key:'action',
            render: (h, params) => {
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
                      },
                      style: {
                          marginRight: '5px'
                      },
                      on: {
                          click: () => {
                              this.handle(params)
                          }
                      }
                  }, '评分详情'),
              ]);
            }
        }
      ],
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
    handle(p){
      this.$router.push({
        path:'/index/estateItemscoredetail',
        query:{
          
        }
      })
    }
  },
  created(){
    this.$store.dispatch('secondLevelAction','楼盘管理');
    this.$store.dispatch('threeLevelAction','分享评分详情');
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
