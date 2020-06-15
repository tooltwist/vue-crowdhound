<template lang="pug">
	// This is where the Crowd Hound comments will be placed.
	.ch-comment-single-comment
		//- | yarp 897
		//- div#app.has-background-white-bis(v-cloak)
		//- h3 Comments
		//| {{element}}
		//- div#thread.curia-thread(v-if="elements==null")
			//- Please wait...
		//- div(v-else)
		//div(v-for="root in elements")
		// div(v-for="element in root.children")
		//- hr
		//- p SINGLE: {{currentElementMenu}}
		table.ch-comment-maintable(zv-if="!element.filtered")
			//zz div.mypage.comment-block.curia-element-container(:deleted="element.deleted", :data-element-id="element.id")

			tr
				//- td

				//- hr.ch-hr
				// left column, with avatar
				td.ch-comment-left-cell
					//- .column.column.is-2.com-profile-container
					div.norow
						div.u-avatar.ch-avatar(v-if="element.user")
							img.com-profile-img(:src="element.user.avatar")
								//- <p class="com-profile-name"><<element.user.preferredName>></p>
					figure.image.is-128x128
						img(src="../../../assets/images/anonymous-avatar.png")
					.ch-comment-userid.has-text-centered {{element.userId}}

				// right column
				td.ch-comment-right-cell
					.ch-tiny-id.has-text-right {{element.id}}
					//- div.main-topic-container.curia-element-NEW(:data-curia-elementId="element.id"
						:data-curia-rootId="element.rootId"
						:data-curia-parentId="element.parentId"
						:data-curia-type="element.type")
						| {{element.description}}
						//- hr.my-after-hr

					.ch-description {{element.description}}


					// User Details
					//- div.ch-username {{element.user.firstName}} {{element.user.lastName}}

					.has-text-right
						span.ch-date {{dateFromNow(element.created)}}

						// Display a dropdown menu of operations, unless the theme specifies 'readonly'
						span(v-if="!theme.readonly")
							| &nbsp;&nbsp;
							.dropdown.is-right(:class="{ 'is-active': (currentElementMenu === element.id) }")
								.dropdown-trigger(@click="selectElementMenu(element.id)")
									dots-horizontal.mdi-light
								.dropdown-menu#dropdown-menu(role="menu")
									.dropdown-content.is-size-7
										a.dropdown-item.prevent.is-active(@click="editThisElement(element)")
											| Edit
										a.dropdown-item
											| Restore
										a.dropdown-item(href="#")
											| Delete
										a.dropdown-item(href="#")
											| Report abuse
										//- hr.dropdown-divider
										//- a.dropdown-item(href="#")
											| With a divider
							//- div(v-if="element.permission.post")
								div.controls.list-info.ch-menu-dropdown
									div.dropdown.clearfix
										button#dropdownMenuDivider.btn.btn-default.btn-sm.dropdown-toggle(type="button"
											data-toggle="dropdown" aria-expanded="false")
											span.fa.fa-ellipsis-v
										ul.dropdown-menu(role="menu" aria-labelledby="dropdownMenuDivider")
											div(v-if="element.permission.edit")
												li.element-edit
													a.curia-button-NEW.fa.fa-pencil(href="#"
														data-curia-op="show-edit-form"
														data-curia-form="#id-curia-create-message-NEW") Edit
											div(v-if="element.permission.restore")
												li.element-restore
													a.curia-button-NEW.fa.fa-refresh(href="#", data-curia-op="show-restore-modal"
														data-curia-modal="#id-my-restore-modal") Restore
											div(v-if="element.permission.delete")
												li.element-delete
													a.curia-button-NEW.fa.fa-trash-o(href="#" class="" data-curia-op="show-delete-modal"
														data-curia-modal="#id-my-delete-modal") Delete
											div(v-if="element.permission.reportAbuse")
												li.divider
												li.element-report
													a.mailer-show-report-modal.fa.fa-exclamation-triangle(href="#", data-toggle="modal", data-target="#id-my-abusive-modal", :data-curia-id="element.id")
														| Report as Abusive</a>

						//- div.my-debug-elementid {{element.id}}

						// This div displays the element
						div.curia-displayarea-NEW(v-if="false") /// ZZZZZ
							input.curia-description-NEW.curia-urlive-NEW(type="hidden", :value="element.description")
							input.curia-summary-NEW(type="hidden", :value="element.summary")

							// Description
							// The description, allow full HTML unless the theme specifies 'textonly'
							div(v-if="theme.textonly")
								.ch-description(:id="`id-curia-description-${element.id}`") {{element.description}}
							div(v-else)
								.ch-description(:id="`id-curia-description-${element.id}`") {{element.description}}

							// Spinner for while urlive is preparing the preview
							div(v-if="!NO_SPINNER")
								i.curia-loadicon-NEW.fa.fa-spin4.fa-spin

							<div class="curia-previewarea-NEW" style="display:none;"></div>



						// This div is used for both editing this existing element and when posting a response
						div.curia-workarea-NEW(style="display:none;")


						// element status bar
						//zz div.curia-status-NEW.status.alert(style="display: none;")
							a.close(href="#" :id="`form-${element.id}-status-close`") &times;
							.message &nbsp;

						//zz div(v-if="VOTING")
							span.vote.curia-vote-totals-NEW.curia-vote-NEW(:data-curia-rootId="element.rootId", data-curia-aspect="likedislike")
								// like
								a.curia-vote-button-NEW.arrow.fa.fa-caret-up(href="#" class="" data-curia-value="like")
									small.fa.fa-heart-o(data-curia-value="like")
									span.count.likes

								// dislike
								a.curia-vote-button-NEW.arrow.fa.fa-caret-down(href="#", data-curia-value="dislike")
									span.count.dislikes

						// Reply button, unless the theme specifies 'readonly' or 'flat'
						div(v-if="theme.readonly")
							div(v-if="!theme.flat")
								a.ch-reply.curia-button.reply(href="#", data-curia-op="show-create-form", data-curia-type="comment", data-curia-form="#id-curia-create-message-NEW")
									i.fa.fa-reply.fa-flip-horizontal
									| Reply


						// The children, unless the theme specifies 'flat'
						div(v-if="!theme.flat")
							div.norow.child-posts.reply(:id="`form-`+element.id+`-posts`")
								crowdhound-comments-list(:elements="element.children"
										:level="myLevel"
										:currentElementMenu="currentElementMenu"
										@select-element-menu="selectElementMenu"
										@show-edit-modal="eventShowEditModal")


</template>

<script>
import moment from 'moment'
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue'

export default {
	name: 'crowdhound-comments-single',
  components: {
		DotsHorizontal,
  },
	props: [ 'element', 'level', 'currentElementMenu' ],
	data: function () {
		return {
			theme: {
				readonly: false,
			},
			NO_SPINNER: true,
			VOTING: false,
			myLevel: 1,

			// Editing
			// showEditModal: false,
			// editElement: {
			// 	rootId: 0,
			// 	elementId: 0,
			// 	parentId: 0,
			// 	description: '',
			// }
		}
	},
	created: function () {
		// console.log(`single element is:`, this.element);
		if (this.level) {
			let num = parseInt(this.level)
			if (!isNaN(num)) {
				this.myLevel = num
			}
		}
	},
	methods: {
		dateFromNow: function (date) {
			return moment(date*1000).fromNow()
		},

		selectElementMenu: function (elementId) {
			// console.log(`SingleComment: selectElementMenu(${elementId})`);
			this.$emit('select-element-menu', elementId)
		},

		eventShowEditModal(object) {
			this.$emit('show-edit-modal', object)
		},

		editThisElement: function (element) {
			console.log(`Single: editThisElement(${element.id})`);
			this.$emit('select-element-menu', 0)
			this.$emit('show-edit-modal', {
				rootId: element.rootId,
				parentId: element.parentId,
				id: element.id,
				description: element.description,
			})
			return
		},
	}
}
</script>

<style lang="scss" scoped>
.ch-comment-single-comment {
	font-size: 14px;
  // background-color: beige;
	padding-bottom: 5px;
	// margin-bottom: 5px;

	.ch-comment-maintable {
		width: 100%;
		// background-color: yellowgreen;
		border-top: solid 1px #ddd;

		.ch-comment-left-cell {
			padding-left: 20px;
			padding-right: 20px;
			padding-top: 20px;
			padding-bottom: 10px;
			width: 148px; // Yep, not possible.

			.ch-comment-userid {
				padding-top: 5px;
				font-size: 12px;
				font-weight: 600;
			}
		}

		.ch-comment-right-cell {
			text-align: justify;
			.ch-tiny-id {
				font-size: 8px;
			}

			padding-top: 5px;
			padding-left: 20px;
			padding-right: 0px;

			.ch-description {
				min-height: 100px;
			}

			.my-after-hr {
				padding: 0px;
				margin: 10px;
			}
		}

	}//- .ch-comment-maintable

	.modal.ch-comments-edit-modal {
		background-color: yellow;
		// .my-textarea: {
		// 	min-height: 500px;
		// 	font-size: 10px;
		// }
	}


}
</style>