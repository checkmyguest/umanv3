import { Meta, StoryFn } from "@storybook/vue3";
import PanelSliderVue from "./panel-slider-vue.vue";

export default {
  title: "PanelSlider",
  component: PanelSliderVue,
} as Meta<typeof PanelSliderVue>;

const Template: StoryFn<typeof PanelSliderVue> = (args) => ({
  components: { PanelSliderVue },
  setup() {
    return { args };
  },
  template:
    '<div style="width: 100%; display: flex; justify-content: center;"><PanelSliderVue v-bind="args" /></div>',
});

export const Primary = Template.bind({});

Primary.args = {};
