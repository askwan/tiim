import {zoomTransform as d3_zoomTransform} from 'd3-zoom';
import {zoomIdentity as d3_zoomIdentity} from 'd3'
export default context => {
  return (g) =>{
    let group = context.state.list;
    let verticalLineGroup = g.append('g')
      
    let lineVertical = verticalLineGroup.append('line')
      .classed('y',true)
      .attr('x1',context.config.groupWidth)
      .attr('y1',0)
      .attr('x2',context.config.groupWidth)
      .attr('y2',context.config.boxHeight)
      
    let clipGroup = context.group.append('g')
      // .attr('clip-path', 'url(#cutline-content)')

    let cutLineGroup = clipGroup
      .append('g')
      .classed('cutline-group',true)
      
      const update = ()=>{
      //生成组
        let lines = cutLineGroup.selectAll('.cutline').data(group);

        lines.enter().append('line')
          .classed('cutline',true)
          .attr('x1',0)
          .merge(lines)
          .attr('x2',context.config.width)
          .attr('y1',(d)=>context.getGroupY(d.timing))
          .attr("y2",(d)=>context.getGroupY(d.timing))

        lines.exit().remove();
        let labels = cutLineGroup.selectAll('.group-label').data(group);
        labels.enter().append('text')
          .classed('group-label',true)
          .attr('x',context.config.groupWidth/2)
          .text(d=>d.label)
          .merge(labels)
          .attr('y',(d)=>context.getGroupY(d.timing)+20)
          
        labels.exit().remove();
    }
    update();

    context.on('change',()=>{
      update();
    });
    context.on('update',()=>{
      update();
    });
    context.on('scrollEvent',data=>{
      let y = -data.y;
      // cutLineGroup.attr('transform',t)
      cutLineGroup.attr('transform',`translate(0,${y})`)
      // let transform = d3_zoomTransform(cutLineGroup.node());
    })
    context.on('reset',()=>{
      // console.log(context.config.boxHeight,'width')
      lineVertical
        .attr('y1',0)
        .attr('y2',context.config.boxHeight)
      
    })



  }
}