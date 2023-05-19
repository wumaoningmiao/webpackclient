//引入path路径模块，负责解决路径拼接及处理路径的格式
const Path = require('path');

//链接HTML文件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// const my_module = require('./webpack.config.module');

//引入css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
//不需要打包资源
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  //mode是打包模式：development(开发)|production(生产)|none(不变)
  mode: 'development',

  //设置源码地图
  //开发时设置为：‘source-map’
  //生产时设置为：不设置（没有源码地图）
  devtool: 'eval-source-map',

  //入口
  entry: {
    admin_login: './src/manage/js/login.js',
    admin_reg: './src/manage/js/reg.js',
    admin_index: './src/manage/js/index.js',

  },

  //输出
  output: {
    path: Path.resolve(__dirname, './dist'),
    filename: 'js/[hash]_[name]_[ID].js',
    clean: true,
    // 为所有asset需要生成文件的文件名和地址做默认设置
    // assetModuleFilename:'',
  },

  //插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/manage/login.html',
      //生成的文件叫什么名
      //默认相对于path
      filename: 'manage/login.html',
      chunks: ['admin_login']
    }),
    new HtmlWebpackPlugin({
      template: './src/manage/reg.html',
      //生成的文件叫什么名
      //默认相对于path
      filename: 'manage/reg.html',
      chunks: ['admin_reg']
    }),
    new HtmlWebpackPlugin({
      template: './src/manage/index.html',
      //生成的文件叫什么名
      //默认相对于path
      filename: 'manage/index.html',
      chunks: ['admin_index']
    }),


    //------------------------------------------------
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[id].css',

    }),
    //--------------------------------------------------
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: './src/images',
    //       to: 'images'
    //     },
    //   ]
    // }
    // )
  ],

  //css引入  module指定除了js模块之外的其他模块如何处理。

  module: {
    rules: [
      //css及scss处理规则
      {
        //匹配文件的url(全路径)
        test: /\.(css|scss)$/,
        use: [
          //使用MiniCssExtractPlugin.loader 提取样式表到单独的文件
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              //当在css文件中发现import导入的文件时，可以使用前一个loader来处理。
              importLoaders: 2
            }
          },
          {
            // 使用 postcss-loader 和 postcss-preset-env 插件自动为浏览器添加前缀
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env']
                ]
              }
            }
          },
          // 使用 sass-loader 处理 SCSS 文件
          'sass-loader'
        ]
      },
      //js
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'//使用这个预设，会根据浏览器来选择插件转化ES5
              ]
            }
          }
        ]
      },
      //图片
      {
        test: /\.(bmp|jpg|jpeg|gif|png|webp)$/,
        //asset/resource 生成文件 | asset/inline 写入行内 | asset/source 读取源码 | asset 根据资源大小（8kb)判断asset/resource | assent/inline
        type: 'asset',
        generator: {
          // 设置输出文件路径和文件名，[contenthash] 表示文件内容的 hash 值
          filename: 'images/[contenthsah][ext]'
        },
        parser: {
          dataUrlCondition: {
            // 将小于 maxSize 大小的图片转为 data url 格式
            maxSize: 1024 * 1024//设置资源大小的限额，默认是8Kb。
          }
        },
      },
      //html的模板文件
      {
        test: /\.tmp$/,
        // 读取 HTML 模板文件的源码
        type: 'asset/source',
      },
      //字体文件
      {
        test: /\.(ttf|woff|woff2)$/,
        // 生成文件
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[id][ext]'
        }
      }
    ],
  },



  //优化
  optimization: {
    //压缩
    //默认的压缩选项也mode选项相关联,production模式，默认所有的压缩选项都开启。
    //但是，一旦我们主动设置了minimizer，就相当于对默认的minimizer重新赋值，则原有的全部失效。
    minimizer: [
      new CssMinimizerPlugin(),
      //"..."表示将原有的优化项扩展到这里。
      '...'
    ],
    usedExports: true,//告知 webpack 去决定每个模块使用的导出内容
    concatenateModules: true,//告知 webpack 在打包时，相关代码尽量打包成一个js文件。
  },

  //devServer选项
  devServer: {
    //端口号
    port: 80,


    //监控变化的文件的，被监控的文件只要发生变化，就会重新编译，自动刷新浏览器。

    //修改默认的网站根目录
    static: {
      directory: Path.join(__dirname, 'dist'),
    },
    //网页在服务器发送给客户端时，如果未经压缩，则会比较大，影响传输。
    //通常服务器会将文件进行压缩后在传输给浏览器，浏览器解压后使用。
    //目前普遍采用 gzip 格式压缩。专用于互联网传输压缩。
    compress: true,
    //开启热更新
    hot: true,
    //打开服务器时自动开启浏览器访问
    open: {
      target: ['/manage/login.html', '/manage/reg.html', '/manage/index.html']
    },

    watchFiles: ['./src/manage/login.html', './src/manage/reg.html', './src/manage/index.html'],
    //跨域
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        // pathRewrite: { "^/api": "/abc" },
        changeOrigin: true,
      }
    }

  }
}
module.exports = config;