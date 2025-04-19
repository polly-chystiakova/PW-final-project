import { SortOptions } from '../../pages/home/product.filter.fragment';

export const dataSortType: { sortBy: SortOptions }[] = [
  {
    sortBy: 'Name (A - Z)',
  },
  {
    sortBy: 'Name (Z - A)',
  },
  {
    sortBy: 'Price (Low - High)',
  },
  {
    sortBy: 'Price (High - Low)',
  },
];