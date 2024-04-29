<script setup>
import GroupItem from '@/components/atoms/GroupItem.vue'
import Pagination from '@/components/atoms/Pagination.vue'

const date = new Date()
const groups = [...Array(20).keys()].map((i) => ({
  name: `Group #${++i}`,
  isBudget: i % 2 === 1,
  createdAt: date.toLocaleString('de-DE', { timeZone: 'UTC' }),
  updatedAt: date.toLocaleString('de-DE', { timeZone: 'UTC' }),
  _links: {
    group: {
      href: `http://localhost:8080/groups/${i}`
    }
  }
}))
const pages = {
  size: 20,
  totalElements: 100,
  totalPages: 5,
  number: 0
}
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
    <Pagination :totalPages="pages.totalPages" />
  </div>
</template>
<style scoped></style>
