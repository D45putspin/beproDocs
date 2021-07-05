<template>
  <td>
    <param-type
      class="type h-75"
      v-for="type in types.names"
      :key="type"
      :type="type"
    />
  </td>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { JsonDocParamType } from "@objects/faces/jsdocjson";
import ParamType from "@components/param-type.vue";
@Component({
  components: { ParamType },
})
export default class ParamTypes extends Vue {
  @Prop({ default: () => ({ names: [] }) }) types!: JsonDocParamType;
}
</script>

<style scoped>
.type:not(:last-child)::after {
  content: "|";
  margin-left: 0.5rem;
}
</style>
