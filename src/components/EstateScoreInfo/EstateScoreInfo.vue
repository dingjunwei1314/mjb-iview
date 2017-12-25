<template>
  <div class="estateScoreInfo">
    <Row style="border:1px solid #ccc;padding:20px">
      <h4 style="margin-left:20px">当前楼盘名称：普华浅水湾</h4>
      <Table border :loading="tableLoading" :columns="columns1" :data="data1" style="margin-top:20px"></Table>
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
  name: 'estateScoreInfo',
  data () {
    return {
      provinceIdsList:[],
      cityIdsList:[],
      buidingList:[],
      areaIdsList:[],

      tableLoading:false,
      columns1:[
        {
            title: '工程',
            key: 'id',
        },
        {
            title: '景观·新盘',
            key: 'name',
        },
        {
            title: '景观·二手',
            key: 'name',
        },
        {
            title: '物业',
            key: 'address',
        },
        {
            title: '规划·周边',
            key: 'address',
        },
        {
            title: '规划·二手',
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
                  }, '查看分项评分'),
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
  methods: {
    //页码切换
    pageChange(page){
      this.form.pageIndex = page-1;
      this.getEstateListData();
    },
    //操作
    handle(p){
      this.$router.push({
        path:'/index/estateitemscore',
        query:{

        }
      })
    }
  },
  created(){

  }
}
</script>

<style scoped>

</style>
