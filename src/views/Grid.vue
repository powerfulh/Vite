<script setup>
const table = [
	{
		name: 'Col-0',
		child: [
			{
				name: 'Col-00'
			},
			{
				name: 'Col-01'
			}
		]
	},
	{
		name: 'Col-1'
	},
	{
		name: 'Col-2',
		child: [
			{
				name: 'Col-20',
				child: [
					{
						name: 'Col-200'
					},
					{
						name: 'Col-201'
					}
				]
			},
			{
				name: 'Col-21'
			}
		]
	},
	{
		name: 'Col-3'
	},
	{
		name: 'Col-4'
	}
]
const info = [[]]
const finalTable = []

function makeInfo(t, depth) {
	t.forEach(item => {
		if(info[depth] == undefined) info.push([])
		info[depth].push(item)
		if(item.child) {
			makeInfo(item.child, depth + 1)
			item.colspan = item.child.reduce((r, childItem) => r + childItem.colspan, 0)
		} else {
			item.colspan = 1
			finalTable.push(item.name)
		}
	})
}

makeInfo(table, 0)
info.maxRowspan = info.length

const list = [
	{
		'Col-00': (Math.random() * 10).toFixed(),
		'Col-01': (Math.random() * 10).toFixed(),
		'Col-1': (Math.random() * 10).toFixed(),
		'Col-200': (Math.random() * 10).toFixed(),
		'Col-201': (Math.random() * 10).toFixed(),
		'Col-21': (Math.random() * 10).toFixed(),
		'Col-3': (Math.random() * 10).toFixed(),
		'Col-4': (Math.random() * 10).toFixed()
	},
	{
		'Col-01': (Math.random() * 10).toFixed() + 'Col-01',
		'Col-00': (Math.random() * 10).toFixed() + 'Col-00',
		'Col-200': (Math.random() * 10).toFixed() + 'Col-200',
		'Col-1': (Math.random() * 10).toFixed() + 'Col-1',
		'Col-21': (Math.random() * 10).toFixed() + 'Col-21',
		'Col-201': (Math.random() * 10).toFixed() + 'Col-201',
		'Col-4': (Math.random() * 10).toFixed() + 'Col-4',
		'Col-3': (Math.random() * 10).toFixed() + 'Col-3',
		test: '불청객'
	}
]

const simpleTable = []

list.forEach(item => {
	for (const key in item) {
		if(simpleTable.includes(key)) continue
		simpleTable.push(key)
	}
})

const indexCol = true
</script>

<template>
	<!-- cellspacing="0" -->
	<table>
		<thead>
			<tr>
				<th v-if="indexCol" class="index-col">Index</th>
				<th v-for="(item, i) in simpleTable" :key="i">{{item}}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(tr, i) in list" :key="i">
				<td v-if="indexCol" class="index-col">{{i}}</td>
				<td v-for="(td, i1) in simpleTable" :key="i1">{{tr[td]}}</td>
			</tr>
		</tbody>
	</table>
	<hr>
	<table>
		<thead>
			<tr>
				<th v-if="indexCol" rowspan="3" class="index-col">Index</th>
				<th colspan="2">Col 0</th>
				<th rowspan="3">Col 1</th>
				<th colspan="3">Col 2</th>
				<th rowspan="3">Col 3</th>
				<th rowspan="3">Col 4</th>
			</tr>
			<tr>
				<th rowspan="2">Col 00</th>
				<th rowspan="2">Col 01</th>
				<th colspan="2">Col 20</th>
				<th rowspan="2">Col 21</th>
			</tr>
			<tr>
				<th>Col 200</th>
				<th>Col 201</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, i) in list" :key="i">
				<td v-if="indexCol" class="index-col">{{i}}</td>
				<td v-for="(item1, name) in item" :key="name">{{item1}}</td>
			</tr>
		</tbody>
	</table>
	<hr>
	<table>
		<thead>
			<tr v-for="(tr, i) in info" :key="i">
				<th v-if="indexCol && i == 0" :rowspan="info.maxRowspan" class="index-col">Index</th>
				<th v-for="(th, i1) in tr" :key="i1" :rowspan="th.child ? 1 : (info.maxRowspan - i)" :colspan="th.colspan">{{th.name}}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(tr, i) in list" :key="i">
				<td v-if="indexCol" class="index-col">{{i}}</td>
				<td v-for="(td, i1) in finalTable" :key="i1">{{tr[td]}}</td>
			</tr>
		</tbody>
	</table>
</template>

<style lang="scss" scoped>
table {
	background: gray;
	padding: 4px;
	//border-collapse: collapse;
	th {
		background: darkblue;
		border: 1px solid black;
	}
	td {
		border: 1px solid white;
	}
	.index-col {
		background: darkcyan;
	}
}
</style>