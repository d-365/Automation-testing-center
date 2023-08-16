<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <slot name="header">header</slot>
            </div>
        </template>
        <slot name="body">body</slot>
    </el-card>
</template>

<script>
    export default {
        name: "myCard"
    }
</script>

<style scoped>
    .box-card{
        width: calc(27vw);
    }
    .card-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

</style>