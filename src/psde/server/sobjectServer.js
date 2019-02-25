import Base from './Base'
import Sobject from '../Sobject'
class ObjectServer extends Base {
  constructor(url){
    super();
    this.url = url+'object'
  }
  query(option={}){
    option = Object.assign({},option);
    return new Promise((resolve,reject)=>{
      this.get('/query',option).then(res=>{
        if(res.status==200){
          let sobjects = res.data.list.map(obj=>{
            return new Sobject(obj)
          })
          resolve(sobjects);
        }else{
          reject(res)
        }
      })
      .catch(err=>{
        reject(err)
      })
    })
  }
  find(option={}){
    option = Object.assign({},option);
    return new Promise((resolve,reject)=>{
      this.get('/find',option).then(res=>{
        if(res.status==200){
          let sobjects = res.data.list.map(obj=>{
            return new Sobject(obj)
          })
          resolve(sobjects);
        }else{
          reject(res)
        }
      })
      .catch(err=>{
        reject(err)
      })
    })
  }
  save(option){
    return new Promise((resolve,reject)=>{
      this.post('/saveObject',option).then(res=>{
        resolve(res)
      })
      .catch(err=>{
        reject(err)
      })
    })
  }
  queryBySobjectId(sobjectId){
    let option = {
      loadAttr:true,
      loadForm:true,
      ids:sobjectId,
      geoEdit:true,
      loadNetwork:true,
      loadCompose:true
    };
    return this.query(option)
  }
}

export default ObjectServer;