<template>
  <li
      v-if="arr != 0"
      v-for="(item, index) in arr"
      :class="{content__item: true, activeItem: activeItem === index}"
      @click="selectedItem($event, index)"
      @click.prevent="activeItem = index"
  >
    {{ item.taskName }}
      <div class="task__time">
          <span class="min">
           {{item.min.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })}}
        </span> : <span class="sec">
      {{item.sec.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}}
    </span>
      </div>

  </li>
  <p v-else>Tasks is empty, please add task</p>
</template>
<script>
export default {
  data() {
    return {
      activeItem: "",
      timer: null,
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
  position: relative;
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
.task__time {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>
