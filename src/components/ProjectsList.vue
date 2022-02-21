<template>
    <ul @click="selectList">
      <ProjectsItem @response="(msg) => selectItem = msg" @index="(msg) => index = msg" :arr="arrProject" />
    </ul>
    <div @click="addProjectItem" class="add">
    </div>



</template>
<script >
  import ProjectsItem from "./ProjectsItem.vue";
  export default {
    data() {
      return {
        selectItem: "Project",
        index: null,
      }
    },
    props: {
      arrProject: Array,
    },
    emits: ["response", "index"],
    methods: {
      addProjectItem() {
        let object = { projectName: "Project " + parseInt(this.arrProject.length + 1), arrTasks: [] };
        this.arrProject.push(object);
        //SET ARRAY
        const arrProjectString = JSON.stringify(this.arrProject);
        localStorage.setItem("projectArray", arrProjectString);
      },
      selectList() {
        this.$emit("response", this.selectItem);
        this.$emit("index", this.index);
      }
    },

    components: {
      ProjectsItem
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
