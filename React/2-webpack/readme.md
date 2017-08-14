# Webpack配置React开发环境

webpack是一个前端资源加载/打包工具，只需要相对简单的配置就可以提供前端工程化需要的各种功能，并且如果有需要它还可以被整合到其他比如Grunt、Gulp的工作流。

假设我们在当前工程目录有一个入口文件 entry.js，React 组件放置在一个 components/ 目录下，组件被 entry.js 引用，要使用 entry.js，我们把这个文件指定输出到 dist/bundle.js，Webpack 配置如下：

    var path = require('path');
    
    module.exports = {
      entry:'./entry.js',
      output: {
        path: path.join(__dirname, '/dist'),
        filename:'bundle.js'
      },
      resolve: {
        extensions: ['', '.js', '.jsx']
      },
      module:{
        loaders:[
          {test: /\.js|jsx$/, loaders: ['babel']}
        ]
      }
    }


resolve指定可以被import的文件后缀，比如Hello.jsx这样的文件就可以直接用import Hello from 'Hello'引用。

loaders指定babel-loader编译后缀名为.js或者.jsx的文件，这样你就可以在这两种类型的文件中自由使用JSX和ES6了。