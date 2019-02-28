import {select as d3_select} from 'd3-selection';
import {min as d3_min,max as d3_max} from 'd3-array';
import './style.scss';
import Evented from './utils/Evented'

import Target from './Shape/Target'

import UiCutline from './Shape/element/cutline'
import UiDefs from './Shape/element/defs'
import UiXAxis from './Shape/element/axisX'
import UiScrollBar from './Shape/element/scrollBar'
import UiTip from './Shape/element/tip'
import UiTarget from './Shape/element/target'
import UiLineGroup from './Shape/element/lineGroup'
import lineGroup from './Shape/element/lineGroup';

export default class TimeLine extends Evented {
  constructor(option,callback){
    super();
    this.config = {
      groupHeight:100,
      groupWidth:100,
      left:0,
      top:0,
      right:0,
      bottom:20,
      defaultColor:'#333',
      targetHeight:60,
      smallTargetHeight:10,
      gap:20,
      tick:10,
      bigWidth:260,
      smallWidth:120,
      xbottom:false
    };
    this.state = {
      totalHegiht:20,
      domain:[new Date(2018,10,1),new Date(2019,8,31)],
      transform:{k:0,x:0,y:0},
      status:'bbms',
      currentY:0,
      hightLights:[]
    };
    
    Object.assign(this.config,option);
    this.shapes = {};
    this.init(option.container);
    if(typeof callback == 'function'){
      callback();
    }
  }
  init(dom){
    
    // let domain = this.state.domain;
    
    let container = d3_select(dom);
    this.config.width = container.node().clientWidth;
    this.config.height =  this.state.totalHegiht;
    this.config.boxHeight = container.node().clientHeight;
    let svg = container.append('svg')
      .classed('time-svg',true)
    svg.call(UiDefs(this));
    svg.call(UiXAxis(this));
    

    this.state.list = this.setData(this.config.data);
    // let min = d3_min(this.state.list,d=>d.etime);
    // let max = d3_max(this.state.list,d=>d.etime);
    // this.state.domain = [min,max];

    svg.attr('width',this.config.width)
      .attr('height',this.config.boxHeight);

    
    
    svg.call(UiTip(this));

    this.group.call(UiCutline(this))
    let clipGroup = this.group.append('g').classed('clip-group',true)
    .attr('clip-path', 'url(#chart-content)');
    // this.createTarget(this.state.list);
    this.group.call(UiTarget(this));
    clipGroup.call(UiLineGroup(this));
  }
  addShapes(shapes){
    shapes.forEach(shape=>{
      this.shapes[shape.name] = shape.style;
    })
  }
  setData(list){
    let lists = this.calcList(list,this._x);
    return lists;
  }
  resetData(list){
    let fn = this._t || this._x;
    this.state.list = this.calcList(list,fn);
    this.config.data = list;
    this.fire('change');
    this.fire('scrollEvent',{y:0})
  }
  reset(list){
    let fn = this._t || this._x;
    this.state.list = this.calcList(list,fn);
    this.config.data = list;
    let container = d3_select(this.config.container);
    this.config.width = container.node().clientWidth;
    this.config.height =  this.state.totalHegiht;
    this.config.boxHeight = container.node().clientHeight;
    this.fire('change');
    this.fire('scrollEvent',{y:0});
    this.fire('reset');
  }
  createTarget(results){
    for(let name in this.shapes){
      if(typeof this.shapes[name].create === 'function') this.shapes[name].create(results);
    }
  }
  select(obj){
    this.fire('select',{data:obj});
  }
  getWidth(d){
    let width = 0;
    let status = this.state.status;
    let bigWidth = this.config.bigWidth;
    let smallWidth = this.config.smallWidth;
    if(status=='msss'){
      if(d.timing==4){
        width = smallWidth;
      }
    }else if(status=='bmss'){
      if(d.timing==4){
        width = bigWidth;
      }else if(d.timing==3){
        width = smallWidth;
      }
    }else if(status == 'bbms'){
      if(d.timing>=3){
        width = bigWidth;
      }else if(d.timing==2){
        width = smallWidth;
      }
    }else if(status == 'bbbm'){
      if(d.timing>=2){
        width = bigWidth;
      }else if(d.timing==1){
        width = smallWidth;
      }
    }else if(status == 'bbbb'){
      width = bigWidth
    }
    return width;
  }
  zoomTo(date){
    this.fire('zoomTo',{date});
  }
  hightLight(list){
    this.state.hightLights = list;
    this.fire('hightLight',{list})
  }
  changeY(y){
    this.fire('changeY',{y});
  }
  calcList(list,fn,gap=-5){
    let weeks = {
      label:'周目标',
      timing:1,
      datas:{},
      lineHeight:100
    };
    let months = {
      label:'月目标',
      timing:2,
      lineHeight:100,
      datas:{}
    };
    let quarters = {
      label:'季目标',
      timing:3,
      lineHeight:100,
      datas:{}
    };
    let years = {
      label:'年目标',
      timing:4,
      lineHeight:100,
      datas:{}
    };
    // let status = this.state.status;
    list = list.map(el=>{
      el.date = new Date(el.etime);
      el.isComp = false;
      return el
    })    
    list.forEach(el=>{
      let width = this.getWidth(el);
      if(el.timing==1){
        weeks = this.adjustObj(list,el,1,fn,width,gap,weeks);
      }else if(el.timing==2){
        months = this.adjustObj(list,el,2,fn,width,gap,months);
      }else if(el.timing==3){
        quarters = this.adjustObj(list,el,3,fn,width,gap,quarters);
      }else if(el.timing==4){
        years = this.adjustObj(list,el,4,fn,width,gap,years);
      }
    });
    // console.log(years);
    // console.log(quarters);
    // console.log(months);
    // console.log(weeks);
    return [years,quarters,months,weeks];
  }
  adjustObj(list,el,flag,fn,width,gap=20,collcetion){
    let _width = width;
    let keys = Object.keys(collcetion.datas);
    let aimKey = keys.find(key=>{
      return Math.abs(fn(el.date)-fn(new Date(key)))<=_width+gap;
    });
    if(aimKey){
      // let index = collcetion.datas[aimKey].find(ev=>ev.id==el.id);
      el.width = width;
      el.py = collcetion.datas[aimKey].length;
      collcetion.datas[aimKey].push(el);
    }else{
      el.width = width;
      el.py = 0;
      collcetion.datas[el.etime] = [el];
    }
    collcetion.width = width;
    collcetion.lineHeight = this.calcLineHeight(collcetion);
    return collcetion;

  }
  calcLineHeight(obj){
    let maxNum = 0;
    let targetHeight = this.config.targetHeight;
    let minHeight = this.config.smallTargetHeight;
    let h = obj.width>0 ? targetHeight:minHeight;
    let gap = this.config.gap;
    for(let key in obj.datas){
      let list = obj.datas[key];
      maxNum = list.length>maxNum?list.length:maxNum;
    }
    let height = maxNum*(h+gap)+gap;
    height = height>this.config.groupHeight?height:this.config.groupHeight;
    return height;
  }
  getGroupY(flag){
    let height = 0;
    let yearsH = this.state.list.find(el=>el.timing==4).lineHeight;
    let quartersH = this.state.list.find(el=>el.timing==3).lineHeight;
    let monthsH = this.state.list.find(el=>el.timing==2).lineHeight;
    // let weeksH = this.state.list.find(el=>el.timing==1).lineHeight;
    if(flag==4){
      height = this.config.bottom;
    }else if(flag==3){
      height = this.config.bottom+yearsH;
    }else if(flag==2){
      height = this.config.bottom+yearsH+quartersH;
    }else if(flag==1){
      height = this.config.bottom+yearsH+quartersH+monthsH;
    }
    return height
  }
  
}