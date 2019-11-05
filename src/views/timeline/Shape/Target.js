import UiBg from './element/bg'
import UiTitle from './element/title'

import UiCircle from './element/circle'
import UilineGroup from './element/lineGroup'
import UiShade from './element/shade'
import UiProgress from './element/progress'


export default class Target {
  constructor(context){
    this.context = context;
  }
  create(list){
    let context = this.context;
    let group = context.config.targetHeight+context.config.gap;
    let targetGroup = context.group.selectAll('.target-group').data([1])
    let updateTargetGroup = targetGroup.enter().append('g').classed('target-group',true)
    .attr('clip-path', 'url(#chart-content)')
    .merge(targetGroup)

    // updateTargetGroup.call(UiUserDefs(context));

    let target = updateTargetGroup.selectAll('.target-g').data(list);

    let updateTarget = target.enter().append('g')
      .classed('target-g',true)
      .merge(target)
      .attr('data-id',d=>d.id)
      .attr('transform',(d)=>{
        let width = context.getWidth(d);
        let py =0;
        if(width==0) {
          group = context.config.smallTargetHeight+context.config.gap;
          py = d.py;
        }else {
          py = d.py;
          group = context.config.targetHeight+context.config.gap;
        }
        return `translate(${context._x(d.etime)},${py+d.num*group+context.config.bottom+context.config.gap})`
      }).on('click',d=>{
        context.state.currentTarget = d;
        context.fire('select',{data:d})
      })
    // updateTarget.call(UilineGroup(context));  
    updateTarget.call(UiCircle(context));

    let copyGroup = updateTarget.selectAll('.copy-group').data(d=>[d]);
    let updateCopyGroup = copyGroup.enter().append('g')
      .classed('copy-group',true)
      .attr('transform','translate(5,0)')
      .merge(copyGroup)
      .style('display',d=>{
        let status = context.state.status;
        let str = 'none';
        if(status=='msss'){
          if(d.timing==4) {
            str = 'inherit'
          }
        }else if(status == 'bmss'){
          if(d.timing>=3) str = 'inherit';
        }else if(status == 'bbms'){
          if(d.timing>=2) str = 'inherit';
        }else if(status == 'bbbm'){
          str = 'inherit';
        }else if(status == 'bbbb'){
          str = 'inherit';
        }
        return str
      })

    updateCopyGroup.call(UiBg(context));
    updateCopyGroup.call(UiTitle(context));
    updateCopyGroup.call(UiShade(context));
    updateCopyGroup.call(UiProgress(context));
    updateCopyGroup.call(UilineGroup(context));

    copyGroup.exit().remove()
    

    target.exit().remove();
    targetGroup.exit().remove();

    this.select(context);

    context.on('scrollEvent',data=>{
      let y = data.y;
      let scale = 1;
      updateTargetGroup.attr('transform',`translate(0,${-y}) scale(${scale})`);
    })
  }
  update(){
    
    
    // let context = this.context;
    // let list = context.calcList(context.state.list,context._t)
    // console.log(list);
    return 

    /*let group = context.config.targetHeight+context.config.gap;
    let lists = context.recalcPosi(context.config.data);
    
    context.group.select('.target-group').selectAll('.target-g').attr('transform',(d)=>{
      let width = context.getWidth(d);
      d = lists.find(el=>el.id==d.id);
      let py = 0;
      if(width==0) {
        group = context.config.smallTargetHeight+context.config.gap;
        // py = d.py;
      }else {
        // py = d.py;
        group = context.config.targetHeight+context.config.gap;
      }
      py = context.getPy(d,width);
      return `translate(${context._t(d.etime)},${py+d.num*group+context.config.bottom+context.config.gap})`
    })
    context.group.select('.target-group').selectAll('.target-g').selectAll('.copy-group').style('display',d=>{
      let status = context.state.status;
      let str = 'none';
      if(status=='msss'){
        if(d.timing==4) str = 'inherit';
      }else if(status == 'bmss'){
        if(d.timing>=3) str = 'inherit';
      }else if(status == 'bbms'){
        if(d.timing>=2) str = 'inherit';
      }else if(status == 'bbbm'){
        str = 'inherit';
      }else if(status == 'bbbb'){
        str = 'inherit';
      }
      return str
    })*/
  }
  select(context){
    context.on('select',d=>{
      if(d.data){
        context.hightLight([d.data.id]);
        // context.fire('highLight',{list:[d.data.id]})
      }else{
        context.hightLight([]);
        // context.fire('highLight',{list:[]})
      }
    })
  }
}

function s (){
  console.log('a');
  return 
}