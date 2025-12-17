# TypeScript 开发模板 - pkg分支

### 特性

- 使用 `ES2024` 作为目标语法标准
- 使用 `node20` 的watch命令作为dev模式
- 不使用任何第三方  `tsx/ts-node` 等工具作为依赖
- 使用 `sourceMap` 作为调试基础（请不要禁用该编译选项）
- 使用 `tsc-alias` 实现编译时处理 `tsconfig-paths`
- 使用``Prettier``作为代码格式化工具,并附带一份常用配置
- 使用``Dotenv``读取``.env``的自定义配置文件作为环境变量
- 已配置好的vscode开发与调试环境
- 使用``esbuild````pkg``等实现打包混淆编译二进制程序

### 命令

- release
  
  下载发行版包依赖
- watch
  
  typescript 热更新模式
- build:watch
  
  typescript 热更新模式以及完整的构建
- rebuild
  
  清空残留文件重新完整构建
- build
  
  构建代码
- start
  
  启动项目
- upgrade
  
  升级所有包依赖
- clean
  
  清理构建的所有文件
- dev
  
  启动热更新开发模式的项目
- build-bin
  
  打包混淆编译二进制