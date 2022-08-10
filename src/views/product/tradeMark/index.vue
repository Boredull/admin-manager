<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px"
      >添加</el-button
    >
    <!-- 表格组件 
        data:表格组件将来需要展示的数据 ------数组类型
        border:是给表格添加边框的
        column属性
        label:显示标题
        width:对应列的宽度
        align:标题的对齐方式
        注意1:elementUI当中的table组件,展示的数据是以一列一列进行展示数据
        -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column
        label="序号"
        type="index"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        prop="tmName"
        width="width"
      ></el-table-column>
      <el-table-column label="品牌LOGO" prop="prop" width="width">
        <!-- 作用域插槽 -->
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="prop" width="width">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" icon="el-icon-edit" size="mini"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 
            分页器 
            当前第几页、数据总条数、每一页展示条数、连续页码数
            @size-change="handleSizeChange"
            @current-change = "handleCurrentChange"

            current-page:代表的是当前第几页
            total:代表分页器一共需要展示数据条数
            page-size:代表的是每一页需要展示多少条数据
            page-sizes:代表可以设置每一页展示多少条数据
            layout:可以实现分页器布局
            pager-count:按钮的数量 如果9 连续 页码是7

        -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      @current-change="getPageList"
      @size-change="handleSizeChange"
      layout="prev,pager,next,jumper,->,sizes,total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      // 代表的分页器第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      // 列表展示的数据
      list: [],
    };
  },
  // 组件挂载完毕发请求
  mounted() {
    // 获取列表数据方法
    this.getPageList();
  },
  methods: {
    // 获取品牌列表的数据
    async getPageList(pager = 1) {
      this.page = pager;
      // 结构出参数
      const { page, limit } = this;
      // 获取品牌列表的接口
      // 当你向服务器发请求的时候,这个函数需要带参数,因此老师在data当中初始化两个字段,代表给服务器传递参数
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        // 分别是展示数据总条数与列表展示的数据
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // handleCurrentChange(pager){
    //     // 修改参数
    //     this.page = pager;
    //     this.getPageList();
    // }
    // 当分页器某一页需要展示数据条数发生变化的时候会触发
    handleSizeChange(limit) {
      // 整理参数
      this.limit = limit;
      this.getPageList();
    },
  },
};
</script>

<style scoped>
</style>