<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Sensedia - ChangeLog - OpenAPI
          <q-icon name="help_outline" class="cursor-pointer" size="25px">
            <q-popup-proxy
              transition-show="flip-up"
              transition-hide="flip-down"
            >
              <q-banner class="bg-primary text-white">
                <template v-slot:avatar>
                  <q-icon name="help_outline" />
                </template>
                Sistema gerador de change log através de dois arquivos do tipo
                *.yaml (openApi)
                <br />
              </q-banner>
            </q-popup-proxy>
          </q-icon>
        </q-toolbar-title>

        <div>v 3.0</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>
