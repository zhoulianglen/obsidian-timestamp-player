import { Plugin, MarkdownPostProcessorContext, MarkdownView } from "obsidian";

const SPEAKER_LINE_RE = /^(.+?)\s+(\d{1,3}):(\d{2})\s*$/;

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
			const nodesToProcess: { node: Text; match: RegExpMatchArray }[] = [];

			for (const node of Array.from(p.childNodes)) {
				if (node.nodeType === Node.TEXT_NODE) {
					const text = node.textContent?.trim() ?? "";
					const match = text.match(SPEAKER_LINE_RE);
					if (match) {
						nodesToProcess.push({ node: node as Text, match });
					}
				}
			}

			for (const { node, match } of nodesToProcess.reverse()) {
				this.replaceWithButton(node, match);
			}
		}
	}

	private replaceWithButton(node: Text, match: RegExpMatchArray) {
		const speaker = match[1];
		const minutes = parseInt(match[2], 10);
		const seconds = parseInt(match[3], 10);
		const totalSeconds = minutes * 60 + seconds;
		const timeStr = match[2] + ":" + match[3];

		const wrapper = document.createDocumentFragment();

		const speakerSpan = createSpan({ cls: "tsp-speaker", text: speaker + " " });
		wrapper.appendChild(speakerSpan);

		const btn = createSpan({ cls: "tsp-timestamp" });
		btn.setAttribute("data-seconds", String(totalSeconds));
		btn.setAttribute("role", "button");
		btn.setAttribute("aria-label", `Play from ${timeStr}`);

		btn.appendChild(createSpan({ cls: "tsp-play-icon", text: "▶" }));
		btn.appendChild(createSpan({ cls: "tsp-time", text: timeStr }));

		btn.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.seekAndPlay(btn, totalSeconds);
		});

		wrapper.appendChild(btn);
		node.parentNode?.replaceChild(wrapper, node);
	}

	private seekAndPlay(clickedEl: HTMLElement, seconds: number) {
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!view) return;

		const container = view.containerEl;
		const audio =
			(container.querySelector("audio") as HTMLAudioElement | null) ||
			(document.querySelector("audio") as HTMLAudioElement | null);
		if (!audio) return;

		container
			.querySelectorAll(".tsp-timestamp.tsp-active")
			.forEach((el) => el.removeClass("tsp-active"));

		clickedEl.addClass("tsp-active");

		audio.currentTime = Math.min(seconds, audio.duration || Infinity);
		audio.play();
	}
}
