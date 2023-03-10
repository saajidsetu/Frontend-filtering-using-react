import { useMemo } from 'react';
import SearchBar from 'components/SearchBar';
import Select from 'components/Select';
import { useItems } from 'core/hooks';
import ItemsContainer from 'components/ItemsContainer';
import { useSearchParams } from 'react-router-dom';
import ColorFilters from 'components/ColorFilters';
import PriceFilter from 'components/PriceFilter';
import StorageFilters from 'components/StorageFilters';
import ProductContainer from 'components/ProductContainer';
import { run } from 'core/utils';

export default function Root() {
  const [search, setSearch] = useSearchParams();
  // const getItems = useItems();
  const getItems: any = run();
  const items = useMemo(() => getItems.data || [], [getItems]);
  const itemCounts = useMemo(
    () =>
      items.reduce((initial: any, item: any) => {
        if (!isNaN(initial[item.category])) {
          initial[item.category] += 1;
        } else {
          initial[item.category] = 1;
        }

        return initial;
      }, {}),
    [items],
  );
  const maxPrice = (getItems?.maxPrice ?? 0)

  return (
    <div className="mw9 center ph4 bg-white min-vh-100 br bl b--light-gray">
      <div className="flex bb b--black-10 justify-between items-center mb4">
        <h1>Sajid's Shop</h1>

        <div className="mr3 ml-auto">
          <SearchBar />
        </div>

        <Select
          onChange={(e) => {
            search.set('sort', e.target.value);
            setSearch(search, {
              replace: true,
            });
          }}
          label="Sort by"
          name="sort"
          options={[
            {
              label: 'Name',
              value: 'name',
            },
            {
              label: 'Price High',
              value: 'priceDesc',
            },
            {
              label: 'Price Low',
              value: 'priceAsc',
            },
          ]}
        />
      </div>

      <div className="flex">
        <div className="w-25 mr4">
          <div style={{ position: 'sticky', top: '20px' }}>
            <ul className="list pa0 ma0 pb3 bb b--black-10">
              <li className="f6 fw5 silver mb2">
                <div className="flex justify-between">
                  Filters
                  <span>{items.length} Products</span>
                </div>
              </li>
              <li>
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Phones
                  <span>{itemCounts['phones'] ?? 0}</span>
                </button>
              </li>
              <li>
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Shoes
                  <span>{itemCounts['shoes'] ?? 0}</span>
                </button>
              </li>
              <li>
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Jackets
                  <span>{itemCounts['jackets'] ?? 0}</span>
                </button>
              </li>
            </ul>

            <ColorFilters />
            <StorageFilters />

            <PriceFilter maxPrice={maxPrice} />
          </div>
        </div>

        {/* <ItemsContainer /> */}
        <ProductContainer />
      </div>
    </div>
  );
}
