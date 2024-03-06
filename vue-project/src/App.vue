<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Task } from '@/shared/task';
import { remult } from 'remult';

const tasks = ref<Task[]>([])

const taskRepo = remult.repo(Task)
onMounted(() => taskRepo.find({ where: { completed: undefined }, orderBy: { completed: "desc" } }).then(items => tasks.value = items))

</script>

<template>
  <h1>Todos</h1>
  <main>
    <form >
      <input placeholder="What needs to be done?" />
      <button>Add</button>
    </form>
    <div v-for="task in tasks">
      <input type="checkbox" v-model="task.completed" />
      {{ task.title }}
    </div>
  </main>

</template>