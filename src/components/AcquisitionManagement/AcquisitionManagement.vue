<template>
  <div class="acqmana">
    <Row type="flex" style="border:1px solid #ccc;padding:20px">
        <Col span="20">
          <Form  :model="form"  inline>
              <FormItem prop="user">
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
          
              </FormItem>
              <FormItem prop="password">
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
              </FormItem>

              <FormItem prop="password">
                  <Select
                    v-model="form.buildingName"
                    filterable
                    remote
                    reserve-keyword
                    style="width:150px"
                    placeholder="楼盘名称"
                    :remote-method="remoteMethod"
                    :loading="searchLoading">
                    <Option
                      v-for="(item,index) in buidingList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key">
                    </Option>
                  </Select>
              </FormItem>

              <FormItem prop="password">
                  <Select
                    v-model="form.gman"
                    style="width:150px"
                    placeholder="指派人"
                    :remote-method="remoteMethod"
                    :loading="searchLoading">
                    <Option
                      label="指派人1"
                      value="指派人1">
                    </Option>
                    <Option
                      label="指派人2"
                      value="指派人2">
                    </Option>
                  </Select>
              </FormItem>

              <FormItem prop="password">
                  <Select
                    v-model="form.gb"
                    style="width:150px"
                    placeholder="是否分配"
                    :remote-method="remoteMethod"
                    :loading="searchLoading">
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
          </Form>
        </Col>
        <Col span="4" style="text-align:right">
           <Button type="primary" icon="ios-search" size="large">搜索</Button>
        </Col>
    </Row>

    <Row style="margin-top:50px">
      <Table border :columns="columns1" :data="data1"></Table>
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
  name: 'acqmana',
  data () {
    return {
      provinceIdsList:[],
      cityIdsList:[],
      buidingList:[],
      searchLoading:false,
      columns1:[
        {
            title: '楼盘ID',
            key: 'id'
        },  
        {
            title: '楼盘名称',
            key: 'name'
        },
        {
            title: '区域',
            key: 'address'
        },
        {
            title: '是否分配',
            key: 'isf'
        },
        {
            title: '指派人',
            key: 'tman'
        },
        {
            title:'分配时间',
            key:'time'
        },{
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
                              this.handle(params,'edit')
                          }
                      }
                  }, '编辑'),
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
                      },
                      on: {
                          click: () => {
                              this.handle(params,'view')
                          }
                      }
                  }, '查看')
              ]);
            }
        }
      ],
      form:{
        province:'',
        city:'',
        buildingName:'',
        gman:'',
        gb:''
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
        _this.$http('/citis/cityLists',{body},{},{},'post').then(function(res){
           
          if(res.data.code==0){
       
            if(pramas == 1){
              _this.provinceIdsList = res.data.response.cityList
            }else{
              _this.form.city = '';
              _this.cityIdsList = res.data.response.cityList
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
     
      this.$http('/backstageBuilding/getBuildingNameList', {body}, {}, {}, 'post').then(function (res) {
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
    //页码切换
    pageChange(page){
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
    this.$store.dispatch('secondLevelAction','任务管理')
    this.$store.dispatch('threeLevelAction','采集任务管理')
    this.$store.dispatch('secondRouteAction','/index/acquisitionmanagement')
    this.$store.dispatch('activeNameAction','/index/acquisitionmanagement')
    this.$store.dispatch('openNamesAction',['2'])
  }
}
</script>

<style scoped>
  
</style>
