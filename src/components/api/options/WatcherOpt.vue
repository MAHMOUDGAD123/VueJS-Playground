<script lang="ts">
  import { isPROD } from '@/assets/tools/globals';
  import { lazyFetch } from '@/assets/tools/lazy-fetch';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';

  export default {
    name: 'WatcherOpt',
    components: {
      CustomFieldset,
    },

    data: () => ({
      colors: {
        newColor: '#ffffff',
        oldColor: 'inherit',
      },

      fetch: {
        userid: 1,
        loading: false,
        error: null as Error | null,
        userData: null as UserData | null,
        unwatchCB: undefined as (() => void) | undefined,
      },
    }),

    watch: {
      'colors.newColor': {
        handler(_, oldCol: string) {
          this.colors.oldColor = oldCol;
        },
      },
    },

    created() {
      this.fetch.unwatchCB = this.$watch(
        () => this.fetch.userid,
        async (newId, _, cleanup) => {
          const controller = new AbortController();
          this.fetch.loading = true;

          cleanup(() => {
            controller.abort(new Error('fetch aborted'));
          });

          const url = isPROD
            ? `https://jsonplaceholder.typicode.com/users/${newId}`
            : `http://localhost:3000/api/users/${newId}`;

          const { data, err } = await lazyFetch<UserData>(
            url,
            {},
            {
              signal: controller.signal,
            },
          );

          // do nothing if the id is different
          if (newId !== this.fetch.userid) return;

          this.fetch.userData = data;
          this.fetch.error = err;
          this.fetch.loading = false;
        },
        { immediate: true },
      );
    },

    unmounted() {
      if (this.fetch.unwatchCB) {
        console.log('fetch unmounted');
        this.fetch.unwatchCB();
      }
    },
  };
</script>

<template>
  <div class="flex flex-col gap-7 p-5">
    <CustomFieldset legend="Fetch">
      <div class="grid w-full gap-5">
        <section class="flex items-center justify-center gap-5 select-none">
          <button
            class="custom-button aspect-square w-10 rounded-full p-0"
            @click="--fetch.userid"
            :disabled="fetch.userid <= 1"
          >
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <span class="font-saira text-primary w-[50px] text-2xl">{{ fetch.userid }}</span>
          <button
            class="custom-button aspect-square w-10 rounded-full p-0"
            @click="++fetch.userid"
            :disabled="fetch.userid >= 10"
          >
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </section>

        <section class="grid h-[300px] items-center justify-center overflow-auto">
          <AppRoute route-name="optVsComp" :error="fetch.error!" :loading="fetch.loading">
            <div class="text-primary wrap-anywhere">
              {{ fetch.userData }}
            </div>
          </AppRoute>
        </section>
      </div>
    </CustomFieldset>

    <CustomFieldset legend="Color">
      <div class="flex flex-col items-center justify-center gap-9 select-none">
        <p class="text-primary text-2xl font-bold">Pick a color</p>

        <div id="colorPicker" :style="{ backgroundColor: colors.newColor }">
          <input type="color" name="color" v-model.lazy="colors.newColor" />
        </div>

        <table class="custom-table text-[1.2rem]">
          <tbody>
            <tr>
              <th>New</th>
              <th>OLD</th>
            </tr>
            <tr>
              <td>{{ colors.newColor.toUpperCase() }}</td>
              <td>{{ colors.oldColor.toUpperCase() }}</td>
            </tr>

            <tr>
              <td class="text-transparent" :style="{ backgroundColor: colors.newColor }">-</td>
              <td class="text-transparent" :style="{ backgroundColor: colors.oldColor }">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CustomFieldset>
  </div>
</template>

<style scoped>
  #colorPicker {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    contain: layout;
    z-index: 0;
    width: 40px;
    aspect-ratio: 1;
    border-radius: 999px;

    & > input {
      height: 100%;
      width: 100%;
      opacity: 0;
      z-index: 1;
      cursor: pointer;
    }

    &::before {
      position: absolute;
      content: '';
      width: 150%;
      aspect-ratio: 1;
      border: 3px solid;
      border-color: var(--color-primary) var(--color-secondary);
      border-radius: inherit;
      z-index: -1;
      animation: r-spin 2s infinite linear;
    }
  }
</style>
