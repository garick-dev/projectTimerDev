import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

    const enableTab = () => {
        document.addEventListener("click", (ev) => {
            if (ev.target && ev.target.classList.contains("content__item")) {
                const tabItemEl = document.querySelectorAll(".tabs__item");
                tabItemEl.forEach(tab => {
                    tab.classList.remove("disabled");
                })
            }
        })
    }
    enableTab();