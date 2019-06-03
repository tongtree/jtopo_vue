<template>
  <div>
    <el-form style="margin-top: 100px;margin-left: 20px" :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="queryForm.data.name" placeholder="学生姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select :clearable="true" v-model="queryForm.data.sex" placeholder="请选择请别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="addShow">添加</el-button>
      </el-form-item>
    </el-form>
    <!--    数据表格-->
    <el-table
      :data="tableData"
      style="width: 100%; margin-left: 20px">
      <el-table-column
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.location }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别" width="100">
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <el-pagination
      @size-change="sizeChange"
      @current-change="pageNumChange"
      :current-page="queryForm.pageInfo.pageNum"
      :page-sizes="[1, 2, 10, 20]"
      :page-size="queryForm.pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryForm.pageInfo.total"
      style="margin-left: 20px">
    </el-pagination>
    <!--    删除弹出框-->
    <el-dialog
      title="删除提示"
      :visible.sync="deleteShow"
      width="30%"
      :close-on-click-modal="false"
      center>
      <span>是否确认删除</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="deleteNo">取 消</el-button>
          <el-button type="primary" @click="deleteOk">确 定</el-button>
        </span>
    </el-dialog>
    <!--    添加修改弹出框-->
    <el-dialog :title="dialogName" :visible.sync="editAddShow" :close-on-click-modal="false">
      <el-form :model="addEditForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="addEditForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="addEditForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="家庭住址" :label-width="formLabelWidth">
          <el-input v-model="addEditForm.location" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editAddShow = false">取 消</el-button>
        <el-button type="primary" @click="addEditOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {editReq, addReq, deleteStudentReq, queryReq} from '@/api/student'

  export default {
    data() {
      return {
        formLabelWidth: "200px",
        addEditForm: {
          id: "",
          name: "",
          sex: "",
          location: ""
        },
        editAddShow: false,
        dialogName: "",
        editData: [],
        deleteData: {},
        deleteShow: false,
        queryForm: {
          data: {
            name: '',
            sex: ''
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
            total: 0
          }
        },
        tableData: [{
          id: "1",
          createTime: "2019-01-01",
          name: "张三",
          sex: "男",
          location: "昌平"
        }]
      }
    },
    mounted() {
      this.query();
    },
    methods: {
      sizeChange(val) {
        var that = this;
        that.queryForm.pageInfo.pageSize = val;
        that.query();
      },
      pageNumChange(val) {
        var that = this;
        that.queryForm.pageInfo.pageNum = val;
        that.query();
      },
      addEditOk() {
        var that = this;
        if ("添加学生" == that.dialogName) {
          addReq(that.addEditForm);
        } else {
          editReq(that.addEditForm);
        }

        that.editAddShow = false;

        that.query();

      },
      deleteOk() {
        var that = this;
        deleteStudentReq(that.deleteData.id);
        that.deleteShow = false;
        that.query();
      },
      deleteNo() {
        this.deleteShow = false;
      },
      query() {
        var that = this;
        queryReq(that.queryForm).then(res => {
          const data = res.data;
          that.tableData = data.list;
          console.log(res);
          that.queryForm.pageInfo.total = data.total;
        }).catch(error => {
          console.log(error);
        })
      },
      handleEdit(index, row) {
        var that = this;
        that.dialogName = "修改学生信息";
        that.editAddShow = true;
        that.addEditForm = row;
      },
      handleDelete(index, row) {
        this.deleteShow = true;
        this.deleteData = row;
      },
      addShow() {
        var that = this;
        that.dialogName = "添加学生";
        that.addEditForm = {};
        that.editAddShow = true;
      }
    }
  }
</script>

<style scoped>

</style>
