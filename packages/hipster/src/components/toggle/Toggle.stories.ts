import { Meta, StoryFn } from "@storybook/vue3";
import ToggleVue from "./index.vue";

export default {
  title: "Toggle",
  argTypes: {
    type: {
      options: ["default", "destructive"],
      control: { type: "radio" } 
    }
  },
  component: ToggleVue,
} as Meta<typeof ToggleVue>;

const Template: StoryFn<typeof ToggleVue> = (args) => ({
  components: { ToggleVue },
  setup() {
    return { args };
  },
  template: '<ToggleVue v-bind="args" />',
});

let modelValue = false

export const Primary = Template.bind({});
Primary.args = {
  modelValue: modelValue,
  type: "default",
  id: "toggle",
  getValue: getValue
};

export const Destructive = Template.bind({});
Destructive.args = {
  modelValue: true,
  id: "toggle2",
  type: "destructive",
  getValue: getValue
};

function getValue(value: boolean){
  modelValue = value;
}