fakeData()

//创建构造函数
function Model(options) {
    this.data = options.data
    this.resource=options.resource
  }
  //让公有属性挂在原型链上
Model.prototype.fetch = function(id) {
  return axios.get(`/${this.resource}s/${id}`).then((response) => {
    this.data = response.data
    return response
  })
}
Model.prototype.update = function(data) {
  let id = this.data.id
  return axios.put(`/${this.resource}s/${id}`, data).then((response) => {
    this.data = response.data
    return response
  })
}


//----------上面是MVC类，下面是对象

let model = new Model({
  data: {
    name: '',
    number: 0,
    id: ''
  },
  resource:'book'
})


let view=new Vue({
  el:'#app',
  data: {
    book:{
      name: '未命名',
      number: 0,
      id: ''
    },
    n: 1
  },
  template:
  ` <div>
     <div>
       书名：《{{book.name}}》
       数量：<span id='number'>{{book.number}}</span>
     </div>
     <div>
       <input v-model="n" />
      N 的值是 {{n}}
     </div>
     <div>
       <button v-on:click="addone">加N</button>
       <button v-on:click="minusone">减N</button>
       <button v-on:click="reset">归零</button>
     </div>
    </div> 
`,
  created(){
    model.fetch(1).then(()=>{
      this.book = model.data
    })
  },
   methods:{
    addone() {
      model.update({
        number: this.book.number + (this.n-0)
      }).then(() => {
        this.view.book = this.model.data
      })

    },
    minusone() {
      model.update({
        number: this.book.number - (this.n-0)
      }).then(() => {
        this.view.book = this.model.data
      })
    },
    reset() {
      model.update({
        number: 0
      }).then(() => {
        this.view.book = this.model.data
      })
    },
  }
})



/*下面是函数封装*/

function fakeData() {
  let book = {
      name: 'JS高级程序设计',
      number: 2,
      id: 1
    }
    //interceptors拦截器
    //在真正返回response时使用
  axios.interceptors.response.use(function(response) {
    let config = response.config //config查看响应有啥配置
    let {
      method, url, data
    } = config //data是请求的data
    if (url === '/books/1' && method === 'get') {
      response.data = book //data是响应的data
    } else if (url === '/books/1' && method === 'put') {
      data = JSON.parse(data)
      Object.assign(book, data)
      response.data = book
    }
    return response
  })
}