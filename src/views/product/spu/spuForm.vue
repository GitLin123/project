<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="输入spu名称"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select>
                <el-option>华为</el-option>
                <el-option>华为</el-option>
                <el-option>华为</el-option>
                <el-option>华为</el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input placeholder="请你输入spu的描述" type="textarea" size="normal"></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
            <el-upload
            v-model:file-list="fileList"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
        >
            <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <el-select style="width:200px">
                <el-option>华为</el-option>
                <el-option>华为</el-option>
                <el-option>华为</el-option>
                <el-option>华为</el-option>
            </el-select>
            <el-button style="margin-left:10px" icon="Plus" type="primary">添加属性值</el-button>
            <el-table border style="margin:10px 0px">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性的名字" width="120px"></el-table-column>
                <el-table-column label="销售属性的值"></el-table-column>
                <el-table-column label="操作" width="120px"></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="">保存</el-button>
            <el-button size="default" @click="cancel">取消</el-button>
            
        </el-form-item>
    </el-form>
</template>

<script setup lang='ts'>
let $emit = defineEmits(['changeScene'])
//点击取消按钮通知父组件切换场景为0
const cancel = () => {
    $emit('changeScene',0)
}
</script>

<style scoped>

</style>