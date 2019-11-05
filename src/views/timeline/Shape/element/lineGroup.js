import { select as d3_select } from 'd3-selection';
export default context => {
  return group =>{

    const getPosi = (d)=>{
      let posi = {x:0,y:0};
      
      let g = context.group.select('.target-group').select("[data-id='"+d.id+"']");
      if(g.node()){
        let transformStr = g.attr('transform');
        let reg = /\(.*\)/;
        transformStr = transformStr.match(reg)[0].replace(/\(/,'').replace(/\)/,"")
        // console.log(transformStr);
        let aim = transformStr.split(',');
        posi = {
          x:Number(aim[0]),
          y:Number(aim[1])
        }
      }
      return posi;
    }

    let lineGroup =  group.append('g')
      .classed('line-group',true)
      

    const update = () => {
      // let list = context.config.data;
      // console.log(list);
      let list = context.config.data.filter(el=>el.width>0);
      let line = lineGroup.selectAll('.line').data(list);
      line.enter().append('line')
        .classed('line',true)
        .attr('data-id',d=>d.id)
        .attr('stroke-width',1)
        .attr('stroke','rgb(21,141,239)')
        .merge(line)
        .attr('y1',()=>20)
        .attr('x1',d=>{
          return getPosi(d).x
        })
        .attr('x2',d=>getPosi(d).x)
        .attr('y2',d=>getPosi(d).y)

      line.exit().remove();
      let circle = lineGroup.selectAll('.line-circle').data(list);
      circle.enter().append('circle')
        .classed('line-circle',true)
        .attr('r',4)
        .attr('cy',context.config.bottom)
        .attr('fill','rgb(21,141,239)')
        .merge(circle)
        .attr('cx',d=>getPosi(d).x)

      circle.exit().remove();

    }

    update();
    context.on('change',()=>{
      update();
    });
    context.on('scrollEvent',data=>{
      lineGroup.attr('transform',`translate(0,${-data.y})`);
    });

    context.on('update',()=>{
      update();
    });

  }
}