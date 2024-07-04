<script setup>
import { ref, watch } from 'vue'

const prop = defineProps({
	/** @type import('vue').PropType<Array<SelectItem>> */
	list: {
		type: Array,
		required: true,
	},
	modelValue: {
		type: [String, Number],
		required: true,
	},
	//defaultIndex: {
	//	type: Number,
	//	default: 0,
	//},
	readonly: Boolean,
	disabled: Boolean,
	multi: Boolean,
	autoComp: Boolean,
})
const emit = defineEmits(['update:model-value'])

const inputText = ref('')

function focusEnter() {
	if (prop.list.length) ulDom.value.children[0].focus()
}
function onFocus({ target }) {
	if (prop.autoComp != true) target.blur()
	focusEnter()
}
/** @param {SelectItem} item */
function selectItem(item) {
	emit('update:model-value', item.code)
	inputText.value = item.text
}
/** @param {SelectItem} item */
function toggleItem(item) {
	const current = prop.modelValue ? prop.modelValue.split(',') : []
	const itemCode = item.code.toString()
	if (current.includes(itemCode)) {
		const result = current.filter(c => c != itemCode)
		emit('update:model-value', result.join())
		inputText.value = result.map(c => prop.list.find(li => li.code == c).text).join()
	} else {
		current.push(itemCode)
		emit('update:model-value', current.join())
		inputText.value = current.map(c => prop.list.find(li => li.code == c).text).join()
	}
}
/** @param {SelectItem} item */
function onItemClick(item, target) {
	if (prop.multi) {
		toggleItem(item)
	} else {
		selectItem(item)
		target.blur()
	}
}
function init() {
	if (prop.list.length && prop.multi != true) selectItem(prop.list[0])
}

init()

// After mount
const ulDom = ref()
const inputDom = ref()

watch(prop.list, init)
if (prop.multi != true) {
	watch(
		() => prop.modelValue,
		nv => {
			inputText.value = prop.list.find(item => item.code == nv)?.text || 'Invalid model'
		},
	)
}
</script>

<template>
	<div class="powerful-select-wrap">
		<!--<template v-if="multi">
			<input v-for="(item, i) in list" :key="i" type="checkbox" :value="item.code" />
		</template>
		<select v-else :value="modelValue">
			<option v-for="(item, i) in list" :key="i" :value="item.code">{{ item.text }}</option>
		</select>-->
		<input v-model="inputText" autocomplete="off" :readonly="readonly" :disabled="disabled" ref="inputDom" @focus="onFocus" />
		<!--<button>right btn</button>-->
		<ul v-show="readonly != true" ref="ulDom">
			<li
				v-for="(item, i) in list"
				:key="i"
				tabindex="1"
				:class="{ 'powerful-multi-select': multi && modelValue.includes(item.code) }"
				@click="({ target }) => onItemClick(item, target)"
			>
				{{ item.text }}
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
div.powerful-select-wrap {
	> select {
		display: none;
	}
	&:has(input:focus) > ul,
	> ul:has(li:focus) {
		position: absolute;
		left: 0;
	}
	> ul {
		position: fixed;
		left: -100%;
	}
}
</style>
