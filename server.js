var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
  // 默认首页
  const filePath = (path === '/' || path === '') ? '/index.html':path;
  // 文件类型
  console.log(path);
  console.log(filePath);
  const index = filePath.lastIndexOf('.');
  console.log(index);
  const suffix = filePath.substring(index);
  console.log(suffix);
  const fileTypes = {
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.xml':'text/xml',
    '.json':'text/json',
    '.png':'image/png',
    '.jpg':'image/jpeg'
  };
  // 设置响应头
  response.setHeader('Content-Type',`${fileTypes[suffix] || 'text/html'};charset=utf-8`);
  // 读取内容
  let content;
  try {
    const realPath = `./public${filePath}`;
    console.log(realPath);
    content = fs.readFileSync(realPath);
  } catch (e) {
    content = '文件不存在';
    response.statusCode = 404;
  }
  response.write(content);
  response.end();
  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
