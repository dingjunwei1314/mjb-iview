<template>
	<div style="display:inline-block">
		<Select
		style="width:150px"
		v-model="selfProvince"
		clearable
		@on-change = "provinceChange(selfProvince)"
		placeholder="省">
			<Option
			v-for="item in provinceIdsList"
			:key="item.cityId"
			:label="item.cityName"
			:value="item.cityId">
			</Option>
		</Select>
		<Select
		v-model="selfCity"
		clearable
		placeholder="市"
		@on-change = "cityChange(selfCity)"
		style="width:150px">
			<Option
			v-for="item in cityIdsList"
			:key="item.cityId"
			:label="item.cityName"
			:value="item.cityId">
			</Option>
		</Select>
		<Select
		v-model="selfArea"
		clearable
		placeholder="区"
		@on-change = "areaChange(selfArea)"
		style="width:150px">
			<Option
			v-for="item in areaIdsList"
			:key="item.cityId"
			:label="item.cityName"
			:value="item.cityId">
			</Option>
		</Select>
	</div>
</template>
<script>
	export default{
		name:'RegionalLinkage',
		props:{
			province:{
				default:''
			},
			city:{
				default:''
			},
			area:{
				default:''
			}
		},
		data(){

			return{
				provinceIdsList:[],
				cityIdsList:[],
				areaIdsList:[],
				selfProvince:'',
				selfCity:'',
				selfArea:'',
				clearAble:false
			}
		},
		created(){

			this.selfProvince = this.province;
			this.selfCity = this.city;
			this.selfArea = this.area;
			this.getProCityData(1,'');
			this.getProCityData(2,'');
			this.getProCityData(3,'');
		},
		methods:{
			//省市联动
		    provinceChange(parentid){
		    	console.log(parentid)
		    	this.getProCityData(2,parentid)
		    	this.$emit('update:province',parentid)
		    },
		    //市区联动
		    cityChange(parentid){
		    	console.log(parentid)
				this.getProCityData(3,parentid)
				this.$emit('update:city',parentid)
		    },
		    //市区联动
		    areaChange(parentid){
		    	console.log(parentid)
				this.$emit('update:area',parentid)
		    },
		    //获取省数据
		    getProCityData(pramas,parentid){
		        let _this=this;
		        let body = '';
		        if(pramas == 1){
		        	body = {cityType:1}
		        }else if(pramas == 2){
		            body = {cityType:2,parentid:parentid}
		        }else{
					body = {cityType:3,parentid:parentid}
		        }
		        _this.$http('/citis/cityLists',{body},{},{},'post').then( res => {

		        	if(res.data.code==0){

			            if(pramas == 1){
			            	_this.provinceIdsList = res.data.response.cityList;
			            }else if(pramas == 2){
			            	if(_this.clearAble){
			            		_this.selfCity = '';
			            		_this.selfArea = '';
			            	}
			            	_this.cityIdsList = res.data.response.cityList
			            }else{
			            	if(_this.clearAble){
			            		_this.selfArea = '';
			            	}
			          		_this.areaIdsList = res.data.response.cityList
			            }

						if(_this.provinceIdsList.length>0 && _this.cityIdsList.length>0 && _this.areaIdsList.length>0){
							_this.clearAble = true;
						}

		        	}else if(res.data.code == 300){
		          		_this.$router.push('/login')
		        	}
		        }).catch(function(err){
		        	console.log(err)
		        })
		    }
		}
	}
</script>
<style scoped>

</style>
