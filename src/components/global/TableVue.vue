<template>
  <div class="tablemain-wrap">
    <div class="table">
      <table>
        <thead>
          <tr>
            <th v-for="field in fields">
              {{ field.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data">
            <template v-for="field in fields">
              <td
                v-if="field.key !== 'actions'"
                v-html="
                  field?.formatter
                    ? field.formatter(item[field.key])
                    : item[field.key]
                "
              ></td>
              <td v-else>
                <slot :name="field.slot_name" :slotData="item" />
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <PaginationVue
      v-if="data.length > 0 && !hidePagination"
      :currentPage="page"
      :records="totalRecord"
      :perPage="limit"
      @clickPaginate="$emit('paginationHandler', $event)"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  fields: {
    type: Array,
    default: [],
    required: true,
  },
  data: {
    type: Array,
    default: [],
    required: true,
  },
  totalRecord: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    default: 8,
  },
  page: {
    type: Number,
    default: 1,
  },
  hidePagination: {
    type: Boolean,
    required: false,
  },
});
</script>
<style lang="scss">
.VuePagination__count {
  display: none;
}
.VuePagination__pagination {
  display: flex !important;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.VuePagination__pagination-item {
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  color: #a4a4a4;
  padding: 5px 6px;
}
.VuePagination__pagination-item {
  &.active {
    color: #181818;
  }
}
.VuePagination__pagination-item button {
  background-color: transparent;
  color: #181818;
  font-size: 20px;
  padding: 5px 12px;
}
</style>
