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
    }
  });
};
