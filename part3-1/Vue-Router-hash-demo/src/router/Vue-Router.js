// console.dir(Vue)
let _Vue = null
class VueRouter {
    static install(Vue){
        //1 判断当前插件是否被安装
        if(VueRouter.install.installed){
            return;
        }
        VueRouter.install.installed = true
        //2 把Vue的构造函数记录在全局
        _Vue = Vue
        //3 把创建Vue的实例传入的router对象注入到Vue实例
        // _Vue.prototype.$router = this.$options.router
        _Vue.mixin({
            beforeCreate(){
                if(this.$options.router){
                    _Vue.prototype.$router = this.$options.router
                    
                }
               
            }
        })
    }
    constructor(options){
        this.options = options
        this.routeMap = {}
        // observable
        this.data = _Vue.observable({
            current:"#/"
        })
        this.init()

    }
    init(){
        this.createRouteMap()
        this.initComponent(_Vue)
        this.initEvent()
    }
    createRouteMap(){
        //遍历所有的路由规则 吧路由规则解析成键值对的形式存储到routeMap中
        this.options.routes.forEach(route => {
            console.log(route.path)
            route.path = '#'+route.path
            this.routeMap[route.path] = route.component
        });
        this.data.current = window.location.hash
    }
    initComponent(Vue){
        Vue.component("router-link",{
            props:{
                to:String
            },
            render(h){
                return h("a",{
                    attrs:{
                        href:this.to
                    },
                    on:{
                        click:this.clickhander
                    }
                },[this.$slots.default])
            },
            methods:{
                clickhander(e){
                    // history.pushState({},"",'#'+this.to)
                    window.location.hash ='#'+this.to
                    this.$router.data.current='#'+this.to
                    e.preventDefault()
                }
            }
            // template:"<a :href='to'><slot></slot><>"
        })
        const self = this
        Vue.component("router-view",{
            render(h){
                // self.data.current
               
                // console.log(window.location)
                const cm=self.routeMap[self.data.current]
                console.log('self-------',self.data.current)
                // console.log(self.routeMap,'cm',cm,self.data.current)
                return h(cm)
            }
        })
        
    }
    initEvent(){
        const self = this
        //
        // window.addEventListener("popstate",()=>{
        //     this.data.current = window.location.hash;
        //     console.log(window.location)
        //     console.log( window.location.pathname)
        // })
        function locationHashChanged() { 
            console.log('hashchange')
            self.data.current = window.location.hash;
            console.log(self.data)
        } 
          
        window.onhashchange = locationHashChanged;
        // window.addEventListener('hashchange',()=>{
        //     console.log('hashchangge??',this)
        //     this.data.current = window.location.hash;
        //     // console.log('hashchange',window.location.pathname,window.location.hash)
        // },false)
    }
}

export default VueRouter