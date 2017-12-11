<template>
  <div class="collectionEstateEdit">
    <Row style="border:1px solid #ccc;padding:20px">
      <h4 style="margin-left:20px">当前楼盘名称：普华浅水湾</h4>
      <p class="tit-lab">
        基础信息
      </p>
      <Form style="padding-left:20px" :label-width="100">
        <FormItem prop="user" label="照片分类：">
          <Select v-model="form.gman" size="small" style="width:200px">
            <Option value="1">评分照片</Option>
            <Option value="2">进度照片</Option>
            <Option value="3">资料照片</Option>
          </Select>
          <Select v-model="form.type" size="small" style="width:200px">
            <Option value="1">工程质量</Option>
            <Option value="2">规划·周边、规划·二手、物业</Option>
            <Option value="3">景观·新盘</Option>
            <Option value="4">景观·二手盘</Option>
            <Option value="5">进度类</Option>
            <Option value="6">资料类</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="上传照片：">
          <ImgUploader
          :btnId="btnList[0]"
          @imgUploader="imgUploader(0)"
          />
        </FormItem>
        <FormItem prop="user" label="预览：" class="previewFormItem">
          <ImgPreview 
            v-for = "(item,index) in preImgSrcList"
            :key = "index"
            :backgroundPicUrl="item.preImgSrc"
            @previewImg="previewImg(index)"
            @deleteImg="deleteImg(index)"
          />
          <p v-if = "preImgSrcList[0].imgUrl == ''" class="no-img">
            暂无预览图
          </p>
        </FormItem>
      </Form>

      <Form v-show="form.type == '1'" style="padding-left:20px" :label-width="100">
        <FormItem prop="user" label="期数：">
          <Select v-model="formProject.gman" style="width:200px">
            <Option v-for="item in periodsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="楼幢号：">
          <Select v-model="formProject.gman" style="width:200px">
            <Option v-for="item in buildingList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>  
        <FormItem prop="user" label="单元号：">
          <Select v-model="formProject.gman" style="width:200px">
            <Option v-for="item in unitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="楼层：">
          <Select v-model="formProject.gman" style="width:200px">
            <Option v-for="item in floorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="门牌号：">
          <Select v-model="formProject.gman" style="width:200px">
            <Option v-for="item in doorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="部位构件：">
          <Select v-model="formProject.gman" style="width:200px">
            <Option v-for="item in wallList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="formProject.gman" style="width:200px">
            <Option v-for="item in beamList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="质量问题点：">
          <Select v-model="formProject.gman" style="width:200px">
            <Option v-for="item in wallList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="formProject.gman" style="width:200px">
            <Option v-for="item in beamList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="formProject.gman" style="width:200px">
            <Option v-for="item in beamList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="评分点标签：">
          <CheckboxGroup v-model="formProject.gman">
            <Checkbox label="1">加分项</Checkbox>
            <Checkbox label="2">一户一档</Checkbox>
            <Checkbox label="3">需整改</Checkbox>
            <Checkbox label="4">已整改</Checkbox>
            <Checkbox label="5">未整改</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="user" label="评测结果：">
          <CheckboxGroup v-model="formProject.gman">
            <Checkbox label="1">无</Checkbox>
            <Checkbox label="2">轻微</Checkbox>
            <Checkbox label="3">一般</Checkbox>
            <Checkbox label="4">严重</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="user" label="照片备注：">
          <Input v-model="formProject.gman" placeholder="" type="textarea" :autosize="true" style="width:50%"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary"  @click="submit">保存</Button>
          <Button type="primary"  @click="back">取消</Button>
        </FormItem>
      </Form>

      <Form v-show="form.type == '2'" style="padding-left:20px" :label-width="100">
        <FormItem prop="user" label="质量问题点：">
          <Select v-model="planForm.gman" style="width:200px">
            <Option v-for="item in wallList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="planForm.gman" style="width:200px">
            <Option v-for="item in beamList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="planForm.gman" style="width:200px">
            <Option v-for="item in beamList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="评分点标签：">
          <CheckboxGroup v-model="planForm.gman">
            <Checkbox label="1">加分项</Checkbox>
            <Checkbox label="2">一户一档</Checkbox>
            <Checkbox label="3">需整改</Checkbox>
            <Checkbox label="4">已整改</Checkbox>
            <Checkbox label="5">未整改</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="user" label="评测结果：">
          <CheckboxGroup v-model="planForm.gman">
            <Checkbox label="1">无</Checkbox>
            <Checkbox label="2">轻微</Checkbox>
            <Checkbox label="3">一般</Checkbox>
            <Checkbox label="4">严重</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="user" label="照片备注：">
          <Input v-model="planForm.gman" placeholder="" type="textarea" :autosize="true" style="width:50%"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary"  @click="submit">保存</Button>
          <Button type="primary"  @click="back">取消</Button>
        </FormItem>
      </Form>

      <Form v-show="form.type == '3'" style="padding-left:20px" :label-width="100">
        <FormItem prop="user" label="质量问题点：">
          <Select v-model="sceneryNewForm.gman" style="width:200px">
            <Option v-for="item in wallList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="sceneryNewForm.gman" style="width:200px">
            <Option v-for="item in beamList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="sceneryNewForm.gman" style="width:200px">
            <Option v-for="item in beamList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="评分点标签：">
          <CheckboxGroup v-model="sceneryNewForm.gman">
            <Checkbox label="1">加分项</Checkbox>
            <Checkbox label="2">一户一档</Checkbox>
            <Checkbox label="3">需整改</Checkbox>
            <Checkbox label="4">已整改</Checkbox>
            <Checkbox label="5">未整改</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="user" label="评测结果：">
          <CheckboxGroup v-model="sceneryNewForm.gman">
            <Checkbox label="1">无</Checkbox>
            <Checkbox label="2">轻微</Checkbox>
            <Checkbox label="3">一般</Checkbox>
            <Checkbox label="4">严重</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="user" label="区位：">
          <CheckboxGroup v-model="sceneryNewForm.gman">
            <Checkbox label="1">一区</Checkbox>
            <Checkbox label="2">二区</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="user" label="采集类型：">
          <RadioGroup v-model="sceneryNewForm.gman">
            <Radio label="1">鸟瞰图</Radio>
            <Radio label="2">施工工序</Radio>
            <Radio label="3">实测实量</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem prop="user" label="照片备注：">
          <Input v-model="sceneryNewForm.gman" placeholder="" type="textarea" :autosize="true" style="width:50%"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary"  @click="submit">保存</Button>
          <Button type="primary"  @click="back">取消</Button>
        </FormItem>
      </Form>

      <Form v-show="form.type == '4'" style="padding-left:20px" :label-width="100">
        <FormItem prop="user" label="质量问题点：">
          <Select v-model="sceneryOldForm.gman" style="width:200px">
            <Option v-for="item in wallList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="sceneryOldForm.gman" style="width:200px">
            <Option v-for="item in beamList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="sceneryOldForm.gman" style="width:200px">
            <Option v-for="item in beamList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="评分点标签：">
          <CheckboxGroup v-model="sceneryOldForm.gman">
            <Checkbox label="1">加分项</Checkbox>
            <Checkbox label="2">一户一档</Checkbox>
            <Checkbox label="3">需整改</Checkbox>
            <Checkbox label="4">已整改</Checkbox>
            <Checkbox label="5">未整改</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="user" label="评测结果：">
          <CheckboxGroup v-model="sceneryOldForm.gman">
            <Checkbox label="1">无</Checkbox>
            <Checkbox label="2">轻微</Checkbox>
            <Checkbox label="3">一般</Checkbox>
            <Checkbox label="4">严重</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="user" label="功能分区：">
          <CheckboxGroup v-model="sceneryOldForm.gman">
            <Checkbox label="1">主入口</Checkbox>
            <Checkbox label="2">次入口</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="user" label="照片备注：">
          <Input v-model="sceneryOldForm.gman" placeholder="" type="textarea" :autosize="true" style="width:50%"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary"  @click="submit">保存</Button>
          <Button type="primary"  @click="back">取消</Button>
        </FormItem>
      </Form>

      <Form v-show="form.type == '5'" style="padding-left:20px" :label-width="100">
        <FormItem prop="user" label="期数：">
          <Select v-model="progressForm.gman" style="width:200px">
            <Option v-for="item in periodsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="楼幢号：">
          <Select v-model="progressForm.gman" style="width:200px">
            <Option v-for="item in buildingList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>  
        <FormItem prop="user" label="单元号：">
          <Select v-model="progressForm.gman" style="width:200px">
            <Option v-for="item in unitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="楼层：">
          <Select v-model="progressForm.gman" style="width:200px">
            <Option v-for="item in floorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="门牌号：">
          <Select v-model="progressForm.gman" style="width:200px">
            <Option v-for="item in doorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="部位构件：">
          <Select v-model="progressForm.gman" style="width:200px">
            <Option v-for="item in wallList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="progressForm.gman" style="width:200px">
            <Option v-for="item in beamList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="照片备注：">
          <Input v-model="progressForm.gman" placeholder="" type="textarea" :autosize="true" style="width:50%"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary"  @click="submit">保存</Button>
          <Button type="primary"  @click="back">取消</Button>
        </FormItem>
      </Form>

      <Form v-show="form.type == '6'" style="padding-left:20px" :label-width="100">
        <FormItem prop="user" label="照片备注：">
          <Input v-model="dataForm.gman" placeholder="" type="textarea" :autosize="true" style="width:50%"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary"  @click="submit">保存</Button>
          <Button type="primary"  @click="back">取消</Button>
        </FormItem>
      </Form>


      <Spin size="large" fix v-if="spinShow"></Spin>
    </Row>
  </div>
</template>
<script>
import ImgUploader from '../Common/ImgUploader/ImgUploader';
import ImgPreview from '../Common/ImgPreview/ImgPreview';
import uploader2 from '../../common/uploader2.js';
export default {
  name: 'collectionEstateEdit',
  components:{
    ImgUploader,
    ImgPreview
  },
  data () {
    return {
      spinShow:false,
      btnList:['collectionBtn0'],
      preImgSrcList:[{imgUrl:''}],
      uploaderList:[{uploader:null}],

      periodsList:[
        {value:'1',label:'一期'},
        {value:'2',label:'二期'},
        {value:'3',label:'三期'},
        {value:'4',label:'四期'},
        {value:'5',label:'五期'},
        {value:'6',label:'六期'},
        {value:'7',label:'七期'},
        {value:'8',label:'八期'},
        {value:'9',label:'九期'},
        {value:'10',label:'十期'},
      ],
      buildingList:[
        {value:'1',label:'1#'},
        {value:'2',label:'2#'},
        {value:'3',label:'3#'}
      ],
      unitList:[
        {value:'1',label:'一单元'},
        {value:'2',label:'二单元'}
      ],
      floorList:[
        {value:'1',label:'一层'},
        {value:'2',label:'二层'},
      ],
      doorList:[
        {value:'1',label:'一户'},
      ],
      wallList:[
        {value:'1',label:'墙1'},
      ],
      beamList:[
        {value:'1',label:'梁1'},
      ],
      ladderList:[
        {value:'一梯一户',label:'1'},
        {value:'一梯两户',label:'2'},
        {value:'一梯三户',label:'3'},
        {value:'两梯二户',label:'4'},
        {value:'两梯三户',label:'5'},
        {value:'两梯四户',label:'6'},
        {value:'两梯五户',label:'7'},
        {value:'两梯六户',label:'8'},
        {value:'两梯七户',label:'9'},
        {value:'两梯八户',label:'10'},
        {value:'两梯九户',label:'11'},
        {value:'三梯三户',label:'12'},
        {value:'三梯四户',label:'13'},
        {value:'三梯五户',label:'14'}
      ],
      form:{
        province:'',
        city:'',
        buildingName:'',
        gman:'',
        type:'1',
        gb:[]
      },
      //工程质量
      formProject:{
        gman:''
      },
      planForm:{
        gman:''
      },
      sceneryNewForm:{
        gman:''
      },
      sceneryOldForm:{
        gman:''
      },
      progressForm:{

      },
      dataForm:{

      },
      acData:{
    
      },
    }
  },
  computed:{
    type:function(){
      return this.$route.query.type;
    }
  },
  methods: {
    //获取详情数据
    getEstateBasicInfoData(){
      let _this = this;
      this.spinShow = true;
      this.$http('/role/getAllRole').then((res) => {
        _this.spinShow = false;
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
        _this.spinShow = false;
        _this.$Message.warning('网络请求失败')
      })
    },
    //提交
    submit(){
      let _this = this;
      this.$Modal.confirm({
        content:'确认提交吗？',
        onOk(){
          let body = _.cloneDeep(_this.form);
          _this.spinShow = true;
          this.$http('/user/login',{},body,{}).then((res) => {
            _this.spinShow = false;
            if(res.data.code === '200'){
              if(res.data.interfaceStatus === '启用'){
                if(res.data.response.status === '000'){
                  _this.$Message.success('提交成功')
                  _this.$router.push('/index/rolemanagement')    
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
            _this.spinShow = false;
            _this.$Message.warning('网络请求失败')
          })
        }
      })
    },
    //返回
    back(){
      this.$router.push('/index/estatemanagement')
    },

    //初始化上传插件对象
    initUploader(index){
      let _this = this,
        btnName = 'ybjBtn' + index;
      uploader2(function (src) {
        _this.preImgSrcList.push({imgUrl:src});
      }, function (key) {
        _this.addNewybjType.imgList.push({imgUrl:key});
      }, function () {
        let len = _this.preImgSrcList.length;
        _this.preImgSrcList.splice(len-1,1);
      }, function (uploader) {
        _this.uploaderList[index].uploader = uploader;
      }, btnName)
    },
    //预览上传图
    previewImg(index){
      this.dialogImgSrc = this.preImgSrcList[index].imgUrl
      this.dialogVisible = true;
    },
    //删除图片
    deleteImg(index){
      this.preImgSrcList.splice(index,1);
      this.addNewybjType.imgList.splice(index,1);
    },
    //开始上传
    imgUploader(index){
      if (this.uploaderList[index].uploader == null) {
        return;
      }     
      this.uploaderList[index].uploader.start()
    },
  },
  created(){
    this.$store.dispatch('secondLevelAction','个人面板');
    this.$store.dispatch('threeLevelAction','上传照片');
    
    this.$store.dispatch('secondRouteAction','/index/collectionestatemanagement');
    this.$store.dispatch('activeNameAction','/index/collectionestatemanagement');
    this.$store.dispatch('openNamesAction',['1']);
  }
}
</script>

<style scoped>
  .tit-lab{
    height: 30px;
    line-height: 30px;
    background: #eee;
    padding-left: 22px;
    margin: 20px 0px;
  }
  .ivu-form-item{
    margin-bottom: 10px
  }
  .no-img{
    text-align: center;
    line-height: 200px;
    color: #777
  }
</style>

<style>
  .previewFormItem .ivu-form-item-content{
    padding: 20px;
    border: 1px solid #ccc;
    width: 840px;
    min-height: 160px
  }
</style>
