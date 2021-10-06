
fakeData()

let model={
  data:{
    name:'',
    number:0,
    id:''
 },
  fetch(id){
    return axios.get(`/books/${id}`).then((response)=>{
      this.data=response.data
      return response
    })
  },
  update(data){
    let id = this.data.id
    return  axios.put(`/books/${id}`,data).then((response)=>{
      this.data=response.data
      return response
    })
  }
}

let view={
  el:'#app',
  template:
  `
    <div>
    书名：《__name__》
    数量：<span id='number'>__number__</span>
    </div>
    <div>
      <button id='addone'>加1</button>
      <button id='minusone'>减1</button>
      <button id='reset'>清零</button>
    </div>
`,
  render(data){
    let html=this.template.replace('__name__',data.name)
     .replace('__number__',data.number)
    $(this.el).html(html)
  }
}

var controller={
  init(options){
    let view=options.view
    let model=options.model
    this.view=view
    this.model=model
    this.view.render(this.model.data)
    this.bindEvents()
    this.model.fetch(1)
      .then(( )=>{this.view.render(this.model.data)})
  },
  addone(){
    var oldNumber=$('#number').text() //string
    var newNumber=oldNumber-0+1
    this.model.update({number:newNumber})
      .then(( )=>{view.render(this.model.data)})   
  },
  
  minusone(){
    var oldNumber=$('#number').text() //string
    var newNumber=oldNumber-0-1
    this.model.update({number:newNumber})
      .then(( )=>{view.render(this.model.data)})   
  },
  
  reset(){
     this.model.update({number:0})
      .then(( )=>{view.render(this.model.data)})   
  },
  
  bindEvents(){
    //this是controller
    $(this.view.el).on('click','#addone',this.addone.bind(this))
    $(this.view.el).on('click','#minusone',this.minusone.bind(this))
    $(this.view.el).on('click','#reset',this.reset.bind(this))
   }
}

controller.init({view:view,model:model})




/*下面是函数封装*/

function fakeData(){
  let book={
   name:'JS高级程序设计',
   number:2,
   id:1
}
//interceptors拦截器
//在真正返回response时使用
axios.interceptors.response.use(function(response){
   let config=response.config  //config查看响应有啥配置
   let {method,url,data}=config  //data是请求的data
   if(url==='/books/1' && method==='get'){
     response.data=book   //data是响应的data
   }else if(url==='/books/1' && method==='put'){
     data=JSON.parse(data)
     Object.assign(book,data)
     response.data=book
   }
    return response
})
}

