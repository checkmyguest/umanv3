// Button.stories.ts
import { Meta, StoryFn } from "@storybook/vue3";
import InputSearchVue from "./index.vue";

export default {
  title: "InputSearch",
  component: InputSearchVue,
} as Meta<typeof InputSearchVue>;

//👇 We create a “template” of how args map to rendering
const Template: StoryFn<typeof InputSearchVue> = (args) => ({
  components: { InputSearchVue },
  setup() {
    return { args };
  },
  template: '<div style="width: auto; display: flex; align-items: center"><InputSearchVue v-bind="args" /></div>',
});

function getValue(value: string) {
  console.log(value);
}

export const Default = Template.bind({});
Default.args = { getValue: getValue, modelValue: "Hello my friends" };