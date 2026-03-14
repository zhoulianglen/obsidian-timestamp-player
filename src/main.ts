import { Plugin, MarkdownPostProcessorContext, MarkdownView } from "obsidian";

const SPEAKER_LINE_RE = /^(.+?)\s+(\d{1,3}):(\d{2})\s*$/;
const INLINE_TS_RE = /(\d{1,3}:\d{2})/g;

export default class TimestampPlayerPlugin extends Plugin {
	async onload() {
		this.registerMarkdownPostProcessor(
			(el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
				this.processTimestamps(el);
			}
		);
	}

	private processTimestamps(el: HTMLElement) {
		const paragraphs = el.querySelectorAll("p");

		for (const p of Array.from(paragraphs)) {
			const nodesToProcess: { node: Text; type: "speaker" | "inline"; match: RegExpMatchArray }[] = [];

			for (const node of Array.from(p.childNodes)) {
				if (node.nodeType !== Node.TEXT_NODE) continue;
				const text = node.textContent?.trim() ?? "";
				if (!text) continue;

				const speakerMatch = text.match(SPEAKER_LINE_RE);
				if (speakerMatch) {
					nodesToProcess.push({ node: node as Text, type: "speaker", match: speakerMatch });
				} else if (INLINE_TS_RE.test(text)) {
					INLINE_TS_RE.lastIndex = 0;
					nodesToProcess.push({ node: node as Text, type: "inline", match: [] as unknown as RegExpMatchArray });
				}
			}

			for (const item of nodesToProcess.reverse()) {
				if (item.type === "speaker") {
					this.replaceSpeakerLine(item.node, item.match);
				} else {
					this.replaceInlineTimestamps(item.node);
				}
			}
		}
	}

	private replaceSpeakerLine(node: Text, match: RegExpMatchArray) {
		const speaker = match[1];
		const minutes = parseInt(match[2], 10);
		const seconds = parseInt(match[3], 10);
		const totalSeconds = minutes * 60 + seconds;
		const timeStr = match[2] + ":" + match[3];

		const wrapper = document.createDocumentFragment();
		wrapper.appendChild(createSpan({ cls: "tsp-speaker", text: speaker + " " }));
		wrapper.appendChild(this.createTimestampBtn(timeStr, totalSeconds));
		node.parentNode?.replaceChild(wrapper, node);
	}

	private replaceInlineTimestamps(node: Text) {
		const text = node.textContent ?? "";
		const fragment = document.createDocumentFragment();
		let lastIndex = 0;

		INLINE_TS_RE.lastIndex = 0;
		let m: RegExpExecArray | null;

		while ((m = INLINE_TS_RE.exec(text)) !== null) {
			if (m.index > lastIndex) {
				fragment.appendChild(document.createTextNode(text.slice(lastIndex, m.index)));
			}
			const tsStr = m[1];
			const parts = tsStr.split(":");
			const totalSeconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
			fragment.appendChild(this.createTimestampBtn(tsStr, totalSeconds));
			lastIndex = m.index + m[0].length;
		}

		if (lastIndex < text.length) {
			fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
		}

		node.parentNode?.replaceChild(fragment, node);
	}

	private activeBtn: HTMLElement | null = null;
	private activeAudio: HTMLAudioElement | null = null;

	private createTimestampBtn(timeStr: string, totalSeconds: number): HTMLSpanElement {
		const btn = createSpan({ cls: "tsp-timestamp" });
		btn.setAttribute("data-seconds", String(totalSeconds));
		btn.setAttribute("role", "button");
		btn.setAttribute("aria-label", `Play from ${timeStr}`);

		const icon = createSpan({ cls: "tsp-play-icon", text: "▶" });
		btn.appendChild(icon);
		btn.appendChild(createSpan({ cls: "tsp-time", text: timeStr }));

		btn.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.togglePlay(btn, icon, totalSeconds);
		});

		return btn;
	}

	private togglePlay(btn: HTMLElement, icon: HTMLElement, seconds: number) {
		// If clicking the currently playing button, toggle pause/play
		if (this.activeBtn === btn && this.activeAudio && !this.activeAudio.paused) {
			this.activeAudio.pause();
			icon.textContent = "▶";
			btn.removeClass("tsp-active");
			this.activeBtn = null;
			return;
		}

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!view) return;

		const container = view.containerEl;
		const allAudio = container.querySelectorAll("audio");
		if (allAudio.length === 0) return;

		// Pause all and reset previous active button
		allAudio.forEach((a) => {
			if (!(a as HTMLAudioElement).paused) (a as HTMLAudioElement).pause();
		});

		if (this.activeBtn && this.activeBtn !== btn) {
			const prevIcon = this.activeBtn.querySelector(".tsp-play-icon");
			if (prevIcon) prevIcon.textContent = "▶";
			this.activeBtn.removeClass("tsp-active");
		}

		// Seek all audio to same position
		allAudio.forEach((a) => {
			(a as HTMLAudioElement).currentTime = Math.min(seconds, (a as HTMLAudioElement).duration || Infinity);
		});

		// Play the last one
		const audio = allAudio[allAudio.length - 1] as HTMLAudioElement;
		audio.play().catch(() => {});

		// Update button state
		icon.textContent = "⏸";
		btn.addClass("tsp-active");
		this.activeBtn = btn;
		this.activeAudio = audio;

		// Reset button when audio ends or is paused externally
		const onPause = () => {
			if (this.activeBtn === btn) {
				icon.textContent = "▶";
				btn.removeClass("tsp-active");
				this.activeBtn = null;
				this.activeAudio = null;
			}
			audio.removeEventListener("pause", onPause);
			audio.removeEventListener("ended", onPause);
		};
		audio.addEventListener("pause", onPause);
		audio.addEventListener("ended", onPause);
	}
}
