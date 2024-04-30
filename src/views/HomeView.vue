<script setup>
import GroupItem from '@/components/atoms/GroupItem.vue'
import Pagination from '@/components/atoms/Pagination.vue'
import { useGroupsStore } from '@/stores/groups'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'

const store = useGroupsStore()
const { getGroups: groups, getPageInfo: pages } = storeToRefs(store)

onBeforeMount(() => {
  store.fetchGroups()
})
</script>

<template>
  <div class="flex flex-col items-center px-5">
    <table class="table-auto w-full">
      <tr>
        <th>Name</th>
        <th>Budget group</th>
        <th>Last updated</th>
        <th>Created at</th>
      </tr>
      <tbody>
        <GroupItem
          v-for="{
            _links: {
              group: { href }
            },
            name,
            isBudget,
            createdAt,
            updatedAt
          } in groups"
          :key="href"
          :name="name"
          :href="href"
          :isBudget="isBudget"
          :createdAt="createdAt"
          :updatedAt="updatedAt"
        />
      </tbody>
    </table>
    <Pagination :totalPages="pages.totalPages" :current="pages.number" />
  </div>
</template>
<style scoped></style>
