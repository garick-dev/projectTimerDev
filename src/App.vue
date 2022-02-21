<script>


import ProjectsList from "./components/ProjectsList.vue";
import TasksList from "./components/TasksList.vue";
import TabsWrapper from "./components/TabsWrapper.vue";
import Tab from "./components/Tab.vue";

export default {

  data() {
    return {
      selectProject: "<Project name>",
      selectTask: false,
      sumMin: 0,
      sumSec: 0,
      timer: null,
      indexProject: 0,
      indexTask: 0,
      arrProject: [""],
    }
  },
  methods: {
    runTimer() {
      if (this.timer) {
        this.showSeconds();
        this.setArray();
        this.getArray();
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.setArray();
        this.getArray();
        this.timer = setInterval(() => {
          this.showSeconds()
          if (this.arrProject[this.indexProject].arrTasks[this.indexTask].sec < 59) {
            this.arrProject[this.indexProject].arrTasks[this.indexTask].sec++;
          } else {
            this.arrProject[this.indexProject].arrTasks[this.indexTask].sec = 0;
            this.arrProject[this.indexProject].arrTasks[this.indexTask].min++;
          }
        }, 1000);
      }
    },
    stopTimer() {
      this.showSeconds();
      this.setArray();
      this.getArray();
      clearInterval(this.timer);
      this.timer = null;
    },
    showSeconds() {
      let timestamp = 0;
      for (let item of this.arrProject[this.indexProject].arrTasks) {
        timestamp += parseInt(item.sec) + (parseInt(item.min) * 60);
      }
      this.sumMin = Math.floor(timestamp / 60);
      this.sumSec = (timestamp % 60) + 1;
    },
    getArray() {
      const projectItem = localStorage.getItem("projectArray") || "[]";
      this.arrProject = JSON.parse(projectItem);
    },
    setArray() {
      const itemProjectString = JSON.stringify(this.arrProject);
      localStorage.setItem("projectArray", itemProjectString);
    }

  },
  mounted() {
    //GET ARRAY
    const projectItem = localStorage.getItem("projectArray") || "[]";
    this.arrProject = JSON.parse(projectItem);
  },
  components: {
    ProjectsList, TasksList, TabsWrapper, Tab
  },

}

</script>

<template>
  <main class="container">
        <div class="header">
          <div class="header__select">
            <h3 >{{selectProject}}</h3>
          </div>
          <div class="header__controls">
            <button class="start" :disabled="!selectTask" @click="runTimer"></button>
            <button class="stop" :disabled="!selectTask" @click="stopTimer"></button>
            <span>{{sumMin.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })}} :  {{sumSec.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })}}</span>
          </div>
        </div>

          <TabsWrapper >
            <Tab @click.native="showSeconds" title="Projects">
              <ProjectsList :arrProject="arrProject" @response="(msg) => selectProject = msg" @index="(msg) => indexProject = msg"/>
            </Tab>
             <Tab title="Tasks">
               <TasksList :indexProject="indexProject" :arrTasks="arrProject[indexProject].arrTasks" @response="(msg) => selectTask = msg" @index="(msg) => indexTask = msg"/>
             </Tab>
          </TabsWrapper>

  </main>
</template>


<style>
@import './assets/base.css';

#app {
  max-width: 1920px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: normal;
}

.container {
  max-width: 700px;
  width: 100%;
  min-height: 200px;
  border: 1px solid #000000;
}
.header {
  padding: 20px;
  display: flex;
  justify-content: space-between;

}
.header__select {
    max-width: 300px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000000;
}
.header__controls {
  display: flex;
  gap: 20px;
}
.start {
  width: 50px;
  height: 50px;
  border: none;
  outline: none;
  background-color: transparent;
  background-image: url("../public/start.png");
  background-size: cover;
  cursor: pointer;
}
.stop {
  width: 50px;
  height: 50px;
  background: red;
  cursor: pointer;
}


</style>
