// Button.stories.ts
import { Meta, StoryFn } from "@storybook/vue3";
import InputSearchVue from "./input-search-vue.vue";

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
  template: '<InputSearchVue v-bind="args" />',
});

function getValue(value: string) {
  console.log(value);
}

export const Default = Template.bind({});
Default.args = { getValue: getValue };

export const Medium = Template.bind({});
Medium.args = { getValue: getValue, size: "medium" };

export const Large = Template.bind({});
Large.args = { getValue: getValue, size: "large" };
