import { select as d3_select } from 'd3-selection';
export default context => {
  return target =>{
    const update = () => {

      let lineGroup = target.selectAll('.line-group').data(d=>[d])
      let updateLineGroup = lineGroup.enter().append('g')
        .classed('line-group',true)
        .merge(lineGroup)
        .attr('transform',(d,i,list)=>{
          let parent = d3_select(list[i].parentNode);
          let transformStr = parent.attr('transform');
          let reg = /,\d+\)/;
          let y = transformStr.match(reg)[0].replace(',','').replace(')','');
          // console.log(y,transformStr,`translate(0,${-y})`);
          return `translate(0,${-y+context.config.bottom})`
        })
        .attr('display',d=>{
          let width = context.getWidth(d);
          let str = 'inherit';
          if(width==0) str ='none';
          return str
        })

      let line = updateLineGroup.selectAll('.line-v').data(d=>[d])
      line.enter().append('line')
        .classed('line-v',true)
        .attr('x1',0)
        .attr('x2',0)
        .attr('y1',0)
        .attr('stroke-width',1)
        .attr('stroke','rgb(21,141,239)')
        .merge(line)
        .attr('y2',(d,i,list)=>{
          let parent = d3_select(list[i].parentNode.parentNode);
          let transformStr = parent.attr('transform');
          let reg = /,\d+\)/;
          let y = transformStr.match(reg)[0].replace(',','').replace(')','');
          // console.log(y,transformStr,`translate(0,${-y})`);
          return y-context.config.bottom
        })

      line.exit().remove();

      let lineCircle = updateLineGroup.selectAll('.line-circle').data(d=>[d]);
      lineCircle.enter().append('circle')
        .classed('line-circle',true)
        .attr('cx',0)
        .attr('r',4)
        .attr('fill','rgb(21,141,239)')
        .attr('cy',0)
        .merge(lineCircle)
        
      lineCircle.exit().remove();

      lineGroup.exit().remove();

      // let line = target.selectAll('.line-v').data(d=>[d]);
      // line.enter().append('line')
      //   .classed('line-v',true)
      //   .attr('x1',0)
      //   .attr('y1',0)
      //   .attr('stroke-width',1)
      //   .attr('stroke','rgb(21,141,239)')
      //   .merge(line)
      //   .attr('y2',(d,i,list)=>{
      //     let parent = d3_select(list[i].parentNode);
      //     let transformStr = parent.attr('transform');
      //     let reg = /,\d+\)/;
      //     let y = transformStr.match(reg)[0].replace(',','').replace(')','');
      //     return -y+context.config.bottom
      //   })
      //   .attr('display',d=>{
      //     let width = context.getWidth(d);
      //     let str = 'inherit';
      //     if(width==0) str ='none';
      //     return str
      //   })

      //   line.exit().remove();

        // let lineCircle


    }
    update();
    // context.on('change',()=>{
    //   update();
    // })
  }
}