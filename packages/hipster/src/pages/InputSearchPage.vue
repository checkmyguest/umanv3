<script lang="ts">
import InputSearchVue from "@/components/input-search/input-search-vue.vue";

export default{
    components: {
        InputSearchVue
    },
    data(){
        return{
            text: ''
        }
    },
    methods:{
        getValue(text: string){
            this.text = text;
        }
    }
}

</script>

<template>
    <div class="playground">
        <div class="input-container">
            <div class="card">
                <label>Default</label>
                <InputSearchVue :getValue="getValue"/>
            </div>
        </div>
        <div class="input-container">
            <div class="card">
                <label>Medium</label>
                <InputSearchVue :getValue="getValue" size="medium"/>
            </div>
        </div>
        <div class="input-container">
            <div class="card">
                <label>Large</label>
                <InputSearchVue :getValue="getValue" size="large"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.playground{
    width: 83vw;
    color: black;
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;
}
.card{
    width: 44vw;
    height: 10vh;
    position: relative;
    border-radius: 5px;
    label{
        position: absolute;
        left: 8px;
        font-size: 16px;
    }
}
</style>