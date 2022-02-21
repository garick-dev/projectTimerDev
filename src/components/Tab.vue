<script>
  import { inject } from "vue";

  export default {
    props: ["title"],
    setup() {
      const selectedTitle = inject("selectedTitle")
      return {
        selectedTitle,
      }
    }
  }

</script>

<template>
  <div class="tab__content" :class="{active: title === selectedTitle}" v-show="title === selectedTitle">
   <slot/>
  </div>
</template>

<style scoped>
.tab__content {
  position: relative;
}
.active.tab__content {
    background-color:  #E1D5E7;
  }
  .active.tab__content:last-child {
    background-color: #DAE8FC;
  }
</style>
