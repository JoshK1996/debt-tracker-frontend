import { useQuery } from '@tanstack/react-query';
import axiosClient from '../axiosClient';

export interface DashboardSummary {
  totalOutstandingDebt: number;
  totalOverdueDebt: number;
  debtorCount: number;
  activeDebtCount: number;
  recentPayments: {
    id: number;
    debtor: string;
    amount: number;
    date: string;
    status: 'completed' | 'pending';
  }[];
  statusBreakdown: {
    paid: number;
    overdue: number;
    pending: number;
    partial: number;
  };
  monthlyData: {
    payments: number[];
    debts: number[];
  };
}

/**
 * Hook for fetching dashboard summary data
 */
export function useDashboardSummary() {
  return useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: async (): Promise<DashboardSummary> => {
      const response = await axiosClient.get('/dashboard/summary');
      return response.data;
    },
    // If the API is not available during development, return mock data
    placeholderData: {
      totalOutstandingDebt: 245680,
      totalOverdueDebt: 87320.5,
      debtorCount: 148,
      activeDebtCount: 215,
      recentPayments: [
        { id: 1, debtor: 'John Smith', amount: 1250, date: '2025-03-25', status: 'completed' },
        { id: 2, debtor: 'Sarah Johnson', amount: 3400, date: '2025-03-24', status: 'completed' },
        { id: 3, debtor: 'Michael Brown', amount: 780.5, date: '2025-03-23', status: 'completed' },
        { id: 4, debtor: 'Emily Davis', amount: 2100, date: '2025-03-22', status: 'completed' },
      ],
      monthlyData: {
        payments: [12500, 18300, 14200, 16800, 19500, 22100, 25800, 23400, 21000, 19800, 24600, 27300],
        debts: [18200, 21500, 19800, 22300, 24100, 23800, 26500, 28900, 25600, 24300, 28900, 32500],
      },
      statusBreakdown: {
        paid: 35,
        overdue: 28,
        pending: 42,
        partial: 15,
      }
    },
  });
}