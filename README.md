# Obsidian Timestamp Player

Click timestamps in transcription documents to seek and play the embedded audio — like Get Notes (得到笔记), but in Obsidian.

点击转录文档中的时间戳，即可跳转到对应位置播放录音——类似得到笔记的体验，在 Obsidian 中实现。

## Demo

```markdown
![[meeting-recording.ogg]]

周良 Len 00:27
呃，你可能得等我下个礼拜应该还会来深圳。

Mike 01:02
他不会不会是那个什么 meet48 那个人吧？
```

In reading view, each timestamp becomes a clickable `▶ 00:27` button. Click it to seek the audio player to that position and start playing.

在阅读视图下，每个时间戳会变成可点击的 `▶ 00:27` 按钮。点击即跳转到对应时间并自动播放。

## Format / 格式要求

The plugin detects speaker lines matching this pattern:

插件识别以下格式的说话人行：

```
SpeakerName MM:SS
Content on next line
```

- Speaker name can contain Chinese, English, numbers, spaces — anything before the timestamp
- Timestamp format: `MM:SS` (e.g., `00:27`, `125:03`)
- The document must have an embedded audio file (`![[file.ogg]]`, `![[file.mp3]]`, etc.)

---

- 说话人名支持中文、英文、数字、空格等任意字符
- 时间戳格式：`MM:SS`（如 `00:27`、`125:03`）
- 文档中需要有嵌入的音频文件（`![[file.ogg]]`、`![[file.mp3]]` 等）

## Install / 安装

### Via BRAT (recommended)

1. Install [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin
2. Add this repo: `zhoulianglen/obsidian-timestamp-player`
3. Enable the plugin in Settings → Community plugins

### Manual

1. Download `main.js`, `styles.css`, and `manifest.json` from the latest release
2. Create folder: `.obsidian/plugins/obsidian-timestamp-player/`
3. Copy the three files into it
4. Enable the plugin in Settings → Community plugins

---

### 通过 BRAT 安装（推荐）

1. 安装 [BRAT](https://github.com/TfTHacker/obsidian42-brat) 插件
2. 添加本仓库：`zhoulianglen/obsidian-timestamp-player`
3. 在 设置 → 第三方插件 中启用

### 手动安装

1. 下载最新 release 中的 `main.js`、`styles.css`、`manifest.json`
2. 在 `.obsidian/plugins/` 下创建 `obsidian-timestamp-player/` 文件夹
3. 将三个文件复制进去
4. 在 设置 → 第三方插件 中启用

## Notes / 注意事项

- Only works in **reading view** (not editing/source mode)
- If multiple audio players exist on the page, the first one is used
- The currently playing timestamp is highlighted

---

- 仅在**阅读视图**下生效（编辑/源码模式不支持）
- 如果页面有多个音频播放器，默认控制第一个
- 当前播放的时间戳会高亮显示

## License

MIT
