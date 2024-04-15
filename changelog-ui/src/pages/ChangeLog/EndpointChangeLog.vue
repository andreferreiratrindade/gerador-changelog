<template>
  <div>
    <q-list bordered class="bordered col-12">
      <q-expansion-item
        expand-separator
        group="somegroup"
        switch-toggle-side
        class="shadow-1 overflow-hidden"
        v-for="item in changeLogPerEndPoint"
        v-bind:key="item.endpoint"
        :label="item.endpoint"
      >
        <template v-slot:header>
          <q-item-section class="row">
            <div class="col-12"> {{ item.endpoint }} 
            <q-badge color="primary" class="col-1" style="margin-left: 5px;"> {{item.countAdded  }} adicionado</q-badge>
            <q-badge color="primary" class="col-1" style="margin-left: 5px;"> {{item.countRemoved  }} removido</q-badge>
            <q-badge color="primary" class="col-1" style="margin-left: 5px;"> {{item.countEdited  }} alterado</q-badge>
          </div>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <div class="q-pa-xs">
              <q-table
                :rows="item.changeLogs"
                :columns="columns"
                row-key="name"
                :visible-columns="visibleColumns"
                :pagination="pagination"
              >
                <template v-slot:top="props">
                  <q-space />

                  <div v-if="$q.screen.gt.xs" class="col">
                    <q-toggle
                      v-model="visibleColumns"
                      val="path"
                      label="Caminho"
                    />
                    <q-toggle
                      v-model="visibleColumns"
                      val="description"
                      label="Descrição"
                    />
                    <q-toggle
                      v-model="visibleColumns"
                      val="changeType"
                      label="Tipo da alteração"
                    />
                    <q-toggle
                      v-model="visibleColumns"
                      val="oldValue"
                      label="Antes"
                    />
                    <q-toggle
                      v-model="visibleColumns"
                      val="currentValue"
                      label="Depois"
                    />
                  </div>
                  <q-select
                    v-else
                    v-model="visibleColumns"
                    multiple
                    borderless
                    dense
                    options-dense
                    :display-value="$q.lang.table.columns"
                    emit-value
                    map-options
                    :options="columns"
                    option-value="name"
                    style="min-width: 150px"
                  />

                  <q-btn
                    flat
                    round
                    dense
                    :icon="
                      props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'
                    "
                    @click="props.toggleFullscreen"
                    class="q-ml-md"
                  />
                </template>
              </q-table>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { ChangeLogPerEndPoint } from "src/components/models";
import { defineComponent, ref } from "vue";
const columns = [
  {
    name: "path",
    label: "Caminho",
    field: "path",
    align: "left",
    sortable: true,
  },

  {
    name: "description",
    label: "O que foi alterado?",
    field: "description",
    align: "left",
    sortable: true,
  },
  {
    name: "changeType",
    label: "Tipo da alteração",
    field: "changeType",
    align: "left",
    sortable: true,
  },
  {
    name: "oldValue",
    label: "Antes",
    field: "oldValue",
    align: "left",
    sortable: true,
    format: (val: string, _row: any) =>
      `${val.length > 130 ? val.substring(0, 130) + "..." : val}`,
  },
  {
    name: "currentValue",
    label: "Depois",
    field: "currentValue",
    align: "left",
    sortable: true,
    format: (val: string, _row: any) =>
      `${val.length > 130 ? val.substring(0, 130) + "..." : val}`,
  },
];

export default defineComponent({
  name: "EndpointChangeLog",

  props: {
    changeLogPerEndPoint: {
      type: Object,
    },
  },
  setup(props) {
    console.log(props.changeLogPerEndPoint)
    return {
      columns,
      changeLogPerEndPoint: ref(props.changeLogPerEndPoint),
      visibleColumns: ref([
        "path",
        "description",
        "changeType",
        "oldValue",
        "currentValue",
      ]),
      pagination: {
        rowsPerPage: 0, // current rows per page being displayed
      },
    };
  },
});
</script>
