<script setup lang="ts">
 import { useStorage } from '@/hooks/useStorage';
 import { ref, useTemplateRef, watch, type Directive } from 'vue';
 import { TodosList } from '@/components';

 // Template Elements
 // -----------------------------------------
 const titleInputEle = useTemplateRef('titleInput');
 const categorySelEle = useTemplateRef('categorySel');
 const timeToSelEle = useTemplateRef('timeToSel');

 // Meta
 // -----------------------------------------
 const categories: Category[] = [
  '----',
  'Daily Life',
  'Finance',
  'Health',
  'Hobbies',
  'Personal',
  'Planning',
 ];

 const initiateTodo = (): Todo => ({
  id: crypto.randomUUID(),
  title: '',
  category: '----',
  from: '00:00',
  to: '23:59',
  completed: false,
 });

 // Data
 // -----------------------------------------
 const todo = ref(initiateTodo());

 const todos = useStorage<Todo[]>({
  storeKey: '__vue_app_todos__',
  storeType: 'localStorage',
  initialValue: [],
 });

 const filteredTodos = useStorage<Todo[]>({
  storeKey: '__vue_app_filter_todos__',
  storeType: 'sessionStorage',
  initialValue: todos.value,
 });

 const filter = useStorage<Category>({
  storeKey: '__vue_app_filter__',
  storeType: 'sessionStorage',
  initialValue: '----',
 });

 // Watchers
 // -----------------------------------------
 watch(
  filter,
  (category) => {
   updateFilteredTodos(category);
  },
  { immediate: true },
 );

 // Functions
 // -----------------------------------------
 function addTodo() {
  if (todo.value.title === '') {
   titleInputEle.value!.focus();
   return;
  }
  if (todo.value.category === '----') {
   categorySelEle.value!.focus();
   return;
  }

  const [fromHr, FromMn] = todo.value.from.split(':');
  const [toHr, toMn] = todo.value.to.split(':');
  const from = new Date(0, 0, 0, +fromHr, +FromMn, 0, 0);
  const to = new Date(0, 0, 0, +toHr, +toMn, 0, 0);

  if (to < from) {
   timeToSelEle.value!.focus();
   return;
  }

  const newTodos = [...todos.value];
  newTodos.unshift({ ...todo.value });
  todos.value = newTodos;
  todo.value = initiateTodo();
  updateFilteredTodos(filter.value);
 }

 function updateFilteredTodos(category: Category) {
  if (category === '----') {
   filteredTodos.value = todos.value;
  } else {
   filteredTodos.value = todos.value.filter((todo) => todo.category === category);
  }
  todo.value.category = category;
 }

 function removeTodo(id: string) {
  const index = todos.value.indexOf(todos.value.find((todo) => todo.id === id)!);
  todos.value.splice(index, 1);
  updateFilteredTodos(filter.value);
 }

 function toggleCompletedState(id: string) {
  const target = todos.value.find((todo) => todo.id === id)!;
  target.completed = !target.completed;
  updateFilteredTodos(filter.value);
 }

 const vFocus: Directive<HTMLElement> = (el, binding) => {
  if (binding.oldValue !== binding.value) el.focus();
 };
</script>

<template>
 <div>
  <!-- Title -->
  <h1 class="font-saira text-primary mt-15 mb-20 text-center text-6xl font-extrabold select-none">
   Todo App
  </h1>

  <!-- Form -->
  <form
   @submit.prevent="addTodo"
   class="mx-auto flex max-w-2xl flex-col items-center gap-2 select-none *:rounded-sm sm:flex-row sm:items-stretch"
  >
   <div class="flex w-full flex-col gap-[inherit]">
    <Transition name="scale-up" appear>
     <input
      ref="titleInput"
      autocomplete="off"
      type="text"
      name="todo"
      class="custom-input bg-secondary border-primary50 focus-visible:border-primary focus:border-primary border-4 transition-colors"
      placeholder="What todo?"
      v-model.lazy="todo.title"
      v-focus="'once'"
      style="--i: 0"
     />
    </Transition>

    <Transition name="scale-up" appear>
     <label for="category" style="--i: 1">
      <span class="label">Category</span>

      <div class="relative flex flex-1">
       <div
        class="bg-secondary has-[+_select:open]:text-primary pointer-events-none absolute top-[3.5px] right-[3.5px] h-[calc(100%-6px)] w-[30px] content-center rounded-sm text-center text-[0.9rem] text-inherit has-[+_select:open]:[&>i]:rotate-[z_180deg]"
       >
        <i class="fa-solid fa-angles-down transition-all"></i>
       </div>

       <select
        ref="categorySel"
        name="category"
        id="category"
        class="custom-select-opt w-full"
        v-model="todo.category"
       >
        <option v-for="cat in categories" :key="cat" :value="cat">
         {{ cat }}
        </option>
       </select>
      </div>
     </label>
    </Transition>

    <div class="flex w-full flex-col gap-2 *:flex-1 sm:flex-row">
     <TransitionGroup name="scale-up" appear>
      <label for="time-from" style="--i: 2" key="t1">
       <span class="label">From</span>
       <input type="time" name="time-from" id="time-from" v-model.lazy="todo.from" />
      </label>

      <label for="time-to" style="--i: 3" key="t2">
       <span class="label">To</span>
       <input ref="timeToSel" type="time" name="time-to" id="time-to" v-model.lazy="todo.to" />
      </label>
     </TransitionGroup>
    </div>
   </div>

   <Transition name="scale-up" appear>
    <button class="custom-button w-full text-3xl sm:w-fit" style="--i: 4">
     <i class="fa-solid fa-plus"></i>
    </button>
   </Transition>
  </form>

  <!-- Filter -->
  <Transition name="scale-up" appear>
   <label for="filter" class="mx-auto my-9 w-fit" style="--i: 5">
    <span class="label">Filter</span>

    <div class="relative flex flex-1">
     <div
      class="bg-secondary has-[+_select:open]:text-primary pointer-events-none absolute top-[3.5px] right-[3.5px] h-[calc(100%-6px)] w-[30px] content-center rounded-sm text-center text-[0.9rem] text-inherit has-[+_select:open]:[&>i]:rotate-[z_180deg]"
     >
      <i class="fa-solid fa-angles-down transition-all"></i>
     </div>

     <select name="category" id="filter" class="custom-select-opt pe-6" v-model="filter">
      <option v-for="cat in categories" :key="cat" :value="cat">
       {{ cat }}
      </option>
     </select>
    </div>
   </label>
  </Transition>

  <!-- Todos List -->
  <TodosList
   :todos="filteredTodos"
   :todo
   @remove-todo="(id) => removeTodo(id)"
   @toggle-completed-state="toggleCompletedState"
  />
 </div>
</template>

<style scoped>
 h1 {
  filter: drop-shadow(0 0 25px var(--color-primary));
 }

 input,
 select {
  outline: none;
 }

 input[type='time'] {
  padding: 4px;
  text-align: center;
  border: 3px solid var(--color-primary75);
  border-start-end-radius: 4px;
  border-end-end-radius: 4px;
  background-color: var(--color-secondary);
  color: var(--color-primary);
 }

 label {
  display: flex;
  font-weight: bolder;
  background-color: var(--color-secondary);

  &:has(:is(input, select):focus) {
   & > .label {
    background-color: var(--color-primary);
   }

   & input,
   & select {
    border-color: var(--color-primary);
   }
  }

  & > .label {
   pointer-events: none;
   width: 10ch;
   align-content: center;
   background-color: var(--color-primary75);
   text-align: center;
   border-start-start-radius: 4px;
   border-end-start-radius: 4px;
  }

  & input,
  select {
   flex: 1;
  }
 }

 @media (width <= 320px) {
  label {
   flex-direction: column;

   & > .label {
    border-end-start-radius: 0;
    border-start-end-radius: 4px;
    width: 100%;
   }
  }

  select,
  input[type='time'] {
   border-start-end-radius: 0;
   border-end-start-radius: 4px;
  }
 }

 /* Transitions */
 .scale-up-enter-active,
 .scale-up-leave-active {
  transition-property: opacity, transform;
  transition-duration: 1s;
  transition-delay: calc(var(--i) * 0.2s);
  transition-timing-function: ease, linear(0, 1, 0.5, 1);
 }
 .scale-up-enter-from,
 .scale-up-leave-to {
  transform: scaleX(0.75) scaleY(0.75);
  opacity: 0;
 }
</style>
