// data type
export type DataType<T> = {
	key: string|number
	value: T
}

export type StackType = {
	data: DataType<any>
	next: null|StackType
}|null

export class StackNode {
	public data: DataType<any>
	public next: StackType|null = null

	constructor(data: DataType<any>) {
		this.data = data;
		this.next = null;
	}
}

// Stack interface
export interface StackApi {
	size: number;
	getTop(): null|DataType<any>
	getBottom(): null|DataType<any>
	push(data: DataType<any>): boolean
	pop(): boolean|DataType<any>
	search(key: string|number): null|DataType<any>
	update(key: string|number, newValue: any): boolean|DataType<any>
}