# Obsidian Timestamp Player

[![GitHub release](https://img.shields.io/github/v/release/zhoulianglen/obsidian-timestamp-player)](https://github.com/zhoulianglen/obsidian-timestamp-player/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

一款 Obsidian 插件，让你在笔记中嵌入音频播放器并通过时间戳链接快速跳转到指定时间点，支持多音频区域和自动跟随高亮。

[English](README.md)

## 演示

假设有如下文档：

```markdown
![[会议录音.ogg]]

张三 00:27
所以核心思路是先搭一个平台...

李四 01:02
对，我们应该先从 MVP 开始。
```

在阅读视图下，每个时间戳变成可点击的 `▶ 00:27` 按钮。点击从该位置播放，再次点击暂停。

## 功能

- **说话人时间戳** — 行首 `说话人 MM:SS` 转为可点击的播放按钮
- **正文时间戳** — 正文中的 `MM:SS` 同样可点击
- **播放/暂停切换** — 点击 `▶` 播放，点击 `⏸` 暂停，再点恢复播放
- **播放跟踪** — 播放过程中，当前时间戳自动高亮，随播放进度依次往下移动
- **多音频支持** — 每个音频文件仅控制其所属区段的时间戳
- **自动检测** — 仅在文档包含嵌入音频时插件才生效

## 时间戳格式

插件识别两种模式：

### 说话人行

时间戳在行末，前面是说话人名称：

```
说话人 MM:SS
下一行是转录内容...
```

### 正文时间戳

时间戳出现在文本任意位置：

```
在 03:15 提到的方案已经通过了。
```

> **注意：** 文档中必须包含至少一个嵌入的音频文件（`![[文件.mp3]]`、`![[文件.ogg]]`、`![[文件.wav]]` 等），插件才会生效。支持格式：mp3、wav、ogg、webm、m4a、flac、3gp。

## 多音频文件

当文档包含多个音频文件时，插件会自动将文档分区。每个音频文件控制其**下方**的时间戳，直到遇到下一个音频文件（或文档末尾）为止。

```markdown
![[访谈录音-上半场.mp3]]

张三 00:27
上半场的对话内容...

李四 01:02
还是上半场...

![[访谈录音-下半场.mp3]]

张三 00:15
这是下半场的录音...

李四 00:45
也是下半场...
```

| 时间戳 | 对应音频 |
|--------|----------|
| `00:27`、`01:02` | 访谈录音-上半场.mp3 |
| `00:15`、`00:45` | 访谈录音-下半场.mp3 |

各区段完全独立——不同区段的时间戳可以重叠（例如都有 `00:00`）不会冲突。切换区段时，前一个音频会自动暂停。

## 安装

### 通过 BRAT 安装（推荐）

1. 安装 [BRAT](https://github.com/TfTHacker/obsidian42-brat) 插件
2. 添加本仓库：`https://github.com/zhoulianglen/obsidian-timestamp-player`
3. 在 设置 → 第三方插件 中启用

### 手动安装

1. 从 [最新 release](https://github.com/zhoulianglen/obsidian-timestamp-player/releases) 下载 `main.js`、`styles.css`、`manifest.json`
2. 在 vault 中创建 `.obsidian/plugins/timestamp-player/` 文件夹
3. 将三个文件复制进去
4. 在 设置 → 第三方插件 中启用

## 环境要求

- Obsidian 1.0.0+
- 阅读视图（插件不影响编辑/实时预览模式）

## 许可

MIT — [zhoulianglen](https://github.com/zhoulianglen)
