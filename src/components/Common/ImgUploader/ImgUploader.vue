<template>
      <div :style="style1">
        <div id="container">   
          <Button type="primary" size="small"  @click="imgUploader">
            <span>
              {{btnName}}
            </span>
          </Button>
        </div>
      </div>
</template>
<script>

export default {
    name:'ImgUploader',
    props:{
      style1:{
        type:Object,
        default:function(){
          return {}
        }
      },
      btnId:{
        type:String,
        default:''
      },
      btnName:{
        type:String,
        default:'点击上传'
      }
    },
    data(){
      return{
       
      }
    },
    computed:{
      
    },
    methods: {
      imgUploader(){
        this.$emit('imgUploader')
      },
      dialogClose(){
        this.$emit('dialogClose')
      }
    },
    mounted(){
    }
  }
</script>

<style scoped>

</style>
