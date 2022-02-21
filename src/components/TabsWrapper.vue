<script >
  import { ref, provide } from "vue"
  export default {
    setup(props, { slots }) {
      const tabTitles = ref(slots.default().map((tab) => tab.props.title));
      const selectedTitle = ref(tabTitles.value[0]);

      provide("selectedTitle", selectedTitle);
      return {
        selectedTitle,
        tabTitles,
      }
    },
  }
</script>

<template>

  <div class="tabs">
    <ul class="tabs__header">
      <li class="tabs__item" v-for="title in tabTitles" :class="{active: selectedTitle === title}" :key="title" @click="selectedTitle = title">
        {{title}}
      </li>
    </ul>
  </div>
  <slot/>
</template>

<style scoped>

  .tabs__header {
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
  }
  .tabs__item {

    width: 50%;
    text-align: center;
    box-sizing: border-box;
    padding: 20px 50px;
    border: 1px solid #000000;
  }
  .disabled {
    pointer-events: none;
  }
  .active.tabs__item:first-child {
    background-color:  #E1D5E7;
  }
  .active.tabs__item:last-child {
    background-color: #DAE8FC;
  }
</style>