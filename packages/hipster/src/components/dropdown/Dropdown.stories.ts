// Button.stories.ts
import { Meta, StoryFn } from '@storybook/vue3';
import DropdownVue from './dropdown-vue.vue';

export default{
  title: 'Dropdown',
  component: DropdownVue,
} as Meta<typeof DropdownVue>;

//👇 We create a “template” of how args map to rendering
const Template: StoryFn<typeof DropdownVue> = (args) => ({
  components: { DropdownVue },
  setup() {
    return { args };
  },
  template: '<div style="width: 100%; display: flex; justify-content: center;"><dropdown-vue v-bind="args" /></div>',
});

export const Primary = Template.bind({});
Primary.args = { text: "Primary", type: "primary", id: "primary" };

export const Secondary = Template.bind({});
Secondary.args = { text: "Secondary", type: "secondary", id: "secondary" };

export const Tertiary = Template.bind({});
Tertiary.args = { text: "Tertiary", type: "tertiary", id: "tertiary" };

export const PlainButton = Template.bind({});
PlainButton.args = { text: "PlainButton", type: "plain-button", id: "plain-button" };

export const Destructive = Template.bind({});
Destructive.args = { text: "Destructive", type: "destructive", id: "destructive" };

export const Disabled = Template.bind({});
Disabled.args = { text: "Primary Disabled", type: "primary", id: "disabled", disabled: true };

export const PrimarySplit = Template.bind({});
PrimarySplit.args = { text: "Primary", type: "primary", id: "primary", split: true };

export const SecondarySplit = Template.bind({});
SecondarySplit.args = { text: "Secondary", type: "secondary", id: "secondary", split: true };

export const TertiarySplit = Template.bind({});
TertiarySplit.args = { text: "Tertiary", type: "tertiary", id: "tertiary", split: true };

export const PlainButtonSplit = Template.bind({});
PlainButtonSplit.args = { text: "PlainButton", type: "plain-button", id: "plain-button", split: true };

export const DestructiveSplit = Template.bind({});
DestructiveSplit.args = { text: "Destructive", type: "destructive", id: "destructive", split: true };

export const DisabledSplit = Template.bind({});
DisabledSplit.args = { text: "Primary Disabled", type: "primary", id: "disabled", disabled: true, split: true };