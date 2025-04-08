<template>
  <div class="p-6 bg-gray-100 min-h-screen space-y-8">
    <!-- Header -->
    <div class="text-3xl font-semibold text-gray-800">Analytics Dashboard</div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SummaryCard title="Users" :value="1234" />
      <SummaryCard title="Sales" :value="5678" />
      <SummaryCard title="Revenue" :value="'$12,345'" />
    </div>

    <!-- Charts Section -->
    <template v-if="isLoading">
      <div class="flex justify-center items-center h-96">
        <div
          class="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"
        ></div>
      </div>
    </template>
    <template v-else>
      <!-- charts here -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Line Chart -->
        <div class="bg-white p-4 rounded-xl shadow">
          <h2 class="text-lg font-semibold mb-4">Website Traffic</h2>
          <DxChart :data-source="chartData">
            <DxArgumentAxis :valueMarginsEnabled="false" />
            <DxSeries value-field="visits" argument-field="date" name="Visits" type="line" />
          </DxChart>
        </div>

        <!-- Bar Chart -->
        <div class="bg-white p-4 rounded-xl shadow">
          <h2 class="text-lg font-semibold mb-4">Monthly Revenue</h2>
          <DxChart :data-source="revenueData">
            <DxArgumentAxis />
            <DxSeries value-field="amount" argument-field="month" name="Revenue" type="bar" />
          </DxChart>
        </div>

        <!-- Pie Chart -->
        <div class="bg-white p-4 rounded-xl shadow">
          <h2 class="text-lg font-semibold mb-4">Sales by Category</h2>
          <DxPieChart :data-source="salesData" type="doughnut">
            <DxSeries argument-field="category" value-field="value" />
          </DxPieChart>
        </div>

        <!-- Stacked Area Chart -->
        <div class="bg-white p-4 rounded-xl shadow">
          <h2 class="text-lg font-semibold mb-4">Users by Region</h2>
          <DxChart :data-source="regionData" title="Active Users">
            <DxArgumentAxis />
            <DxSeries value-field="north" argument-field="month" name="North" type="stackedarea" />
            <DxSeries value-field="south" argument-field="month" name="South" type="stackedarea" />
          </DxChart>
        </div>
      </div>

      <!-- Data Grid -->
      <div class="bg-white p-4 rounded-xl shadow">
        <h2 class="text-lg font-semibold mb-4">Recent Activity</h2>
        <DxDataGrid
          :data-source="activityData"
          :columns="columns"
          show-borders
          :row-alternation-enabled="true"
          :show-column-lines="false"
          :show-row-lines="false"
          :paging="{ pageSize: 5 }"
          :pager="{ showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true }"
          :search-panel="{ visible: true, width: 240, placeholder: 'Search...' }"
          @row-click="onRowClick"
        />

        <!-- Modal Popup -->
        <DxPopup
          v-model:visible="popupVisible"
          :width="400"
          :height="300"
          :show-title="true"
          title="Activity Details"
          :drag-enabled="true"
          :close-on-outside-click="true"
        >
          <template #default>
            <div class="p-4">
              <p><strong>Action:</strong> {{ selectedRow?.action }}</p>
              <p><strong>User:</strong> {{ selectedRow?.user }}</p>
              <p><strong>Time:</strong> {{ selectedRow?.time }}</p>
            </div>
          </template>
        </DxPopup>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Dashboard',
});

import { ref } from 'vue';
import { DxChart, DxSeries, DxArgumentAxis } from 'devextreme-vue/chart';
import { DxDataGrid } from 'devextreme-vue/data-grid';
import { DxPopup } from 'devextreme-vue/popup';

import { DxPieChart } from 'devextreme-vue/pie-chart';
import SummaryCard from '../components/SummaryCard.vue';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
});

// Sample data
const chartData = ref([
  { date: '2025-04-01', visits: 120 },
  { date: '2025-04-02', visits: 160 },
  { date: '2025-04-03', visits: 140 },
  { date: '2025-04-04', visits: 200 },
]);

const revenueData = ref([
  { month: 'Jan', amount: 3000 },
  { month: 'Feb', amount: 4200 },
  { month: 'Mar', amount: 5100 },
  { month: 'Apr', amount: 6200 },
]);

const salesData = ref([
  { category: 'Electronics', value: 400 },
  { category: 'Clothing', value: 250 },
  { category: 'Home Goods', value: 150 },
]);

const regionData = ref([
  { month: 'Jan', north: 200, south: 100 },
  { month: 'Feb', north: 250, south: 130 },
  { month: 'Mar', north: 300, south: 160 },
  { month: 'Apr', north: 400, south: 200 },
]);

const popupVisible = ref(false);
const selectedRow = ref(null);

const activityData = ref([
  { id: 1, action: 'Login', user: 'Alice', time: '2025-04-07 10:30' },
  { id: 2, action: 'Upload File', user: 'Bob', time: '2025-04-07 11:00' },
  { id: 3, action: 'Logout', user: 'Charlie', time: '2025-04-07 11:15' },
  { id: 4, action: 'Download Report', user: 'Alice', time: '2025-04-07 12:00' },
  { id: 5, action: 'Delete File', user: 'Bob', time: '2025-04-07 12:15' },
  { id: 6, action: 'Comment', user: 'Charlie', time: '2025-04-07 13:00' },
  { id: 7, action: 'Update Profile', user: 'Alice', time: '2025-04-07 14:00' },
  { id: 8, action: 'Reset Password', user: 'David', time: '2025-04-07 14:30' },
  { id: 9, action: 'Create Project', user: 'Emily', time: '2025-04-07 15:00' },
  { id: 10, action: 'Invite User', user: 'Frank', time: '2025-04-07 15:30' },
  { id: 11, action: 'Generate Invoice', user: 'Alice', time: '2025-04-07 16:00' },
  { id: 12, action: 'Submit Feedback', user: 'George', time: '2025-04-07 16:15' },
  { id: 13, action: 'Approve Request', user: 'Helen', time: '2025-04-07 16:45' },
  { id: 14, action: 'Reject Request', user: 'Ian', time: '2025-04-07 17:00' },
  { id: 15, action: 'Upload Image', user: 'Jack', time: '2025-04-07 17:30' },
  { id: 16, action: 'Download PDF', user: 'Karen', time: '2025-04-07 18:00' },
  { id: 17, action: 'Edit Settings', user: 'Leo', time: '2025-04-07 18:15' },
  { id: 18, action: 'Send Email', user: 'Mia', time: '2025-04-07 18:30' },
  { id: 19, action: 'Archive Project', user: 'Noah', time: '2025-04-07 19:00' },
  { id: 20, action: 'Unarchive Project', user: 'Olivia', time: '2025-04-07 19:15' },
]);

const columns = [
  { dataField: 'id', caption: 'ID', width: 50 },
  { dataField: 'action', caption: 'Action' },
  { dataField: 'user', caption: 'User' },
  { dataField: 'time', caption: 'Time' },
];

const onRowClick = ({ data }) => {
  selectedRow.value = data;
  popupVisible.value = true;
};
</script>
