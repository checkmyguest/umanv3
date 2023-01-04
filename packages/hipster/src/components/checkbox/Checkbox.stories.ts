// Button.stories.ts
import { Meta, StoryFn } from "@storybook/vue3";
import CheckboxVue from "./checkbox-vue.vue";

export default {
  title: "Checkbox",
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
Primary.args = { text: "Primary", type: "primary", id: "primary" };

export const Required = Template.bind({});
Required.args = { text: "Required", type: "required", id: "required" };
