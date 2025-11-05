// import type { Product } from './types/Product';

export const cart = () => {
  //Quando o user clicar no btn
  //preciso pegar qual produto foi adicionado (id)
  //preciso armazenar a quantidadde desse produto
  //preciso multiplicar o valor unitario pela qntd desse produto
  //preciso mostrar no cart as info do produto
  const sobremesa = document.querySelectorAll('.sobremesa');
  const btnsAddCart = document.querySelectorAll('.btn-add-to-cart');
  
  if(!sobremesa) return;

  //Pecorrendo todos o botoes
  btnsAddCart.forEach(btn => {
    //Pegando o botao clicado
    btn.addEventListener('click', () => {
      const card = btn.closest('.sobremesa') as HTMLElement;
      const id = card.dataset.id;

      console.log(id);
    })
  })
}