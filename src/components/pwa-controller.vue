<template>
  <div class="pwa-controller">
    <p>
      <button v-if="showButton" @click="addToHomeScreen">Добавить на главный экран</button>
      <br>
      <br>
      <span v-if="pwaState.updatefound">Есть обновления</span>
      <span v-if="pwaState.updated">Обновлено</span>
    </p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { pwaState } from '../pwaState'

  export default Vue.extend({
  name: 'pwa-controller',
    components: {

    },
    mounted() {
      window.addEventListener('beforeinstallprompt', this.promtHandler as EventListener, false);
    },
    data() {
      return {
        showButton: false,
        deferredPrompt: {} as BeforeInstallPromptEvent,
        pwaState: pwaState
      }
    },
    methods: {
      promtHandler(e: BeforeInstallPromptEvent) {
        if (!window.matchMedia('(display-mode: standalone)').matches) {  
          e.preventDefault();
          this.deferredPrompt = e;
          this.showButton = true;
        }
      },
      addToHomeScreen() {

        this.deferredPrompt.prompt();       

        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            this.showButton = false;
          } else {
            console.log('User dismissed the A2HS prompt');
          }
        });
      }
    }
  })
</script>