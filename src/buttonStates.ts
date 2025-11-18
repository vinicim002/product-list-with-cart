export const setupButtonStates = () => {

  const listaDeCompras = JSON.parse(
    localStorage.getItem('listaDeCompras') || '[]'
  );

  // Se não existir nada → restaurar botões padrão
  if (listaDeCompras.length === 0) {
    const btns = document.querySelectorAll('.btn-add-to-cart');

    btns.forEach((btn) => {
      btn.innerHTML = `
        <span class="material-symbols-outlined">
          add_shopping_cart
        </span>
        <p class="text-rose-900 text-base font-semibold text-center">Add to Cart</p>
      `;

      btn.classList.remove('bg-red-50');
      btn.classList.add('bg-rose-50', 'cursor-pointer');
    });

    return;
  }

  // Atualizar apenas os itens da lista
  listaDeCompras.forEach((item: { id: string; quantidade: number }) => {
    const card = document.querySelector(`[data-id="${item.id}"]`);
    if (!card) return;

    const btn = card.querySelector('.btn-add-to-cart') as HTMLElement;

    // Muda apenas o conteúdo interno do botão existente
    btn.innerHTML = `
      <div class="flex justify-between w-full">
        <img src="/images/icon-increment-quantity.svg" class="cursor-pointer">
        <p class="text-rose-900 text-base font-semibold text-center">${item.quantidade}</p>
        <img src="/images/icon-decrement-quantity.svg" class="cursor-pointer">
      </div>
    `;

    btn.classList.remove('bg-rose-50', 'cursor-pointer');
    btn.classList.add('bg-red-50');
  });
};
