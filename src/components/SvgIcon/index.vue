<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" :class="className"></use>
  </svg>
</template>

<script>
export default {
  name: "svg-icon",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      // type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (typeof this.className == "string") {
        return "svg-icon " + this.className;
      } else if (typeof this.className == "object") {
        let classStr = "";
        for (var i in this.className) {
          if (this.className[i] == true) {
            classStr += i + " ";
          }
        }
        return "svg-icon " + classStr;
      } else {
        return "svg-icon";
      }
    }
  }
};
</script>

<style scoped>
.svg-icon {
  /* width: 16px;
  height: 16px; */
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
