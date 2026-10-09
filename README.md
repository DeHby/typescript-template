# TypeScript 开发模板 - pkg 分支

基于 TypeScript 7 的 Node.js 开发模板。

本分支额外集成：

- `esbuild` 高速打包
- `pkg` 生成独立 Node.js 二进制程序
- 支持离线 Node Runtime
- 支持构建参数配置化
- 支持生产环境二进制发布

适用于需要将 TypeScript 项目编译为 Windows/Linux/macOS 可执行文件的场景。

---

## 特性

- 使用 `ES2024` 作为目标语法标准
- 使用 `TypeScript 7` 作为开发语言
- 使用 `tsx` 提供开发环境 TypeScript 运行支持
- 使用 `tsc-alias` 自动处理 `tsconfig paths` 路径别名
- 支持 `@/*` 路径映射
- 使用 `dotenv` 加载 `.env` 环境变量配置
- 使用 `Prettier` 作为代码格式化工具
- 已配置 VSCode 调试环境
- 使用 `pnpm` 管理项目依赖
- 支持 `esbuild + pkg` 构建独立二进制程序

---

# 普通开发

## release

安装生产环境依赖。

```sh
pnpm release
```

---

## dev

启动开发模式。

特性：

- 使用 Node.js 原生 `--watch`
- 使用 `tsx` 运行 TypeScript 源码
- 自动加载 `.env`

```sh
pnpm dev
```

---

## typecheck

执行 TypeScript 类型检查，不生成编译文件。

```sh
pnpm typecheck
```

---

## build

构建普通 Node.js 项目。

执行流程：

```text
TypeScript 编译
        ↓
生成 dist/js
        ↓
tsc-alias 处理路径别名
```

执行：

```sh
pnpm build
```

---

## start

启动构建后的项目。

特性：

- 使用 `dist/js` 中的编译代码
- 开启 sourceMap 支持
- 加载 `.env`

```sh
pnpm start
```

---

## build:re

清理旧构建文件，并重新执行完整构建。

执行流程：

```text
clean
  ↓
build
```

执行：

```sh
pnpm build:re
```

---

## clean

清理构建文件和 TypeScript 增量缓存。

清理内容：

- `dist/`
- `node_modules/.cache/tsbuildinfo`

执行：

```sh
pnpm clean
```

---

# 二进制构建

本分支支持使用 `esbuild + pkg` 将 TypeScript 项目构建为独立可执行文件。

## 构建流程

```text
src/index.ts
      │
      ▼
TypeScript 类型检查
      │
      ▼
esbuild Bundle
      │
      ▼
dist/app.js
      │
      ▼
pkg 打包
      │
      ▼
dist/app.exe
```

---

## 配置

二进制构建参数位于：

```text
pkg/config.json
```

可以配置：

- TypeScript 入口文件
- Bundle 输出路径
- esbuild 参数
- pkg target
- Node Runtime 路径
- 可执行文件输出路径
- 压缩方式

配置示例：

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
    "nodeRuntime": "pkg/binaries/node-v18.20.2-win-x86",
    "output": "dist/app.exe",
    "compress": "Brotli"
  }
}
```

所有相对路径均以项目根目录为基准。

---

## 离线 Node Runtime

`pkg` 构建需要对应版本的 Node Runtime。

Runtime 文件统一放置于：

```text
pkg/
├── config.json
└── binaries/
    ├── node-v18.20.2-win-x86
    └── node-v20.18.2-win-x86
```

在 `pkg/config.json` 中指定所需 Runtime：

```json
{
  "nodeRuntime": "pkg/binaries/node-v18.20.2-win-x86"
}
```

配置路径需要与实际文件位置一致。

构建脚本会检查指定的 Runtime 是否存在；如果文件不存在，则终止构建并输出错误信息。

---

## build:bin

构建独立二进制程序。

```sh
pnpm build:bin
```

执行流程：

```text
clean
  ↓
设置 PKG_NODE_PATH
  ↓
检查 Node Runtime
  ↓
TypeScript 类型检查
  ↓
esbuild Bundle
  ↓
pkg 打包
  ↓
生成可执行文件
```

输出结构：

```text
dist/
├── js/
│   ├── index.js
│   └── index.js.map
├── app.js
└── app.exe
```

其中：

- `dist/js/`：普通 TypeScript 编译产物
- `dist/app.js`：esbuild 生成的 Bundle，用于 `pkg` 打包
- `dist/app.exe`：最终生成的 Windows 可执行文件

---

# 其他命令

## upgrade

交互式升级依赖。

```sh
pnpm upgrade
```

---

# Scripts

| 命令 | 说明 |
|---|---|
| `pnpm dev` | 开发模式运行 |
| `pnpm typecheck` | TypeScript 类型检查 |
| `pnpm build` | 普通项目构建 |
| `pnpm build:bin` | 构建独立二进制程序 |
| `pnpm start` | 启动构建结果 |
| `pnpm clean` | 清理构建文件和增量缓存 |
| `pnpm upgrade` | 升级依赖 |

---

# 目录结构

```text
.
├── pkg/
│   ├── binaries/
│   │   ├── node-v18.20.2-win-x86
│   │   └── node-v20.18.2-win-x86
│   └── config.json
├── scripts/
│   └── build.cjs
├── src/
│   └── index.ts
├── dist/
│   ├── js/
│   ├── app.js
│   └── app.exe
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

