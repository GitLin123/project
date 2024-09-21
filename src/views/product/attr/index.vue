<template>
  <!-- 三级分类的展示 -->
  <Category :scene="scene"></Category>
  <el-card style="margin-top: 10px">
    <div v-if="scene==0">
      <el-button type="primary" :disabled="categoryStore.c3Id ? false : true" @click="changePage">
        <span>添加属性</span>
      </el-button>
      <el-table border style="margin-top: 10px" :data="attrArr">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="属性名称" align="center" width="120px" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称" align="center">
          <template #="{ row, $index }">
            <el-tag v-for="(item, index) in row.attrValueList" :key=item.id style="margin-right: 4px">{{ item.valueName
              }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120px">
          <template #="{row,$index}">
            <el-button @click="updateAttr(row)" size="small" icon="Edit"></el-button>
            <el-popconfirm :title="`确定删除${row.attrName}吗`" width="200px" @confirm="deleteAttr(row.id)">
            <template #reference>
              <el-button size="small" icon="Delete"></el-button>
             </template>
          </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input palceholder="请输入属性名称" v-model="attrParams.attrName">添加属性值</el-input>
        </el-form-item>
      </el-form>
      <el-button :disabled="attrParams.attrName ? false : true" type="primary" icon="Plus"
        @click="addAttrValue">添加属性值</el-button>
      <el-button @click="changePage">取消</el-button>
      <el-table border style="margin-top: 10px;margin-bottom:10px" :data="attrParams.attrValueList">
        <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
        <el-table-column label="属性值名称">
          <!-- row是数属性值对象 -->
          <template #="{ row, $index }">
            <el-input :ref="(vc:any)=>{inputArr[$index] = vc}" size="small" v-if="row.flag" @blur="toLook(row,$index)" placeholder="请输入属性值名称" v-model="row.valueName"></el-input>
            <div @click="toEdit(row,$index)" v-else>{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #="{row,$index}">
            <el-button icon="Delete" @click="attrParams.attrValueList.splice($index,1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="save" :disabled="attrParams.attrValueList.length>0? false : true">保存</el-button>
      <el-button @click="changePage">取消</el-button>
    </div>
  </el-card>

</template>

<script setup lang="ts">
import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from "../../../api/product/attr";
import Category from "../../../components/Category/index.vue";
import useCategoryStore from "../../../store/modules/category";
import { watch, ref, reactive, nextTick, onBeforeUnmount } from "vue";
import type { Attr } from "../../../api/product/attr/type";
import { ElMessage } from "element-plus";
let categoryStore = useCategoryStore();
let attrArr = ref<Attr[]>([]);
let scene = ref(0);
let inputArr = ref<any>([]);
//收集新增的属性信息
let attrParams = reactive<Attr>({
  attrName: "",//新增的属性名字
  attrValueList: [//新增属性值的数据
  ],
  categoryId: '', //三级分类的ID
  categoryLevel: 3 //代表三级分类
})
//添加属性值按钮的回调
const addAttrValue = () => {
  attrParams.attrValueList.push({ valueName: '',flag:true });
  //获取el-input组件聚焦
  nextTick(()=>{
    inputArr.value[attrParams.attrValueList.length-1].focus();
  })
}

//存储已有的属性值
watch(
  () => categoryStore.c3Id,
  async () => {
    attrArr.value = [];
    if (!categoryStore.c3Id) { return; }
    getAttr();
  },
);

//获取属性的详细信息
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore;
  let result = await reqAttr(c1Id, c2Id, c3Id);
  if (result.code == 200) {
    attrArr.value = result.data;
  }
};

//更新属性值
const updateAttr = (row:Attr) => {
  scene.value=1;
  //深拷贝
  Object.assign(attrParams,JSON.parse(JSON.stringify(row)));
}
//路由组件销毁的时候清空仓库的数据
onBeforeUnmount(()=>{
    categoryStore.$reset();
})
//改变页面
const changePage = () => {
  Object.assign(attrParams, {
    attrName: "",//新增的属性名字
    attrValueList: [//新增属性值的数据
    ],
    categoryId: '', //三级分类的ID
    categoryLevel: 3 //代表三级分类
  })
  if(scene.value==0)scene.value=1;
  else scene.value=0;
  getAttr();
}
//保存按钮
const save = async () => {
  attrParams.categoryId = categoryStore.c3Id;
  let result = await reqAddOrUpdateAttr(attrParams);
  if (result.code == 200) {
    //切换场景
    scene.value = 0;
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功'
    })
    getAttr();
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败'
    })
  }
}

//属性值表单失去焦点
const toLook = (row:any,$index:any) => {
  if(row.valueName.trim() == ''){
    attrParams.attrValueList.splice($index,1);
    ElMessage({
      type:'error',
      message: '属性值不能为空'
    })
    return;
  }
  //去除重复的属性值
 let repeat = attrParams.attrValueList.find((item)=>{
    if(item!=row){
      return item.valueName ===row.valueName;
    }
  });
  if(repeat){
    attrParams.attrValueList.splice($index,1);
    ElMessage({
      type:'error',
      message:'属性值不能重复！'
    })
    return;
  }

  row.flag = false
}

const toEdit = (row:any,$index:number) => {
  row.flag = true
  //响应式数据发生变化获取更新后的实例
  nextTick(()=>{
    inputArr.value[$index].focus();
  })
}
//删除某一个已有的属性方法的回调
const deleteAttr = async(attrId:number) => {
  let result = await reqRemoveAttr(attrId);
  if(result.code ==200) {
    ElMessage({
      type:'success',
      message:'删除成功！'
    })
    getAttr();
  }else {
    ElMessage({
      type:'error',
      message:'删除失败！'
    })
  }
}

</script>

<style scoped></style>
