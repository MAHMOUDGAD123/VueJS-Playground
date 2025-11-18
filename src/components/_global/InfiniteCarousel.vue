<script setup lang="ts">
  import { type VNode } from 'vue';

  // The structure of the provided HTML template must be in the next shape:
  //
  // <HorisontalInfiniteCarousel>
  //   <div>
  //    <your-image-or-icon />
  //   </div>
  //   <div>
  //    <your-image-or-icon />
  //   </div>
  //   <div>
  //    <your-image-or-icon />
  //   </div>
  //   ...
  // </HorisontalInfiniteCarousel>

  // Types
  // --------------------------------------------
  type AnimationName = 'right-to-left' | 'left-to-right' | 'top-to-bottom' | 'bottom-to-top';
  type AnimationPlayState = 'paused' | 'running';
  type CarouselType = 'horisontal' | 'vertical';
  type CarouselMode = 'rtl' | 'ltr' | 'ttb' | 'btt';

  interface CarouselProps {
    /**
     * The animation mode
     * @example
     * - 'ltr' -> left to right
     * - 'rtl' -> right to left
     * - 'ttb' -> top to bottom
     * - 'btt' -> bottom to top
     * @default 'rtl'
     */
    mode?: CarouselMode;
    /** The carousel type - use gap between the icons @default 'horisontal' */
    type?: CarouselType;
    /** A CSS gap property - use gap between the icons @default '50px' */
    gap?: string;
    /** A CSS animation-duration property in miliseconds or seconds @default '10s' */
    duration?: string;
    /**
     * A CSS width property - used define the carousel width
     * @default
     * 'horisontal' -> '350px'
     * 'vertical' -> '70px'
     */
    width?: string;
    /**
     * A CSS height property - used define the carousel height
     * @default
     * 'horisontal' -> '70px'
     * 'vertical' -> '350px'
     */
    height?: string;
    /** A CSS width property - used define the icon width @default '100%' */
    iconWidth?: string;
    /** Stop the animation on hover @default true */
    stopOnHover?: boolean;
  }

  type StylesType = {
    animationPlayState: AnimationPlayState;
    animationName: AnimationName;
    carouselWidth: string;
    carouselHeight: string;
    flexDirection: 'column' | 'row';
    maskImageDir: 'to right' | 'to bottom';
    slottedDivWrapperWidth: 'auto' | '100%';
    slottedDivWrapperHeight: 'auto' | '100%';
  };

  // --------------------------------------------

  // Macros
  // --------------------------------------------
  defineSlots<{
    default: () => VNode[];
  }>();

  const {
    mode = 'rtl',
    type = 'horisontal',
    gap = '50px',
    duration = '10s',
    width,
    height,
    iconWidth = '100%',
    stopOnHover = true,
  } = defineProps<CarouselProps>();
  // --------------------------------------------

  // Data
  // --------------------------------------------
  const dimension = resolveCarouselWidthAndHeight();

  const styles: StylesType = {
    animationPlayState: stopOnHover ? 'paused' : 'running',
    animationName: resolveAnimationName(),
    carouselWidth: width! ?? dimension.width,
    carouselHeight: height! ?? dimension.height,
    flexDirection: type === 'horisontal' ? 'row' : 'column',
    maskImageDir: type === 'horisontal' ? 'to right' : 'to bottom',
    slottedDivWrapperWidth: type === 'horisontal' ? 'auto' : '100%',
    slottedDivWrapperHeight: type === 'horisontal' ? '100%' : 'auto',
  };
  // --------------------------------------------

  // Methods
  // --------------------------------------------
  function resolveAnimationName(): AnimationName {
    switch (type) {
      case 'horisontal': {
        switch (mode) {
          case 'rtl':
            return 'right-to-left';
          case 'ltr':
            return 'left-to-right';
          case 'btt':
          case 'ttb':
            return 'right-to-left';
        }
      }
      case 'vertical': {
        switch (mode) {
          case 'btt':
            return 'bottom-to-top';
          case 'ttb':
            return 'top-to-bottom';
          case 'rtl':
          case 'ltr':
            return 'top-to-bottom';
        }
      }
    }
  }

  function resolveCarouselWidthAndHeight(): Pick<CarouselProps, 'width' | 'height'> {
    switch (type) {
      case 'horisontal': {
        return {
          width: '350px',
          height: '70px',
        };
      }
      case 'vertical': {
        return {
          width: '70px',
          height: '350px',
        };
      }
    }
  }
  // --------------------------------------------
</script>

<template>
  <div :class="['carousel-cont', `animation-${styles.animationName}`]">
    <div>
      <slot></slot>
    </div>
    <div aria-hidden="true">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .carousel-cont {
    display: flex;
    width: 100%;
    height: v-bind('styles.carouselHeight');
    max-width: v-bind('styles.carouselWidth');
    flex-direction: v-bind('styles.flexDirection');
    gap: v-bind(gap);
    overflow: hidden;
    mask-image: linear-gradient(v-bind('styles.maskImageDir'), transparent, #000, transparent);
  }

  /* target the icons group */
  .carousel-cont > div {
    display: flex;
    flex-direction: v-bind('styles.flexDirection');
    justify-content: center;
    align-items: center;
    gap: v-bind(gap);
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: v-bind(duration);
  }

  .carousel-cont:hover > div {
    animation-play-state: v-bind('styles.animationPlayState');
  }

  /* target the icons */
  .carousel-cont > div > :slotted(div) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: v-bind('styles.slottedDivWrapperWidth');
    height: v-bind('styles.slottedDivWrapperHeight');
    aspect-ratio: 1;
    flex-grow: 0;
    flex-shrink: 0;
    filter: grayscale(100%);
    transition: filter var(--transition-duration-global);
    position: relative;
  }

  .carousel-cont > div > :slotted(div) > :only-child {
    width: v-bind(iconWidth);
    aspect-ratio: 1;
  }

  .carousel-cont > div > :slotted(div):hover {
    filter: none;
  }

  .animation-left-to-right > div {
    animation-name: left-to-right;
  }

  .animation-right-to-left > div {
    animation-name: right-to-left;
  }

  .animation-top-to-bottom > div {
    animation-name: top-to-bottom;
  }

  .animation-bottom-to-top > div {
    animation-name: bottom-to-top;
  }

  @keyframes right-to-left {
    from {
      transform: translateX(0);
    }
    to {
      /* fix jumping because of the gap between the the 2 groups */
      transform: translateX(calc(-100% - v-bind(gap)));
    }
  }

  @keyframes left-to-right {
    from {
      /* fix jumping because of the gap between the the 2 groups */
      transform: translateX(calc(-100% - v-bind(gap)));
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes top-to-bottom {
    from {
      /* fix jumping because of the gap between the the 2 groups */
      transform: translateY(calc(-100% - v-bind(gap)));
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes bottom-to-top {
    from {
      transform: translateY(0);
    }
    to {
      /* fix jumping because of the gap between the the 2 groups */
      transform: translateY(calc(-100% - v-bind(gap)));
    }
  }
</style>
