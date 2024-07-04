import PowerfulSelect from './PowerfulSelect.vue'

export const PS = PowerfulSelect
const koreanUnicodeStartIndex = 44032 // 가
const childLetterDistance = 588 // 44032 + 588 = 까
const motherLetterDistance = 28 // 44032 + 28 = 개

export function moveFocus(target: EventTarget, next: Boolean) {
	const focusTarget = target[next ? 'nextSibling' : 'previousSibling']
	if (focusTarget.getAttribute && focusTarget.getAttribute('tabindex')) focusTarget.focus()
}
function getConstantVowel(kor: string) {
	const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
	const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
	const t = [
		'',
		'ㄱ',
		'ㄲ',
		'ㄳ',
		'ㄴ',
		'ㄵ',
		'ㄶ',
		'ㄷ',
		'ㄹ',
		'ㄺ',
		'ㄻ',
		'ㄼ',
		'ㄽ',
		'ㄾ',
		'ㄿ',
		'ㅀ',
		'ㅁ',
		'ㅂ',
		'ㅄ',
		'ㅅ',
		'ㅆ',
		'ㅇ',
		'ㅈ',
		'ㅊ',
		'ㅋ',
		'ㅌ',
		'ㅍ',
		'ㅎ',
	]

	let uni = kor.charCodeAt(0)

	uni = uni - koreanUnicodeStartIndex

	let fn = Math.floor(uni / childLetterDistance)
	let sn = Math.floor((uni - fn * childLetterDistance) / motherLetterDistance)
	let tn = Math.floor(uni % motherLetterDistance)

	return [f[fn], s[sn], t[tn]].filter((item: any) => item)
}
function getDisassemble(target: String | number) {
	if (typeof target == 'number') target = target.toString()
	const list = []
	target.split('').forEach(item => {
		list.push(...(item.match(/^[가-힣]$/) ? getConstantVowel(item) : [item]))
	})
	return list
}
export function getHeadList(target: string) {
	return target.split('').map(item => getDisassemble(item)[0])
}
