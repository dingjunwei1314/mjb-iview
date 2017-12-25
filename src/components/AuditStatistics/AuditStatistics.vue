<template>
  <div class="admanagement">
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
  name: 'admanagement',
  data () {
    return {
      tableLoading:false,
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
            title: '拍照人',
            key: 'address'
        },
        {
            title: '拍照人所在地区',
            key: 'address'
        },
        {
            title: '拍照总量',
            key: 'address'
        },
        {
            title: '未提交审核照片',
            key: 'address'
        },
        {
            title: '待审核',
            key: 'address'
        },
        {
            title: '待重拍照片',
            key: 'address'
        },
        {
            title: '审核通过照片',
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
      ]
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
    //新建管理员
    creatAd(){
      this.$router.push({
        path:'/index/administratorcreateandedit',
        query:{
          type:'create'
        }
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
    this.$store.dispatch('threeLevelAction','审核量统计')
    this.$store.dispatch('secondRouteAction','/index/auditstatistics')
    this.$store.dispatch('activeNameAction','/index/auditstatistics')
    this.$store.dispatch('openNamesAction',['5'])
  }
}
</script>

<style scoped>

</style>
