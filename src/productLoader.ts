import type { Product } from './types/Product';
import { cart } from './cart';

export const setupProductList = async () => {
  const gridSobremesas = document.getElementById('gridSobremesas');
  if (!gridSobremesas) return;

  try {
    const response = await fetch('/data/data.json');
    if (!response.ok) throw new Error('Erro ao carregar produtos');
    const products: Product[] = await response.json();

    console.log(products);

    gridSobremesas.innerHTML = products
      .map(
        (p) => `
          <!--Card Sobremesa-->
          <div class="sobremesa w-full" data-id="${p.id}">
            <!--Img sobremesa-->
            <div
              class="img-sobremesa bg-center bg-no-repeat bg-cover aspect-square rounded-3xl relative mb-6"
              style="background-image: url('${p.image.desktop}')"
>
               <!--Btn cart-->
              <button
                class="btn-add-to-cart bg-rose-50 text-center w-1/2 absolute bottom-0 left-0 translate-x-1/2 translate-y-1/2 rounded-3xl border border-red-50 px-2 py-2.5 flex items-center justify-center gap-x-3 cursor-pointer"
              >
                <span class="material-symbols-outlined">
                  add_shopping_cart
                </span>
                <p class="text-rose-900 text-base font-semibold text-center">Add to Cart</p>
              </button>
            </div>

            <!--Info produto-->
            <div class="info-sobremesa flex flex-col gap-y-1">
              <p class="text-rose-300 text-base">${p.category}</p>
              <p class="text-rose-900 text-base font-bold">${p.name}</p>
              <p class="text-red-50 text-bas font-bold">$${p.price.toFixed(2)}</p>
            </div>
          </div>
        `,
      )
      .join('');

    cart();
  } catch (err) {
    console.error(err);
  }
};
