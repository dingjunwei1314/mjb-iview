<template>
  <div class="admanagement">
    <Row type="flex" style="border:1px solid #ccc;padding:20px;margin-bottom:20px">
        <Col span="19">
          <Form  :model="form"  inline>
            <FormItem prop="password">
              <Input v-model="form.name" placeholder="用户名" style="width: 200px"></Input>
            </FormItem>

            <FormItem prop="password">
              <Input v-model="form.uname" placeholder="真实姓名" style="width: 200px"></Input>
            </FormItem>

            <FormItem prop="password">
              <DatePicker type="date" format="yyyy-MM-dd" v-model="form.btime" @on-change="changBeginTime" placeholder="创建时间（开始）" style="width: 200px"></DatePicker>
            </FormItem>

            <FormItem prop="password">
              <DatePicker type="date" format="yyyy-MM-dd" v-model="form.etime" @on-change="changEndTime" placeholder="创建时间（结束）" style="width: 200px"></DatePicker>
            </FormItem>
          </Form>
        </Col>
        <Col span="5" style="text-align:right">
          <Button type="primary" size="large" @click="search">搜索</Button>
          <Button type="primary" size="large" @click="creatAd">新建管理员</Button>
        </Col>
    </Row>
    <Row>
      <Table border :loading="tableLoading" :columns="columns1" :data="formlist"></Table>
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
            title: 'ID',
            key: 'id'
        },
        {
            title: '用户名',
            key: 'userName'
        },
        {
            title: '所在区域',
            key: 'areaAddress'
        },
        {
            title: '所在部门',
            key: 'department'
        },
        {
            title:'创建时间',
            key:'date'
        },
        {
            title:'角色分配',
            key:'roleName'
        },
        {
            title:'登陆Ip',
            key:'landingIp'
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
                }, '修改'),
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
      formlist:[
        {
        id:"1",
        userName:"小明",
        areaAddress:"西安-雁塔",
        department:"研发部",
        date:"2017/12/16-10:45",
        roleName:"管理员",
        landingIp:"192.168.10.2"
        },
      ],
      form:{
        name:'',
        uname:'',
        btime:'',
        etime:'',
        pageIndex:0,
        pageSize:10
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
     if(res.data.code === '200'){
         if(res.data.interfaceStatus === '启用'){
           if(res.data.response.status === '000'){
             _this.formlist = res.data.response.data;
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
          path:'/index/administratorcreateandedit',
          query:{
            id:params.row.id,
            type:'edit'
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
    this.getAdListData()
    this.$store.dispatch('secondLevelAction','账户管理')
    this.$store.dispatch('threeLevelAction','管理员管理')
    this.$store.dispatch('secondRouteAction','/index/administratorsmanagement')
    this.$store.dispatch('activeNameAction','/index/administratorsmanagement')
    this.$store.dispatch('openNamesAction',['6'])
  }
}
</script>

<style scoped>

</style>
