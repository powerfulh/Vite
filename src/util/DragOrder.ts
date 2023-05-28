import { Ref } from "vue";

let dragging: number

function add({ w, c }: { w: { value: { children: HTMLCollection; }; }; c: any; }, listenerType: 'drop' | 'dragenter', option: Function, cursorCss?: 'move' | 'grab'): void {
	const hc: HTMLCollection = w.value.children
	if(c && hc.length < 1) {
		console.error('기능을 추가할 목록 요소 대상이 없다!')
		return
	}

	const list: Array<HTMLElement> = [...hc] as Array<HTMLElement>
	list.forEach((item, i) => {
		item.draggable = true
		item.addEventListener('dragstart', e => {
			if(e.dataTransfer != null) {
				e.dataTransfer.effectAllowed = 'move'
				dragging = i
				return
			}
			console.error('DragEvent 에 dataTransfer가 null 입니다!')
		})
		item.addEventListener('dragover', e => {
			e.preventDefault()
		})
		item.addEventListener(listenerType, function() {
			option(i)
		})
		item.style.cursor = cursorCss ? cursorCss : ''
	})
}

interface add {
	(
		wrap: Ref<HTMLElement>,
		dataList: Ref<Array<any>>,
		consoleForDev? :Boolean
	): void
}

const dragToDrop: add = function(w, d, c) {
	add({w, c}, 'drop', function(i: number): void {
		if(dragging == i) return
		[d.value[dragging], d.value[i]] = [d.value[i], d.value[dragging]]
	})
}
const drag: add = function(w, d, c) {
	add({w, c}, 'dragenter', function(i: number): void {
		[d.value[dragging], d.value[i]] = [d.value[i], d.value[dragging]]
		dragging = i
	}, 'move')
}

export default {
	dragToDrop, drag
}