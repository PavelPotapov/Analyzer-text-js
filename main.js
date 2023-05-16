"use strict"

const inputText = document.querySelector("textarea")
const text1 = document.querySelector(".info>.count-words")
const text2 = document.querySelector(".info>.count-letters")
const text3 = document.querySelector(".info>.count-letters-without-space")
let text4

window.addEventListener("click", (e) => {
	console.log(e.target.dataset["name"], typeof e.target.dataset["name"])
	switch (+e.target.dataset["name"]) {
		case 1:
			if (!e.target.checked) {
				text1.style.display = "none"
			} else {
				text1.style.display = "block"
			}
			break
		case 2:
			if (!e.target.checked) {
				text2.style.display = "none"
			} else {
				text2.style.display = "block"
			}
			break
		case 3:
			if (!e.target.checked) {
				text3.style.display = "none"
			} else {
				text3.style.display = "block"
			}
			break
		case 4:
			text4 = document.querySelector(".info>.count-letters-percent")
			if (text4) {
				if (!e.target.checked) {
					text4.style.display = "none"
				} else {
					text4.style.display = "block"
				}
			}
			break
		default:
			console.log("Не работает")
	}
})

function getCharArray(charA, charZ) {
	let mass = []
	let start = charA.charCodeAt(charA)
	let end = charZ.charCodeAt(charZ)
	for (let i = start; i < end + 1; i++) {
		mass.push(String.fromCharCode(i))
	}
	return mass
}

function createPropertyForObject() {
	let percentSymbol = {}
	let massChars = getCharArray("а", "я")
	for (const i of massChars) {
		Object.defineProperty(percentSymbol, i, {
			value: 0,
			writable: true,
			enumerable: true,
			configurable: true,
		})
	}
	return percentSymbol
}

console.log(inputText)
inputText.addEventListener("blur", () => {
	let symbols = 0
	inputText.value.split(" ").forEach((e) => {
		symbols += e.length
	})
	text1.innerHTML = "Символов в строке:" + inputText.value.length
	text2.innerHTML = inputText.value
		? "Слов в строке:" + inputText.value.split(" ").length
		: "Слов в строке: 0"
	text3.innerHTML = "Символов без пробелов:" + symbols
	let obj = {}
	obj = createPropertyForObject()

	for (let i in obj) {
		let re = new RegExp(i, "g")
		obj[i] += inputText.value.match(re) ? inputText.value.match(re).length : 0
	}
	console.log(obj)
	text4 = document.querySelector(".info>.count-letters-percent")

	text3.insertAdjacentHTML(
		"afterend",
		`<table class="count-letters-percent">
        <tr>
            <th>Буква</th>
            <th>Процент</th>
        </tr>
        <tr class="percent-table">
        </tr>
    </table>`
	)

	let bodyTable = document.querySelector(".percent-table")

	let percent = ""
	for (let el in obj) {
		if (obj[el] !== 0) {
			bodyTable.insertAdjacentHTML(
				"afterend",
				`
                <tr>
                <td>${el}</td>
                <td>${String(((obj[el] / symbols) * 100).toFixed(1))}%</td>
                </tr>
            `
			)
		}
	}
	console.log(percent)
})

inputText.addEventListener("focus", () => {
	text4 = document.querySelector(".info>.count-letters-percent")
	text4.style.display = "none"
})
