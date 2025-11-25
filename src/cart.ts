import { setupButtonStates } from './buttonStates';
import type { Lista } from './types/Lista';
import type { Product } from './types/Product';

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

  const atualizaCart = async () => {
    const listaDeCompras: Lista[] = JSON.parse(
      localStorage.getItem('listaDeCompras') || '[]',
    );

    const divCartItems = document.querySelector(
      '.cart-items',
    ) as HTMLDivElement;

    // Zera HTML sempre antes de montar
    divCartItems.innerHTML = '';

    const totalItems = listaDeCompras.reduce(
      (acc, item) => acc + item.quantidade,
      0,
    );

    // Atualiza contador
    const cartCount = document.querySelector(
      '.qtd-produtos',
    ) as HTMLSpanElement;
    cartCount.textContent = `(${totalItems})`;

    // Carrinho vazio
    if (totalItems === 0) {
      divCartItems.innerHTML = `
      <div class="flex flex-col justify-center items-center gap-y-3">
        <img src="/public/images/illustration-empty-cart.svg" class="w-1/3">
        <p class="text-base text-rose-300 font-bold">Your added items will appear here</p>
      </div>`;
      return;
    }

    //Aqui eu deveria fazer um Try Catch, mas como o fetch é rápido e simples, deixei assim
    const response = await fetch('/data/data.json');
    const products: Product[] = await response.json();

    const ul = document.createElement('ul');
    divCartItems.appendChild(ul);

    let totalOrder = 0;

    listaDeCompras.forEach((item) => {
      const produto = products.find((p) => String(p.id) === item.id);
      if (!produto) return;

      const totalItem = produto.price * item.quantidade;
      totalOrder += totalItem;

      const li = document.createElement('li');
      li.classList.add(
        'flex',
        'justify-between',
        'items-center',
        'border-b',
        'border-rose-100',
        'mb-3',
      );

      li.innerHTML = `
      <div class="flex flex-col gap-y-2">
        <p class="font-semibold text-rose-900 text-base">${produto.name}</p>

        <div class="pb-3">
          <span class="text-red-50 font-semibold pr-3">${item.quantidade}x</span>
          <span class="text-rose-300 font-semibold pr-1">@ $${produto.price.toFixed(2)}</span>
          <span class="font-semibold text-rose-500">$${totalItem.toFixed(2)}</span>
        </div>
      </div>

      <button type="button" class="btn-remove-item cursor-pointer" data-id="${item.id}">X</button>
    `;

      ul.appendChild(li);
    });

    divCartItems.innerHTML += `
    <div class="flex flex-row justify-between items-center mb-3">
      <p class="text-base text-rose-900 font-normal">Order Total</p>
      <h2 class="text-3xl font-bold text-rose-900">$${totalOrder.toFixed(2)}</h2>
    </div>

    <div class="flex flex-row justify-center items-center gap-x-2 bg-rose-100 p-4 rounded-xl mb-3">
      <img src="public/images/icon-carbon-neutral.svg">
      <p>This is a <span class="font-semibold text-rose-900">carbon-neutral</span> delivery</p>
    </div>

    <button type="submit" class="bg-red-50 text-rose-50 p-4 rounded-4xl cursor-pointer btnConfirm">Confirm Order</button>
  `;

    const btnRemoveItem = document.querySelectorAll(
      '.btn-remove-item',
    ) as NodeListOf<HTMLButtonElement>;

    btnRemoveItem.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = String(btn.dataset.id);
        if (!id) return;

        const index = listaDeCompras.findIndex(
          (item) => String(item.id) === id,
        );

        if (index > -1) {
          listaDeCompras.splice(index, 1);
          localStorage.setItem(
            'listaDeCompras',
            JSON.stringify(listaDeCompras),
          );

          const productCard = document.querySelector(
            `.sobremesa[data-id="${id}"]`,
          ) as HTMLElement;

          if (productCard) {
            const btnAdd = productCard.querySelector(
              '.btn-add-to-cart',
            ) as HTMLButtonElement;

            if (btnAdd) {
              btnAdd.innerHTML = `
                <span class="material-symbols-outlined">add_shopping_cart</span>
                <p class="text-rose-900 text-base font-semibold text-center">Add to Cart</p>
              `;

              btnAdd.classList.remove('bg-red-50');
              btnAdd.classList.add('bg-rose-50', 'cursor-pointer');
            }
          }

          setupButtonStates();
          atualizaCart();
        }
      });
      return totalOrder;
    });

    const btnConfirm = document.querySelector(
      '.btnConfirm',
    ) as HTMLButtonElement;
    const orderOverlay = document.querySelector(
      '#orderOverlay',
    ) as HTMLDivElement;

    btnConfirm.addEventListener('click', () => {
      const listaDeCompras: Lista[] = JSON.parse(
        localStorage.getItem('listaDeCompras') || '[]',
      );

      orderOverlay.classList.remove('hidden');
      orderOverlay.classList.add('flex');

      // pegar UL existente dentro de .listConfirm
      const ul = document.querySelector('.listConfirm ul') as HTMLUListElement;

      // limpar antes de montar
      ul.innerHTML = '';

      listaDeCompras.forEach((item) => {
        const produto = products.find((p) => String(p.id) === item.id);
        if (!produto) return;

        const li = document.createElement('li');
        li.classList.add(
          'flex',
          'items-center',
          'border-b',
          'mb-2',
          'pb-2',
          'border-rose-300',
        );

        li.innerHTML = `
      <img
        src="${produto.image.desktop}"
        alt=""
        class="w-28 h-28 mr-5"
      />
      <div class="flex items-center justify-between w-full">
        <div>
          <p class="text-rose-900 font-medium">${produto.name}</p>
          <p>
            <span class="pr-3 text-red-50 font-medium">${item.quantidade}x</span>
            <span class="text-rose-500">@ $${produto.price.toFixed(2)}</span>
          </p>
        </div>
        <p class="font-medium text-rose-900">
          $${(produto.price * item.quantidade).toFixed(2)}
        </p>
      </div>
    `;

        ul.appendChild(li);
      });

      const footerTotal = document.querySelector(
        '.footerTotal',
      ) as HTMLDivElement;

      footerTotal.innerHTML = `
         <p class="text-2xl text-rose-900">Order Total</p>
          <p class="text-3xl font-bold text-rose-900">$${totalOrder.toFixed(2)}</p>
      `;
    });

    orderOverlay.addEventListener('click', (e) => {
      if (e.target === orderOverlay) {
        orderOverlay.classList.remove('flex');
        orderOverlay.classList.add('hidden');
      }
    });

    const btnConfirmFinal = document.querySelector(
      '.btnConfirmFinal',
    ) as HTMLButtonElement;

    btnConfirmFinal.addEventListener('click', () => {
      localStorage.removeItem('listaDeCompras');

      orderOverlay.classList.remove('flex');
      orderOverlay.classList.add('hidden');

      setupButtonStates();
      atualizaCart();
    });
  };

  atualizaCart();
};
