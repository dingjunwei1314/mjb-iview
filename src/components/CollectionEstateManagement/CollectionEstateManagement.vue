<template>
  <div class="collectionEstateManagement">
    <Row type="flex" style="border:1px solid #ccc;padding:20px">
        <Col span="20">
          <Form  :model="form"  inline>
              <FormItem>
                <span>楼盘ID：</span>
                <Input  style="width:100px"  v-model="form.buildingId" placeholder="id"></Input>
              </FormItem>

              <FormItem prop="user">
                <span>区域：</span>
                <RegionalLinkage :province.sync="form.province" :city.sync="form.city" :area.sync="form.area"/>
              </FormItem>

              <FormItem prop="password">
                  <span>关键词：</span>
                  <Select
                    style="width:200px"
                    v-model="form.buildingName"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="楼盘名称"
                    :remote-method="remoteMethod">
                    <Option
                      v-for="(item,index) in buidingList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key">
                    </Option>
                  </Select>
              </FormItem>

              <FormItem prop="password">
                  <span>是否严选：</span>
                  <Select
                    style="width:100px"
                    v-model="form.gman">
                    <Option
                      label="是"
                      value="1">
                    </Option>
                    <Option
                      label="否"
                      value="0">
                    </Option>
                  </Select>
              </FormItem>

              <FormItem prop="password">
                  <span>交付状态：</span>
                  <Select
                    style="width:100px"
                    v-model="form.gman">
                    <Option
                      label="在建楼盘"
                      value="1">
                    </Option>
                    <Option
                      label="二手盘"
                      value="2">
                    </Option>
                  </Select>
              </FormItem>

              <FormItem prop="password">
                  <span>任务状态：</span>
                  <Select
                    style="width:100px"
                    v-model="form.gman">
                    <Option
                      label="分配楼盘"
                      value="1">
                    </Option>
                    <Option
                      label="临时楼盘"
                      value="2">
                    </Option>
                  </Select>
              </FormItem>


          </Form>
        </Col>
        <Col span="4" style="text-align:right">
           <Button type="primary" @click = "searchBegin" icon="ios-search" size="large">搜索</Button>
        </Col>
    </Row>

    <Row style="margin-top:50px">
      <Table border :loading="tableLoading" :columns="columns1" :data="data1"></Table>
      <Page
        style = "text-align:center;margin-top:40px"
        :total = "50"
        :page-size = "10"
        :current = "2"
        show-total
        show-elevator
        @on-change = "pageChange"
        >
      </Page>
    </Row>
  </div>
</template>
<script>
import RegionalLinkage from '../Common/RegionalLinkage/RegionalLinkage';
export default {
  name: 'collectionEstateManagement',
  components:{
    RegionalLinkage
  },
  data () {

    return {

      buidingList:[],
      tableLoading:false,
      columns1:[
        {
            title: '楼盘ID',
            key: 'id',
            fixed:'left',
            width:80
        },
        {
            title: '楼盘名称',
            key: 'name',
            fixed:'left',
            width:150
        },
        {
            title: '所在地区',
            key: 'address',
            width:150,
        },
        {
            title: '开发商',
            key: 'name',
            width:150,
        },
        {
            title: '设计公司',
            key: 'name',
            width:150,
        },
        {
            title: '景观公司',
            key: 'name',
            width:150,
        },
        {
            title: '物业公司',
            key: 'name',
            width:150,
        },
        {
            title: '施工单位',
            key: 'name',
            width:150,
        },
        {
            title: '是否严选',
            key: 'isf',
            width:150,
        },
        {
            title: '交付状态',
            key: 'isf',
            width:150,
        },
        {
            title: '期数',
            key: 'isf',
            width:150,
        },
        {
            title: '楼幢数',
            key: 'tman',
            width:150,
        },
        {
            title:'任务状态',
            key:'time',
            width:150,
        },
        {
            title:'未提交审核',
            key:'time',
            width:150,
        },
        {
            title:'待重拍',
            key:'time',
            width:150,
        },
        {
            title:'楼盘创建时间',
            key:'time',
            width:150,
        },
        {
            title:'操作',
            key:'action',
            fixed:'right',
            width:200,
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
                              this.handle(params,'/index/collectionestatedetail')
                          }
                      }
                  }, '照片管理'),
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
                              this.handle(params,'/index/collectionestateedit')
                          }
                      }
                  }, '上传照片'),
              ]);
            }
        }
      ],
      form:{
        province:2,
        city:3,
        area:9,
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
        },
        {
          id:2,
          name:'高速大厦',
          address:'西安市',
          isf:'否',
          tman:'丁军伟',
          time:'2017-9-1'
        }
      ]
    }
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

    //模糊搜索
    remoteMethod(val){
      let _this = this,
      body = {buildingName: val};

      this.$http('/backstageBuilding/getBuildingNameList', {body}, {}, {}, 'post').then( res => {
         if (res.data.code == 0) {
             _this.buidingList = res.data.response;
         } else if (res.data.code == 300) {
             _this.$router.push('/login')
         } else {
             message(_this,res.data.message,'warning')
         }
      }).catch(function (err) {
        console.log(err)
      })
    },
    //搜索
    searchBegin(){
      console.log(this.form);
      return;
      this.form.pageIndex = 0;
      this.getEstateListData();
    },
    //页码切换
    pageChange(page){
      this.form.pageIndex = page-1;
      this.getEstateListData();
    },
    //操作
    handle(p,path){
      this.$router.push({
        path,
        query:{

        }
      })
    }
  },
  created(){
    this.$store.dispatch('secondLevelAction','个人面板')
    this.$store.dispatch('threeLevelAction','采集楼盘列表')
    this.$store.dispatch('secondRouteAction','/index/collectionestatemanagement')
    this.$store.dispatch('activeNameAction','/index/collectionestatemanagement')
    this.$store.dispatch('openNamesAction',['1'])
  }
}
</script>

<style scoped>

</style>
