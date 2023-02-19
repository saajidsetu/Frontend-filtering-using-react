import CollapsibleList from 'components/CollapsibleList';
import { getUniqueValues, run } from 'core/utils';
import { useState } from 'react';
import { useItems } from 'core/hooks';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'react-router-dom';
import FilterToggle from 'components/FilterToggle';
import { Product } from 'core/types';

export default function () {
    const [search, setSearch] = useSearchParams();
    const filteredStorages = search.get('Storages')?.split(',') ?? [];
    const [storages, setStorages] = useState(filteredStorages);
    const getItems: any = run();
    const items = getItems.data || [];
    const allStorages = getUniqueValues<string, Product>(items, 'storage');
    const groupedItems = allStorages
        .map((storage) => ({
            label: storage,
            name: storage,
            value: storage,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    const onStorageChange = (storage: string) => (checked: Checkbox.CheckedState) => {
        let _storages = storages.slice();

        if (checked) {
            _storages.push(storage);
        } else {
            _storages = _storages.filter((_storage) => _storage !== storage);
        }

        setStorages(_storages);
    };
    const hasFilters = filteredStorages.length > 0;

    return (
        <CollapsibleList
            defaultVisible={hasFilters}
            title="Storage"
            actionButton={
                <FilterToggle
                    visible={storages.length > 0}
                    active={hasFilters}
                    onApply={() => {
                        search.set('Storages', storages.join(','));
                        setSearch(search, {
                            replace: true,
                        });
                    }}
                    onClear={() => {
                        search.delete('Storages');
                        setStorages([]);
                        setSearch(search, {
                            replace: true,
                        });
                    }}
                />
            }
        >
            {groupedItems
                .filter((f) => {
                    if (filteredStorages.length === 0) {
                        return true;
                    }

                    return filteredStorages.includes(f.value);
                })
                .map((field, key) => (
                    <li key={key} className="pv2">
                        <div className="flex items-center">
                            <Checkbox.Root
                                id={field.name}
                                name={field.name}
                                disabled={hasFilters}
                                onCheckedChange={onStorageChange(field.value)}
                                checked={storages.includes(field.value)}
                                className="checkbox lh-solid flex items-center justify-center pa0 bg-white w125 h125 br2 bn"
                            >
                                <Checkbox.Indicator>
                                    <CheckIcon className="checkbox__icon w125 h125" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <label htmlFor={field.name} className="ml3 fw5 f5">
                                {field.label}
                            </label>
                        </div>
                    </li>
                ))}
        </CollapsibleList>
    );
}
