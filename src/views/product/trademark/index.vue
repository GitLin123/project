<template>
  <!-- 使用卡片组件 -->
  <el-card class="box-card">
    <el-button type="primary" icon="Plus" @click="addTradeMark"
      >添加品牌</el-button
    >
    <el-table style="margin: 10px 0px" border :data="trademarkArr">
      <el-table-column label="序号" align="center" type="index">
      </el-table-column>
      <el-table-column label="品牌名称" align="center">
        <!-- 使用作用域插槽 -->
        <template #="{ row, $index }">
          <pre>{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌Logo" align="center">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 55px; height: 55px" />
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center">
        <template #="{ row, $index }">
          <pre>{{ row.updateTime }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" align="center">
        <template #="{ row, $index }">
          <el-button
            size="small"
            icon="Edit"
            @click="editTradeMark(row)"
          ></el-button>
          <el-popconfirm
            :title="`确定要删除${row.tmName}品牌吗？`"
            width="250px"
            @confirm="deleteTradeMark(row.id)"
          >
            <template #reference>
              <el-button size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- v-midel 设置分页当前页码
    pigesize 每一页展示数据的条数 
    page-sizes设置下拉菜单数据条数属性
    -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[1, 3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, ->,jumper,total,sizes"
      :total="total"
      @size-change="sizeChange"
      @current-change="getHasTradeMark"
      hide-on-single="true"
    />
  </el-card>
  <el-dialog v-model="show" :title="action">
    <el-form :model="trademarkParams" :rules="rules" ref="formRef">
      <el-form-item label="品牌名称" prop="tmName">
        <el-input
          placeholder="输入品牌名称"
          style="width: 80%"
          v-model="trademarkParams.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" prop="logoUrl">
        <!-- action 属性 上传地址 -->
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import {
  reqAddUpdateTradeMark,
  reqDeleteTradeMark,
  reqHasTradeMark,
} from "../../../api/product/trademark";
import {
  Records,
  TradeMark,
  TradeMarkResponse,
} from "../../../api/product/trademark/type";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
let action = ref("");
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  //收集上传的图片url
  trademarkParams.logoUrl = response.data;
  formRef.value.clearValidate("logoUrl");
};
//限制图片的类型
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type !== "image/jpeg" &&
    rawFile.type !== "image/png" &&
    rawFile.type !== "image/jpg"
  ) {
    ElMessage.error("上传的文件类型必须是jpeg类型");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("文件大小不能超过2MB");
    return false;
  }
  return true;
};
let pageNo = ref<number>(1);
let limit = ref<number>(5);
// 存储已有品牌个数
let total = ref<number>(0);
//是否打开dialog
let show = ref<boolean>(false);
//品牌属性
let trademarkArr = ref<Records>([]);
let trademarkParams = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});
//表单校验
let formRef = ref(); //获取组件实例
const validatorTmName = (rule: any, value: any, callBack: any) => {
  //自定义校验规则
  if (value.length < 2) {
    callBack(new Error("品牌名称必须多于两位"));
  } else {
    callBack();
  }
};

const validatorLogo = (rule: any, value: any, callBack: any) => {
  //如果图片上传
  if (value) {
    callBack();
  } else {
    callBack(new Error("必须上传logo图片"));
  }
};
const rules = {
  tmName: [
    //required表示该项必须填写
    //trigger表示触发时机{blur change}
    { required: true, trigger: "blur", validator: validatorTmName },
  ],
  logoUrl: [{ required: true, validator: validatorLogo }],
};

//添加品牌
const addTradeMark = () => {
  action.value = "添加品牌";
  show.value = !show.value;
  //清空收集的数据
  trademarkParams.id = 0;
  trademarkParams.logoUrl = "";
  trademarkParams.tmName = "";
  formRef.value?.clearValidate("tmname"); //问号语法用于检测是否有对应的方法
  formRef.value?.clearValidate("logoUrl");
};

//修改品牌
const editTradeMark = async (row: TradeMark) => {
  action.value = "修改品牌";
  formRef.value?.clearValidate("tmname"); //问号语法用于检测是否有对应的方法
  formRef.value?.clearValidate("logoUrl");
  show.value = !show.value;
  //收集已有品牌的数据
  trademarkParams.id = row.id;
  trademarkParams.logoUrl = row.logoUrl;
  trademarkParams.tmName = row.tmName;
  await reqAddUpdateTradeMark(trademarkParams);
};

//删除品牌
const deleteTradeMark = async (id: number) => {
  let result = await reqDeleteTradeMark(id);
  if (result.code == 200) {
    ElMessage.success("删除成功！");
    trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1;
    getHasTradeMark();
  } else {
    ElMessage.error("删除失败！");
  }
};

//取消按钮
const cancel = () => {
  show.value = false;
  trademarkParams.id = 0;
  trademarkParams.logoUrl = "";
  trademarkParams.tmName = "";
};

//确定按钮
const confirm = async () => {
  //发请求之前对所有表单进行校验
  await formRef.value.validate(); //await等待的是成功的结果
  let result: any = await reqAddUpdateTradeMark(trademarkParams);
  console.log(result.code);
  if (result.code == 200) {
    show.value = false;
    ElMessage({
      type: "success",
      message: `${action.value}成功！`,
    });
    //再次申请数据
    getHasTradeMark();
    //情空表单数据
  } else {
    show.value = false;
    ElMessage({
      type: "error",
      message: `${action.value}失败！`,
    });
  }
};

//发起请求获取品牌信息
const getHasTradeMark = async () => {
  let result: TradeMarkResponse = await reqHasTradeMark(
    pageNo.value,
    limit.value,
  );
  if (result.code == 200) {
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
};

//组件挂载时发起请求
onMounted(() => {
  getHasTradeMark();
});

//改变页面展示条数
const sizeChange = () => {
  pageNo.value = 1;
  getHasTradeMark();
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 2px dashed #525151;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #918c8c;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
}
</style>
