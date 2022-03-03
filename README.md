# 胜古朝阳API

使用Deno来开发和编译此程序。需要`--allow-net`（网络监听）、`--allow-write`（写入UUID）和`--allow-read`（读取文件）参数。

## 开发

首先需要安装Deno，[官网](https://deno.land/)。

> 除非你有超级多核心，否则不要使用cargo来安装，要命。

程序的入口是`server.ts`，你可以进行：

- 运行：`deno run --watch --allow-net --allow-read --allow-write server.ts`
- 编译：`deno compile --allow-net --allow-read --allow-write server.ts`

## 目录

默认文章根目录是运行程序时，工作目录下的`docs/`，每个Post目录下应该包含至少`index.md`和`meta.json`两个文件。程序运行后，同时存在`index.md`和`meta.json`的目录下会创建`.uuid`（如果没有的话）。

可以以任意的形式来组织目录树，这不会影响文章的层次结构。初始化数据库时，程序会递归的检索目标目录的整个目录树。尽管理论上程序不会追踪符号链接，但是我还没有在多种平台上进行测试，因此仍然请不要在目录中放置符号链接，尤其是可能造成循环的符号链接。

## 文章

使用`meta.json`来定义文章的元数据。

它的定义如下：

```ts
type PostMetaInJSON = {
    title: string;
    introduction: string;
    authors: string[];
    tags: string[];
}
```

例子如下：

```json
{
    "title": "通过VPN在校外访问学术资源",
    "introduction": "本文介绍了我校的WEB VPN和SSL VPN的使用方法，以及一些常见的校园网可以访问的学术资源的使用方式",
    "authors": ["张三", "李四"],
    "tags": ["学术资源", "SciFinder", "VPN", "图书馆", "校园网"]
}
```

- title：文章的标题
- introduction：文章的介绍
- authros：文章的作者列表
- tags：文章的关键词列表
