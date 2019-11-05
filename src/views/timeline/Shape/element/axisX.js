
import {scaleTime as d3_scaleTime} from 'd3-scale';
import {axisBottom as d3_axisBottom,axisTop as d3_axisTop} from 'd3-axis';
// import {timeFormat as d3_timeFormat,formatLocale as d3_formatLocale} from 'd3-time-format'
import {zoomIdentity as d3_zoomIdentity} from 'd3'
import {event as d3_event} from 'd3-selection'
import {zoom as d3_zoom} from 'd3-zoom'
// import {formatLocale as d3_locale} from 'd3-format'

export default context => {
  let orginPoint = {};
  let py = 0;
  return svg =>{

    let domain = context.config.domain;
    // let domain = [new Date(2019,1,1),new Date(2019.12,31)]
    context._x = d3_scaleTime()
      .domain(domain)
      .range([context.config.groupWidth,context.config.width]);
    let xAxis;
    if(context.config.xbottom){
      xAxis = d3_axisBottom(context._x)
        .tickSize(-context.config.boxHeight).ticks(context.config.tick)
    }else{
      xAxis = d3_axisTop(context._x)
        // .tickFormat(d3_timeFormat('%Y-%m-%d'))
        // .tickFormat(zh.format())
        .tickSize(-context.config.boxHeight).ticks(context.config.tick)
    }


    const zoomed = ()=>{
      context._t = d3_event.transform.rescaleX(context._x);
      context.state.transform = d3_event.transform;
      let scale = context.state.transform.k
      let domain = context._t.domain();
      if(scale<0.15){
        context.state.status = 'msss';
      }else if(scale>=0.15&&scale<0.65){
        context.state.status = 'bmss'
      }
      else if(scale>=0.65&&scale<1.5){
        context.state.status = 'bbms';
      }else if(scale>=1.5&&scale<=2.6){
        context.state.status = 'bbbm';
      }
      else if(scale>5){
        context.state.status = 'bbbb';
      }
      context.group.select('.x.axis').call(xAxis.scale(context._t));
      // context.group.select('.x.axis').call(xAxis);
      // svg.call(xAxis.scale(context._t));
      // console.log(d3_event.sourceEvent);
      context.state.list = context.calcList(context.config.data,context._t);
      // console.log(context.state.list);
      context.fire('change',{domain:domain});
      for(let name in context.shapes){
        if(typeof context.shapes[name].update==='function') context.shapes[name].update();
      }
      // context.state.totalHegiht = context.state.list
      if(d3_event.sourceEvent&&d3_event.sourceEvent.type=='mousemove'){

        // context.state.currentY = d3_event.sourceEvent.y - orginPoint.y;
        let _py = d3_event.sourceEvent.y - orginPoint.y;
        // console.log(-_py-py,context.state.totalHegiht)
        if(-_py-py>=0){
          if(-_py-py<=context.state.totalHegiht){
            context.fire('scrollEvent',{y:-_py-py});
          }
        }else if(_py-py>-10){
          context.fire('scrollEvent',{y:0});
        }
      }


    }


    context.on('zoomTo',(data)=>{
      let date = data.date;
      let t;
      // console.log(xAxis.scale(context._t));
      // if(context._t){
      //   t = d3_zoomIdentity.translate(context._t(date),0).scale(1);
      // }else {
      //   t = d3_zoomIdentity.translate(context._x(date),0).scale(1);
      // };
      let x = -context._x(date)+context.config.groupWidth;
      t = d3_zoomIdentity.translate(x,0).scale(1);
      context.group.transition().duration(750).call(zoom.transform,t);
    });
    context.on('reset',()=>{
      context.group.transition().duration(750).call(zoom.transform,d3_zoomIdentity);
      rect.attr('height', context.config.boxHeight)
        .attr('width', context.config.width - context.config.groupWidth);
      xAxis.tickSize(-context.config.boxHeight);
      context._x
        .range([context.config.groupWidth,context.config.width]);
    })
        

    let zoom = d3_zoom()
      // .scaleExtent([0.00001,Infinity])
      .scaleExtent([0.02,50])
      .on('zoom',zoomed);

    context.group = svg.append('g')
      .attr('transform',`translate(${context.config.top},${context.config.left})`).call(zoom)
  
    // svg.call(zoom);
    let rect = context.group.append('rect')
      .attr('class', 'chart-bounds')
      .attr('x', context.config.groupWidth)
      .attr('y', 0)
      .attr('height', context.config.boxHeight)
      .attr('fill','rgba(0,0,0,0)')
      .attr('width', context.config.width - context.config.groupWidth)
      .on('mousedown',()=>{
        orginPoint.y = d3_event.y;
        let str = context.group.select('.target-group').attr('transform')
        if(str){
          str = str.split(',')[1];
          str = str.split(')')[0];
          py = Number(str)
        }else{
          py = 0;
        }
      })
      .on('click',()=>{
        context.state.currentTarget = null;
        context.fire('select',{data:null});
        context.hightLight([]);
      })


    let y = context.config.xbottom?context.config.height-context.config.bottom:context.config.bottom;
    let xAxisG =  context.group.append('g')
      // .attr('clip-path', 'url(#chart-content)')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + y + ')')
      .call(xAxis);
    xAxisG.selectAll('path.domain').attr('fill',"none").attr('stroke','none')

  }
}