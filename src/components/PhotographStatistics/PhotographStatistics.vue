<template>
  <div class="photographstatistics">
    <Row type="flex" style="border:1px solid #ccc;padding:20px;margin-bottom:20px">
        <Col span="19">
          <Form  :model="form">
            <FormItem prop="password" label="选择地区">
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
            </FormItem>

            <FormItem prop="password" label="选择拍照人">
              <RadioGroup v-model="phone">
                <Radio label="1">
                  <span>全部</span>
                </Radio>
                <Radio label="2">
                  <span>小明</span>
                </Radio>
              </RadioGroup>
            </FormItem>

            <FormItem prop="password" label="拍照楼盘">
              <Select v-model="model10" multiple style="width:310px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>

            <FormItem prop="password" label="统计周期">
              <DatePicker type="date" format="yyyy-MM-dd" v-model="form.btime" :options="dateBOptions" @on-change="changBeginTime" placeholder="开始时间" style="width: 200px"></DatePicker>
              <span>至</span>
              <DatePicker type="date" format="yyyy-MM-dd" v-model="form.etime" :options="dateEOptions" @on-change="changEndTime" placeholder="结束时间" style="width: 200px"></DatePicker>
            </FormItem>
          </Form>
        </Col>
        <Col span="5" style="text-align:right">
          <Button type="primary" size="large" @click="search">搜索</Button>
        </Col>
    </Row>
    <Row>
      <Table border :loading="tableLoading" :columns="columns1" :data="data1"></Table>
      <Page
        style = "text-align:center;margin-top:40px"
        :total = "30"
        :page-size = "10"
        :current = "1"
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
  name: 'photographstatistics',
  data () {
    let _this = this;
    return {
      tableLoading:false,
      provinceIdsList:[],
      cityIdsList:[],

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
            title: '楼盘所在地区',
            key: 'address'
        },
        {
            title: '审核人',
            key: 'address'
        },
        {
            title: '审核人所在地区',
            key: 'address'
        },
        {
            title: '审核总量',
            key: 'address'
        },
        {
            title: '待审核照片',
            key: 'address'
        },
        {
            title: '审核需重拍',
            key: 'address'
        },
        {
            title: '通过入库',
            key: 'address'
        },
        {
            title: '已驳回照片',
            key: 'address'
        }
      ],
      form:{
        name:'',
        uname:'',
        btime:'',
        etime:'',
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
      ],
      dateBOptions:{
        disabledDate (date) {
          if(_this.form.etime){
            return date && date.valueOf() > new Date(_this.form.etime).valueOf();
          }else{
            return ''
          }
        }
      },
      dateEOptions:{
        disabledDate (date) {
          if(_this.form.btime){
            return date && date.valueOf() < new Date(_this.form.btime).valueOf();
          }else{
            return ''
          }
        }
      },
    }
  },
  methods: {
    //获取管理员列表数据
    getAdListData(){
      let _this = this,
      body = this.form;
      this.tableLoading = true;
      this.$http('',{},{body},{},'get').then( (res) => {

      }).catch( (err) => {
        this.tableLoading = false;
        console.log(err);
        this.$Message.error('服务器异常');
      })
    },
    //搜索
    search(){
      this.getAdListData()
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
    //开始时间格式切换
    changBeginTime(time){
      this.form.btime = time;
    },
    //结束时间格式切换
    changEndTime(time){
      this.form.etime = time;
    },
    //页码切换
    pageChange(page){
      this.form.pageIndex = page-1;
      this.getAdListData()
    },
    //操作
    handle(params,type){
      console.log(params)
      let _this = this;
      if(type == 1){
        this.$router.push({
          path:'/index/',
          query:{
            id:params.row.id
          }
        })
      }else{
        this.$Modal.confirm({
          content:'确认删除吗？',
          onOk(){
            let body = {
              id:params.row.id,
              delete:1
            }
            this.$http('',{body},{},{},'post').then( (res) => {
              if(res.data.code == 0){
                if(res.data.response.status == 1){
                  _this.$Message.success('已删除');
                  _this.getAdListData()
                }
              }else{
                this.$Message.warning('删除失败');
              }
            }).catch( (err) => {
              this.tableLoading = false;
              console.log(err);
              this.$Message.error('服务器异常');
            })
          }
        })
      }
    }
  },
  created(){
    this.$store.dispatch('secondLevelAction','统计管理')
    this.$store.dispatch('threeLevelAction','拍照量统计')
    this.$store.dispatch('secondRouteAction','/index/photographstatistics')
    this.$store.dispatch('activeNameAction','/index/photographstatistics')
    this.$store.dispatch('openNamesAction',['5'])
  }
}
</script>

<style scoped>

</style>
