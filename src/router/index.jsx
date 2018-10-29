import  React from 'react'
import {
  BrowserRouter as Router,
  HashRouter ,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'
import getComponent from 'component/getComponent';
const RoutesUrl={
    home:'/',
   
};
const supportsHistory = 'pushState' in window.history
const WechatReact = () => (
  <HashRouter  forceRefresh={!supportsHistory} >
    <Switch>
      
      {
        routers.map((item,index)=>{
            return <Route exact={item.exact} path={item.path} component={item.component} key={index} />
        })
      }
    </Switch>
  </HashRouter>
)
const routers=[]; 
for(let i in RoutesUrl){
  routers.push({
    path:RoutesUrl[i],
    exact:RoutesUrl[i]=="\/" ? true:false,
    component:(props)=>getComponent(props,()=>import(`entry/${i}/${i}`))
  })
}
export default WechatReact