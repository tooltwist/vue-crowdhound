<template lang="pug">
.ch-comments
  //--
  //--  This template provides a wrapper for the entire selection.
  //--
  //- p Root is {{element.id}} ({{element.children ? element.children.length : 0}} elements)

  // Show a spinner while loading.
  md-progress-spinner(v-if="element === null", :md-diameter="30", :md-stroke="3", md-mode="indeterminate")

  div(v-else)
    crowdhound-comments-list(:elements="element.children"
      :level="0"
      :currentElementMenu="currentElementMenu"
      @select-element-menu="selectElementMenu"
      @show-edit-modal="eventShowEditModal")

    //
    //  Below here we define forms used to create and edit elements.
    //  Note that these are not templates.
    //
    //- div#id-curia-forms(v-if="showForms")

      // Form to create and edit a message
      div#id-curia-create-message-NEW.curia-form-NEW(v-if="showMessageForm")

            .shadow-top
              form.input-post
                  //- input(type="hidden" name="type" value="comment")
                  //- input(type="hidden" name="rootId" :value="element.rootId")
                  //- input(type="hidden" name="parentId" :value="element.parentId")
                  //- input(type="hidden" name="id" :value="element.id")

                  // Description field
                  textarea#id-curia-create-message-description-NEWform-control.commentBox.curia-urlive-NEW.curia-froala(name="description",
                    :placeholder="`Enter a comment or message${theme.fileUpload?' or drop a file':''}`"
                    style="margin-bottom:10px; height:100px;")

                  // Spinner and preview area
                  i.curia-edit-loadicon-NEW.fa.fa-spin4.fa-spin(v-if="showSpinner")
                  //md-progress-spinner(:md-diameter="30", :md-stroke="3", md-mode="indeterminate")

                  // Buttons
                  .btn-wrap
                      a.curia-button-NEW.fa.fa-times(href="#", data-curia-op="cancel")
                      a.curia-button-NEW.fa.fa-check(href="#", data-curia-op="post")
                      cancel-icon
                      check-icon
            .curia-edit-previewarea-NEW.urlive-container(v-if="showPreview")

      // Form to create and edit an attachment
      #id-curia-create-attachment-NEW.curia-form-NEW(v-if="showAttachmentForm")
        form.input-post
          // CREATE ATTACHMENT
          br
          //- input(type="hidden" name="type" value="attachment")
          //- input(type="hidden" name="rootId" value="<<element.rootId>>")
          //- input(type="hidden" name="parentId" value="<<element.parentId")
          //- input(type="hidden" name="parentId" value="<<element.id>>")

          // Description field
          textarea#id-curia-create-message-description-NEW.form-control.commentBox(name="description", placeholder="Send message or file", style="margin-bottom: 10px;")

          // No preview for attachments

          // Buttons
          .btn-wrap
            //-   //- a.curia-button-NEW.fa.fa-times(href="#", data-curia-op="cancel")
            //-   span
            //- .btn-wrap(v-if="showSubmitButton")
            //-   a.fa.fa-check(href="#", id="id-curia-create-message-submit-button", data-curia-op="post")
            cancel-icon
            check-icon(v-if="showSubmitButton")

            //- div.clearfix
    .modal.ch-comments-edit-modal(:class="{ 'is-active': showEditModal }")
      .modal-background
      .modal-card
        header.modal-card-head
          p.modal-card-title Edit comment
          button.delete(aria-label="close", @click="showEditModal=false")
        section.modal-card-body
          | ({{editElement.rootId}}  {{editElement.parentId}}  {{editElement.id}})
          br
          textarea.textarea(v-model="editElement.description")
        footer.modal-card-foot
          button.button.is-success Save changes
          button.button(@click="showEditModal=false") Cancel

</template>

<script>
import CheckIcon from "vue-material-design-icons/Check.vue";
import CancelIcon from "vue-material-design-icons/Close.vue";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

export default {
  name: "wrapper",
  components: {
    CheckIcon,
    CancelIcon,
  },
  props: {
    elementId: {
      required: true
    },
    options: {
      required: false
    },
  },
  data: function() {
    return {
      theme: {
        fileUpload: true,

        // description: "",
        messageForm: true,
        spinner: true,
        preview: true,
        attachmentForm: false,
        submitButton: true,
      },

      element: null,

      // For the element specific dropdown menu, set by 'select-element-menu' events.
      currentElementMenu: 0,

      // Show a modal, were a post's details can be entered or edited.
      showEditModal: false,
      editElement: { },

      // showForms: true,
      showMessageForm: true,
      showSpinner: true,
      showPreview: true,
      showAttachmentForm: true,
      showSubmitButton: true
    };
  },

  computed: {
    showForms: function() {
      if (this.element) {
        return true;
      }
      return false;
    }
  },

  mounted: async function() {
    // console.log(`Wrapper.created(). elementId=`, this.elementId);

    const reply = await this.$crowdhound.select(this, {
      elementId: this.elementId,
      withChildren: true
    })
    this.element = reply.elements[0]
  },

  methods: {
    eventShowEditModal(object) {
      console.log(`Wrapper: eventShowEditModal()`, object);
      // this.$emit('show-edit-modal', object)
      this.editElement = object
      this.showEditModal = !this.showEditModal;
    },

    selectElementMenu: function(elementId) {
      // console.log(`Wrapper: selectElementMenu(${elementId})`);
      if (this.currentElementMenu !== elementId || elementId === 0) {
        this.currentElementMenu = elementId;
      } else {
        this.currentElementMenu = 0;
      }
      console.log(`new value is ${this.currentElementMenu}`);
    }
  } //- methods
};
</script>

<style lang="scss" scoped>
.ch-comments {
  padding-right: 30px;
}
</style>
