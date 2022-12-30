// Button.stories.ts
import { Meta, StoryFn } from "@storybook/vue3";
import { EVENT_COLUMNS } from "../../../constants";
import { dataFormatterEvent } from "./dataFormatter";
import DataSample from "./data_example2.json";
import TableVue from "./table-vue.vue";

const dataSample = dataFormatterEvent(DataSample);

export default {
  title: "Table",
  component: TableVue,
} as Meta<typeof TableVue>;

//👇 We create a “template” of how args map to rendering
const Template: StoryFn<typeof TableVue> = (args) => ({
  components: { TableVue },
  setup() {
    return { args };
  },
  template: '<TableVue v-bind="args" />',
});

export const Main = Template.bind({});
Main.args = {
  columns: EVENT_COLUMNS,
  dataTable: dataSample,
};
