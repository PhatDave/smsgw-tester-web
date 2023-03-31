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
	<div class="modal fade" id="addClientModal" tabindex="-1" aria-labelledby="addClientModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<!-- TODO: Make this dynamic -->
					<h1 class="modal-title fs-5" id="addClientModalLabel">Add New Client</h1>
				</div>
				<div class="modal-body">
					<form @submit.prevent="doSubmit" class="row g-3 align-items-center">
						<div class="col-12">
							<input type="text" class="form-control" placeholder="URL / Port" v-model="form.arg" required>
						</div>
						<div class="col-12">
							<input type="text" class="form-control" placeholder="Username" v-model="form.username" required>
						</div>
						<div class="col-12">
							<input type="text" class="form-control" placeholder="Password" v-model="form.password" required>
						</div>
						<div class="col-12 text-center">
							<button type="submit" class="btn btn-success mx-2">Submit</button>
							<button type="button" class="btn btn-warning mx-2" ref="closeModal" data-bs-dismiss="modal">Close</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>