# Obsidian Timestamp Player

Click timestamps in transcription documents to seek and play the embedded audio.

[中文说明](#中文说明)

## Demo

```markdown
![[meeting-recording.ogg]]

Alice 00:27
So the main idea is to build a platform that connects...

Bob 01:02
Right, and we should probably start with the MVP first.
```

In reading view, each timestamp becomes a clickable `▶ 00:27` button. Click to seek and play; click again to pause.

## Features

- **Speaker lines**: `SpeakerName MM:SS` at the start of a line → clickable play button
- **Inline timestamps**: `MM:SS` anywhere in text → also clickable
- **Toggle play/pause**: Click `▶` to play, click `⏸` to pause
- **Auto-sync**: Pausing from Obsidian's native player resets the button state
- **Active highlight**: Currently playing timestamp is visually highlighted

## Format

The plugin detects two patterns:

**Speaker lines** (timestamp at end of line):
```
SpeakerName MM:SS
Content on next line
```

**Inline timestamps** (anywhere in text):
```
As mentioned at 03:15, the proposal was...
```

The document must have an embedded audio file (`![[file.ogg]]`, `![[file.mp3]]`, etc.).

## Install

### Via BRAT (recommended)

1. Install [BRAT](https://github.com/TfTHacker/obsidian42-brat)
2. Add this repo: `zhoulianglen/obsidian-timestamp-player`
3. Enable in Settings → Community plugins

### Manual

1. Download `main.js`, `styles.css`, `manifest.json` from the latest release
2. Create `.obsidian/plugins/obsidian-timestamp-player/`
3. Copy the files into it
4. Enable in Settings → Community plugins

## Notes

- Only works in **reading view**
- If multiple audio players exist, the last one is used
- Speaker name supports any characters (Chinese, English, numbers, spaces, etc.)

## License

MIT — [zhoulianglen](https://github.com/zhoulianglen)

---

# 中文说明

点击转录文档中的时间戳，跳转到对应位置播放录音。

## 演示

```markdown
![[会议录音.ogg]]

张三 00:27
所以核心思路是先搭一个平台...

李四 01:02
对，我们应该先从 MVP 开始。
```

在阅读视图下，时间戳变成可点击的 `▶ 00:27` 按钮。点击播放，再点击暂停。

## 功能

- **说话人行**：行首 `说话人 MM:SS` → 可点击播放按钮
- **正文时间戳**：正文中的 `MM:SS` → 同样可点击
- **播放/暂停切换**：点击 `▶` 播放，点击 `⏸` 暂停
- **状态同步**：用 Obsidian 原生播放器暂停时，按钮状态自动恢复
- **高亮显示**：当前播放的时间戳高亮

## 格式要求

插件识别两种模式：

**说话人行**（时间戳在行末）：
```
说话人 MM:SS
下一行是内容
```

**正文时间戳**（出现在文本任意位置）：
```
在 03:15 提到的方案是...
```

文档中需要有嵌入的音频文件（`![[文件.ogg]]`、`![[文件.mp3]]` 等）。

## 安装

### 通过 BRAT 安装（推荐）

1. 安装 [BRAT](https://github.com/TfTHacker/obsidian42-brat) 插件
2. 添加本仓库：`zhoulianglen/obsidian-timestamp-player`
3. 在 设置 → 第三方插件 中启用

### 手动安装

1. 下载最新 release 中的 `main.js`、`styles.css`、`manifest.json`
2. 在 `.obsidian/plugins/` 下创建 `obsidian-timestamp-player/` 文件夹
3. 将文件复制进去
4. 在 设置 → 第三方插件 中启用

## 注意事项

- 仅在**阅读视图**下生效
- 如果页面有多个音频播放器，默认使用最后一个
- 说话人名支持中文、英文、数字、空格等任意字符

## 许可

MIT — [zhoulianglen](https://github.com/zhoulianglen)
