<script lang="ts">
  import { defineComponent, h, ref, type PropType } from 'vue';

  export default defineComponent({
    emits: {
      increase: (incBy: number) => Number.isInteger(incBy),
    },

    props: {
      count: { type: Number as PropType<number>, required: true },
    },

    data: () => ({}) as { increasedBy: string },

    setup(props, ctx) {
      const increasedBy = ref(0);

      const increase = () => {
        increasedBy.value = (Math.random() * 100 + 1) >>> 0;
        ctx.emit('increase', increasedBy.value);
      };

      ctx.expose({ increasedBy });

      return () => h('div', { onClick: increase, class: 'custom-button text-2xl' }, [props.count]);
    },
  });
</script>
