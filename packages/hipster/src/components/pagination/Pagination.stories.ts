import { Meta, StoryFn } from '@storybook/vue3';
import PaginationVue from './pagination-vue.vue';

export default{
  title: 'Pagination',
  component: PaginationVue,
} as Meta<typeof PaginationVue>;

//👇 We create a “template” of how args map to rendering
const Template: StoryFn<typeof PaginationVue> = (args) => ({
  components: { PaginationVue },
  setup() {
    return { args };
  },
  template: '<PaginationVue v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = { currentPage: 1, totalPage: 10 };