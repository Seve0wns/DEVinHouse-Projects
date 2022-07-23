function leftzero(arr) {//ajusta a quantidade de zeros à esquerda
    while (arr[0] === "0") {
        arr.shift();
    }
    if (!arr.length) {//verifica se há algum digito além de 0
        return null;
    }
    while (arr.length < 3) {
        arr.unshift("0");
    }
    return arr;
}
function build(str) {//molda a string de forma adequada a ser operada
    if (str.length > 3) {//solução para backspace
        str = str.substring(0, str.length - 2) + str.charAt(str.length - 1);
        //retira os penúltimos dois caracteres da string
    }
    str = str.match(/\d/g);//pega apenas os digitos da string em forma de vetor
    return leftzero(str);
}
function kiloSep(arr) {//adiciona divisão de casas decimais e milhares
    arr = arr.reverse();
    arr.splice(2, 0, ".");//adiciona . para divisão para casas decimais
    for (let i = 3, count = 1; i < arr.length; i++, count++) {//adiciona virgulas para divisão de milhares
        if (count === 4) {
            arr.splice(i, 0, ",");
            count = 0;
        }
    }
    return arr.reverse();
}
function format(str) {
    str = build(str);
    if (!str) {
        return "";
    }
    return kiloSep(str).join("") + "R$";
}
function getFormat(event) {
    if (event.target.value) {
        event.target.value = format(event.target.value);
    }
}
function addAcc(list, acc) {//adciona uma conta à uma lista
    let option = document.createElement("option");
    option.value = acc.id;
    option.textContent = acc.nome;
    list.appendChild(option);
    //list.innerHTML += `<option value=${acc.id}>${acc.nome}</option>`;
}
function fillAcc() {//popula a lista de contas
    const html = document.getElementById("accounts");
    addAcc(html, { id: "0", nome: "Selecione" });
    contasClientes.forEach(acc => {
        addAcc(html, acc);
    });
}
function validateValues(elements) {//valida se todos os elementos de um array existem
    let invalid = false;
    for (const element of elements) {
        if (!element.value && element.id !== "confirm") {
            alert(`Valor inválido para o campo ${element.id}`);
            invalid = true;
        }
    }
    return invalid;
}
function withdraw(value, id) {//função de saque
    id = parseInt(id);
    value = parseFloat(value.replaceAll(/,/g, ""));
    //retira as vírgulas da string e a transforma em um número
    const acc = contasClientes.find(e => e.id === id);
    if (value <= 0) {
        return alert("Valor inválido!");
    }
    if (value > acc.saldo) {
        return alert(`Saldo insuficiente!
        Saldo atual: ${acc.saldo}R$`);
    }
    acc.saldo -= value;
    alert(`Saque efetuado com sucesso!
        Novo saldo: ${acc.saldo}R$`);
}
function deposit(value, id) {
    id = parseInt(id)
    value = parseFloat(value.replaceAll(/,/g, ""));
    const acc = contasClientes.find(e => e.id == id);
    if (value <= 0) {
        return alert("Valor inválido!");
    }
    acc.saldo += value;
    alert(`Depósito efetuado com sucesso!
        Novo saldo: ${acc.saldo}R$`);
}
function validatePass(typedPass, accID) {//valida se a senha é correta
    accID = parseInt(accID);
    if (!accID) {
        return false;
    }
    let acc = contasClientes.find(e => e.id === accID);
    return typedPass === acc.senha;
}
function operate(event) {//faz a operação requisitada pelo usuário
    event.preventDefault();
    if (validateValues(event.target)) {//valida se todos os campos estão preenchidos
        return;
    }
    if (!validatePass(prompt("digite sua senha:"), event.target.accounts.value)) {
        return alert("Senha inválida!");
    }
    if (event.target.operations.value === "sacar") {
        return withdraw(event.target.valor.value, event.target.accounts.value);
    }
    deposit(event.target.valor.value, event.target.accounts.value);
}
const contasClientes = [
    {
        id: 1,
        nome: "Cliente 01",
        saldo: 500,
        senha: "senha"
    },
    {
        id: 2,
        nome: "Cliente 02",
        saldo: 3000,
        senha: "1234"
    },
    {
        id: 3,
        nome: "Cliente 03",
        saldo: 5000,
        senha: "03041997"
    }
];
document.getElementById("valor").oninput = getFormat;
document.getElementById("input").onsubmit = operate;
document.getElementsByTagName("body")[0].onload = fillAcc;
