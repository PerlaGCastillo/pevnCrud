<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Task } from '@/shared/task'
import { remult } from 'remult'

const tasks = ref<Task[]>([])

const taskRepo = remult.repo(Task)
onMounted(() => taskRepo.find({ where: { completed: undefined }, orderBy: { completed: "desc" } }).then(items => tasks.value = items))

const newTaskTitle = ref("")

async function addTask() {
  try {
    const newTask = await taskRepo.insert({ title: newTaskTitle.value })
    tasks.value.push(newTask)
    newTaskTitle.value = " "
  } catch (error: any) {
    alert(error.message)
  }
}

async function deleteTask(task: Task) {
  try {
    await taskRepo.delete(task)
    tasks.value = tasks.value.filter((t) => t !== task)
  } catch (error: any) {
    alert(error.message)
  }
}

async function saveTask(task: Task) {
  try {
    await taskRepo.save(task)

  } catch (error: any) {
    alert(error.message)
  }
}
</script>

<template>
  <h1>Todos</h1>
  <main>
    <form @submit.prevent="$event => addTask()">
      <input placeholder="What needs to be done?" v-model="newTaskTitle" />
      <button>Add</button>
    </form>
    <div v-for="task in tasks">
      <input type="checkbox" v-model="task.completed" @change="$event => saveTask(task)" />
      <input v-model="task.title" />
      <button @click="saveTask(task)">Save</button>
      <button @click="$event => deleteTask(task)">Delete</button>
    </div>
  </main>

</template>