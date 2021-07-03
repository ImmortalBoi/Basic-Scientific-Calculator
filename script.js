class Calculator{
    constructor(leftOperandTextElement,rightOperandTextElement){
        this.leftOperandTextElement = leftOperandTextElement
        this.rightOperandTextElement = rightOperandTextElement
        this.clearEverything()
    }

    clear(){
        this.leftOperand = ''
        this.operation = undefined
    }
    
    clearEverything(){
        this.rightOperand = ''
        this.leftOperand = ''
        this.operation = undefined
    }
    
    delete(){
        this.rightOperand = this.rightOperand.toString().slice(0,-1)

    }

    appendNumber(number){
        if (number === '.' && this.rightOperand.includes('.')) return
        this.rightOperand = this.rightOperand.toString() + number.toString()
    }
    
    appendOperand(operation){
        if (this.rightOperand === '.') return
        if (this.leftOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.leftOperand = this.rightOperand
        this.rightOperand = ''
    }
    
    compute(){
        let result
        const left = parseFloat(this.leftOperand)
        const right = parseFloat(this.rightOperand)
        if(isNaN(left) || isNaN(right)) return
        switch(this.operation){
            case '+':
                result = left+right
                break
            case '-':
                result = left-right
                break
            case '÷':
                result = left/right
                break
            case '*':
                result = left*right
                break
            case '^':
                result = Math.pow(left,right)
                break
            default:
                return
            }
            this.rightOperand=result
            this.operation = undefined
            this.leftOperand = ''
    }

    updateDisplay(){
        this.rightOperandTextElement.innerText = this.rightOperand
        this.leftOperandTextElement.innerText = this.leftOperand
    }

}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearEverythingButton = document.querySelector('[data-clear-everything]')
const clearButton = document.querySelector('[data-clear]')
const leftOperandTextElement = document.querySelector('[data-leftOperand]')
const rightOperandTextElement = document.querySelector('[data-rightOperand]')

const calculator = new Calculator(leftOperandTextElement,rightOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })

operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendOperand(button.innerText)
        calculator.updateDisplay()
    })
})

clearEverythingButton.addEventListener('click',()=>{
        calculator.clearEverything()
        calculator.updateDisplay()
    })

clearButton.addEventListener('click',()=>{
        calculator.clear()
        calculator.updateDisplay()
    })

equalsButton.addEventListener('click',button =>{
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',button =>{
    calculator.delete()
    calculator.updateDisplay()
})