<script setup>
import numeral from "numeral-es6";
import { onMounted, ref } from "vue";

const props = defineProps({
	list: {
		type: Array,
		required: true
	},
	indexCol: Boolean,
	defaultCss: {
		type: Boolean,
		default: true
	},
	table: Array,
	modelValue: Array
})
const emit = defineEmits(['update:modelValue'])

const simpleTable = []
const info = [[]]
const finalTable = []
const checkedList = ref()
const buttonList = {}

props.list.forEach(item => {
	for (const key in item) {
		if(simpleTable.includes(key)) continue
		simpleTable.push(key)
	}
})

function numberFormat(n) {
	if(typeof n == 'number') return numeral(n).format('0,0')
	return n
}
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
			if(item.type == 'button') buttonList[item.name] = item.click
		}
		if(item.type == 'check') {
			const field = item.name || item.type
			finalTable.check = field
			props.list.forEach(data => {
				if(data[field]) return
				data[field] = false
			})
		}
	})
}
function updateModel() {
	const list = []
	checkedList.value.forEach(item => {
		if(item.checked) list.push(item.value)
	})
	return list
}

if(props.table) makeInfo(props.table, 0)

onMounted(() => {
	if(checkedList.value) emit('update:modelValue', updateModel())
})
</script>

<template>
	<table :class="defaultCss ? 'default-css' : ''">
		<thead v-if="finalTable.length">
			<tr v-for="(tr, i) in info" :key="i">
				<th v-if="indexCol && i == 0" :rowspan="info.length" class="index-col">Index</th>
				<th v-for="(th, i1) in tr" :key="i1" :rowspan="th.child ? 1 : (info.length - i)" :colspan="th.colspan">
					<input v-if="th.type == 'check'" type="checkbox">
					<span v-else>{{th.label || th.name}}</span>
				</th>
			</tr>
		</thead>
		<thead v-else>
			<tr>
				<th v-if="indexCol" class="index-col">Index</th>
				<th v-for="(item, i) in simpleTable" :key="i">{{item}}</th>
			</tr>
		</thead>
		<tbody v-if="finalTable.length">
			<tr v-for="(tr, i) in list" :key="i">
				<td v-if="indexCol" class="index-col">{{i}}</td>
				<td v-for="(td, i1) in finalTable" :key="i1">
					<input v-if="finalTable.check && td == finalTable.check" type="checkbox" :checked="tr[td]" :value="i" ref="checkedList" @change="$emit('update:modelValue', updateModel())">
					<button v-else-if="buttonList[td]" @click="buttonList[td](i)">{{tr[td]}}</button>
					<span v-else>{{numberFormat(tr[td])}}</span>
				</td>
			</tr>
		</tbody>
		<tbody v-else>
			<tr v-for="(tr, i) in list" :key="i">
				<td v-if="indexCol" class="index-col">{{i}}</td>
				<td v-for="(td, i1) in simpleTable" :key="i1">{{numberFormat(tr[td])}}</td>
			</tr>
		</tbody>
	</table>
</template>

<style lang="scss" scoped>
table.default-css {
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