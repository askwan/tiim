import SobjectServer from './server/sobjectServer'
import config from './config'
class Psde {
  constructor(base={}){
    this.url = base.url?base.url:config.psdeUrl;
    this.init();
  }
  init(){
    this.objectServer = new SobjectServer(this.url);
  }
  
}

export default Psde;