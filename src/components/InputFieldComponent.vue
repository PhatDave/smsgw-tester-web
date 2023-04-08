<script lang="ts">
export default {
	name: "InputFieldComponent",
	props: {
		field: {
			type: String,
			required: true
		},
		entity: {
			type: Object,
			required: true
		},
		title: {
			type: String,
			required: false
		}
	},
	methods: {
		updateField(event): void {
			if (this.entity[this.field] !== event.target.innerText) {
				this.entity[this.field] = event.target.innerText;
			}
		},
	},
	computed: {
		value(): string {
			return this.entity[this.field];
		},
	}
}
</script>

<template>
	<div>
		<span class="title" v-if="title">{{ title }}&nbsp&nbsp</span>
		<span contenteditable="true"
		      @keyup="updateField"
		      class="content">
			{{ value }}
		</span>
	</div>
</template>

<style scoped>
.content {
	border: rgba(0, 0, 0, 0.085) 2px solid;
	display: inline-block;
	width: 100%;
}

.title {
	font-size: 0.75rem;
	font-weight: lighter;
}
</style>