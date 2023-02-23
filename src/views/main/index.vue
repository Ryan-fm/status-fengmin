<script setup lang="ts">
import router from "@/router";
import { getWebsocket } from "@/service/HomeApi";
import { logout } from "@/service/LoginApi";
import * as echarts from "echarts";
import {columns} from './dataUtil'
const hanledLogout = () => {
  logout().then(() => {
    ws.close();
    router.push({ name: "login" });
  });
};
let activeKey = ref('1')
let websocketsUrl: string;

let ws: any;

const machineData = ref<Array<any>>(new Array());

const serverData = ref<Array<any>>(new Array());

const connet = async () => {
  const resource: any = await getWebsocket();
  websocketsUrl = resource.data.url;
  ws = new WebSocket(`wss://127.0.0.1:8081${websocketsUrl}`);
  ws.onmessage = (event: any) => {
    if (JSON.parse(event.data).endpt.includes("machine-")) {
      machineData.value.unshift(JSON.parse(event.data));
      let temp = JSON.parse(event.data).params.filter(
        (item: any) => item.name === "disk"
      )[0];
      diskAvailiable.unshift(temp.Value.Str.split(",")[0].slice(11, -3));
      option.series[0].data = diskAvailiable.slice(0, 10).reverse();
      myChart.setOption(option);
    } else {
      serverData.value.unshift(JSON.parse(event.data));
    }
  };
};



const diskFilter = computed(
  () => (arr: any, index: number, name: string, type: string) => {
    if (arr === undefined) return;
    const temp = arr.filter((item: any) => item.name === type)[0];
    return temp.Value.Str.split(",")
      [index].trim()
      .slice(name.length + 1, -1);
  }
);

const memFilter = computed(() => (arr: any, index: number, name: string) => {
  if (arr === undefined) return;
  const temp = arr.filter(
    (item: any) => item.name === "mem" || item.name === "memory"
  )[0];
  return temp.Value.Str.split(",")
    [index].trim()
    .slice(name.length + 1, -1);
});

const chartDom = ref();

let diskAvailiable: any[] = [];

let myChart: any;

const initCharts = () => {
  myChart = echarts.init(chartDom.value);
  myChart.setOption(option);
};

const option: any = {
  visualMap: [
    {
      show: false,
      type: "continuous",
      seriesIndex: 0,
      min: 0,
      max: 400,
    },
  ],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    splitLine: {
      show: false,
    },
    triggerEvent: true,
  },
  yAxis: {
    type: "value",
    name: "GB",
    boundaryGap: [0, "100%"],
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      data: [],
      showSymbol: false,
      hoverAnimation: false,
      type: "line",
      markPoint: {
        data: [
          [
            {
              symbol: "none",
              x: "95%",
            },
            {
              symbol: "circle",
            },
          ],
        ],
      },
    },
  ],
};

onMounted(() => {
  connet();
  initCharts();
});
</script>

<template>
  <div class="about">
    <div>
     <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="machine">
          <div class="hardware">
            <a-table
              :columns="columns"
              :data-source="machineData.slice(0, 11)"
              bordered
              :pagination="false"
              size="small"
              class="hardwareTable"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'disk-availiable'">
                  {{ diskFilter(record.params, 0, "availiable", "disk") }}
                </template>
                <template v-else-if="column.key === 'disk-capaticy'">
                  {{ diskFilter(record.params, 1, "capaticy", "disk") }}
                </template>
                <template v-else-if="column.key === 'disk-free'">
                  {{ diskFilter(record.params, 2, "free", "disk") }}
                </template>
                <template v-else-if="column.key === 'cpu-load'">
                  {{ diskFilter(record.params, 0, "load", "cpu") }}
                </template>
                <template v-else-if="column.key === 'mem-availiable'">
                  {{ memFilter(record.params, 0, "availiable") }}
                </template>
                <template v-else-if="column.key === 'mem-capaticy'">
                  {{ memFilter(record.params, 1, "capaticy") }}
                </template>
                <template v-else-if="column.key === 'mem-load'">
                  {{ memFilter(record.params, 2, "load") }}
                </template>
              </template>
            </a-table>
          </div>
          <div class="distCharts" ref="chartDom"></div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="service" force-render>
             <div class="distCharts" ref="chartDom"></div>
        </a-tab-pane>
      </a-tabs>
  
    </div>
  </div>
</template>

<style scoped>
.hardware {
  min-width: 100%;
  padding: 10px 20px;
  display: flex;
  min-height: 550px;
}
.hardwareTable {
  width: 100%;
  margin-right: 20px;
}
.distCharts {
  flex: 1;
  min-height: 550px;
}
</style>
