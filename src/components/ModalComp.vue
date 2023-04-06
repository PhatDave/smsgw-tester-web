<script lang="ts">
import {Form} from "../API/CommonObjects";

export default {
	name: "ModalComp",
	data(): {
		form: Form
	} {
		return {
			form: {
				arg: '',
				username: '',
				password: '',
			}
		}
	},
	emits: ['submit'],
	methods: {
		doSubmit(): void {
			this.$emit('submit', this.form);
		}
	}
}
</script>

<template>
	<div id="addClientModal" aria-hidden="true" aria-labelledby="addClientModalLabel" class="modal fade" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<!-- TODO: Make this dynamic -->
					<h1 id="addClientModalLabel" class="modal-title fs-5">Add New Client</h1>
				</div>
				<div class="modal-body">
					<form class="row g-3 align-items-center" @submit.prevent="doSubmit">
						<div class="col-12">
							<input v-model="form.arg" class="form-control" placeholder="URL / Port" required type="text">
						</div>
						<div class="col-12">
							<input v-model="form.username" class="form-control" placeholder="Username" required type="text">
						</div>
						<div class="col-12">
							<input v-model="form.password" class="form-control" placeholder="Password" required type="text">
						</div>
						<div class="col-12 text-center">
							<button class="btn btn-success mx-2" type="submit">Submit</button>
							<button ref="closeModal" class="btn btn-warning mx-2" data-bs-dismiss="modal" type="button">Close</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>