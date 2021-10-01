//interceptors拦截器
//在真正返回response时使用
axios.interceptors.response.use(function(response){
    let config=response.config  //config查看响应有啥配置
    let {method,url,data}=config  //data是请求的data
    if(url==='/books/1' && method==='get'){
      response.data={   //data是响应的data
         name:'JS高级程序设计',
         number:2,
         id:1
     }
    }
     return response
 })
 
 axios.get('/books/1')
   .then((response)=>{
      let data=response.data
      let originalHtml=$('#app').html()
      let newHtml=originalHtml.replace('__name__',data.name)
        .replace('__number__',data.number)
      $('#app').html(newHtml)
   })
 
 $('#app').on('click','#addone',function(){
     var oldNumber=$('#number').text() //string
     var newNumber=oldNumber-0+1
     $('#number').text(newNumber)
 })
 $('#app').on('click','#minusone',function(){
     var oldNumber=$('#number').text() //string
     var newNumber=oldNumber-0-1
     $('#number').text(newNumber)
 })
 $('#app').on('click','#reset',function(){
     $('#number').text(0)
 })
 
 