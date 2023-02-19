import { isNil } from "lodash";

import { data } from "../data";

export function getUniqueValues<T, V>(items: V[], key: keyof V): Array<T> {
  const set: Set<T> = new Set();

  items.forEach((item) => {
    const value = item[key];

    if (Array.isArray(value)) {
      value.forEach((v: T) => set.add(v));
    } else {
      set.add(value as unknown as T);
    }
  });

  return Array.from(set);
}


function containsColors(colors: any, product: any) {
  // base case, do not skip products when there are no color filters
  if (!colors) return true;

  const selectedColors = new Set(colors.split(','));
  const productColors = product.color;

  // check if any of the product colors are in the filter
  for (const color of productColors) {
    if (selectedColors.has(color)) {
      return true;
    }
  }

  // does not contain any of the filtered colors, skip this product
  return false;
}



function containsStorage(colors: any, product: any) {
  // base case, do not skip products when there are no color filters
  if (!colors) return true;

  const selectedColors = new Set(colors.split(','));
  const productColors = product.storage;

  // check if any of the product colors are in the filter
  for (const color of productColors) {
    if (selectedColors.has(color)) {
      return true;
    }
  }

  // does not contain any of the filtered colors, skip this product
  return false;
}

function applyFilters(products: any, { query, sort, colors, minPrice, maxPrice, Storages }: any) {
  const filteredProducts = [];

  // skip products based on filters
  for (const product of products) {
    if (query && !product.name.toLowerCase().includes(query.toLowerCase())) {
      continue;
    }

    if (!containsColors(colors, product)) {
      continue;
    }

    if (!containsStorage(Storages, product)) {
      continue;
    }

    if (!isNil(minPrice) && product.price < minPrice) {
      continue;
    }

    if (!isNil(maxPrice) && product.price > maxPrice) {
      continue;
    }

    filteredProducts.push(product);
  }

  return filteredProducts.sort((a, b) => {
    const { name, price } = a;
    const { name: nameB, price: priceB } = b;

    switch (sort) {
      case 'priceDesc':
        return priceB - price;
      case 'priceAsc':
        return price - priceB;
      default:
        return name.localeCompare(nameB);
    }
  });
}


export function run() {
  const maxPrice = Math.round(
    Math.max(...data.map((product: any) => product.price)),
  );

  const params = new URLSearchParams(window.location.search);

  const paramsObj = Array.from(params.keys()).reduce(
    (acc, val) => ({ ...acc, [val]: params.get(val) }),
    {}
  );

  let result: any = {}
  result.data = applyFilters(data, paramsObj)
  result.maxPrice = maxPrice
  return { ...result }
}
