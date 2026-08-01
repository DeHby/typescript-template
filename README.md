# TypeScript 开发模板

### 特性

- 基于 **Node.js ESM** 模块体系开发
- 使用 `ES2024` 作为目标语法标准
- 使用 `TypeScript 7` 作为开发语言
- 使用 `tsx` 提供开发环境 TypeScript 运行支持
- 使用 `tsc-alias` 自动处理 `tsconfig paths` 路径别名
- 支持 `@/*` 路径映射
- 使用 `dotenv` 加载 `.env` 环境变量配置
- 使用 `Prettier` 作为代码格式化工具
- 已配置 VSCode 调试环境


## 命令

### release

安装生产环境依赖。

```sh
yarn release
```

---

### dev

启动开发模式。

- 使用 Node.js 原生 `--watch` 实现热更新
- 使用 `tsx` 运行 TypeScript 源码
- 自动加载 `.env` 环境变量

```sh
yarn dev
```

---

### typecheck

执行 TypeScript 类型检查，不生成编译文件。

```sh
yarn typecheck
```

---

### build

构建项目。

执行流程：

```text
TypeScript 编译
        ↓
生成 dist
        ↓
tsc-alias 处理路径别名
```

```sh
yarn build
```

---

### start

启动构建后的项目。

- 使用 dist 中的编译代码
- 开启 sourceMap 支持
- 加载 `.env` 环境变量

```sh
yarn start
```

---

### rebuild

清理旧构建文件，并重新执行完整构建。

执行流程：

```text
clean
 ↓
build
```

```sh
yarn rebuild
```

---

### clean

清理构建文件和 TypeScript 增量编译缓存。

清理：

- `dist`
- `node_modules/.cache/tsbuildinfo`

```sh
yarn clean
```

---

### upgrade

交互式升级所有依赖。

```sh
yarn upgrade
```
