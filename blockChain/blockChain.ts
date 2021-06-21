import { BlockChainApi, BlockType, DataType } from "./helper.d.ts";
import { searchGenerator, iteratorGenerator } from "./generators.ts"
import { Block } from "./blockNode.ts";

export class BlockChain implements BlockChainApi {
	#chain: Array<any>
	length: number

	constructor() {
		this.#chain = new Array()
		this.length = this.#chain.length
	}

	createBlock(data: DataType<any>) {
		const newBlock = new Block(data, this.#chain.length + 1)

		if (this.#chain.length === 0) {
			this.#chain.push(newBlock)
			this.length++

			return true
		}

		if (this.#chain.length > 0) {
			const prevBlock = this.latestBlock()
			newBlock.prevHash = prevBlock!.hash
			this.#chain.push(newBlock)
			this.length++

			return true
		}

		return false
	}

	search(key: string) {
		if (this.#chain.length === 0) {
			return false
		}

		const iterator = searchGenerator(key, this.#chain)
		let iteratorNext = iterator.next()
		while (iteratorNext.value) {
			return iteratorNext.value
		}

		return false;
	}

	latestBlock() {
		if (this.#chain.length <= 0) return false
		return this.#chain[this.#chain.length - 1]
	}

	iterator() {
		return iteratorGenerator(this.#chain)
	}

	checkValidation() {
		const iterator = this.iterator()
		let iteratNext = iterator.next()
		let prevHash: null|string = null
		let prevBlock: null|BlockType = null

		while (iteratNext.value) {
			const block = iteratNext.value
			const regeneratedHash = block.regenerateHash()
			if (block.hash !== regeneratedHash) {
				console.error(`index: ${block.index}, block is corrupted`)
				return false
			}
			if (prevBlock != null && block.prevHash !== prevHash) {
				console.error(`index: ${prevBlock!.index}, block is corrupted`)
				return false
			}

			prevHash = block.regenerateHash()
			prevBlock = block
			iteratNext = iterator.next()
		}

		console.log('The Chain is valid.')
		return true
	}

	log() {
		console.log(this.#chain)
	}

}