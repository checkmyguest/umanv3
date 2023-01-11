// Button.stories.ts
import { Meta, StoryFn } from "@storybook/vue3";
import CheckboxVue from "./index.vue";

export default {
  title: "Checkbox",
  argTypes: {
    type: {
      options: ["primary", "required"],
      control: { type: "radio" }
    }
  },
  component: CheckboxVue,
} as Meta<typeof CheckboxVue>;

//👇 We create a “template” of how args map to rendering
const Template: StoryFn<typeof CheckboxVue> = (args) => ({
  components: { CheckboxVue },
  setup() {
    return { args };
  },
  template: '<CheckboxVue v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = { text: "Primary", type: "primary", id: "primary", getValue: getValue, modelValue: false };

export const Required = Template.bind({});
Required.args = { text: "Required", type: "required", id: "required", getValue: getValue, modelValue: true };

let value = false

function getValue(check: boolean){
  value = check
}