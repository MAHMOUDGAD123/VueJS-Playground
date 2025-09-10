<script setup lang="ts">
  defineOptions({ name: 'TodosList' });

  defineProps<{
    todo: Todo;
    todos: Todo[];
  }>();

  const emit = defineEmits<{
    removeTodo: [id: string];
    toggleCompletedState: [id: string];
  }>();
</script>

<template>
  <div class="border-primary mb-9 rounded-md border-4 p-4">
    <ul
      v-if="todos.length > 0"
      class="grid max-h-[500px] w-full grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-4 overflow-y-auto [scrollbar-width:none]"
    >
      <li
        v-for="(todo, i) in todos"
        :key="i"
        class="bg-primary25 grid items-center gap-3 rounded-md p-3 text-center transition-opacity duration-500 starting:opacity-0"
      >
        <h2
          :class="`line-clamp-2 h-[2lh] content-center text-2xl font-bold ${todo.completed ? 'line-through' : 'no-underline'}`"
          :title="todo.title"
        >
          {{ todo.title }}
        </h2>

        <div class="bg-secondary75 rounded-md px-2 py-1">{{ todo.category }}</div>

        <div
          class="[&>span]:bg-primary60 xxsm:flex-row flex flex-col items-center justify-between gap-2 [&>span]:flex-1 [&>span]:rounded-md [&>span]:px-2 [&>span]:py-1"
        >
          <span>{{ todo.from }}</span>
          <i class="fa-solid fa-arrow-right xxsm:rotate-0 rotate-90"></i>
          <span>{{ todo.to }}</span>
        </div>

        <div class="xxsm:flex-row flex flex-col gap-2 *:flex-1 *:rounded-md">
          <button class="custom-button text-xl" @click="emit('removeTodo', todo.id)">
            <i class="fa-solid fa-trash text-[orangered]"></i>
          </button>
          <button class="custom-button text-xl" @click="emit('toggleCompletedState', todo.id)">
            <i
              :class="`fa-solid fa-circle-check ${todo.completed ? 'text-primary' : 'text-inherit'}`"
            ></i>
          </button>
        </div>
      </li>
    </ul>

    <div v-else class="text-primary75 flex h-full items-center justify-center text-7xl">
      <i class="fa-solid fa-list"></i>
    </div>
  </div>
</template>

<style scoped></style>
