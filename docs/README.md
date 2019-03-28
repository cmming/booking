# 资源预约

> 资源预约管理平台.


## 插件安装

### cnpm i element-ui -S  

npm install svg-baker -D

npm install svg-baker-runtime -D

### scss 开发配置

     环境安装
    cnpm install node-sass --save-dev
    cnpm install sass-loader --save-dev

    webpack.base.config.js

    {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
    },