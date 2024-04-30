<script setup>
import GroupItem from '@/components/atoms/GroupItem.vue'
import { useGroupsStore } from '@/stores/groups'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent, onBeforeMount } from 'vue'

const Pagination = defineAsyncComponent(() => import('@/components/atoms/Pagination.vue'))
const LoadingAnimation = defineAsyncComponent(
  () => import('@/components/atoms/LoadingAnimation.vue')
)

const store = useGroupsStore()
const { getGroups: groups, getPageInfo: pages, isLoading } = storeToRefs(store)

const changePage = (page) => {
  store.fetchGroups(page)
}

onBeforeMount(() => {
  store.fetchGroups(0)
})
</script>

<template>
  <div class="w-full px-5">
    <LoadingAnimation v-if="isLoading" />
    <div class="flex flex-col items-center" v-else>
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
      <Pagination :totalPages="pages.totalPages" :current="pages.number" @change="changePage" />
    </div>
  </div>
</template>
<style scoped></style>
