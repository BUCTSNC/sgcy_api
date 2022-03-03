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
};
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

## APIs

### 搜索接口

搜索接口的路径是`/search`，通过查询字符串来添加搜索信息。查询参数包括：

- keywords: 查询关键词，可以有若干个，例如`&keywords=昌平&keywords=宿舍`。多个关键词结果取合集。
- fields：查询字段名，有效的字段名有：`title`，`introduction`，`authors`，`tags`
- limit：结果数目，最多输出若干条结果
- asc：排序方式，设置为0或1（若不为1的任意值，按照desc排列）
- from：查询范围的起始时间（可选，默认为时间戳0点）
- to：查询范围的终止时间（可选，默认为现在）

查询示例

`http://hostname:port/serach?keywords=昌平&keywords=校园风光&fields=introduction&fields=tag&limit=10&asc=1&from=2020.12.31&to=2021.12.31`

### 文件接口

文件接口的路径是`/file/<uuid>/<filepath>`，系统会首先在内部通过UUID查询实际的Post目录路径，然后查找对应的文件位置。如果文件或者Post不存在，都会返回404。

示例路径：

`http://hostname:port/file/file/dbc9d459-0438-46b0-8484-cb63f4eb3491/we_love_buct.jpg`
