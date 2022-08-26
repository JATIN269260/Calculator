class Calculator{
    constructor(currentOperandTextElement,previousOperandTextElement){
    this.currentOperandTextElement=currentOperandTextElement;
    this.previousOperandTextElement=previousOperandTextElement;
    this.clear()
    }

    clear(){
        this.currentOperand=' ';
        this.previousOperand=' ';
        this.operation=undefined;
    }
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number ==='.' && this.currentOperand.includes('.') )return
        this.currentOperand=this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand===' ')return
        if(this.previousOperand !==' '){
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=' ';
    }

    compute(){
        let computation
        const prev=parseFloat(this.previousOperand)
        const current=parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation=prev+current
                break
            case '-':
                computation=prev-current
                break
            case '*':
                computation=prev*current
                break
            case '÷ ':
                computation=prev/current
                break
            case '%':
                computation=prev%current
                break
            default:
                return
        }
        this.currentOperand=computation
        this.operation=undefined
        this.previousOperand=' ';
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText=this.currentOperand;
        if(this.operation != null){
        this.previousOperandTextElement.innerText=
        `${this.previousOperand} ${this.operation} `;
        }
        else{
            this.previousOperandTextElement.innerText=' '
        }
    }
}



const currentOperandTextElement=document.querySelector(".current-operand");
const previousOperandTextElement=document.querySelector(".previous-operand");
const numnberButtons=document.querySelectorAll(".number");
const operatorButtons=document.querySelectorAll(".operator");
const clearButton=document.querySelector(".clear");
const DelButton=document.querySelector(".delete");
const equalsButton=document.querySelector(".equal");

const calculator=new Calculator(currentOperandTextElement,previousOperandTextElement);

numnberButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})

DelButton.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})