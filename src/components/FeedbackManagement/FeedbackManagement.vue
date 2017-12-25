<template>
  <div class="feedmanagement">
  <Row type="flex" style="border:1px solid #ccc;padding:15px;;margin-bottom:20px">
    <Col span="20">
      <Form  :model="form"  inline>
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
          </FormItem>
          <span> </span>
          <FormItem prop="times" label="反馈时间：">
             <Col span="12">
                <DatePicker type="date" v-model="form.atime" placeholder="反馈日期" style="width: 200px;margin-right:6px"></DatePicker>
             </Col>
             <Col span="6">
                <TimePicker type="time" v-model="form.btime" placeholder="反馈时间" style="width: 200px"></TimePicker>
             </Col>
          </FormItem>
      </Form>
    </Col>
  </Row>

  <Row>
      <Table border :columns="columns1" :loading="tableLoading" :data="feedListData"></Table>
  </Row>
    <Modal
      v-model="modalDetail"
      title="Common Modal dialog box title">
      <p slot="header" style="text-align:center">
          <Icon type="information-circled"></Icon>
          <span>问题反馈详情</span>
      </p>
      <div>
          <Row style = "text-align:right">
            <Col span="5">ID：</Col>
            <Col span="19"></Col>
          </Row>
          <Row style = "text-align:right">
            <Col span="5">省市：</Col>
            <Col span="19"></Col>
          </Row>
          <Row style = "text-align:right">
            <Col span="5">问题描述：</Col>
            <Col span="19"></Col>
          </Row>
          <Row style = "text-align:right">
            <Col span="5">用户名：</Col>
            <Col span="19"></Col>
          </Row>
          <Row style = "text-align:right">
            <Col span="5">反馈时间：</Col>
            <Col span="19"></Col>
          </Row>
      </div>
      <div slot="footer" style="text-align:center">
          <Button type = "primary" @click="close">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'feedmanagement',
  data () {
    return {
      provinceIdsList:[],
      cityIdsList:[],
      modalDetail:false,
      tableLoading:false,
      columns1:[
        {
            title: 'ID',
            key: 'userid'
        },
        {
            title: '省市',
            key: 'cityName'
        },
        {
            title: '问题描述',
            key: 'qdescribe'
        },
        {
            title:'用户名',
            key:'userName'
        },
        {
            title:'反馈时间',
             key: 'date',
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
                            this.handle(params,1)
                        }
                    }
                }, '查看'),
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            this.handle(params,2)
                        }
                    }
                }, '删除')
            ]);
          }
        }
      ],
      form:{
        province:'',
        city:'',
        atime:'',
        btime:'',
      },
      feedListData:[

      ],
    }
  },
  methods: {
    //获取角色列表数据
    getFeedListData(){
      let _this = this;
      this.tableLoading = true;
      this.$http('/question/getAllQuestion').then((res) => {
        _this.tableLoading = false;
        if(res.data.code === '200'){
          if(res.data.interfaceStatus === '启用'){
            if(res.data.response.status === '000'){
              _this.feedListData = res.data.response.data
              console.log(res.data.response.data)
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
    //关闭模态框
    close(){
      this.modalDetail = false;
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


    //操作
    handle(params,type){
      console.log(params)
      let _this = this;
      if(type == 1){
        let body = {
          id:params.row.id,
        };
        this.$http('/question/getAllQuestion',{body},{},{},'post').then( (res) => {
          if(res.data.code == 0){
            if(res.data.response.status == 1){
              _this.feedListData = res.data.response;
              console.log(res.data.response)
              _this.modalDetail = true;
            }
          }else{
            this.$Message.warning('删除失败');
          }
        }).catch( (err) => {
          console.log(err);
          this.$Message.error('服务器异常');
        })
      }else{
        this.$Modal.confirm({
          content:'确认删除吗？',
          onOk(){
            let body = {
              id:params.row.id,
              delete:1
            };
            this.$http('/question/delQuestion',{body},{},{},'post').then( (res) => {
              if(res.data.code == 0){
                if(res.data.response.status == 1){
                  _this.$Message.success('已删除');
                  _this.getFeedListData()
                }
              }else{
                this.$Message.warning('删除失败');
              }
            }).catch( (err) => {
              console.log(err);
              this.$Message.error('服务器异常');
            })
          }
        })
      }
    }
  },
  created(){
    this.getFeedListData()
    this.$store.dispatch('secondLevelAction','账户管理')
    this.$store.dispatch('threeLevelAction','问题反馈')
    this.$store.dispatch('secondRouteAction','/index/feedbackmanagement')
    this.$store.dispatch('activeNameAction','/index/feedbackmanagement')
    this.$store.dispatch('openNamesAction',['6'])
  }
}
</script>

<style scoped>

</style>
