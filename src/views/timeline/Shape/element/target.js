export default context => {
  return g => {

    let targetGroup = g.append('g').classed('target-group',true);
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
      let groupG = target.selectAll(`.${name}-group`).data(listsData);
      let updateGroupG = groupG.enter().append('g')
        .classed(`${name}-group`,true)
        .merge(groupG);

      let group = updateGroupG.selectAll(`.${name}-g`).data(d=>d);
      let updateGroup = group.enter().append('g')
        .classed(`${name}-g`,true)
        .merge(group)
        .attr('transform',(d,i)=>{
          let gap = context.config.gap;
          let targetHeight = context.config.targetHeight;
          return `translate(${fn(d.date)},${(gap+targetHeight)*i+gap})`
        })
        .attr('data-id',d=>d.id);
      let circle = updateGroup.selectAll('circle').data(d=>[d])
      circle.enter().append('circle')
        .attr('cx',0)
        .attr('r',5)
        .attr('cy',0)
        .attr('fill','#e65c8a')
        .merge(circle);

      circle.exit().remove();

      group.exit().remove();
      groupG.exit().remove();
    }

    const update = ()=>{
      
      let list = context.state.list;
      // createGroup(list,4,'year',yearsGroup);
      createGroup(list,3,'quarter',quarterGroup);
      // createGroup(list,2,'month',monthGroup);
      // createGroup(list,1,'week',weekGroup);  
    }
    update();

    context.on('change',()=>{
      update();
    });
    context.on('scrollEvent',data=>{
      targetGroup.attr('transform',`translate(0,${-data.y})`);
    })

  }
}