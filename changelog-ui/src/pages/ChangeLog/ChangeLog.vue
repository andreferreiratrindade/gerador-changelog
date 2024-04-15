<template>
  <div>
    <formulario-change-log @formularioAcionado="handleFormulario" />

    <!-- changeLog List view-->
    <endpoint-change-log
      v-bind:changeLogPerEndPoint="infoApiChanges.changeLogPerEndPoint"
      v-if="infoApiChanges.oldApi.version.length > 0" :key="countKeyRenderEndpoint"
    />
  </div>
</template>

<script lang="ts">
import { Loading } from "quasar";

import { InfoApiChangeLogModel, ChangeLogPerEndPoint } from "components/models";
import ChangeLogListComponent from "components/ChangeLogListComponent.vue";
import FormularioChangeLog from "./FormularioChangeLog.vue";
import EndpointChangeLog from "./EndpointChangeLog.vue";
import { defineComponent, ref,computed } from "vue";

export default defineComponent({
  name: "ChangeLogPage",
  components: {
    ChangeLogListComponent,
    FormularioChangeLog,
    EndpointChangeLog,
  },

  data() {
    let infoApiChanges: InfoApiChangeLogModel = {
      changeLogPerEndPoint: [],
      currentApi: { apiName: "", url: "", version: "" },
      oldApi: { apiName: "", url: "", version: "" },
    };
    let changeLogPerEndPoint: ChangeLogPerEndPoint[] = [];
    return {
      infoApiChanges: infoApiChanges,
      changeLogPerEndPoint:  computed(() => infoApiChanges.changeLogPerEndPoint),
      countKeyRenderEndpoint: 0
    };
  },
  methods: {
    handleFormulario(infoApiChanges: any) {
      const adicionado = 1;
      const alterado = 2;
      const removido = 3;
      this.infoApiChanges = infoApiChanges;
      this.infoApiChanges.changeLogPerEndPoint.forEach((x) => {
        x.countAdded = x.changeLogs.filter(
          (y) => y.changeTypeEnum == adicionado
        ).length;
        x.countEdited = x.changeLogs.filter(
          (y) => y.changeTypeEnum == alterado
        ).length;
        x.countRemoved = x.changeLogs.filter(
          (y) => y.changeTypeEnum == removido
        ).length;
      });
      this.countKeyRenderEndpoint++;

    },
    showLoading() {
      Loading.show();
    },
    hideLoading() {
      Loading.hide();
    },

    showFormulario() {
      this.showForm = true;
    },
    hideFormulario() {
      this.showForm = false;
    },
  },
  setup() {
    return {
      showForm: ref(true),
    };
  },
});
</script>
