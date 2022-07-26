class Operation {
    //classe de operação, construída como uma árvore, o galho esquerdo com um número
    //e o galho direito com uma operação
    constructor(equation, priorityMod = 0) {
        this.equation = equation;//uma string com a operação total avaliada pelo objeto
        let opi = this.setInfo(equation, priorityMod);//index da operação avaliada pelo objeto
        let nextEq = this.equation.slice(opi + 1);
        this.setBranches(nextEq, priorityMod)
    }
    setBranches(nextEq, priorityMod) {//aplica valores aos galhos do objeto
        if (this.operator === "(") {
            Object.assign(this, new Operation(nextEq, priorityMod + 4));
            return;
        }
        this.left = parseInt(this.equation);
        if (this.left < 0) {
            let opi = this.setInfo(nextEq, priorityMod) + 1;
            nextEq = this.equation.slice(opi + 1);
        }
        switch (this.operator) {
            case ")":
                Object.assign(this, new Operation(this.left + nextEq, priorityMod - 4));
                return;
            case "":
                this.right = null;
                return;
            default:
                this.right = new Operation(nextEq, priorityMod);
        }
    }
    setInfo(equation, priorityMod) {
        //aplica valores de operador e prioridade para o objeto
        //retorna o índice do operador na equação
        let opi = equation.search(regex);
        this.operator = equation.charAt(opi);
        this.priority = this.setPriority() + priorityMod;
        return opi;
    }
    solve() {
        if (!this.operator) {
            return this.left;
        }
        this.rotate();
        return this.solve();
    }
    rotate() {//rotaciona os galhos, jogando os galhos à direita para a esquerda
        while (this.priority < this.right.priority) {//solução parenteses
            this.right.rotate();
        }
        this.right.left = calc(this.operator, this.left, this.right.left);
        Object.assign(this, this.right);
        //troca o nó atual pelo seu galho direito, trocando seu galho esquerdo
        //pelo valor da operação
    }
    setPriority() {
        switch (this.operator) {
            case "+":
            case "-":
                return 1;
            case "*":
            case "/":
                return 2;
            case "^":
                return 3;
            default:
                return 0;
        }
    }
}
function calc(op, n1, n2) {
    if (!n2 && n2 !== 0) {//solução parenteses
        return n1;
    }
    switch (op) {
        case "":
            return n1;
        case "+":
            return n1 + n2;
        case "-":
            return n1 - n2;
        case "*":
            return n1 * n2;
        case "/":
            return n1 / n2;
        case "^":
            return n1 ** n2;
        default:
            return "invalid operation";
    }
}
function calculator() {
    let input = document.getElementById("operation");
    let op = new Operation(input.value);
    document.getElementById("equation").innerText = input.value;
    if (document.getElementById("debug").checked) {
        console.log(op);
    }
    else {
        input.value = op.solve();
    }
}
function submit(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        calculator();
    }
}
const regex = /\++|\-+|\*+|\/+|\^+|\(+|\)+/;//expressão para encontrar operadores
document.getElementById("submit").onclick = calculator;
document.getElementById("operation").onkeydown = submit;