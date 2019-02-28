import { select as d3_select } from 'd3-selection';
import {zoomTransform as d3_zoomTransform} from 'd3-zoom'
export default context => {
  return group =>{
    // const update = () => {

      // let lineGroup = target.selectAll('.line-group').data(d=>[d])
      // let updateLineGroup = lineGroup.enter().append('g')
      //   .classed('line-group',true)
      //   .merge(lineGroup)
      //   .attr('transform',(d,i,list)=>{
      //     let parent = d3_select(list[i].parentNode);
      //     let transformStr = parent.attr('transform');
      //     let reg = /,\d+\)/;
      //     let y = transformStr.match(reg)[0].replace(',','').replace(')','');
      //     // console.log(y,transformStr,`translate(0,${-y})`);
      //     return `translate(0,${-y+context.config.bottom})`
      //   })
      //   .attr('display',d=>{
      //     let width = context.getWidth(d);
      //     let str = 'inherit';
      //     if(width==0) str ='none';
      //     return str
      //   })

      // let line = updateLineGroup.selectAll('.line-v').data(d=>[d])
      // line.enter().append('line')
      //   .classed('line-v',true)
      //   .attr('x1',0)
      //   .attr('x2',0)
      //   .attr('y1',0)
      //   .attr('stroke-width',1)
      //   .attr('stroke','rgb(21,141,239)')
      //   .merge(line)
      //   .attr('y2',(d,i,list)=>{
      //     let parent = d3_select(list[i].parentNode.parentNode);
      //     let transformStr = parent.attr('transform');
      //     let reg = /,\d+\)/;
      //     let y = transformStr.match(reg)[0].replace(',','').replace(')','');
      //     // console.log(y,transformStr,`translate(0,${-y})`);
      //     return y-context.config.bottom
      //   })

      // line.exit().remove();

      // let lineCircle = updateLineGroup.selectAll('.line-circle').data(d=>[d]);
      // lineCircle.enter().append('circle')
      //   .classed('line-circle',true)
      //   .attr('cx',0)
      //   .attr('r',4)
      //   .attr('fill','rgb(21,141,239)')
      //   .attr('cy',0)
      //   .merge(lineCircle)
        
      // lineCircle.exit().remove();

      // lineGroup.exit().remove();

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

      


    // }

    const getPosi = (d)=>{
      let g = context.group.select('.target-group').select("[data-id='"+d.id+"']");
      // console.log(g)
      let transformStr = g.attr('transform');
      let reg = /\(.*\)/;
      transformStr = transformStr.match(reg)[0].replace(/\(/,'').replace(/\)/,"")
      // console.log(transformStr);
      let aim = transformStr.split(',');
      let posi = {
        x:Number(aim[0]),
        y:Number(aim[1])
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
        // .attr('display',d=>d.width==0?'none':'inherit')

      line.exit().remove();
      let circle = lineGroup.selectAll('.line-circle').data(list);
      circle.enter().append('circle')
        .classed('line-circle',true)
        .attr('r',4)
        .attr('cy',context.config.bottom)
        .attr('fill','rgb(21,141,239)')
        .merge(circle)
        .attr('cx',d=>getPosi(d).x)
        // .attr('display',d=>d.width==0?'none':'inherit')
      circle.exit().remove();

    }

    update();

    context.on('change',()=>{
      update();
    })
    context.on('scrollEvent',data=>{
      lineGroup.attr('transform',`translate(0,${-data.y})`);
    })

  }
}