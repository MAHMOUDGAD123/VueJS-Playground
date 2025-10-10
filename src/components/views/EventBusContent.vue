<script lang="ts">
  import CoolButton from '@/components/_global/CoolButton.vue';
  import EventBusChild from '@/components/event-bus/EventBusChild.vue';

  export default {
    name: 'EventBusViw',

    components: {
      CoolButton,
      EventBusChild,
    },

    data: () => ({ childCount: 9 }),

    methods: {
      makeOneHappy() {
        const randomChildIndex = (Math.random() * this.childCount + 1) >>> 0;
        this.$eventBus.emit('event:happy', randomChildIndex);
      },
      makeAllHappy() {
        this.$eventBus.emit('event:all:happy');
      },
    },
  };
</script>

<template>
  <div>
    <p class="mx-auto max-w-xl text-center">
      Here we're using <span class="imp-txt">Event Bus</span> to send a random number as (index) to
      all children and the child will be happy if the random index equal to child's index or we can
      just make all of them happy.
    </p>

    <div class="mx-auto my-10 flex w-full flex-wrap items-center justify-center gap-3">
      <CoolButton @clicked="makeAllHappy" class="text-xl">ALL</CoolButton>
      <CoolButton @clicked="makeOneHappy" class="text-xl">Random</CoolButton>
    </div>

    <div class="mb-5 flex flex-wrap items-center justify-center gap-5">
      <EventBusChild
        v-for="(_, i) in Array(childCount)
          .fill(0)
          .map((_, i) => i)"
        :key="i"
        :index="i + 1"
      />
    </div>
  </div>
</template>
