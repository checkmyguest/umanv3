import { ITagOptions, ITagsEvent } from "@/constants/tags/tags";
import { Meta, StoryFn } from "@storybook/vue3";
import tagsContainer from "../../constants/tags/tags.json";
import SelectVue from "./select-vue.vue";

export default{
    title: 'Select',
    component: SelectVue
} as Meta<typeof SelectVue>;

const Template: StoryFn<typeof SelectVue> = (args) => ({
    components: { SelectVue },
    setup(){
        return { args };
    },
    template: '<SelectVue v-bind="args" />',
});

const tags: ITagOptions[] = [];
tagsContainer.filter((tag) => tag.active === 1).forEach((tag) => {
    tags.push({
        tag_id: tag.tag_id,
        name: tag.name,
        active: tag.active,
        checked: false
    });
});

const tagsReservation: ITagsEvent[] = [
    { tag_id: 96, name: "Care - J1", reservation_id: 431206 }
];

export const Primary = Template.bind({});
Primary.args = {
    tagsContainer: tags, tagsReservation: tagsReservation, reservationId: 431206
}