// Button.stories.ts
import { Meta, StoryFn } from "@storybook/vue3";
import ButtonVue from "./index.vue";

export default {
  title: "Button",
  argTypes: {
    type: {
      options: ['primary', 'secondary', 'tertiary', 'plain-button', 'destructive'],
      control: { type: 'radio'}
    },
    size: {
      options: ['default', 'medium', 'large'],
      control: { type: 'radio'}
    },
    iconLeft: {
      options: ['Filter', 'ArrowDown', 'Loader'],
      control: { type: 'radio'}
    },
    icon: {
      options: ['', 'Filter', 'ArrowDown', 'Loader'],
      control: { type: 'radio'}
    }
  },
  component: ButtonVue,
} as Meta<typeof ButtonVue>;

//👇 We create a “template” of how args map to rendering
const Template: StoryFn<typeof ButtonVue> = (args) => ({
  components: { ButtonVue },
  setup() {
    return { args };
  },
  template: '<ButtonVue v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = { text: "Primary", type: "primary", size: "default" };

export const Secondary = Template.bind({});
Secondary.args = { text: "Secondary", type: "secondary", size: "large" };

export const Tertiary = Template.bind({});
Tertiary.args = { text: "Tertiary", type: "tertiary", disabled: true };

export const PlainButton = Template.bind({});
PlainButton.args = { text: "Plain Button", type: "plain-button" };

export const Destructive = Template.bind({});
Destructive.args = { text: "Destructive", type: "destructive" };
