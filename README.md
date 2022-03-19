# 胜古朝阳 API

使用 Deno 来开发和编译此程序。需要`--allow-net`（网络监听）、`--allow-write`（写入
UUID）和`--allow-read`（读取文件）参数。

## 开发

首先需要安装 Deno，[官网](https://deno.land/)。

> 除非你有超级多核心，否则不要使用 cargo 来安装，要命。

### 目录结构

```
.
├── deps # 依赖项目
├── docs # 文章的目录，是一个Git子模块
├── handlers # 路由处理器
├── services # 一些涉及到数据处理的工具函数
├── ssg # 服务端渲染内容的目录
├── static # 静态文件目录
├── storage # 内存数据库
├── types # 前后端公用的类型定义
├── utils # 一些简单的工具函数
└── views # 前端代码目录
```

此外，根目录下还有以下TypeScript文件：

- `server.ts`，用于启动SSR和API服务器的入口
    - 运行：`deno run --allow-net --allow-read --allow-write server.ts`
    - 运行（监测修改）：`deno run --allow-net --allow-read --allow-write --watch server.ts`
- `main.ts`，Freesia框架逻辑的入口，SSR和API服务器的路由定义在此。不可执行
- `generateMainJS.ts`，用于将前端代码bundle成`/static/main.js`。
    - 运行：`deno run --allow-net --allow-read --allow-write --allow-env --allow-run generateMainJS.ts [mode]`
        - [mode]=buildOnce: 编译后立即退出
        - [mode]=watch: 建立对`./views`目录的监视，发生变化时重新编译。
    - 编译（推荐）：`deno compile --allow-net --allow-read --allow-write --allow-env --allow-run generateMainJS.ts`
- `SSG.ts`，进行服务端生成。
    - 运行：`deno run --allow-net --allow-read --allow-write --allow-env --allow-run SSG.ts`
    - 编译（推荐）：`deno compile --allow-net --allow-read --allow-write --allow-env --allow-run SSG.ts`
- `SSGServer.ts`，为`ssg`目录启动一个静态文件服务器。
    - 运行：`deno run --allow-net --allow-read SSGServer.ts`
    - 编译（推荐）：`deno compile --allow-net --allow-read SSG.ts`

## 文章目录

默认文章根目录是运行程序时，工作目录下的`docs/`，每个 Post
目录下应该包含至少`index.md`和`meta.yml`两个文件。程序运行后，同时存在`index.md`和`meta.yml`的目录下会创建`.uuid`和`.visited.json`（如果没有的话）。

可以以任意的形式来组织目录树，这不会影响文章的层次结构。初始化数据库时，程序会递归的检索目标目录的整个目录树。尽管理论上程序不会追踪符号链接，但是我还没有在多种平台上进行测试，因此仍然请不要在目录中放置符号链接，尤其是可能造成循环的符号链接。

## 文章

使用`meta.yml`来定义文章的元数据。

它的定义如下：

```ts
// types/post.ts
export type PostMetaInYAML = {
    title: string;
    intro: string;
    authors: string[];
    tags: string[];
    editors: string[];
    headerImage?: string;
};
```

例子如下：

```yml
title: 学习资源攻略
intro: 本文向大家介绍了如何获取一些常用的学习资源
authors: [宋昱霖]
editors: [陈梁辉,田福利]
tags: [学习资料]
```

## APIs

### 文件接口

文件接口的路径是`/p/<uuid>/<filepath>`，系统会首先在内部通过 UUID 查询实际的 Post
目录路径，然后查找对应的文件位置。如果文件或者 Post 不存在，都会返回 404。

当访问的搜索参数中有`firstVisit`，且访问的`filepath`是`index.md`，且返回值为`200`时，记录一次访问。

示例路径：

`http://hostname:port/file/file/dbc9d459-0438-46b0-8484-cb63f4eb3491/we_love_buct.jpg`

### 榜单接口

榜单接口的路径是`/list/<type>`，支持的`type`包括`daily`，`weekly`，`monthly`，`yearly`，可以获得访问量的前
50 位。

### 目录和标签接口

根据给定的目录或标签，得到目录下或包含标签的文章列表。

- `/api/cate/<cate>`
- `/api/tags/<tag>/`

这两个接口都是带缓存的，相同的参数在一分钟内会返回缓存的结果，而不是立刻更新。
