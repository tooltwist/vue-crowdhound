<template lang="pug">
  .crowdhound-comment-list(v-if="elements")
    //- p LIST: {{currentElementMenu}}
    //- | hello
    //- | CommentList 1 = {{myLevel}} = {{elements.length}} elements
    //- | {{element}}
    //- showingProject
    //.norow.community-container.curia-element-container-NEW

      //- <<#NOMORE>>
      //-             <h2>
      //-                 <<element.summary>>
      //-                 <<#element.permissions.canEditTopic>>
      //-                 <small>
      //-                     <a href="#" onclick="AdminModule.updateTopic('<<element.id>>');" class="fa fa-pencil text-muted"></a>
      //-                 </small>
      //-                 <</element.permissions.canEditTopic>>
      //-             </h2>
      //- <</NOMORE>>
      div.main-topic-container.curia-element-NEW.first(
        data-curia-elementId="<<element.id>>"
        data-curia-rootid="<<element.id>>"
        data-curia-parentid="<<element.id>>"
        data-curia-type="<<element.type>>"
        data-curia-categoryid="<<element.parentId>>"
        data-curia-description="<<element.summary>>")

      // This div displays the element
      .curia-displayarea-NEW
        input.curia-description-NEW.curia-urlive-NEW(type="hidden", :value="element.description")
        input.curia-summary-NEW(type="hidden", :value="element.summary")

        //- <<#NOTNEEDED>>
        //-   <<element.description>>
        //- <</NOTNEEDED>>


        div(v-if="!theme.readonly")
          // Description
          div.com-post

            // Spinner and preview area
            i.curia-loadicon-NEW.fa.fa-spin4.fa-spin(style="display:none;")
            div.curia-previewarea-NEW.urlive-container(style="display:none;")

            p.com-icons.first
              // Delegate event handlers for these buttons are attached in CrowdHound.initialize()
              a.curia-button-NEW(href="#", data-curia-op="show-create-form", data-curia-type="comment", data-curia-form="#id-curia-create-message-NEW")
                i.fa.fa-comment
                span Add your comment


        // This div is used for both editing this existing element and when posting a response
        .curia-workarea-NEW(style="display:none;")

        // element status bar
        .curia-status-NEW.status.alert(style="display: none;")
          .message &nbsp;

    // Child posts for element <<element.id>>
    //- .clearfix

    //- div.norow.child-posts.first(:id="`form-${element.id}-posts`")
    //- div.norow.child-posts.first(:id="`form-YARP-posts`")

    //<<{childrenHtml}>>
    div(v-for="child in elements")
      crowdhound-comments-single(:element="child"
        :level="myLevel + 1"
        :currentElementMenu="currentElementMenu"
        @select-element-menu="selectElementMenu"
        @show-edit-modal="eventShowEditModal")

    .text-center(style="display: none")
      br
      i.fa.fa-spin4.fa-2x.text-muted.fa-spin

</template>

<script>

export default {
  name: "comment-list",
  props: ["elements", "level", "currentElementMenu"],
  data: function() {
    return {
      theme: {
        readonly: true
      },
      myLevel: 1
    };
  },
  mounted: function() {
    // console.log(`CommentList created()`, this.elements);
    if (this.level) {
      let num = parseInt(this.level);
      if (!isNaN(num)) {
        this.myLevel = num;
      }
    }
  },

  methods: {

		eventShowEditModal(object) {
      console.log(`Wrapper: eventShowEditModal()`, object);
			this.$emit('show-edit-modal', object)
    },

    selectElementMenu: function(elementId) {
      // console.log(`CommentList: selectElementMenu(${elementId})`);
      this.$emit("select-element-menu", elementId);
      // if (this.dropdownId == 0) {
      // 	this.dropdownId = elementId
      // } else {
      // 	this.dropdownId = 0
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.crowdhound-comment-list {
  // padding-top: 20px;
}
</style>