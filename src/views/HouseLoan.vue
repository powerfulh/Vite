<script setup>
import numeral from 'numeral-es6'
import dayjs from 'dayjs'

const rate = 0.028
let loanMoney = 260000000
let d = dayjs('202408')

function getCurrentMonthInterest() {
	return (loanMoney * rate) / 12
}
function pay(m) {
	loanMoney -= m
	return m
}
function nf(n) {
	return numeral(n).format('0,0')
}
function getText(m) {
	const paidMoney = pay(Math.round(m))
	const inter = Math.round(getCurrentMonthInterest())
	const total = paidMoney + inter
	//const text = `${} 원금 ${} + 이자 ${} = ${} 갚고 남은 원금 ${}`
	const result = [{ d: d.format('YYYY/MM'), paidMoney, inter, total, loanMoney }]
	d = d.add(1, 'month')
	return result
}
</script>

<template>
	<main>
		<ol style="display: flex; flex-direction: column; max-height: 1600px; flex-wrap: wrap">
			<li v-for="item in 3 * 12" :key="item">
				<!--{{ getText(1300000) }}-->
				<template v-for="(t, i1) in getText(1300000)" :key="i1">
					<span>{{ t.d }}</span>
					원금
					<span class="len-7">{{ nf(t.paidMoney) }}</span>
					+ 이자
					<span>{{ nf(t.inter) }}</span>
					=
					<span class="len-7">{{ nf(t.total) }}</span>
					갚고 남은 원금
					<span class="len-9">{{ nf(t.loanMoney) }}</span>
				</template>
			</li>
			<hr />
			<li v-for="item in 7 * 12" :key="item">
				<!--{{ getText(loanMoney / (7 * 12 - (item - 1))) }}-->
				<template v-for="(t, i1) in getText(loanMoney / (7 * 12 - (item - 1)))" :key="i1">
					<span>{{ t.d }}</span>
					원금
					<span class="len-7">{{ nf(t.paidMoney) }}</span>
					+ 이자
					<span>{{ nf(t.inter) }}</span>
					=
					<span class="len-7">{{ nf(t.total) }}</span>
					갚고 남은 원금
					<span class="len-9">{{ nf(t.loanMoney) }}</span>
				</template>
			</li>
		</ol>
	</main>
</template>

<style lang="scss" scoped>
li {
	margin-right: 48px;
	text-align: left;
	> span {
		display: inline-block;
		width: 60px;
		&.len-7 {
			width: 68px;
		}
		&.len-9 {
			width: 92px;
		}
	}
}
</style>
