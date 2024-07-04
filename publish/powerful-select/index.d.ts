import { ComponentOptionsMixin, ComponentPropsOptions, ComputedOptions, DefineComponent, MethodOptions } from 'vue'

export interface SelectItem {
	code: string | number
	text: string
}
interface Props {
	list: Array<SelectItem>
}

type Emits = 'update:model-value'

declare const Comp: DefineComponent<
	ComponentPropsOptions<Props>,
	{},
	{},
	ComputedOptions,
	MethodOptions,
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	Emits[],
	Emits,
	Props
>

export default Comp
