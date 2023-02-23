export const columns: any = [
	{
	  title: "存储状态(disk)",
	  children: [
		{
		  title: "总剩余(availiable)",
		  key: "disk-availiable",
		  width: 200,
		  align: "center",
		},
		{
		  title: "总容量(capaticy)",
		  key: "disk-capaticy",
		  width: 200,
		  align: "center",
		},
		{
		  title: "总空闲(free)",
		  key: "disk-free",
		  width: 200,
		  align: "center",
		},
	  ],
	},
	{
	  title: "内存负载(mem)",
	  children: [
		{
		  title: "总剩余(availiable)",
		  key: "mem-availiable",
		  width: 200,
		  align: "center",
		},
		{
		  title: "总容量(capaticy)",
		  key: "mem-capaticy",
		  width: 200,
		  align: "center",
		},
		{
		  title: "占用比(load)",
		  key: "mem-load",
		  width: 200,
		  align: "center",
		},
	  ],
	},
	{
	  title: "计算负载(cpu)",
	  align: "center",
	  children: [
		{
		  title: "当前负载(load)",
		  key: "cpu-load",
		  width: 200,
		  align: "center",
		},
	  ],
	},
  ];