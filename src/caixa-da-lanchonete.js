const cardapio = [
  { nome: "cafe", descricao: "Café", preco: 300 },
  { nome: "chantily", descricao: "Chantily (extra do Café)", preco: 150 },
  { nome: "suco", descricao: "Suco Natural", preco: 620 },
  { nome: "sanduiche", descricao: "Sanduíche)", preco: 650 },
  { nome: "queijo", descricao: "Queijo (extra do Sanduíche)", preco: 200 },
  { nome: "salgado", descricao: "Salgado", preco: 725 },
  { nome: "combo1", descricao: "1 Suco e 1 Sanduíche", preco: 950 },
  { nome: "combo2", descricao: "1 Café e 1 Sanduíche", preco: 750 },
];

const cardapioCodigo = ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"];

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const metodosValidos = ["dinheiro", "debito", "credito"];
    //validar forma de pagamento
    if (!metodosValidos.includes(metodoDePagamento)) return "Forma de pagamento inválida!";
    //validar numero de itens no carirnho
    if (itens.length === 0) return "Não há itens no carrinho de compra!";
    //criação de array para validações complementares
    let arrayDeItens = [];
    let arrayDeQuantidade = [];
    for (let i = 0; i < itens.length; i++) {
      const codigoItem = itens[i].split(",")[0];
      const quantidade = itens[i].split(",")[1];

      arrayDeItens.push(codigoItem);
      arrayDeQuantidade.push(Number(quantidade));
    }
    //validação se há o teim pedido
    for (let item of arrayDeItens) {
      if (!cardapioCodigo.includes(item)) {
        return "Item inválido!";
      }
    }
    //validação das qunatidades pedidas
    for (let item of arrayDeQuantidade) {
      if (item === 0) {
        return "Quantidade inválida!";
      }
    }
    //validação de itens extras e principais
    if (arrayDeItens.includes("chantily") && !arrayDeItens.includes("cafe")) return "Item extra não pode ser pedido sem o principal";
    //validação de itens extras e principais
    if (arrayDeItens.includes("queijo") && !arrayDeItens.includes("sanduiche")) return "Item extra não pode ser pedido sem o principal";
    //criação do carrinho de compras
    let carrinho = [];

    for (let i = 0; i < itens.length; i++) {
      const codigoItem = itens[i].split(",")[0];
      const quantidade = itens[i].split(",")[1];

      let ResumoItem = {
        codigo: codigoItem,
        quantidade: Number(quantidade),
        preco: 0,
      };

      carrinho.push(ResumoItem);
    }

    for (let i = 0; i < carrinho.length; i++) {
      for (let j = 0; j < cardapio.length; j++) {
        if (carrinho[i].codigo === cardapio[j].nome) {
          carrinho[i].preco = cardapio[j].preco;
        }
      }
    }
    //calculo do valor sem desconto
    let valorSemDesconto = 0;
    for (let i = 0; i < carrinho.length; i++) {
      let valorItem = carrinho[i].quantidade * carrinho[i].preco;

      valorSemDesconto += valorItem;
    }
    //calculo valor em dinheiro
    let valorAPagar = 0;
    if (metodoDePagamento === "dinheiro") {
      valorAPagar = valorSemDesconto - 0.05 * valorSemDesconto;
      valorAPagar = valorAPagar / 100;
      return `R$ ${valorAPagar.toFixed(2).replace(".", ",")}`;
    }
    //calculo valor em debito
    if (metodoDePagamento === "debito") {
      valorAPagar = valorSemDesconto;
      valorAPagar = valorAPagar / 100;
      return `R$ ${valorAPagar.toFixed(2).replace(".", ",")}`;
    }
    //calculo valor em credito
    if (metodoDePagamento === "credito") {
      valorAPagar = valorSemDesconto + 0.03 * valorSemDesconto;
      valorAPagar = valorAPagar / 100;
      return `R$ ${valorAPagar.toFixed(2).replace(".", ",")}`;
    }
  }
}
export { CaixaDaLanchonete };
