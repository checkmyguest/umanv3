<script lang="ts">
import PaginationVue from '@/components/pagination/pagination-vue.vue';

export default{
    components:{
        PaginationVue
    }
}

</script>
<template>
    <div class="playground">
        <div class="card">
            <!-- <PaginationVue /> -->
        </div>
    </div>
</template>
<style scoped lang="scss">
    .playground{
        width: 30vw;
        height: 10vh;
        .card{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>