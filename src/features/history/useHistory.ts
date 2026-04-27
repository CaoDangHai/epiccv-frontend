import { useState, useMemo } from 'react';
import { historyRecords, summaryStats } from './mockData';

export const useHistory = () => {
    const [activePage, setActivePage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    // Logic tìm kiếm cơ bản
    const filteredRecords = useMemo(() => {
        if (!searchQuery) return historyRecords;
        const lowerQuery = searchQuery.toLowerCase();
        return historyRecords.filter(record =>
            record.role.toLowerCase().includes(lowerQuery) ||
            record.companyName.toLowerCase().includes(lowerQuery)
        );
    }, [searchQuery]);

    const handlePageChange = (page: number) => {
        setActivePage(page);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setActivePage(1); // Reset về trang 1 khi search
    };

    return {
        activePage,
        searchQuery,
        summaryStats,
        records: filteredRecords,
        totalResults: historyRecords.length,
        handlePageChange,
        handleSearchChange
    };
};