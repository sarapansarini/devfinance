const modal = {
  open() {
    /* abrir modal / objeto -> propriedadaes e funcionalidades  
      adicionar aclasse active ao modal
      querySelector: seletor CSS -> vai procurar o .modal-overlay
        -> irá pegar outra propriedade -> lista de classes, e aí vem a funcionalidade 
      */

    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    //fechar o modal
    // remover a classe active do modal
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const Transaction = {
  all: [
    {
      description: "Luz",
      amount: -50000,
      //para dinheiro não se coloca $ ou vírgula, apenas as casas decimais diretamente
      date: "23/01/2021",
    },
    {
      description: "Criação de Website",
      amount: 500000,
      date: "23/01/2021",
    },
    {
      description: "Internet",
      amount: -20000,
      date: "23/01/2021",
    },
    {
      description: "App",
      amount: 15001,
      date: "30/01/2021",
    },
  ],
  add(transaction) {
    Transaction.all.push(transaction);
    // push coloca itens dentro da array
    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);

    App.reload();
  },

  incomes() {
    let income = 0;
    // pegar todas as transações
    //para cada transação
    Transaction.all.forEach((transaction) => {
      // transaction.all -> refaturação, melhorar a aplicação
      // se ela for maior que 0
      if (transaction.amount > 0) {
        // somar a uma variavel e retornar a variavel
        income += transaction.amount; // += -> income = income + transaction.amount
      }
    });
    return income;
  },
  expenses() {
    let expense = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
    // somar as saídas
  },
  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);
    //inner mostrar o que tem no HTML ou receber o HTML

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td><img src="./assets/minus.svg" alt="Remover Transação"/></td>
      `;

    return html;
    //return vai enviar para fora os itens da função
  },

  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );
    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );
    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

const Utils = {
  formatAmount(value) {
    value = Number(value) * 100;

    return value;
  },

  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    //split irá separar de acordo com o separador que eu espcificar,seja um número, letra ou símbolo
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    // o contra barra -> \D vai procurar tudo o que não for número na string
    // g significa que fará isso globalmente (em toda a string e não em todo o
    // documento) isso se chama Regex (expressão regular)
    // nesse caso estou tirando tudo o que não é número e trocando por nada ""

    value = Number(value) / 100;

    // vou dividir por 100 para colocar as casas decimais

    value = value.toLocaleString("pr-BR", {
      style: "currency",
      currency: "BRL",
    });

    return signal + value;
  },
};

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },
  validateFields() {
    const { description, amount, date } = Form.getValues();

    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();
    amount = Utils.formatAmount(amount);

    date = Utils.formatDate(date);

    return {
      // description: description, como a variável tem o mesmo nome da chave, podemos usar o shorthand como abaixo:
      description,
      amount,
      date,
    };
  },

  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  saveTransaction(transaction) {
    Transaction.add(transaction);
  },

  submit(event) {
    event.preventDefault();

    try {
      // verificar se as infosmações foram preenchidas ->
      Form.validateFields();
      // Formatar os dados para salvar
      const transaction = Form.formatValues();
      // salvar
      Transaction.add(transaction);
      // apagar os dados do formulário
      Form.clearFields();
      modal.close();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Transaction.all.forEach((transaction) => {
      DOM.addTransaction(transaction);
    });

    // forEach funciona para arrays, irá excecutar 1 funcionalidade
    // para cada elemento

    DOM.updateBalance();
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();
