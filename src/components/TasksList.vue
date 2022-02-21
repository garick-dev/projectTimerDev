<template>
    <ul @click="selectList">
      <TaskItem @response="(msg) => selectItem = msg" @index="(msg) => index = msg" :arr="arrTasks"/>
    </ul>
  <div @click="addTaskItem" class="add">
  </div>

</template>
<script >
import TaskItem from "./TaskItem.vue";
export default {
  data() {
    return {
      selectItem: false,
      timerStart: false,
      index: false,
    }
  },
  props: {
    arrTasks: Array,
    indexProject: Number,
  },
  emits: ["response", "index"],
  methods: {
    addTaskItem() {
      let object = { taskName:  "Task "  + parseInt(this.arrTasks.length + 1), min: 0, sec: 0};
      //ADD TASK FOR LOCAL
      this.arrTasks.push(object);
      //GET PROJECT ARRAY
      const projectItem = localStorage.getItem("projectArray") || "[]";
      const arrProject = JSON.parse(projectItem);
      //ADD THIS TASK TO PROJECT
      arrProject[this.indexProject].arrTasks.push(object);
      //SET PROJECT
      const arrProjectString = JSON.stringify(arrProject);
      localStorage.setItem("projectArray", arrProjectString);

    },
    selectList() {
      this.$emit("response", this.selectItem);
      this.$emit("index", this.index);
    }
  },

  components: {
    TaskItem
  }
}
</script>

<style scoped>

ul {
  padding: 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
}
.add {
  position: absolute;
  right: 10px;
  bottom: 10px;
  max-width: 50px;
  width: 100%;
  height: 50px;
  display: inline-block;
  border: none;
  outline: none;
  background-image: url("../public/plus.png");
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
}
</style>
