import { Meta, StoryFn } from "@storybook/vue3";
import PaginationVue from "./index.vue";

export default {
  title: "Pagination",
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

let currentPage = 1;
let totalPage = 10;

export const Primary = Template.bind({});
Primary.args = { currentPage: currentPage, totalPage: totalPage };

function nextPage(){
  if(currentPage < totalPage)
    currentPage++;
}

function previousPage(){
  if(currentPage > 0)
    currentPage--;
}