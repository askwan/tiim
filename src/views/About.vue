<template>
  <div class='root'>
    <input type="text" v-model="width">
    <button @click="submit">submit</button>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data(){
      return {
        width:''
      }
    },
    props:{},
    components:{},
    computed:{},
    mounted(){
      this.query();
    },
    methods:{
      submit(){

      },
      async query(){
        let res = await axios.get('./data.json');
        // console.log(res.data.data,'res');
        let list = res.data.data.list;
        let lists = this.formateDate(list);
        console.log(lists);
        this.calcData(lists);
      },
      formateDate(list){
        let weeks = {
          label:'周目标',
          timing:1,
          datas:{}
        };
        let months = {
          label:'月目标',
          timing:2,
          datas:{}
        };
        let quarters = {
          label:'季目标',
          timing:3,
          datas:{}
        };
        let years = {
          label:'年目标',
          timing:4,
          datas:{}
        };    
        list.forEach(el=>{
          el.timeObj = new Date(el.etime);
          if(el.timing==1){
            weeks.datas[el.etime] = list.filter(ev=>ev.timing==1&&ev.etime==el.etime)
          }else if(el.timing==2){
            months.datas[el.etime] = list.filter(ev=>ev.timing==2&&ev.etime==el.etime);
          }else if(el.timing==3){
            quarters.datas[el.etime] = list.filter(ev=>ev.timing==3&&ev.etime==el.etime);
          }else if(el.timing==4){
            years.datas[el.etime] = list.filter(ev=>ev.timing==4&&ev.etime==el.etime);
          }
        })
        return [years,quarters,months,weeks];
      },
      calcData(list,width){
        // console.log(list);
        // list.forEach(el=>{
          
        // })
      }
    }
  }
</script>
<style lang='scss' scoped>

</style>
