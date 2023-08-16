<template>
    <!--分页-->
    <div class="page">
        <el-pagination
                :page-size="pageSize"
                :total="total"
                :current-page="currentPage"
                background
                layout="total,prev, pager, next,jumper"
                @current-change="currentChange"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "pagination",
        props:{
            total:{
                default:0
            },
            pageSize: {
                default: 10
            }
        },
        data(){
            return{
                // 当前页
                currentPage:1,
            }
        },
        methods:{
            currentChange(page) {
                this.currentPage=page;
                this.$emit("paging",page)
            },
        }
    }
</script>

<style scoped>

</style>