import { setupButtonStates } from './buttonStates';
import type { Lista } from './types/Lista';

export const cart = () => {
  const btnsAddCart = document.querySelectorAll('.btn-add-to-cart');

  // ➜ Adiciona item pela primeira vez
  btnsAddCart.forEach((btn) => {
    btn.addEventListener('click', () => {
      // --- Se o botão NÃO é mais Add to Cart, sair ---
      if (!btn.innerHTML.includes('add_shopping_cart')) {
        return;
      }

      const listaDeCompras: Lista[] = JSON.parse(
        localStorage.getItem('listaDeCompras') || '[]',
      );

      const card = btn.closest('.sobremesa') as HTMLElement;
      const id = card?.dataset?.id;
      if (!id) return;

      const index = listaDeCompras.findIndex((item) => item.id === id);

      if (index === -1) {
        listaDeCompras.push({ id, quantidade: 1 });
      } else {
        listaDeCompras[index].quantidade++;
      }

      localStorage.setItem('listaDeCompras', JSON.stringify(listaDeCompras));
      setupButtonStates();
      atualizaCart();
    });
  });

  // ➜ Incrementar / Decrementar
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    const listaDeCompras: Lista[] = JSON.parse(
      localStorage.getItem('listaDeCompras') || '[]',
    );

    // INCREMENTAR
    if (
      target instanceof HTMLImageElement &&
      target.src.includes('icon-increment-quantity.svg')
    ) {
      const card = target.closest('.sobremesa') as HTMLElement;
      const id = card?.dataset?.id;
      if (!id) return;

      const index = listaDeCompras.findIndex((item) => item.id === id);
      if (index > -1) listaDeCompras[index].quantidade++;

      localStorage.setItem('listaDeCompras', JSON.stringify(listaDeCompras));
      setupButtonStates();
      atualizaCart();
    }

    // DECREMENTAR
    if (
      target instanceof HTMLImageElement &&
      target.src.includes('icon-decrement-quantity.svg')
    ) {
      const card = target.closest('.sobremesa') as HTMLElement;
      const id = card?.dataset?.id;
      if (!id) return;

      const index = listaDeCompras.findIndex((item) => item.id === id);
      if (index > -1) {
        listaDeCompras[index].quantidade--;

        if (listaDeCompras[index].quantidade <= 0) {
          listaDeCompras.splice(index, 1);
        }
      }

      localStorage.setItem('listaDeCompras', JSON.stringify(listaDeCompras));
      setupButtonStates();
      atualizaCart();
    }
  });

  const atualizaCart = () => {
    const listaDeCompras: Lista[] = JSON.parse(
      localStorage.getItem('listaDeCompras') || '[]',
    );

    const totalItems = listaDeCompras.reduce(
      (acc, item) => acc + item.quantidade,
      0,
    );

    const cartCount = document.querySelector(
      '.qtd-produtos',
    ) as HTMLSpanElement;
    cartCount.textContent = `(${totalItems})`;

    const divCartItems = document.querySelector(
      '.cart-items',
    ) as HTMLDivElement;

    // Carrinho vazio
    if (totalItems === 0) {
      divCartItems.innerHTML = `
      <div class="flex flex-col justify-center items-center gap-y-3">
        <img src="/public/images/illustration-empty-cart.svg" class="w-1/3">
        <p class="text-base text-rose-300 font-bold">Your added items will appear here</p>
      </div>
    `;
      return;
    }

    // Carrinho com itens (dinâmico futuramente)
    divCartItems.innerHTML = `
    <div class="flex flex-col gap-y-3">
      <ul class="cart-list"></ul>

      <div class="flex flex-row justify-between items-center mb-3">
        <p class="text-base text-rose-900 font-normal">Order Total</p>
        <h2 class="text-3xl font-bold text-rose-900 total-price">$0.00</h2>
      </div>

      <div class="flex flex-row justify-center items-center gap-x-2 bg-rose-100 p-4 rounded-xl mb-3">
        <img src="src/assets/img/icon-carbon-neutral.svg" alt="" />
        <p>This is a <span class="font-semibold text-rose-900">carbon-neutral</span> delivery</p>
      </div>

      <button class="bg-red-50 text-rose-50 p-4 rounded-4xl cursor-pointer">
        Confirm Order
      </button>
    </div>
  `;
  };

  atualizaCart();
};
