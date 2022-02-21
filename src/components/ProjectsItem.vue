<template>
      <li
          v-if="arr.length > 0"
          v-for="(item, index) in arr"
          :class="{content__item: true, activeItem: activeItem === index}"
          @click="selectedItem($event, index)"
          @click.prevent="activeItem = index">
        {{ item.projectName }}
      </li>
      <p v-else>Projects is empty, please add project</p>
</template>
<script>
export default {
  data() {
    return {
      selectItem: "Project",
      activeItem: "",
    }
  },
  props: {
    arr: Array,
  },
  emits: ["response", "index"],
  methods: {
    selectedItem(event, index) {
      this.selectItem = event.target.innerHTML;
      this.$emit("response", this.selectItem);
      this.$emit("index", index);
    },
  },
}
</script>

<style scoped>

.content__item {
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  width: 80%;
  border: 1px solid #000000;
  background-color: #ffffff;
}
.activeItem {
  border: 1px solid green;
  background-color: #D5E8D4;
}
</style>
