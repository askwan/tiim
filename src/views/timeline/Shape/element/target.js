import UiBg from './bg'
import UiTitle from './title'
import UiCircle from './circle'
import UilineGroup from './lineGroup'
import UiShade from './shade'
import UiProgress from './progress'
import UiBorder from './borderLine'
import {drag as d3_drag} from 'd3-drag';

export default context => {
  const dragMove = ()=>{
    return d3_drag()
  }
  return g => {
    let clipG = g.append('g').classed('clip-g',true)
      .attr('clip-path', 'url(#chart-content)')
    let targetGroup = clipG.append('g').classed('target-group',true)
      
    let weekGroup = targetGroup.append('g').classed('weeks',true);
    let monthGroup = targetGroup.append('g').classed('months',true);
    let quarterGroup = targetGroup.append('g').classed('quarters',true);
    let yearsGroup = targetGroup.append('g').classed('years',true);
    const createGroup = (list,flag,name,target)=>{
      let listsData = [];
      let lists = list.find(el=>el.timing==flag);
      let fn = context._t||context._x;
      for(let key in lists.datas){
        listsData.push(lists.datas[key])
      }
      // if(flag==2){
      //   console.log(list);
      // }
      let groupG = target.selectAll(`.${name}-group`).data(listsData);
      let updateGroupG = groupG.enter().append('g')
        .classed(`${name}-group`,true)
        .merge(groupG);

      let group = updateGroupG.selectAll(`.${name}-g`).data(d=>d);
      let updateGroup = group.enter().append('g')
        .classed(`${name}-g`,true)
        .on('click',d=>{
          context.state.currentTarget = d;
          context.fire('select',{data:d});
          context.hightLight([d.id]);
        })
        .merge(group)
        .attr('transform',(d,i)=>{
          let gap = context.config.gap;
          let targetHeight = context.config.targetHeight;
          let posiY = context.getGroupY(d.timing);
          return `translate(${fn(d.date)},${(gap+targetHeight)*i+gap+posiY})`
        })
        .attr('data-id',d=>d.id)
        .call(dragMove());
      updateGroup.call(UiCircle(context));

      let copyGroup = updateGroup.selectAll('.copy-group').data(d=>[d]);
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
      updateCopyGroup.call(UiBorder(context));

      copyGroup.exit().remove()

      group.exit().remove();
      groupG.exit().remove();
    }

    const update = ()=>{
      
      let list = context.state.list;
      createGroup(list,4,'year',yearsGroup);
      createGroup(list,3,'quarter',quarterGroup);
      createGroup(list,2,'month',monthGroup);
      createGroup(list,1,'week',weekGroup);  
    }
    update();

    context.on('change',()=>{
      update();
    });
    context.on('scrollEvent',data=>{
      targetGroup.attr('transform',`translate(0,${-data.y})`);
    });
    context.on('update',()=>{
      update();
    })

  }
}