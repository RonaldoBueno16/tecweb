function OnBodyLoad() {
    document.querySelectorAll(".btn_buy").forEach(button => {
        button.addEventListener('click', (click) => {
            ShowBuyFish(click.target);
        })
    });
}

function ShowBuyFish(nodeindex) {
    const card = nodeindex.parentNode.parentNode;

    const title = card.querySelector("h1").textContent;
    const price = card.querySelector(".price").textContent;
    const description = card.querySelector(".description").textContent;
    const srcimage = card.querySelector("img").src;

    document.querySelectorAll(".group_input").forEach(element => {
        element.style.display = ""
    })

    //Modal
    document.querySelector("#peixe_buy").src = srcimage;
    document.querySelector("#peixenome").textContent = `${title} - ${price}`

    document.querySelector("#compra_efetuada").style.display = "none";

    document.getElementById('id01').style.display = 'block';

    LoadCookie("nome");
    LoadCookie("email");
    LoadCookie("cpf");
    LoadCookie("telefone");
    LoadCookie("cep");
    LoadCookie("cidade");
    LoadCookie("logadouro");
    LoadCookie("bairro");
    LoadCookie("UF");
}

function submitForm() {
    if (!ValidateInput("nome")) return false;
    if (!ValidateInput("email")) return false;
    if (!ValidateInput("cpf")) return false;
    if (!ValidateInput("telefone")) return false;
    if (!ValidateInput("cep")) return false;
    if (!ValidateInput("cidade")) return false;
    if (!ValidateInput("logadouro")) return false;
    if (!ValidateInput("bairro")) return false;
    if (!ValidateInput("UF")) return false;

    document.querySelector("#compra_efetuada").style.display = "";

    AddCookie("nome", document.querySelector("#nome").value, -1);
    AddCookie("email", document.querySelector("#email").value, -1);
    AddCookie("cpf", document.querySelector("#cpf").value, -1);
    AddCookie("telefone", document.querySelector("#telefone").value, -1);
    AddCookie("cep", document.querySelector("#cep").value, -1);
    AddCookie("cidade", document.querySelector("#cidade").value, -1);
    AddCookie("logadouro", document.querySelector("#logadouro").value, -1);
    AddCookie("bairro", document.querySelector("#bairro").value, -1);
    AddCookie("UF", document.querySelector("#UF").value, -1);

    document.querySelectorAll(".group_input").forEach(element => {
        element.style.display = "none"
    })

    return false;
}

function ValidateInput(id) {
    const element = document.querySelector(`#${id}`);
    let validado = true;

    const value = element.value;

    if (element.value == "") {
        validado = false;
    }

    switch (id) {
        case "cpf": {

            if (!TestaCPF(value.replaceAll('-', '').replaceAll('.', ''))) {
                validado = false;
            }
            break;
        }
        case "email": {
            if (!ValidateEmail(value)) {
                validado = false;
            }
            break;
        }
        case "cep": {
            if (!ValidaCEP(value)) {
                validado = false;
            }
            else {
                fetch(`https://viacep.com.br/ws/${value}/json/`)
                    .catch(error => {
                        console.log(error);
                    })
                    .then(res => {
                        res.json().then(busca => {
                            console.log(busca);

                            const bairro = busca.bairro;
                            const logadouro = busca.logradouro;
                            const cidade = busca.localidade;
                            const estado = busca.uf;

                            WriteInput("logadouro", logadouro);
                            WriteInput("bairro", bairro);
                            WriteInput("cidade", cidade);
                            WriteInput("UF", estado);
                        })
                    });
            }
            break;
        }
        case "telefone": {
            if (!ValidateCellPhone(value)) {
                validado = false;
            }
            break;
        }
        default: {

            break;
        }
    }

    if (!validado) {
        element.parentNode.querySelector("font").style.display = "";
    }
    else {
        element.parentNode.querySelector("font").style.display = "none";
    }
    return validado;
}

function WriteInput(inputId, value) {
    const element = document.querySelector(`#${inputId}`);
    element.value = value;
}

function finishEdit(element) {
    ValidateInput(element.id);
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true);
    }
    return (false)
}

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

function ValidaCEP(cep) {
    const pattern = /^[0-9]{5}-[0-9]{3}$/;
    const pattern2 = /^[0-9]{5}[0-9]{3}$/;
    return (pattern.test(cep) || pattern2.test(cep));
}

function ValidateCellPhone(numero) {
    const pattern = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
    return pattern.test(numero);
}

function ShowMenu() {
    const menu = document.querySelector('.background_menu');

    if (menu.classList.contains('hidden'))
        menu.classList.remove('hidden');
    else
        menu.classList.add('hidden');
}