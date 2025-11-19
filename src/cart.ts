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
    const cartCount = document.querySelector(
      '.qtd-produtos',
    ) as HTMLSpanElement;
    const totalItems = listaDeCompras.reduce(
      (acc, item) => acc + item.quantidade,
      0,
    );
    cartCount.textContent = `(${totalItems.toString()})`;

    const divCartItems = document.querySelector(
      '.cart-items',
    ) as HTMLDivElement;

    if (totalItems === 0) {
      divCartItems.innerHTML = `
      <div class="flex flex-col justify-center items-center gap-y-3" id="empty-cart">
        <img src="src/assets/img/illustration-empty-cart.svg" alt="" class="w-1/3">
        <p class="text-base text-rose-300 font-bold">Your added items will appear here</p>
      </div>
    `;
    }
  };
};
