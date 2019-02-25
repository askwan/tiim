import {drag as d3_drag} from 'd3-drag'
import {event as d3_event,select as d3_select} from 'd3-selection'
export default context => {
  let barWidth = 50;
  let buttonHeight = 30;
  let barHeight = 500-20;
  let totalHeight = context.config.height;
  let boxHeight = context.config.boxHeight;
  var dragMove = ()=>{
    let originPoint = {};
    let _y,oy;
    let drag = d3_drag()
      .on('start',(d,i,a)=>{
        originPoint.x = d3_event.x;
        originPoint.y = d3_event.y;
        oy = d3_select(a[i]).attr('data-y')*1;
      })
      .on('drag',(d,i,a)=>{
        let dY = d3_event.y - originPoint.y;
        _y = oy + dY;
        if(_y>=0&&_y<=barHeight-buttonHeight){
          d3_select(a[i]).attr('y',_y).attr('data-y',_y);

          context.fire('scrollEvent',{y:_y*(totalHeight-boxHeight)/(barHeight-buttonHeight)})
        }
      })
    

    return drag;

  }

  return group => {
    
    let scrollBarGroup = group.append('g')
      .classed('scroll-bar',true)
      .attr('transform',`translate(${context.config.width-barWidth},20)`)

    scrollBarGroup.append('rect')
      .attr('fill','rgba(0,0,0,0.5)')
      .attr('x',barWidth/4)
      .attr('width',barWidth/2)
      .attr('height',barHeight)

    scrollBarGroup.append('rect')
      .attr('fill','#fff')
      .attr('width',barWidth)
      .attr('height',buttonHeight)
      .attr('data-y',0)
      .call(dragMove());


      context.on('changeY',data=>{
        let y = data.y;
        console.log(y,'ff');
      })
    
  }
}