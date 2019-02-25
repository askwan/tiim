import {zoomTransform as d3_zoomTransform} from 'd3-zoom';
import {zoomIdentity as d3_zoomIdentity} from 'd3'
export default context => {
  return (g) =>{
    let group = context.config.data;
    let verticalLineGroup = g.append('g')
    verticalLineGroup.append('line')
      .classed('y',true)
      .attr('x1',context.config.groupWidth)
      .attr('y1',0)
      .attr('x2',context.config.groupWidth)
      .attr('y2',context.config.height);
    const getHeight = (h,i,d)=>{
      let width = 0;
      let status = context.state.status;
      // console.log(d,i,status)
      while(i>0){
        i--;
        if(group[i].data[0]) width = context.getWidth(group[i].data[0]);
        if(width>0){
          h+=group[i].lineHeight
        }else {
          h+=group[i].smallHeight;
        }
      }

      return h
    }
    let cutLineGroup = context.group
      .append('g')
      .classed('cutline-group',true)

      const update = ()=>{
      //生成组
        let lines = cutLineGroup.selectAll('.cutline').data(group);

        lines.enter().append('line')
          .classed('cutline',true)
          .attr('x1',0)
          .attr('x2',context.config.width)
          .merge(lines)
          .attr('y1',(d,i)=>{
            // let h=context.config.bottom;
            let h = getHeight(context.config.bottom,i,d)
            // let h = context.getPy(d)
            // console.log(d,h)
            return h
          })
          .attr("y2",(d,i)=>{
            let h = getHeight(context.config.bottom,i,d)
            // let h = context.getPy(d);
            return h
          })

        lines.exit().remove();
        let labels = cutLineGroup.selectAll('.group-label').data(group);
        labels.enter().append('text')
          .classed('group-label',true)
          .attr('x',context.config.groupWidth/2)
          .text(d=>d.label)
          .merge(labels)
          .attr('y',(d,i)=>{
            let h = getHeight(40,i)
            return h;
          })
          

        labels.exit().remove();
    }
    update();

    context.on('change',()=>{
      // console.log('updateline')
      update();
    });
    context.on('scrollEvent',data=>{
      let y = -data.y;
      // cutLineGroup.attr('transform',t)
      cutLineGroup.attr('transform',`translate(0,${y})`)
      // let transform = d3_zoomTransform(cutLineGroup.node());
    })



  }
}