<script setup>
import { ref } from "vue"
import PowerfulGrid from "../components/PowerfulGrid.vue"

const table = [
	{
		type: 'check',
		name: 'defaultChecked'
	},
	{
		//name: 'name',
		label: '영화명',
		child: [
			{
				name: 'domName',
				label: '국내'
			},
			{
				name: 'intlName',
				label: '해외'
			}
		]
	},
	{
		name: 'openDate',
		label: '개봉일'
	},
	{
		name: 'actor',
		label: '주연'
	},
	{
		//name: 'performance',
		label: '성적',
		child: [
			{
				//name: 'dom',
				label: '국내',
				child: [
					{
						name: 'domCount',
						label: '관객수'
					},
					{
						name: 'domSales',
						label: '매출액'
					}
				]
			},
			{
				//name: 'intl',
				label: '해외',
				child: [
					{
						name: 'intlCount',
						label: '관객수'
					},
					{
						name: 'intlSales',
						label: '매출액 ($)'
					}
				]
			}
		]
	}
]
const list = [
	{
		domName: '범죄도시',
		intlName: 'The Roundup',
		openDate: '2023.05.31',
		actor: '마동석',
		domCount: 0,
		domSales: 0,
		intlCount: 0,
		intlSales: 0,
		defaultChecked: true
	},
	{
		domName: '인어공주',
		intlName: 'Little Mermaid',
		openDate: '2023.05.24',
		actor: '할리 베일리',
		domCount: 340000,
		domSales: 3600000000,
		intlCount: 1200000,
		intlSales: 185000000,
		비고: '욕 먹는 중'
	}
]
const checkedList = ref([])
</script>

<template>
	<powerful-grid :list="list" />
	<hr>
	<powerful-grid :list="list" index-col :table="table" v-model="checkedList"/>
</template>

<style lang="scss" scoped>
table {
	background: gray;
	padding: 4px;
}
</style>