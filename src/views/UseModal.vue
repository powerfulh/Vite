<script setup>
import { nextTick, ref } from 'vue'
import PM from '@/components/PowerfulModal.vue'

const modal = ref(false)
const moving = ref(false)

async function openModal() {
	modal.value = true
	await nextTick()
	const m = pm.value.box
	m.style.left = innerWidth / 2 - m.offsetWidth / 2 + 'px'
	m.style.top = innerHeight / 2 - m.offsetHeight / 2 + 'px'
}
function onMousedown() {
	moving.value = true
}
function onMousemove(e) {
	if (moving.value) {
		const m = pm.value.box
		const widthTick = m.offsetWidth
		m.style.left = Math.floor(e.clientX - widthTick / 2) + 'px'
		m.style.right = innerWidth - e.clientX - widthTick / 2 + 'px'
		const heightTick = titleDiv.value.offsetHeight
		m.style.top = e.clientY - heightTick / 2 + 'px'
	}
}

// after mount
const pm = ref()
const titleDiv = ref()
</script>

<template>
	<main>
		<h1>Modal</h1>
		<button @click="openModal">Open</button>

		<p-m v-if="modal" ref="pm">
			<template #title>
				<div ref="titleDiv" @mousedown="onMousedown" @mousemove="onMousemove" @mouseup="moving = false">
					Title ABC
					<button @click="modal = false" @mousedown.stop>Close</button>
				</div>
			</template>
			I am content
		</p-m>
	</main>
</template>

<style lang="scss">
.powerful-modal-wrap {
	z-index: 2;
	background: rgba(53, 54, 65, 0.5);
	.powerful-modal {
		background-color: gray;
		padding: 8px;
		margin: auto;
		.title {
			background-color: darkgray;
			padding: 4px;
		}
	}
}
</style>
