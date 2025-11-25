// components/common/Pagination.tsx
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems?: number;
    onPageChange: (page: number) => void;
    showInfo?: boolean;
    maxVisiblePages?: number;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalItems,
    onPageChange,
    showInfo = true,
    maxVisiblePages = 5,
    className = '',
}) => {
    // Generate page numbers to display
    const getPageNumbers = (): (number | string)[] => {
        const pages: (number | string)[] = [];

        if (totalPages <= maxVisiblePages + 2) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            // Calculate range around current page
            const leftOffset = Math.floor(maxVisiblePages / 2);
            const rightOffset = Math.ceil(maxVisiblePages / 2);

            let start = Math.max(2, currentPage - leftOffset);
            let end = Math.min(totalPages - 1, currentPage + rightOffset);

            // Adjust if we're near the start
            if (currentPage <= leftOffset + 1) {
                end = Math.min(totalPages - 1, maxVisiblePages + 1);
            }

            // Adjust if we're near the end
            if (currentPage >= totalPages - rightOffset) {
                start = Math.max(2, totalPages - maxVisiblePages);
            }

            // Add left ellipsis
            if (start > 2) {
                pages.push('...');
            }

            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Add right ellipsis
            if (end < totalPages - 1) {
                pages.push('...');
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number | string) => {
        if (typeof page === 'number') {
            onPageChange(page);
        }
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className={`flex flex-col items-center gap-4 ${className}`}>
            <div className="flex items-center gap-2 flex-wrap justify-center">
                <a
                    onClick={() => currentPage > 1 && handlePrevious()}
                    className={`
      cursor-pointer text-blue-600 dark:text-blue-400 transition
      ${currentPage === 1 ? 'cursor-not-allowed text-gray-400 dark:text-gray-600 pointer-events-none' : 'hover:underline'}
    `}
                >
                    Previous
                </a>

                {/* Page Numbers */}
                {/* Page Numbers */}
                <div className="flex items-center space-x-4">
                    {getPageNumbers().map((pageNum, index) => (
                        <a
                            key={index}
                            onClick={() => handlePageClick(pageNum)}
                            className={`
        cursor-pointer text-blue-600 
        dark:text-blue-400 transition 
        ${pageNum === '...' ? 'cursor-default text-gray-400 dark:text-gray-600' : ''}
        ${pageNum === currentPage ? 'font-bold underline' : 'hover:underline'}
      `}
                        >
                            {pageNum}
                        </a>
                    ))}
                </div>


                {/* Next Button */}
                <a
                    onClick={() => currentPage < totalPages && handleNext()}
                    className={`
      cursor-pointer text-blue-600 dark:text-blue-400 transition
      ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400 dark:text-gray-600 pointer-events-none' : 'hover:underline'}
    `}
                >
                    Next
                </a>
            </div>
        </div>
    );
};

export default Pagination;