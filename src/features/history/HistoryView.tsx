import React from 'react';
import { useHistory } from './useHistory';

const HistoryView: React.FC = () => {
    const {
        activePage,
        searchQuery,
        summaryStats,
        records,
        totalResults,
        handlePageChange,
        handleSearchChange
    } = useHistory();

    return (
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <div className="p-8 pb-24 md:pb-8 flex-1 overflow-y-auto">
                <div className="max-w-6xl mx-auto animate-in fade-in duration-300">

                    <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-4xl font-bold tracking-tight text-on-background mb-2">Analysis History</h2>
                            <p className="text-slate-500 text-lg">Review and manage your past AI resume optimizations.</p>
                        </div>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-primary)] transition-colors">search</span>
                            <input
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all shadow-sm"
                                placeholder="Search history..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {summaryStats.map(stat => (
                            <div key={stat.id} className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_10px_30px_rgba(11,28,48,0.06)] flex items-center gap-4 border border-outline-variant/5">
                                <div className={`w-12 h-12 rounded-xl ${stat.iconBgClass} flex items-center justify-center ${stat.iconColorClass}`}>
                                    <span className="material-symbols-outlined">{stat.icon}</span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{stat.title}</p>
                                    <p className="text-2xl font-bold text-on-background">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-surface-container-lowest rounded-2xl shadow-[0_10px_30px_rgba(11,28,48,0.06)] overflow-hidden border border-outline-variant/5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-container-low/50">
                                        <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Match Score</th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-surface-container">
                                    {records.length > 0 ? records.map(record => (
                                        <tr key={record.id} className="hover:bg-surface-container-low transition-colors group cursor-pointer" onClick={() => window.location.href = `#/reports/${record.id}`}>
                                            <td className="px-8 py-6 text-sm text-slate-600">{record.date}</td>
                                            <td className="px-8 py-6">
                                                <div className="font-semibold text-on-background">{record.role}</div>
                                                <div className="text-xs text-slate-400">{record.department}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">{record.companyInitial}</div>
                                                    <span className="text-sm font-medium text-on-background">{record.companyName}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-1.5 w-24 bg-surface-container rounded-full overflow-hidden">
                                                        <div className={`${record.matchBgClass} h-full rounded-full transition-all duration-1000`} style={{ width: `${record.matchScore}%` }}></div>
                                                    </div>
                                                    <span className={`text-sm font-bold ${record.matchTextClass}`}>{record.matchScore}%</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all" title="View Analysis">
                                                        <span className="material-symbols-outlined text-[var(--color-primary)]">visibility</span>
                                                    </button>
                                                    <button className="p-2 text-error hover:bg-error-container/50 rounded-lg transition-all" title="Delete">
                                                        <span className="material-symbols-outlined text-red-500">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-12 text-center text-slate-500">No records found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between bg-surface-container-low/30 border-t border-surface-container gap-4">
                            <p className="text-sm text-slate-500">
                                Showing <span className="font-semibold text-on-background">{records.length > 0 ? 1 : 0}</span> to <span className="font-semibold text-on-background">{records.length}</span> of <span className="font-semibold text-on-background">{totalResults}</span> results
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    disabled={activePage === 1}
                                    onClick={() => handlePageChange(Math.max(1, activePage - 1))}
                                    className="flex items-center justify-center px-4 h-10 rounded-xl border border-outline-variant/20 hover:bg-surface-container transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group text-slate-600"
                                >
                                    <span className="material-symbols-outlined text-sm mr-1 group-hover:-translate-x-0.5 transition-transform">chevron_left</span>
                                    <span className="text-sm font-semibold">Previous</span>
                                </button>
                                <div className="flex gap-1">
                                    {[1, 2, 3].map(p => (
                                        <button
                                            key={p}
                                            className={`flex items-center justify-center w-10 h-10 rounded-xl font-semibold transition-all active:scale-95 ${activePage === p ? 'bg-[var(--color-primary)] text-white' : 'border border-outline-variant/20 text-slate-600 hover:bg-surface-container'}`}
                                            onClick={() => handlePageChange(p)}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    disabled={activePage === 3}
                                    onClick={() => handlePageChange(Math.min(3, activePage + 1))}
                                    className="flex items-center justify-center px-4 h-10 rounded-xl border border-outline-variant/20 hover:bg-surface-container transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group text-slate-600"
                                >
                                    <span className="text-sm font-semibold">Next</span>
                                    <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-0.5 transition-transform">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HistoryView;