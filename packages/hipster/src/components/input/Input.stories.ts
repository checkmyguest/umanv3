import { Meta, StoryFn } from "@storybook/vue3";
import "element-plus/dist/index.css";
import "../../assets/style/style.scss";
import "../../style.css";
import InputVue from "./index.vue";

export default {
  title: "Input",
  argTypes: {
    iconLeft: {
      options: ["", "Filter", "Loader"],
      control: { type: "radio" }
    }
  },
  component: InputVue,
} as Meta<typeof InputVue>;

const Template: StoryFn<typeof InputVue> = (args) => ({
  components: { InputVue },
  setup() {
    return { args };
  },
  template: '<div style="height: 50px; display: flex; align-items: center"><InputVue v-bind="args" /></div>',
});

export const Primary = Template.bind({});

Primary.args = {
  type: "primary",
  text: "Primary",
  getValue: getValue
};

let value = ""

function getValue(text: string){
  value = text;
}