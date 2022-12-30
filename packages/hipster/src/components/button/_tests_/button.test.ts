/**
 * @vitest-environment happy-dom
 */
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ButtonVue from "../button-vue.vue";

describe('Button', () =>{
    it('text', () =>{
        const wrapper = mount(ButtonVue, {
            props: {
                text: "text",
            },
        });
        expect(wrapper.text()).toBe("text");
    })
    it('click', async () =>{
        const wrapper = mount(ButtonVue);
        await wrapper.find('el-button').trigger('click');
    })
})