# TypeScript 开发模板 - pkg 分支

基于 TypeScript 7 的 Node.js 开发模板。

本分支额外集成：

* `esbuild` 高速打包
* `pkg` 生成独立 Node.js 二进制程序
* 支持离线 Node Runtime
* 支持构建参数配置化
* 支持生产环境二进制发布

适用于需要将 TypeScript 项目编译为 Windows/Linux/macOS 可执行文件的场景。

---

## 特性

* 使用 `ES2024` 作为目标语法标准
* 使用 `TypeScript 7` 作为开发语言
* 使用 `tsx` 提供开发环境 TypeScript 运行支持
* 使用 `tsc-alias` 自动处理 `tsconfig paths` 路径别名
* 支持 `@/*` 路径映射
* 使用 `dotenv` 加载 `.env` 环境变量配置
* 使用 `Prettier` 作为代码格式化工具
* 已配置 VSCode 调试环境
* 支持 `esbuild + pkg` 构建独立二进制程序

---

# 普通开发

## release

安装生产环境依赖。

```sh
yarn release
```

---

## dev

启动开发模式。

特性：

* 使用 Node.js 原生 `--watch`
* 使用 `tsx` 运行 TypeScript 源码
* 自动加载 `.env`

```sh
yarn dev
```

---

## typecheck

执行 TypeScript 类型检查，不生成编译文件。

```sh
yarn typecheck
```

---

## build

构建普通 Node.js 项目。

执行流程：

```text
TypeScript 编译
        ↓
生成 dist
        ↓
tsc-alias 处理路径别名
```

执行：

```sh
yarn build
```

---

## start

启动构建后的项目。

特性：

* 使用 `dist` 中的编译代码
* 开启 sourceMap 支持
* 加载 `.env`

```sh
yarn start
```

---

## rebuild

清理旧构建文件，并重新执行完整构建。

执行流程：

```text
clean
 ↓
build
```

执行：

```sh
yarn rebuild
```

---

## clean

清理构建文件和 TypeScript 增量缓存。

清理：

* `dist`
* `node_modules/.cache/tsbuildinfo`

执行：

```sh
yarn clean
```

---

# 二进制构建

本分支支持使用 `esbuild + pkg` 将 TypeScript 项目构建为独立可执行文件。

执行流程：

```text
TypeScript
    |
    | 类型检查
    ↓
esbuild
    |
    | bundle + 编译
    ↓
dist/app.js
    |
    | pkg
    ↓
可执行文件
```

---

## 配置

二进制构建参数位于：

```text
build/config.json
```

可以调整：

* TypeScript 入口文件
* esbuild 参数
* pkg target
* 输出文件
* 压缩方式

示例：

```json
{
  "entry": "src/index.ts",
  "bundle": "dist/app.js",

  "esbuild": [
    "--target=node18",
    "--external:electron"
  ],

  "pkg": {
    "target": "node18-win-x86",
    "nodeRuntime": "node-v18.20.2-win-x86",
    "output": "out/app.exe",
    "compress": "Brotli"
  }
}
```

---

## 离线 Node Runtime

pkg 构建需要对应版本的 Node Runtime。

Runtime 文件放置：

```text
build/
└─ pkg-node/
    ├─ node-v18.20.2-win-x86
    └─ node-v20.18.2-win-x86
```

配置中的：

```json
{
  "nodeRuntime": "node-v18.20.2-win-x86"
}
```

需要与目录中的文件名称一致。

---

## build:bin

执行真正的二进制编译。

```sh
yarn build:bin
```

执行流程：

```text
clean
 ↓
设置 pkg Node Runtime
 ↓
TypeScript 类型检查
 ↓
esbuild bundle
 ↓
pkg 打包
 ↓
生成 exe
```

输出：

```text
out/
└─ app.exe
```

---

# 其他命令

## upgrade

交互式升级所有依赖。

```sh
yarn upgrade
```

---

# Scripts

当前主要命令：

| 命令               | 说明              |
| ---------------- | --------------- |
| `yarn dev`       | 开发模式运行          |
| `yarn typecheck` | TypeScript 类型检查 |
| `yarn build`     | 普通项目构建          |
| `yarn build:bin` | 构建独立二进制程序       |
| `yarn start`     | 启动构建结果          |
| `yarn clean`     | 清理构建文件          |
| `yarn upgrade`   | 升级依赖            |
