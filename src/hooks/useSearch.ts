import { useState, useMemo } from 'react';

export function useSearch<T>(items: T[], searchKeys: (keyof T)[], searchTerm: string) {
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return items.filter(item => 
      searchKeys.some(key => {
        const value = item[key];
        return value && String(value).toLowerCase().includes(lowerSearchTerm);
      })
    );
  }, [items, searchKeys, searchTerm]);

  return filteredItems;
}