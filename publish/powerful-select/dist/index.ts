import PowerfulSelect from './PowerfulSelect.vue'

export const PS = PowerfulSelect

export function moveFocus(target: EventTarget, next: Boolean) {
	const focusTarget = target[next ? 'nextSibling' : 'previousSibling']
	if (focusTarget.getAttribute && focusTarget.getAttribute('tabindex')) focusTarget.focus()
}
