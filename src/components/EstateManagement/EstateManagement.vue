<template>
  <div class="estatemanagement">
    <Row type="flex" style="border:1px solid #ccc;padding:20px">
        <Col span="20">
          <Form  :model="form"  inline>
              <FormItem>
                <span>楼盘ID：</span>
                <Input  style="width:100px"  v-model="form.buildingId" placeholder="id"></Input>
              </FormItem>
              <FormItem prop="user">
                <span>区域：</span>
                <Select
                  style="width:150px"
                  v-model="form.province"
                  clearable
                  @change = "provinceChange(form.province)"
                  placeholder="省">
                  <Option
                    v-for="item in provinceIdsList"
                    :key="item.cityId"
                    :label="item.cityName"
                    :value="item.cityId">
                  </Option>
                </Select>
                <Select
                  v-model="form.city"
                  clearable
                  placeholder="市"
                  style="width:150px">
                  <Option
                    v-for="item in cityIdsList"
                    :key="item.cityId"
                    :label="item.cityName"
                    :value="item.cityId">
                  </Option>
                </Select>
                <Select
                  v-model="form.area"
                  clearable
                  placeholder="区"
                  style="width:150px">
                  <Option
                    v-for="item in areaIdsList"
                    :key="item.cityId"
                    :label="item.cityName"
                    :value="item.cityId">
                  </Option>
                </Select>
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
                    v-model="form.yx">
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
                    v-model="form.zt">
                    <Option
                      label="在建楼盘"
                      value="1">
                    </Option>
                    <Option
                      label="二手盘"
                      value="0">
                    </Option>
                  </Select>
              </FormItem>

              <FormItem prop="password">
                  <span>App上是否上线：</span>
                  <Select
                    style="width:100px"
                    v-model="form.sx">
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
                  <span>需求跟进盘：</span>
                  <Select
                    style="width:100px"
                    v-model="form.jp">
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
                  <span>楼盘来源：</span>
                  <Select
                    style="width:100px"
                    v-model="form.ly">
                    <Option
                      label="拍照系统"
                      value="1">
                    </Option>
                    <Option
                      label="运营系统"
                      value="0">
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
export default {
  name: 'estatemanagement',
  data () {
    return {
      provinceIdsList:[],
      cityIdsList:[],
      buidingList:[],
      areaIdsList:[],

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
            title: '开发企业',
            key: 'name',
            width:150,
        },
        {
            title: '所在地区',
            key: 'address',
            width:150,
        },
        {
            title: '交付状态',
            key: 'address',
            width:150,
        },
        {
            title: '是否严选',
            key: 'isf',
            width:150,
        },
        {
            title: 'APP上是否上线',
            key: 'tman',
            width:150,
        },
        {
            title:'需求跟进盘',
            key:'time',
            width:150,
        },
        {
            title:'规划期数',
            key:'time',
            width:150,
        },
        {
            title:'楼幢数',
            key:'time',
            width:150,
        },
        {
            title:'拍照总量',
            key:'time',
            width:150,
        },
        {
            title:'待审核照片',
            key:'time',
            width:150,
        },
        {
            title:'待重拍照片',
            key:'time',
            width:150,
        },
        {
            title:'审核通过照片',
            key:'time',
            width:150,
        },
        {
            title:'楼盘创建时间',
            key:'time',
            width:150,
        },
        {
            title:'楼盘来源',
            key:'time',
            width:150,
        },
        {
            title:'操作',
            key:'action',
            fixed:'right',
            width:350,
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
                              this.handle(params,'view',1)
                          }
                      }
                  }, '查看'),
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
                              this.handle(params,'edit',1)
                          }
                      }
                  }, '编辑'),
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
                              this.handle(params,'view',2)
                          }
                      }
                  }, '进度信息'),
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
                              this.handle(params,'view',3)
                          }
                      }
                  }, '评分信息'),
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
                      },
                      on: {
                          click: () => {
                              this.handle(params,'view',4)
                          }
                      }
                  }, '一户一档')
              ]);
            }
        }
      ],
      form:{
        province:'',
        city:'',
        area:'',
        buildingName:'',
        yx:'',
        zt:'',
        sx:'',
        jp:'',
        ly:'',
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
    //省市联动
    provinceChange(parentid){
      this.getProCityData(2,parentid)
    },
    //获取省数据
    getProCityData(pramas,parentid = 9999){
        let _this=this;
        let body = '';
        if(pramas == 1){
            body = {cityType:1}
        }else{
            body = {cityType:2,parentid:parentid}
        }
        _this.$http('/citis/cityLists',{body},{},{},'post').then( res => {

          if(res.data.code==0){

            if(pramas == 1){
               _this.provinceIdsList = res.data.response.cityList
               console.log(res.data.response.cityList)
            }else if(pramas == 2){
             // _this.form.city = '';
               _this.cityIdsList = res.data.response.cityList
            }
           else{
               _this.areaIdsList = res.data.response.cityList
            }

          }else if(res.data.code == 300){
            _this.$router.push('/login')
          }else{
            message(_this,res.data.message,'warning')
          }

        }).catch(function(err){
          console.log(err)
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
      this.form.pageIndex = 0;
      this.getEstateListData();
    },
    //页码切换
    pageChange(page){
      this.form.pageIndex = page-1;
      this.getEstateListData();
    },
    //操作
    handle(p,type,activePage){
      this.$router.push({
        path:'/index/estateeditandview',
        query:{
          // buildingId:p.estatemanagement
          type,
          activePage
        }
      })
    }
  },
  created(){
    this. getEstateListData();
    this.$store.dispatch('secondLevelAction','楼盘管理')
    this.$store.dispatch('threeLevelAction','楼盘信息')
    this.$store.dispatch('secondRouteAction','/index/estatemanagement')
    this.$store.dispatch('activeNameAction','/index/estatemanagement')
    this.$store.dispatch('openNamesAction',['3'])
  }
}
</script>

<style scoped>

</style>
