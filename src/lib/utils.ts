import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateEllipsisPagination(
  currentPage: number,
  totalPages: number,
  surroundingPages: number = 2
) {
  const pages: (string | number)[] = [];

  for (let page = 1; page <= totalPages; page++) {
    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;
    const isCurrentPage = page === currentPage;
    const isInLeftSide = page >= currentPage - surroundingPages;
    const isInRightSide = page <= currentPage + surroundingPages;
    const isOnRange = isInLeftSide && isInRightSide;

    const isElipsisPosition =
      page === currentPage - surroundingPages - 1 ||
      page === currentPage + surroundingPages + 1;

    if (isElipsisPosition && !isFirstPage && !isLastPage) {
      pages.push('...');
    }

    if (isFirstPage || isLastPage || isCurrentPage || isOnRange) {
      pages.push(page);
      continue;
    }
  }

  return pages;
}
