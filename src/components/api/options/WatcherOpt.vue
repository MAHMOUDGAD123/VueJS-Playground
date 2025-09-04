<script lang="ts">
  import { lazyFetch } from '@/assets/tools/helpers';
  import AppError from '@/components/_global/AppError.vue';
  import AppLoader from '@/components/_global/AppLoader.vue';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';

  export default {
    name: 'WatcherOpt',
    components: {
      CustomFieldset,
      AppLoader,
      AppError,
    },

    data: () => ({
      colors: {
        newColor: '#ffffff',
        oldColor: 'inherit',
      },

      fetch: {
        userid: 1,
        loading: true,
        error: undefined as Error | undefined,
        userData: undefined as UserData | undefined,
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
          const { data, err, ok } = await lazyFetch({
            url: `http://localhost:3000/api/users/${newId}`,
            fetchOptions: {
              signal: controller.signal,
            },
          });

          if (ok) {
            this.fetch.userData = data as UserData;
          } else {
            this.fetch.error = err;
          }
          this.fetch.loading = false;

          cleanup(() => {
            controller.abort();
          });
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

    <CustomFieldset legend="Fetch">
      <div class="flex w-full flex-col gap-5">
        <section class="flex items-center justify-center gap-5">
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
          <AppLoader v-if="fetch.loading" />
          <AppError v-else-if="fetch.error" :error="fetch.error" />

          <div v-else class="text-primary wrap-anywhere">
            {{ fetch.userData }}
          </div>
        </section>
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
