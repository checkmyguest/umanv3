import { Meta, StoryFn } from "@storybook/vue3";
import ToggleVue from "./index.vue";

export default {
  title: "Toggle",
  component: ToggleVue,
} as Meta<typeof ToggleVue>;

const Template: StoryFn<typeof ToggleVue> = (args) => ({
  components: { ToggleVue },
  setup() {
    return { args };
  },
  template: '<ToggleVue v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  model: true,
  id: "toggle",
};

export const Destructive = Template.bind({});
Destructive.args = {
  model: true,
  id: "toggle2",
  type: "destructive",
};
