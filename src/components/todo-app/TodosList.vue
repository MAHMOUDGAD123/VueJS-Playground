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

  // Transitions
  const beforeLeave = (el: Element) => {
    const rect = (el as HTMLElement).getBoundingClientRect();

    // lock current position into CSS custom properties
    (el as HTMLElement).style.setProperty('--leaving-width', rect.width + 'px');
    (el as HTMLElement).style.setProperty('--leaving-height', rect.height + 'px');

    // also fix its absolute coordinates relative to parent
    const parentRect = el.parentElement!.getBoundingClientRect();
    (el as HTMLElement).style.setProperty('--leaving-top', rect.top - parentRect.top + 'px');
    (el as HTMLElement).style.setProperty('--leaving-left', rect.left - parentRect.left + 'px');
  };

  const beforeAppear = (el: Element) => {
    // Add transition delay to all list elements before appear
    const ele = el as HTMLElement;
    ele.style.transitionDelay = `calc(${ele.dataset.idx} * 0.2s)`;
  };

  const afterAppear = (el: Element) => {
    // Remove transition delay from all list elements after appear
    const ele = el as HTMLElement;
    ele.style.transitionDelay = `0s`;
  };
</script>

<template>
  <div
    class="border-secondary75 relative mx-auto mb-9 max-w-4xl overflow-y-auto rounded-md border-4 p-4 [scrollbar-width:none]"
  >
    <Transition name="show-up">
      <TransitionGroup
        v-if="todos.length > 0"
        class="grid-auto-fill-250 relative grid max-h-[500px] w-full gap-4"
        tag="ul"
        appear
        name="insert"
        @before-leave="beforeLeave"
        @before-appear="beforeAppear"
        @after-appear="afterAppear"
      >
        <li
          v-for="(todo, i) in todos"
          :key="todo.id"
          class="bg-primary25 grid items-center gap-3 rounded-md p-3 text-center"
          :data-idx="i"
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
      </TransitionGroup>

      <div
        v-else
        class="text-primary75 flex h-full w-full items-center justify-center text-center text-xl"
      >
        Nothing left to do....
      </div>
    </Transition>
  </div>
</template>

<style scoped>
  /* Insert */
  .insert-move,
  .insert-enter-active,
  .insert-leave-active {
    transition-property: opacity, transform;
    transition-duration: 0.5s;
    transition-timing-function: ease;
  }

  .insert-leave-active {
    position: absolute;
    /* Set the values */
    width: var(--leaving-width);
    height: var(--leaving-height);
    top: var(--leaving-top);
    left: var(--leaving-left);
  }

  .insert-enter-from,
  .insert-leave-to {
    opacity: 0;
    transform: scale(0.5);
  }

  .insert-enter-to,
  .insert-leave-from {
    opacity: 1;
    transform: scale(1);
  }

  /* Show up */
  .show-up-enter-active,
  .show-up-leave-active {
    transition-property: opacity;
    transition-duration: 0.25s;
    transition-timing-function: ease;
  }

  .show-up-leave-active {
    position: absolute;
  }

  .show-up-enter-from,
  .show-up-leave-to {
    opacity: 0;
  }
</style>
