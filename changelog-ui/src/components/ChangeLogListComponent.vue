<template>
  <div>
     
    <p>changes Log: {{changes.length}}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  ref,
  toRef,
  Ref,
} from 'vue';
import { Todo, Meta, ChangeLogListModel } from './models';

export default defineComponent({
  name: 'ChangeLogListComponent',
  props: {
    changes: {
      type: Array as PropType<ChangeLogListModel[]>,
      default: () => []
    }
  }
});
</script>
