<script>
export default {
	name: "AlertIcon",
	props: {
		backgroundColor: {
			type: String,
			default: "#FF0000"
		},
		foregroundColor: {
			type: String,
			default: "#FFFFFF"
		},
		backgroundOpacity: {
			type: Number,
			default: 1
		},
		foregroundOpacity: {
			type: Number,
			default: 1
		},
		scale: {
			type: Number,
			default: 1
		}
	},
	mounted() {
		this.$el.style.transform = `scale(${this.scale})`;
		this.$el.querySelectorAll(".background").forEach(el => {
			el.style.fill = this.backgroundColor;
			el.style.opacity = this.backgroundOpacity;
		});
		this.$el.querySelectorAll(".foreground").forEach(el => {
			el.style.fill = this.foregroundColor;
			el.style.opacity = this.foregroundOpacity;
		});
	}
}
</script>

<template>
	<svg
		width="47.625mm"
		height="47.625mm"
		viewBox="0 0 47.625 47.625"
		version="1.1"
		id="svg5"
		inkscape:version="1.2.2 (732a01da63, 2022-12-09)"
		sodipodi:docname="drawing.svg"
		inkscape:dataloss="true"
		xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
		xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:svg="http://www.w3.org/2000/svg">
		<sodipodi:namedview
			id="namedview7"
			pagecolor="#505050"
			bordercolor="#eeeeee"
			borderopacity="1"
			inkscape:showpageshadow="0"
			inkscape:pageopacity="0"
			inkscape:pagecheckerboard="0"
			inkscape:deskcolor="#505050"
			inkscape:document-units="mm"
			showgrid="true"
			inkscape:zoom="2.9825758"
			inkscape:cx="76.443993"
			inkscape:cy="128.07722"
			inkscape:window-width="1920"
			inkscape:window-height="1017"
			inkscape:window-x="1912"
			inkscape:window-y="32"
			inkscape:window-maximized="1"
			inkscape:current-layer="layer1">
			<inkscape:grid
				type="xygrid"
				id="grid501"/>
		</sodipodi:namedview>
		<defs
			id="defs2"/>
		<g
			inkscape:label="Layer 1"
			inkscape:groupmode="layer"
			id="layer1">
			<g
				id="g1010"
				inkscape:export-filename="g1010.svg"
				inkscape:export-xdpi="96"
				inkscape:export-ydpi="96">
				<path
					class="background"
					style="stroke-width:0.317499"
					d="M 0,47.625 23.8125,0 47.625,47.625 H 0"
					id="path841"/>
				<path
					class="foreground"
					style="stroke-width:0.392439"
					d="m 21.828124,7.9375 h 3.968751 l -1.984376,29.104167 z"
					id="path951"/>
				<circle
					class="foreground"
					style="stroke-width:0.198437"
					id="path1005"
					cx="23.8125"
					cy="41.010418"
					r="1.984375"/>
			</g>
		</g>
	</svg>
</template>

<style scoped>

</style>