import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, test } from "vitest"
import { MediaBlock } from "./media-block"

const mux = { playbackId: "abc123", posterUrl: "https://image.mux.com/abc123/thumbnail.webp" } as const
const image = { src: "/campaign.png", alt: "Campaign artwork" } as const
const embed = { url: "https://www.youtube.com/watch?v=19g66ezsKAg", title: "Showreel" } as const

describe("MediaBlock", () => {
	test("renders nothing when no media is supplied", () => {
		expect(renderToStaticMarkup(<MediaBlock />)).toBe("")
	})

	test("renders the image when only `media` is supplied", () => {
		const html = renderToStaticMarkup(<MediaBlock media={image} />)
		expect(html).toContain("/campaign.png")
	})

	test("renders the Mux clip when `mux` is supplied", () => {
		const html = renderToStaticMarkup(<MediaBlock mux={mux} />)
		expect(html).toContain("image.mux.com/abc123")
	})

	test("Mux wins when both `mux` and `media` are supplied", () => {
		const html = renderToStaticMarkup(<MediaBlock mux={mux} media={image} />)
		expect(html).toContain("image.mux.com/abc123")
		expect(html).not.toContain("/campaign.png")
	})

	test("renders a YouTube watch URL as a privacy-mode embed", () => {
		const html = renderToStaticMarkup(<MediaBlock embed={embed} />)
		expect(html).toContain("youtube-nocookie.com/embed/19g66ezsKAg")
		expect(html).toContain('title="Showreel"')
	})

	test.each([
		["youtu.be short link", "https://youtu.be/19g66ezsKAg"],
		["oEmbed endpoint", "https://www.youtube.com/oembed?url=https%3A%2F%2Fyoutu.be%2F19g66ezsKAg&format=json"],
		["shorts link", "https://www.youtube.com/shorts/19g66ezsKAg"],
	])("accepts a %s", (_label, url) => {
		const html = renderToStaticMarkup(<MediaBlock embed={{ url, title: "Showreel" }} />)
		expect(html).toContain("youtube-nocookie.com/embed/19g66ezsKAg")
	})

	test("the embed fills the frame rather than nesting a second ratio", () => {
		const html = renderToStaticMarkup(<MediaBlock embed={embed} />)
		expect(html).not.toContain("aspect-video")
		expect(html).toContain("absolute inset-0 size-full")
	})

	test("the embed is lazy unless the block is above the fold", () => {
		expect(renderToStaticMarkup(<MediaBlock embed={embed} />)).toContain('loading="lazy"')
		expect(renderToStaticMarkup(<MediaBlock embed={embed} priority />)).toContain('loading="eager"')
	})

	test("Mux wins over an embed, and an embed over an image", () => {
		expect(renderToStaticMarkup(<MediaBlock mux={mux} embed={embed} />)).not.toContain("youtube-nocookie")
		const overImage = renderToStaticMarkup(<MediaBlock embed={embed} media={image} />)
		expect(overImage).toContain("youtube-nocookie")
		expect(overImage).not.toContain("/campaign.png")
	})

	test('an embed keeps a 16:9 frame under `aspect="auto"`, ignoring a stale image', () => {
		const stale = { src: { url: "/tall.png", width: 400, height: 800 }, alt: "" }
		const html = renderToStaticMarkup(<MediaBlock embed={embed} media={stale} aspect="auto" />)
		expect(html).toContain("16 / 9")
	})

	test("an empty embed URL falls through to the image", () => {
		const html = renderToStaticMarkup(<MediaBlock embed={{ url: "" }} media={image} />)
		expect(html).toContain("/campaign.png")
	})

	test("defaults to a 16:9 frame", () => {
		const html = renderToStaticMarkup(<MediaBlock media={image} />)
		expect(html).toContain("16 / 9")
	})

	test('`aspect="square"` reserves a 1:1 frame', () => {
		const html = renderToStaticMarkup(<MediaBlock media={image} aspect="square" />)
		expect(html).toContain("1 / 1")
	})

	test('`aspect="auto"` takes the Mux clip\'s own ratio', () => {
		const html = renderToStaticMarkup(<MediaBlock mux={{ ...mux, aspectRatio: "4:5" }} aspect="auto" />)
		expect(html).toContain("4 / 5")
	})
})
