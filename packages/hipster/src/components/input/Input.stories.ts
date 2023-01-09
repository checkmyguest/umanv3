import { Meta, StoryFn } from "@storybook/vue3";
import "element-plus/dist/index.css";
import "../../assets/style/style.scss";
import "../../style.css";
import InputVue from "./index.vue";

export default {
  title: "Input",
  component: InputVue,
} as Meta<typeof InputVue>;

const Template: StoryFn<typeof InputVue> = (args) => ({
  components: { InputVue },
  setup() {
    return { args };
  },
  template: '<InputVue v-bind="args" />',
});

export const Primary = Template.bind({});

Primary.args = {
  type: "primary",
  text: "Primary",
};
