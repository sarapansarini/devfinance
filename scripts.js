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
  }
};

const transactions = [
  {
    id: 1,
    description: "Luz",
    amount: -50000,
    //para dinheiro não se coloca $ ou vírgula, apenas as casas decimais diretamente
    date: "23/01/2021"
  },
  {
    id: 2,
    description: "Criação de Website",
    amount: 500000,
    date: "23/01/2021"
  },
  {
    id: 3,
    description: "Internet",
    amount: -20000,
    date: "23/01/2021"
  }
];

// = significa atribuição de valor

const Transaction = {
  incomes() {
    // somar as entradas
  },
  expenses() {
    // somar as saídas
  },
  total() {
    // entradas - saídas
  }
};

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody')
  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);
    //inner mostrar o que tem no HTML ou receber o HTML

    console.log(tr.innerHTML);
  },

  innerHTMLTransaction(transaction) {
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="expense">${transaction.amount}</td>
      <td class="date">${transaction.date}</td>
      <td><img src="./assets/minus.svg" alt="Remover Transação"/></td>
    `;

    return html;
    //return vai enviar para fora os itens da função
  }
};

DOM.addTransaction(transactions[0]);
