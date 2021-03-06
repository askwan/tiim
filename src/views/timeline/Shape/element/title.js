// const url = 'http://bt1.geosts.ac.cn/api/image/75a36eceed9d7be579adab4f50f6ff45';
import UiUser from './user'
export default context => {
  return target =>{
    const getStringLength = (reg,str)=>{
      // let reg = /\d/g;
      return str.match(reg).length;
    }
    const update = ()=>{

      let titleBg = target.selectAll('.target-title-bg').data(d=>[d]);
      let padding = 10;
      let fontSize = 10;
      let radius = 2;
      titleBg.enter().append('rect')
        .classed('target-title-bg',true)
        .classed('animate',true)
        .attr('y',padding)
        .attr('rx',radius)
        .attr('ry',radius)
        .attr('width',d=>{
          let numLength = getStringLength(/\d/g,d.label);
          let letterLength = getStringLength(/[a-zA-Z]/g,d.label);
          return numLength*(fontSize-5)+letterLength*fontSize
        })
        .attr('height',16)
        .merge(titleBg)
        // .transition(context.animate())
        .attr('fill',d=>d.color)
        .attr('x',d=>{
          let width = context.getWidth(d);
          return padding - width;
        });

      titleBg.exit().remove();

      let icon = target.selectAll('.target-title-icon').data(d=>[d])
      icon.enter().append('text')
        .classed('target-title-icon',true)
        .classed('animate',true)
        .attr('font-size',fontSize+'px')
        .attr('y',padding+fontSize+2)
        .attr('fill','#fff')
        .text(d=>d.label)
        .merge(icon)
        .attr('x',d=>{
          let width = context.getWidth(d);
          return -width+padding+2
        })
        
      icon.exit().remove();

      let titleText = target.selectAll('.target-title-text').data(d=>[d]);
      titleText.enter().append('text')
        .classed('target-title-text',true)
        .classed('animate',true)
        .attr('font-size',14)
        .attr('fill','#333')
        .attr('y',padding+fontSize+2)
        .merge(titleText)
        .attr('x',d=>{
          let width = context.getWidth(d);
          let numLength = getStringLength(/\d/g,d.label);
          let letterLength = getStringLength(/[a-zA-Z]/g,d.label);
          return -width+padding+numLength*(fontSize-4)+letterLength*fontSize+4
        })
        .text(d=>{
          // console.log(d,'ddd')
          let str = d.name.replace(d.label,'').trim();
          let width = context.getWidth(d);
          // console.log(width==context.config.smallWidth,'width');
          // let numLength = getStringLength(/\d/g,d.label);
          // let letterLength = getStringLength(/[a-zA-Z]/g,d.label);
          // let front = numLength*(fontSize-5)+letterLength*fontSize;
          // console.log(context.config.smallWidth-front-20)
          if(width==context.config.smallWidth){
            if(str.length>2) str = str.slice(0,2)+'...';
          }else if(width == context.config.bigWidth){
            if(str.length>12) str = str.slice(0,12)+'...';
          }
          return str;
        });
      titleText.exit().remove();

      let partnerIcon = target.selectAll('.target-partner-icon').data(d=>[d])
      partnerIcon.enter().append('image')
        .classed('target-partner-icon',true)
        .classed('animate',true)
        .attr('xlink:href','static/image/users.png')
        .attr('width',16)
        .attr('height',16)
        .attr('y',padding/2+context.config.targetHeight/2)
        .merge(partnerIcon)
        .attr('x',d=>{
          let width = context.getWidth(d);
          return -width+padding
        })
      partnerIcon.exit().remove();

      let partnerName = target.selectAll('.target-partner-name').data(d=>[d])
      partnerName.enter().append('text')
        .classed('target-partner-name',true)
        .classed('animate',true)
        .attr('y',-padding*1.3+context.config.targetHeight)
        .attr('font-size',12)
        .attr('fill','#999')
        .text('参与人：')
        .merge(partnerName)
        .attr('x',d=>{
          let width = context.getWidth(d);
          return -width+padding+18;
        })
      partnerName.exit().remove();

      target.call(UiUser(context));
      

    };

    update();


    // context.on('change',()=>{
    //   update();
    // })
    
  }
}