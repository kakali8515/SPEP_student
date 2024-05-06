<template>
  <ModalComp v-if="modelValue" mWidth="780px" :show="modelValue" @close="$emit('close')" :heading="props.header">
    <!-- <template #header>
      <div class="modal-header-text">
        <h3>{{ props.header }}</h3>
      </div>
    </template> -->
    <template #body>
      <div class="list-wrap modalTable">
        <table class="divider-table" v-if="props.data?.length">
          <tr class="table-head">
            <th v-for="item in props.tableHeader">{{ item }}</th>
          </tr>
          <tr :class="props.type != 'educationReport' ? 'pointer' : ''" @click="goPage(item)" v-for="item in props.data">

            <template v-if="props.type == 'educationReport'">
              <td class="first-col">{{ item.course.year }}</td>
              <td>Session {{ item.course.orderNum }}</td>
              <td><p>{{ item.course.courseName }}</p></td>
            </template>

            <template v-if="props.type == 'assessment'">
              <td class="first-col">{{ item.year }}</td>
              <td>Session {{ item.orderNum }}</td>
              <td><p>{{ item.title }}</p></td>
            </template>

            <template v-if="props.type == 'resourceRoom'">
              <td class="first-col">{{ item.course.year }}</td>
              <td>Session {{ item.course.orderNum }}</td>
              <td><p>{{ item.course.name }}</p></td>
            </template>

            <template v-if="props.type == 'feedback'">
              <td class="first-col">{{ moment(item.scheduleInfo.lessonDate).format("YYYY. MM. DD") }}</td>
              <td class="sdTd"><p>{{ item.unitInfo.unitTitle }}</p></td>
            </template>
          </tr>
        </table>
        <div v-if="!props.data?.length" class="nodatas">
          <NoDataFoundVue />
        </div>
      </div>
    </template>
  </ModalComp>
</template>
<script setup>
import moment from "moment";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  header: {
    type: String,
    default: "",
  },
  tableHeader: {
    type: Array,
    default: [],
  },
  data: {
    type: Array,
    default: [],
  },
  type: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["close", "redirectPage"]);

const goPage = (item) => {
  emit('redirectPage', item, props.type)
};
</script>
