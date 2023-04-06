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
		id="svg5"
		height="47.625mm"
		inkscape:dataloss="true"
		inkscape:version="1.2.2 (732a01da63, 2022-12-09)"
		sodipodi:docname="drawing.svg"
		version="1.1"
		viewBox="0 0 47.625 47.625"
		width="47.625mm"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
		xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
		xmlns:svg="http://www.w3.org/2000/svg">
		<sodipodi:namedview
			id="namedview7"
			bordercolor="#eeeeee"
			borderopacity="1"
			inkscape:current-layer="layer1"
			inkscape:cx="76.443993"
			inkscape:cy="128.07722"
			inkscape:deskcolor="#505050"
			inkscape:document-units="mm"
			inkscape:pagecheckerboard="0"
			inkscape:pageopacity="0"
			inkscape:showpageshadow="0"
			inkscape:window-height="1017"
			inkscape:window-maximized="1"
			inkscape:window-width="1920"
			inkscape:window-x="1912"
			inkscape:window-y="32"
			inkscape:zoom="2.9825758"
			pagecolor="#505050"
			showgrid="true">
			<inkscape:grid
				id="grid501"
				type="xygrid"/>
		</sodipodi:namedview>
		<defs
			id="defs2"/>
		<g
			id="layer1"
			inkscape:groupmode="layer"
			inkscape:label="Layer 1">
			<g
				id="g1010"
				inkscape:export-filename="g1010.svg"
				inkscape:export-xdpi="96"
				inkscape:export-ydpi="96">
				<path
					id="path841"
					class="background"
					d="M 0,47.625 23.8125,0 47.625,47.625 H 0"
					style="stroke-width:0.317499"/>
				<path
					id="path951"
					class="foreground"
					d="m 21.828124,7.9375 h 3.968751 l -1.984376,29.104167 z"
					style="stroke-width:0.392439"/>
				<circle
					id="path1005"
					class="foreground"
					cx="23.8125"
					cy="41.010418"
					r="1.984375"
					style="stroke-width:0.198437"/>
			</g>
		</g>
	</svg>
</template>

<style scoped>

</style>