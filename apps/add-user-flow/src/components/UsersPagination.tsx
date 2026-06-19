import { InputSelect } from 'orbit-ds-components';

import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import './UsersPagination.css';

export interface UsersPaginationProps {
  page: number;
  totalPages: number;
  itemsPerPage: string;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: string) => void;
}

const pageNumbers = [1, 2, 3, 4, 5];

export function UsersPagination({
  page,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: UsersPaginationProps) {
  return (
    <footer className="users-pagination">
      <div className="users-pagination__pages">
        <button
          type="button"
          className="users-pagination__nav"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeftIcon />
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={`users-pagination__page${pageNumber === page ? ' users-pagination__page--active' : ''}`}
            disabled={pageNumber > totalPages}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          className="users-pagination__nav"
          aria-label="Next page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className="users-pagination__items">
        <InputSelect
          label="Items"
          showLabelInfo={false}
          value={itemsPerPage}
          onValueChange={onItemsPerPageChange}
          options={[
            { value: '10', label: '10' },
            { value: '25', label: '25' },
            { value: '50', label: '50' },
          ]}
          className="users-pagination__items-select"
        />
      </div>
    </footer>
  );
}
