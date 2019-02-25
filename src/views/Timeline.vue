<template>
  <div class="timeline-root">
    <div id="timeline"></div>
    <button @click="button">button</button>
  </div>
</template>
<script>
import Timeline from "./timeline/Timeline.js";
import axios from 'axios'
let timeline;


export default {
  data() {
    return {};
  },
  props: {},
  components: {},
  computed: {},
  mounted() {
    // this.initTimeLine();
    this.query('./data.json');

  },
  methods: {
    initTimeLine() {
      
    },
    async query(){

      let res = await axios.get('./data.json');

      let list = res.data.data.list;

      let options = {
        container:'#timeline',
        // groupHeight:200,
        // targetHeight:80,
        data:list
      };
      timeline = new Timeline(options,()=>{
        console.log('ready')
      });
      // timeline.on('change',(data)=>{
      //     console.log(data.domain);
      //     console.log(data.domain[0].toString())
      // });
      timeline.on('select',d=>{
          // console.log(d);
      });

    },
    formateDate(list){
      let weeks = {
        label:'周目标',
        timing:1
      };
      let months = {
        label:'月目标',
        timing:2
      };
      let quarters = {
        label:'季目标',
        timing:3
      };
      let years = {
        label:'年目标',
        timing:4
      };
      weeks.data = list.filter(el=>el.timing == 1);
      months.data = list.filter(el=>el.timing == 2);
      quarters.data = list.filter(el=>el.timing == 3);
      years.data = list.filter(el=>el.timing == 4);

      return [years,quarters,months,weeks];
    },
    button(){
      timeline.zoomTo(new Date(2019,6,4));
    }
  }
};



</script>
<style lang='scss' scoped>
.timeline-root {
  // height: 800px;
}
#timeline {
  height: 500px;
  width: 100%;
  border: 1px solid #eee;
  overflow: hidden;
}
</style>