<template>
  <div class="hello">
    hello
    <input type="text" v-model="value">
    <button @click="save">save</button>
  </div>
</template>
<script>
  import Psde from '@/psde';
  let sobject;
  class Abc extends Array {
    constructor(){
      super();
    }
    getName(){
      return 123
    }
    add(item){
      this.push(item)
      console.log(this);
    }
  }
  export default {
    data(){
      return {
        value:''
      }
    },
    props:{},
    components:{},
    computed:{},
    watch:{
      value(val){
        sobject.modifyAttr({name:val})
      }
    },
    async mounted(){
      localStorage.setItem('token','eyJ1aWQiOjE4OTczLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vd3d3LmJsdWV0aGluay5jbiIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2IiwiaWF0IjoxNTUwNzQwMjA0fQ.jWzw34w9HzpuKKZpki8ZNMaBDQxrLhu34uef9_pELgQ')
      let psde = new Psde({
        cache:[]
      });

      let sobjects = await psde.objectServer.queryBySobjectId('946807980032');
      sobject = sobjects[0];
      console.log(sobject,'sobject');

      // let sobjects = await psde.objectServer.queryByBBox({minx:120.90454001562501,maxx:120.91009417968751,miny:38.39333888432238,maxy:38.39764911353178})
      // console.log(sobjects);
    },
    methods:{
      save(){
        console.log(sobject);
      },
      mm(){
        let abc = new Abc();
        abc.add({name:'askwan'});
      }
    }
  }
</script>
<style lang='scss' scoped>

</style>