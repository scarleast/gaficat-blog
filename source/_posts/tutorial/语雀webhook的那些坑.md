---
title: 语雀webhook的那些坑
date: '2020-09-15 23:21:31'
abbrlink: ff5ccbe6
tags:
  - 教程
categories:
  - 教程
  - 语雀
math: false
toc: true
---

# 摘要

由于语雀webhook官方的文档，没有关于其字段的说明，本文记录下各种消息的示例，方便大家开发时参考。

<!-- more -->

# 背景

我其实是notion的用户，但是因为网络的原因，国内和其他人合作还是需要国内的文档协作工具，就了解到了语雀。查询了语雀官方的webhook文档，发现除了说他有这个功能，如何开启这个功能以外，关于推送消息各个字段的说明，压根儿没有。我都主动来查webhook了，还不会设置callback地址之类的吗？我肯定是想查字段什么意思啊！真的不太懂语雀这个文档。

我的需求是：语雀知识库内的所有文档、评论和评论回复。其增、改、删除操作，都能交由我自己的webhook函数做一些处理，推送到server酱上，因为很多时候别人更新了文档，我自己并不知道，不能及时回复。

# 语雀webhook的一些说明

语雀的webhook支持对具体知识库进行设置，可以推送的内容如下：

- 发布文档（publish）：新建一个文档，点击发布的时候推送一条webhook消息。
- 更新文档（update）：更新文档后，点击发布的时候推送一条webhook消息。
- 删除文档（delete）：删除文档，将推送一条webhook消息。
- 新增评论（comment_create）：新增品论后，将推送一条webhook消息。
- 更新评论（comment_update）：更新评论后，将推送一条webhook消息。
- 删除评论（comment_delete）：删除评论后，将推送一条webhook消息。
- 新增评论回复（comment_reply_create）：对某一条评论进行回复后，将推送一条webhook消息。
- 更新评论回复（comment_reply_update）：对某一条评论的回复更新后，将推送一条webhook消息。
- 删除评论回复（comment_reply_delete）：删除某一条评论的回复后，将推送一条webhook消息。

开启推送，在`知识库->设置->开发者`中，进行相关的设置就行了，可以设置多个callback地址，每个callback地址可以自由选择上述中的某几个或者全部进行推送。

<center><img src="https://pic.gaficat.com/default/开启语雀webhook.png" alt="开启语雀webhook" style="zoom: 40%;" /></center>

# webhook消息的示例

## 发布文档

```json
{
  "data": {
    "id": 13230337,
    "slug": "qddytu",
    "title": "这是文章的标题",
    "book_id": 1782464,
    "book": {
      "id": 1782464,
      "type": "Book",
      "slug": "tx5fs5",
      "name": "示例知识库",
      "user_id": 593074,
      "description": "点滴学习，随时记录",
      "creator_id": 593074,
      "public": 1,
      "items_count": 3,
      "likes_count": 0,
      "watches_count": 1,
      "content_updated_at": "2020-09-15T10:42:28.088Z",
      "updated_at": "2020-09-15T10:42:28.000Z",
      "created_at": "2020-09-15T10:39:58.000Z",
      "user": null,
      "_serializer": "v2.book"
    },
    "user_id": 593074,
    "user": {
      "id": 593074,
      "type": "User",
      "login": "flamingcrystal",
      "name": "Flaming Crystal",
      "description": null,
      "avatar_url": "https://cdn.nlark.com/yuque/0/2019/jpeg/anonymous/1573519967166-e0d21489-4ab5-49b6-8893-7e77c44cd2b5.jpeg",
      "books_count": 5,
      "public_books_count": 1,
      "followers_count": 0,
      "following_count": 0,
      "created_at": "2019-11-12T00:53:12.000Z",
      "updated_at": "2020-09-15T10:39:58.000Z",
      "_serializer": "v2.user"
    },
    "format": "lake",
    "body": "这是文章的内容\n<a name=\"D4wZf\"></a>\n# 一级标题\n**加粗**<br />_斜体_\n\n- list\n",
    "body_draft": "这是文章的内容\n<a name=\"D4wZf\"></a>\n# 一级标题\n**加粗**<br />_斜体_\n\n- list\n",
    "body_html": "<!doctype html><div class=\"lake-content-editor-core lake-engine lake-typography-traditional\" data-lake-element=\"root\" data-selection-undefined=\"%7B%22path%22%3A%5B%5B4%2C0%2C0%2C4%5D%2C%5B4%2C0%2C0%2C4%5D%5D%2C%22active%22%3Atrue%7D\"><p data-lake-id=\"b791fecaceb7f4797bb8db8ea980d83b\" style=\"font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;\"><span>这是文章的内容</span></p><h1 data-lake-id=\"32cf8b61bf32d3ce61e3918c025210a3\" id=\"D4wZf\" style=\"padding: 7px 0px; margin: 0px; font-weight: 700; font-size: 28px; line-height: 36px;\">一级标题</h1><p data-lake-id=\"c2217c5c3a0ca3e2964daf6e9d9d6372\" style=\"font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;\"><strong>加粗</strong></p><p data-lake-id=\"aa28e7cfeb7ea314fb2017c4d3d0301a\" style=\"font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;\"><em>斜体</em></p><ul data-lake-id=\"9cbd73bdb6680f9f7eb9fde5217a2ffc\" start=\"-\" lake-indent=\"0\" style=\"list-style-type: disc; margin: 0px; padding-left: 23px; font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word;\"><li data-lake-id=\"5a58e37ebb365f1905bde74c98d19061\">list</li></ul></div>",
    "public": 1,
    "status": 1,
    "view_status": 0,
    "read_status": 1,
    "likes_count": 0,
    "comments_count": 0,
    "content_updated_at": "2020-09-15T10:42:28.000Z",
    "deleted_at": null,
    "created_at": "2020-09-15T10:40:57.000Z",
    "updated_at": "2020-09-15T10:42:28.000Z",
    "published_at": "2020-09-15T10:42:28.000Z",
    "first_published_at": "2020-09-15T10:42:28.000Z",
    "word_count": 17,
    "_serializer": "webhook.doc_detail",
    "path": "flamingcrystal/tx5fs5/qddytu",
    "publish": true,
    "action_type": "publish",
    "webhook_subject_type": "publish",
    "actor_id": 593074
  }
}
```

## 更新文档

```json
{
  "data": {
    "id": 13230337,
    "slug": "qddytu",
    "title": "这是文章的标题",
    "book_id": 1782464,
    "book": {
      "id": 1782464,
      "type": "Book",
      "slug": "tx5fs5",
      "name": "示例知识库",
      "user_id": 593074,
      "description": "点滴学习，随时记录",
      "creator_id": 593074,
      "public": 1,
      "items_count": 3,
      "likes_count": 0,
      "watches_count": 1,
      "content_updated_at": "2020-09-15T10:43:57.966Z",
      "updated_at": "2020-09-15T10:43:58.000Z",
      "created_at": "2020-09-15T10:39:58.000Z",
      "user": null,
      "_serializer": "v2.book"
    },
    "user_id": 593074,
    "user": {
      "id": 593074,
      "type": "User",
      "login": "flamingcrystal",
      "name": "Flaming Crystal",
      "description": null,
      "avatar_url": "https://cdn.nlark.com/yuque/0/2019/jpeg/anonymous/1573519967166-e0d21489-4ab5-49b6-8893-7e77c44cd2b5.jpeg",
      "books_count": 5,
      "public_books_count": 1,
      "followers_count": 0,
      "following_count": 0,
      "created_at": "2019-11-12T00:53:12.000Z",
      "updated_at": "2020-09-15T10:39:58.000Z",
      "_serializer": "v2.user"
    },
    "format": "lake",
    "body": "更新了文章<br />这是文章的内容\n<a name=\"D4wZf\"></a>\n# 一级标题\n**加粗**<br />_斜体_\n\n- list\n",
    "body_draft": "更新了文章<br />这是文章的内容\n<a name=\"D4wZf\"></a>\n# 一级标题\n**加粗**<br />_斜体_\n\n- list\n",
    "body_html": "<!doctype html><div class=\"lake-content-editor-core lake-engine lake-typography-traditional\" data-lake-element=\"root\" data-selection-undefined=\"%7B%22path%22%3A%5B%5B2%2C0%2C4%5D%2C%5B2%2C0%2C4%5D%5D%2C%22active%22%3Atrue%7D\"><p data-lake-id=\"e17bcb083075181b3ca5ecd490e0fdf8\" style=\"font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;\"><span style=\"color: rgb(245, 34, 45);\">更新了文章</span></p><p data-lake-id=\"b791fecaceb7f4797bb8db8ea980d83b\" style=\"font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;\"><span>这是文章的内容</span></p><h1 data-lake-id=\"32cf8b61bf32d3ce61e3918c025210a3\" id=\"D4wZf\" style=\"padding: 7px 0px; margin: 0px; font-weight: 700; font-size: 28px; line-height: 36px;\">一级标题</h1><p data-lake-id=\"c2217c5c3a0ca3e2964daf6e9d9d6372\" style=\"font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;\"><strong>加粗</strong></p><p data-lake-id=\"aa28e7cfeb7ea314fb2017c4d3d0301a\" style=\"font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;\"><em>斜体</em></p><ul data-lake-id=\"9cbd73bdb6680f9f7eb9fde5217a2ffc\" lake-indent=\"0\" style=\"list-style-type: disc; margin: 0px; padding-left: 23px; font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word;\"><li data-lake-id=\"5a58e37ebb365f1905bde74c98d19061\">list</li></ul></div>",
    "public": 1,
    "status": 1,
    "view_status": 0,
    "read_status": 1,
    "likes_count": 0,
    "comments_count": 0,
    "content_updated_at": "2020-09-15T10:43:57.000Z",
    "deleted_at": null,
    "created_at": "2020-09-15T10:40:57.000Z",
    "updated_at": "2020-09-15T10:43:58.000Z",
    "published_at": "2020-09-15T10:43:57.000Z",
    "first_published_at": "2020-09-15T10:42:28.000Z",
    "word_count": 21,
    "_serializer": "webhook.doc_detail",
    "path": "flamingcrystal/tx5fs5/qddytu",
    "publish": false,
    "action_type": "update",
    "webhook_subject_type": "update",
    "actor_id": 593074
  }
}
```

## 删除文档

```json
{
  "data": {
    "id": 13230337,
    "slug": "trash-ETZ6JpfD",
    "title": "这是文章的标题",
    "book_id": 1782464,
    "book": {
      "id": 1782464,
      "type": "Book",
      "slug": "tx5fs5",
      "name": "示例知识库",
      "user_id": 593074,
      "description": "点滴学习，随时记录",
      "creator_id": 593074,
      "public": 1,
      "items_count": 2,
      "likes_count": 0,
      "watches_count": 1,
      "content_updated_at": "2020-09-15T10:43:57.966Z",
      "updated_at": "2020-09-15T10:46:07.000Z",
      "created_at": "2020-09-15T10:39:58.000Z",
      "user": null,
      "_serializer": "v2.book"
    },
    "user_id": 593074,
    "user": {
      "id": 593074,
      "type": "User",
      "login": "flamingcrystal",
      "name": "Flaming Crystal",
      "description": null,
      "avatar_url": "https://cdn.nlark.com/yuque/0/2019/jpeg/anonymous/1573519967166-e0d21489-4ab5-49b6-8893-7e77c44cd2b5.jpeg",
      "books_count": 5,
      "public_books_count": 1,
      "followers_count": 0,
      "following_count": 0,
      "created_at": "2019-11-12T00:53:12.000Z",
      "updated_at": "2020-09-15T10:39:58.000Z",
      "_serializer": "v2.user"
    },
    "format": "lake",
    "body": "更新了文章<br />这是文章的内容\n<a name=\"D4wZf\"></a>\n# 一级标题\n**加粗**<br />_斜体_\n\n- list\n",
    "body_draft": "更新了文章<br />这是文章的内容\n<a name=\"D4wZf\"></a>\n# 一级标题\n**加粗**<br />_斜体_\n\n- list\n",
    "body_html": "<!doctype html><div class=\"lake-content-editor-core lake-engine lake-typography-traditional\" data-lake-element=\"root\" data-selection-undefined=\"%7B%22path%22%3A%5B%5B2%2C0%2C4%5D%2C%5B2%2C0%2C4%5D%5D%2C%22active%22%3Atrue%7D\"><p data-lake-id=\"e17bcb083075181b3ca5ecd490e0fdf8\" style=\"font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;\"><span style=\"color: rgb(245, 34, 45);\">更新了文章</span></p><p data-lake-id=\"b791fecaceb7f4797bb8db8ea980d83b\" style=\"font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;\"><span>这是文章的内容</span></p><h1 data-lake-id=\"32cf8b61bf32d3ce61e3918c025210a3\" id=\"D4wZf\" style=\"padding: 7px 0px; margin: 0px; font-weight: 700; font-size: 28px; line-height: 36px;\">一级标题</h1><p data-lake-id=\"c2217c5c3a0ca3e2964daf6e9d9d6372\" style=\"font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;\"><strong>加粗</strong></p><p data-lake-id=\"aa28e7cfeb7ea314fb2017c4d3d0301a\" style=\"font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;\"><em>斜体</em></p><ul data-lake-id=\"9cbd73bdb6680f9f7eb9fde5217a2ffc\" lake-indent=\"0\" style=\"list-style-type: disc; margin: 0px; padding-left: 23px; font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word;\"><li data-lake-id=\"5a58e37ebb365f1905bde74c98d19061\">list</li></ul></div>",
    "public": 1,
    "status": 1,
    "view_status": 0,
    "read_status": 1,
    "likes_count": 0,
    "comments_count": 0,
    "content_updated_at": "2020-09-15T10:43:57.000Z",
    "deleted_at": "2020-09-15T10:46:06.000Z",
    "created_at": "2020-09-15T10:40:57.000Z",
    "updated_at": "2020-09-15T10:46:07.000Z",
    "published_at": "2020-09-15T10:43:57.000Z",
    "first_published_at": "2020-09-15T10:42:28.000Z",
    "word_count": 21,
    "_serializer": "webhook.doc_detail",
    "path": "flamingcrystal/tx5fs5/trash-ETZ6JpfD",
    "publish": false,
    "action_type": "delete",
    "webhook_subject_type": "delete",
    "actor_id": 593074
  }
}
```

## 新增评论

```json
{
  "data": {
    "id": 857182,
    "user_id": 593074,
    "parent_id": null,
    "body_html": "<p data-lake-id=\"a20d224c568e48b9d67847a2c66a8c01_p_0\">新增了一条<strong>评论</strong></p><h1>评论中的一级标题</h1>",
    "likes_count": 0,
    "mood": 0,
    "created_at": "2020-09-15T10:44:46.000Z",
    "updated_at": "2020-09-15T10:44:46.000Z",
    "status": 0,
    "to_user_id": null,
    "type": null,
    "user": {
      "id": 593074,
      "type": "User",
      "login": "flamingcrystal",
      "name": "Flaming Crystal",
      "description": null,
      "avatar_url": "https://cdn.nlark.com/yuque/0/2019/jpeg/anonymous/1573519967166-e0d21489-4ab5-49b6-8893-7e77c44cd2b5.jpeg",
      "followers_count": 0,
      "following_count": 0,
      "created_at": "2019-11-12T00:53:12.000Z",
      "updated_at": "2020-09-15T10:39:58.000Z",
      "_serializer": "v2.user"
    },
    "_serializer": "webhook.comment_detail",
    "commentable": {
      "id": 13230337,
      "slug": "qddytu",
      "title": "这是文章的标题",
      "book_id": 1782464,
      "book": {
        "id": 1782464,
        "type": "Book",
        "slug": "tx5fs5",
        "name": "示例知识库",
        "user_id": 593074,
        "description": "点滴学习，随时记录",
        "creator_id": 593074,
        "public": 1,
        "items_count": 3,
        "likes_count": 0,
        "watches_count": 1,
        "content_updated_at": "2020-09-15T10:43:57.966Z",
        "updated_at": "2020-09-15T10:43:58.000Z",
        "created_at": "2020-09-15T10:39:58.000Z",
        "user": null,
        "_serializer": "v2.book"
      },
      "user_id": 593074,
      "format": "lake",
      "body": "",
      "body_draft": "",
      "body_html": "",
      "public": 1,
      "status": 1,
      "view_status": 0,
      "read_status": 1,
      "likes_count": 0,
      "comments_count": 1,
      "content_updated_at": "2020-09-15T10:43:57.000Z",
      "deleted_at": null,
      "created_at": "2020-09-15T10:40:57.000Z",
      "updated_at": "2020-09-15T10:44:46.000Z",
      "published_at": "2020-09-15T10:43:57.000Z",
      "first_published_at": "2020-09-15T10:42:28.000Z",
      "word_count": 21,
      "user": null,
      "_serializer": "webhook.doc_detail",
      "path": "flamingcrystal/tx5fs5/qddytu"
    },
    "path": "flamingcrystal/tx5fs5/qddytu#reply-857182",
    "action_type": "comment_create",
    "webhook_subject_type": "comment_create",
    "actor_id": 593074
  }
}
```

## 更新评论

```json
{
  "data": {
    "id": 857182,
    "user_id": 593074,
    "parent_id": null,
    "body_html": "<p data-lake-id=\"a20d224c568e48b9d67847a2c66a8c01_p_0\">更新了评论，删除了一级标题</p>",
    "likes_count": 0,
    "mood": 0,
    "created_at": "2020-09-15T10:44:46.000Z",
    "updated_at": "2020-09-15T10:45:09.000Z",
    "status": 0,
    "to_user_id": null,
    "type": null,
    "user": {
      "id": 593074,
      "type": "User",
      "login": "flamingcrystal",
      "name": "Flaming Crystal",
      "description": null,
      "avatar_url": "https://cdn.nlark.com/yuque/0/2019/jpeg/anonymous/1573519967166-e0d21489-4ab5-49b6-8893-7e77c44cd2b5.jpeg",
      "followers_count": 0,
      "following_count": 0,
      "created_at": "2019-11-12T00:53:12.000Z",
      "updated_at": "2020-09-15T10:39:58.000Z",
      "_serializer": "v2.user"
    },
    "_serializer": "webhook.comment_detail",
    "commentable": {
      "id": 13230337,
      "slug": "qddytu",
      "title": "这是文章的标题",
      "book_id": 1782464,
      "book": {
        "id": 1782464,
        "type": "Book",
        "slug": "tx5fs5",
        "name": "示例知识库",
        "user_id": 593074,
        "description": "点滴学习，随时记录",
        "creator_id": 593074,
        "public": 1,
        "items_count": 3,
        "likes_count": 0,
        "watches_count": 1,
        "content_updated_at": "2020-09-15T10:43:57.966Z",
        "updated_at": "2020-09-15T10:43:58.000Z",
        "created_at": "2020-09-15T10:39:58.000Z",
        "user": null,
        "_serializer": "v2.book"
      },
      "user_id": 593074,
      "format": "lake",
      "body": "",
      "body_draft": "",
      "body_html": "",
      "public": 1,
      "status": 1,
      "view_status": 0,
      "read_status": 1,
      "likes_count": 0,
      "comments_count": 1,
      "content_updated_at": "2020-09-15T10:43:57.000Z",
      "deleted_at": null,
      "created_at": "2020-09-15T10:40:57.000Z",
      "updated_at": "2020-09-15T10:44:46.000Z",
      "published_at": "2020-09-15T10:43:57.000Z",
      "first_published_at": "2020-09-15T10:42:28.000Z",
      "word_count": 21,
      "user": null,
      "_serializer": "webhook.doc_detail",
      "path": "flamingcrystal/tx5fs5/qddytu"
    },
    "path": "flamingcrystal/tx5fs5/qddytu#reply-857182",
    "action_type": "comment_update",
    "webhook_subject_type": "comment_update",
    "actor_id": 593074
  }
}
```

## 删除评论

```json
{
  "data": {
    "id": 857182,
    "user_id": 593074,
    "parent_id": null,
    "body_html": "<p data-lake-id=\"a20d224c568e48b9d67847a2c66a8c01_p_0\">更新了评论，删除了一级标题</p>",
    "likes_count": 0,
    "mood": 0,
    "created_at": "2020-09-15T10:44:46.000Z",
    "updated_at": "2020-09-15T10:45:09.000Z",
    "status": 0,
    "to_user_id": null,
    "type": null,
    "user": {
      "id": 593074,
      "type": "User",
      "login": "flamingcrystal",
      "name": "Flaming Crystal",
      "description": null,
      "avatar_url": "https://cdn.nlark.com/yuque/0/2019/jpeg/anonymous/1573519967166-e0d21489-4ab5-49b6-8893-7e77c44cd2b5.jpeg",
      "followers_count": 0,
      "following_count": 0,
      "created_at": "2019-11-12T00:53:12.000Z",
      "updated_at": "2020-09-15T10:39:58.000Z",
      "_serializer": "v2.user"
    },
    "_serializer": "webhook.comment_detail",
    "commentable": {
      "id": 13230337,
      "slug": "qddytu",
      "title": "这是文章的标题",
      "book_id": 1782464,
      "book": {
        "id": 1782464,
        "type": "Book",
        "slug": "tx5fs5",
        "name": "示例知识库",
        "user_id": 593074,
        "description": "点滴学习，随时记录",
        "creator_id": 593074,
        "public": 1,
        "items_count": 3,
        "likes_count": 0,
        "watches_count": 1,
        "content_updated_at": "2020-09-15T10:43:57.966Z",
        "updated_at": "2020-09-15T10:43:58.000Z",
        "created_at": "2020-09-15T10:39:58.000Z",
        "user": null,
        "_serializer": "v2.book"
      },
      "user_id": 593074,
      "format": "lake",
      "body": "",
      "body_draft": "",
      "body_html": "",
      "public": 1,
      "status": 1,
      "view_status": 0,
      "read_status": 1,
      "likes_count": 0,
      "comments_count": 0,
      "content_updated_at": "2020-09-15T10:43:57.000Z",
      "deleted_at": null,
      "created_at": "2020-09-15T10:40:57.000Z",
      "updated_at": "2020-09-15T10:45:54.000Z",
      "published_at": "2020-09-15T10:43:57.000Z",
      "first_published_at": "2020-09-15T10:42:28.000Z",
      "word_count": 21,
      "user": null,
      "_serializer": "webhook.doc_detail",
      "path": "flamingcrystal/tx5fs5/qddytu"
    },
    "path": "flamingcrystal/tx5fs5/qddytu#reply-857182",
    "action_type": "comment_delete",
    "webhook_subject_type": "comment_delete",
    "actor_id": 593074
  }
}
```

## 新增评论回复

```json
{
  "data": {
    "id": 857191,
    "user_id": 593074,
    "parent_id": 857190,
    "body_html": "<p data-lake-id=\"a20d224c568e48b9d67847a2c66a8c01_p_0\">新增评论回复</p>",
    "likes_count": 0,
    "mood": 0,
    "created_at": "2020-09-15T10:47:25.000Z",
    "updated_at": "2020-09-15T10:47:25.000Z",
    "status": 0,
    "to_user_id": null,
    "type": null,
    "user": {
      "id": 593074,
      "type": "User",
      "login": "flamingcrystal",
      "name": "Flaming Crystal",
      "description": null,
      "avatar_url": "https://cdn.nlark.com/yuque/0/2019/jpeg/anonymous/1573519967166-e0d21489-4ab5-49b6-8893-7e77c44cd2b5.jpeg",
      "followers_count": 0,
      "following_count": 0,
      "created_at": "2019-11-12T00:53:12.000Z",
      "updated_at": "2020-09-15T10:39:58.000Z",
      "_serializer": "v2.user"
    },
    "_serializer": "webhook.comment_detail",
    "commentable": {
      "id": 13230337,
      "slug": "qddytu",
      "title": "这是文章的标题",
      "book_id": 1782464,
      "book": {
        "id": 1782464,
        "type": "Book",
        "slug": "tx5fs5",
        "name": "示例知识库",
        "user_id": 593074,
        "description": "点滴学习，随时记录",
        "creator_id": 593074,
        "public": 1,
        "items_count": 2,
        "likes_count": 0,
        "watches_count": 1,
        "content_updated_at": "2020-09-15T10:43:57.966Z",
        "updated_at": "2020-09-15T10:46:55.000Z",
        "created_at": "2020-09-15T10:39:58.000Z",
        "user": null,
        "_serializer": "v2.book"
      },
      "user_id": 593074,
      "format": "lake",
      "body": "",
      "body_draft": "",
      "body_html": "",
      "public": 1,
      "status": 1,
      "view_status": 0,
      "read_status": 1,
      "likes_count": 0,
      "comments_count": 2,
      "content_updated_at": "2020-09-15T10:43:57.000Z",
      "deleted_at": null,
      "created_at": "2020-09-15T10:40:57.000Z",
      "updated_at": "2020-09-15T10:47:25.000Z",
      "published_at": "2020-09-15T10:43:57.000Z",
      "first_published_at": "2020-09-15T10:42:28.000Z",
      "word_count": 21,
      "user": null,
      "_serializer": "webhook.doc_detail",
      "path": "flamingcrystal/tx5fs5/qddytu"
    },
    "path": "flamingcrystal/tx5fs5/qddytu#reply-857191",
    "action_type": "comment_reply_create",
    "webhook_subject_type": "comment_reply_create",
    "actor_id": 593074
  }
}
```

## 更新评论回复

```json
{
  "data": {
    "id": 857191,
    "user_id": 593074,
    "parent_id": 857190,
    "body_html": "<p data-lake-id=\"a20d224c568e48b9d67847a2c66a8c01_p_0\">更新评论回复</p>",
    "likes_count": 0,
    "mood": 0,
    "created_at": "2020-09-15T10:47:25.000Z",
    "updated_at": "2020-09-15T10:47:35.000Z",
    "status": 0,
    "to_user_id": null,
    "type": null,
    "user": {
      "id": 593074,
      "type": "User",
      "login": "flamingcrystal",
      "name": "Flaming Crystal",
      "description": null,
      "avatar_url": "https://cdn.nlark.com/yuque/0/2019/jpeg/anonymous/1573519967166-e0d21489-4ab5-49b6-8893-7e77c44cd2b5.jpeg",
      "followers_count": 0,
      "following_count": 0,
      "created_at": "2019-11-12T00:53:12.000Z",
      "updated_at": "2020-09-15T10:39:58.000Z",
      "_serializer": "v2.user"
    },
    "_serializer": "webhook.comment_detail",
    "commentable": {
      "id": 13230337,
      "slug": "qddytu",
      "title": "这是文章的标题",
      "book_id": 1782464,
      "book": {
        "id": 1782464,
        "type": "Book",
        "slug": "tx5fs5",
        "name": "示例知识库",
        "user_id": 593074,
        "description": "点滴学习，随时记录",
        "creator_id": 593074,
        "public": 1,
        "items_count": 2,
        "likes_count": 0,
        "watches_count": 1,
        "content_updated_at": "2020-09-15T10:43:57.966Z",
        "updated_at": "2020-09-15T10:46:55.000Z",
        "created_at": "2020-09-15T10:39:58.000Z",
        "user": null,
        "_serializer": "v2.book"
      },
      "user_id": 593074,
      "format": "lake",
      "body": "",
      "body_draft": "",
      "body_html": "",
      "public": 1,
      "status": 1,
      "view_status": 0,
      "read_status": 1,
      "likes_count": 0,
      "comments_count": 2,
      "content_updated_at": "2020-09-15T10:43:57.000Z",
      "deleted_at": null,
      "created_at": "2020-09-15T10:40:57.000Z",
      "updated_at": "2020-09-15T10:47:25.000Z",
      "published_at": "2020-09-15T10:43:57.000Z",
      "first_published_at": "2020-09-15T10:42:28.000Z",
      "word_count": 21,
      "user": null,
      "_serializer": "webhook.doc_detail",
      "path": "flamingcrystal/tx5fs5/qddytu"
    },
    "path": "flamingcrystal/tx5fs5/qddytu#reply-857191",
    "action_type": "comment_reply_update",
    "webhook_subject_type": "comment_reply_update",
    "actor_id": 593074
  }
}
```

## 删除评论回复

```json
{
  "data": {
    "id": 857191,
    "user_id": 593074,
    "parent_id": 857190,
    "body_html": "<p data-lake-id=\"a20d224c568e48b9d67847a2c66a8c01_p_0\">更新评论回复</p>",
    "likes_count": 0,
    "mood": 0,
    "created_at": "2020-09-15T10:47:25.000Z",
    "updated_at": "2020-09-15T10:47:35.000Z",
    "status": 0,
    "to_user_id": null,
    "type": null,
    "user": {
      "id": 593074,
      "type": "User",
      "login": "flamingcrystal",
      "name": "Flaming Crystal",
      "description": null,
      "avatar_url": "https://cdn.nlark.com/yuque/0/2019/jpeg/anonymous/1573519967166-e0d21489-4ab5-49b6-8893-7e77c44cd2b5.jpeg",
      "followers_count": 0,
      "following_count": 0,
      "created_at": "2019-11-12T00:53:12.000Z",
      "updated_at": "2020-09-15T10:39:58.000Z",
      "_serializer": "v2.user"
    },
    "_serializer": "webhook.comment_detail",
    "commentable": {
      "id": 13230337,
      "slug": "qddytu",
      "title": "这是文章的标题",
      "book_id": 1782464,
      "book": {
        "id": 1782464,
        "type": "Book",
        "slug": "tx5fs5",
        "name": "示例知识库",
        "user_id": 593074,
        "description": "点滴学习，随时记录",
        "creator_id": 593074,
        "public": 1,
        "items_count": 2,
        "likes_count": 0,
        "watches_count": 1,
        "content_updated_at": "2020-09-15T10:43:57.966Z",
        "updated_at": "2020-09-15T10:46:55.000Z",
        "created_at": "2020-09-15T10:39:58.000Z",
        "user": null,
        "_serializer": "v2.book"
      },
      "user_id": 593074,
      "format": "lake",
      "body": "",
      "body_draft": "",
      "body_html": "",
      "public": 1,
      "status": 1,
      "view_status": 0,
      "read_status": 1,
      "likes_count": 0,
      "comments_count": 1,
      "content_updated_at": "2020-09-15T10:43:57.000Z",
      "deleted_at": null,
      "created_at": "2020-09-15T10:40:57.000Z",
      "updated_at": "2020-09-15T10:47:43.000Z",
      "published_at": "2020-09-15T10:43:57.000Z",
      "first_published_at": "2020-09-15T10:42:28.000Z",
      "word_count": 21,
      "user": null,
      "_serializer": "webhook.doc_detail",
      "path": "flamingcrystal/tx5fs5/qddytu"
    },
    "path": "flamingcrystal/tx5fs5/qddytu#reply-857191",
    "action_type": "comment_reply_delete",
    "webhook_subject_type": "comment_reply_delete",
    "actor_id": 593074
  }
}
```

# 总结

由于官方没有对各个字段的说明，所以我们也只能先把webhook的具体内容记录下来，再做具体分析。我自己折腾的时候，也是借助[webhook.site](https://webhook.site/)，手动更新知识库，一条一条对，太麻烦了，希望能帮到其他遇到这个坑的帖子吧。

个人认为path、action_type之类的字段比较重要吧，其他的什么自己去研究下就行了。