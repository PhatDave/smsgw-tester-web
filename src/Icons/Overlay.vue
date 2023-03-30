<script>
import AlertIcon from "@/Icons/AlertIcon.vue";

export default {
	name: "Overlay",
	components: {AlertIcon},
	props: {
		scale: {
			type: Number,
			default: 1
		}
	},
	mounted() {
		this.$el.style.transform = `scale(${this.scale})`;
	}
}
</script>

<template>
	<div class="overlay">
		<div>
			<AlertIcon :background-opacity="0.7"
			           foreground-opacity="1"/>
			<div>API not available</div>
		</div>
	</div>
</template>

<style scoped>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(255, 0, 0, 0.5);
	z-index: 9998;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.overlay > div {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 1.5rem;
	font-family: 'Source Code Pro', monospace;
}
</style>