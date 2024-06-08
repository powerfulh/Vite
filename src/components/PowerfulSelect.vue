<script setup>
defineProps({
	/** @type import('vue').PropType<Array<SelectItem>> */
	list: {
		type: Array,
		required: true,
	},
})
</script>

<template>
	<div>
		<select>
			<option v-for="(item, i) in list" :key="i" :value="item.code">{{ item.text }}</option>
		</select>
	</div>
</template>
