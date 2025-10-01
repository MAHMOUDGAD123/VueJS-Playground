import type { Directive, FunctionDirective } from 'vue';

type Value = { fontSize: number; color: string };
type Args = 'sm' | 'md' | 'lg' | 'xlg';
type Modifiers = 'uppercase' | 'lowercase' | 'capitalize';

type FontDirectiveTyoe = Directive<HTMLElement, Value, Modifiers, Args>;

declare module 'vue' {
  interface ComponentCustomProperties {
    vFont: FontDirectiveTyoe;
  }
}

const handler: FunctionDirective<HTMLElement, Value, Modifiers, Args> = (ele, binding) => {
  // this function will be called on (mounted, updated) hooks

  // font-size
  switch (binding.arg) {
    case 'sm': {
      ele.style.fontSize = `15px`;
      break;
    }
    case 'md': {
      ele.style.fontSize = `22px`;
      break;
    }
    case 'lg': {
      ele.style.fontSize = `30px`;
      break;
    }
    case 'xlg': {
      ele.style.fontSize = `35px`;
      break;
    }
    default: {
      ele.style.fontSize = `${binding.value.fontSize}px`;
    }
  }

  // color
  if (binding.value) {
    ele.style.color = binding.value.color;
  }

  if (binding.modifiers.uppercase) {
    ele.innerText = ele.innerText.toUpperCase();
  } else if (binding.modifiers.lowercase) {
    ele.innerText = ele.innerText.toLowerCase();
  } else if (binding.modifiers.capitalize) {
    const inTxt = ele.innerText;
    ele.innerHTML = inTxt.charAt(0).toUpperCase() + inTxt.slice(1).toLowerCase();
  }
};

export default {
  mounted: handler,
  updated: handler,
} satisfies FontDirectiveTyoe;
