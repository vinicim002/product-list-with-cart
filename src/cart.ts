// import type { Product } from './types/Product';

export const cart = () => {
  //Quando o user clicar no btn
  //preciso pegar qual produto foi adicionado (id)
  //preciso armazenar a quantidadde desse produto
  //preciso multiplicar o valor unitario pela qntd desse produto
  //preciso mostrar no cart as info do produto
  const sobremesa = document.querySelectorAll('.sobremesa');
  const btnsAddCart = document.querySelectorAll('.btn-add-to-cart');

  if (!sobremesa) return;

  let id: string|undefined  = '';
  //Pecorrendo todos o botoes
  btnsAddCart.forEach((btn) => {
    //Pegando o botao clicado
    btn.addEventListener('click', () => {
      const card = btn.closest('.sobremesa') as HTMLElement;
      id = card.dataset.id;

      
    });
  });
};

// <!--Btn cart-->
//              <button
//                 class="btn-add-to-cart bg-red-50 text-center w-1/2 absolute bottom-0 left-0 translate-x-1/2 translate-y-1/2 rounded-3xl border border-red-50 px-4 py-2.5 flex items-center justify-center gap-x-3"
//               >
//               <div class="flex justify-between w-full">
//                 <img src="/images/icon-increment-quantity.svg" alt="" class="cursor-pointer">
//                 <p class="text-rose-900 text-base font-semibold text-center">1</p>
//                 <img src="/images/icon-decrement-quantity.svg" alt="" class="cursor-pointer">
//               </div>
//               </button>
