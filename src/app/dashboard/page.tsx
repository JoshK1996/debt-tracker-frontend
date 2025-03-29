'use client';

import { useState, useEffect } from 'react';
import { Grid, Box, Paper, Typography, Skeleton, Chip, Divider, Stack, Avatar } from '@mui/material';
import { Payments, TrendingUp, TrendingDown, People, Assignment, Error, Check, Schedule } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import ApexCharts with SSR disabled
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const StatCard = ({ title, value, icon, color, increase, isLoading }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  increase?: string;
  isLoading: boolean;
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        className="glass-card"
        sx={{
          height: '100%',
          px: 3,
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color}20 0%, ${color}05 70%, transparent 100%)`,
            transform: 'translate(30px, -30px)',
            zIndex: 0,
          }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, zIndex: 1 }}>
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            {title}
          </Typography>
          <Avatar
            sx={{
              backgroundColor: `${color}20`,
              color: color,
              width: 40,
              height: 40,
            }}
          >
            {icon}
          </Avatar>
        </Box>
        
        {isLoading ? (
          <Skeleton variant="text" sx={{ fontSize: '2rem', width: '80%' }} />
        ) : (
          <Typography variant="h4" fontWeight={600} sx={{ mb: 1 }}>
            {value}
          </Typography>
        )}
        
        {increase && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
            {parseInt(increase) >= 0 ? (
              <TrendingUp fontSize="small" color="success" />
            ) : (
              <TrendingDown fontSize="small" color="error" />
            )}
            <Typography
              variant="body2"
              sx={{ ml: 0.5 }}
              color={parseInt(increase) >= 0 ? 'success.main' : 'error.main'}
            >
              {parseInt(increase) >= 0 ? '+' : ''}{increase}% from last month
            </Typography>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  
  // Simulated API data
  useEffect(() => {
    const fetchData = async () => {
      // In a real app, replace with an actual API call
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/summary`);
      // const data = await response.json();
      
      // Simulated data
      setTimeout(() => {
        setDashboardData({
          totalOutstandingDebt: '$245,680.00',
          totalOverdueDebt: '$87,320.50',
          debtorCount: '148',
          activeDebtCount: '215',
          recentPayments: [
            { id: 1, debtor: 'John Smith', amount: '$1,250.00', date: '2025-03-25', status: 'completed' },
            { id: 2, debtor: 'Sarah Johnson', amount: '$3,400.00', date: '2025-03-24', status: 'completed' },
            { id: 3, debtor: 'Michael Brown', amount: '$780.50', date: '2025-03-23', status: 'completed' },
            { id: 4, debtor: 'Emily Davis', amount: '$2,100.00', date: '2025-03-22', status: 'completed' },
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
        });
        setIsLoading(false);
      }, 1500);
    };
    
    fetchData();
  }, []);
  
  const monthlyChartOptions = {
    chart: {
      type: 'area' as const,
      height: 350,
      toolbar: {
        show: false,
      },
      fontFamily: 'inherit',
      background: 'transparent',
    },
    colors: ['#0078d4', '#8849ff'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth' as const,
      width: 3,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: '#888',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return '$' + value.toLocaleString();
        },
        style: {
          colors: '#888',
        },
      },
    },
    legend: {
      position: 'top' as const,
    },
    grid: {
      borderColor: 'rgba(0, 0, 0, 0.05)',
      strokeDashArray: 5,
    },
    tooltip: {
      theme: 'dark',
      x: {
        formatter: function (val: number) {
          return 'Month: ' + val;
        },
      },
      y: {
        formatter: function (val: number) {
          return '$' + val.toLocaleString();
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
  };
  
  const statusChartOptions = {
    chart: {
      type: 'donut' as const,
      background: 'transparent',
    },
    colors: ['#00c853', '#ef5350', '#ffa726', '#7132db'],
    labels: ['Paid', 'Overdue', 'Pending', 'Partially Paid'],
    legend: {
      position: 'bottom' as const,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(0) + '%';
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
              formatter: function (val: number) {
                return val + '%';
              },
            },
            total: {
              show: true,
              formatter: function () {
                return '120 debts';
              },
            },
          },
        },
      },
    },
  };
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Outstanding Debt"
            value={dashboardData?.totalOutstandingDebt || '0'}
            icon={<Assignment />}
            color="#0078d4"
            increase="8.2"
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Overdue Debt"
            value={dashboardData?.totalOverdueDebt || '0'}
            icon={<Error />}
            color="#ef5350"
            increase="-3.4"
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Active Debtors"
            value={dashboardData?.debtorCount || '0'}
            icon={<People />}
            color="#7132db"
            increase="5.1"
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Active Debts"
            value={dashboardData?.activeDebtCount || '0'}
            icon={<Assignment />}
            color="#ffa726"
            increase="12.3"
            isLoading={isLoading}
          />
        </Grid>
        
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Paper
              className="glass-panel"
              sx={{
                p: 3,
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Debt vs. Payments (2025)
              </Typography>
              
              {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={350} />
              ) : (
                <Box id="chart">
                  {typeof window !== 'undefined' && (
                    <ReactApexChart
                      options={monthlyChartOptions}
                      series={[
                        {
                          name: 'Payments',
                          data: dashboardData?.monthlyData.payments,
                        },
                        {
                          name: 'New Debts',
                          data: dashboardData?.monthlyData.debts,
                        },
                      ]}
                      type="area"
                      height={350}
                    />
                  )}
                </Box>
              )}
            </Paper>
          </motion.div>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Paper
              className="glass-panel"
              sx={{
                p: 3,
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Debt Status Breakdown
              </Typography>
              
              {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={350} />
              ) : (
                <Box id="status-chart" sx={{ mt: 2 }}>
                  {typeof window !== 'undefined' && (
                    <ReactApexChart
                      options={statusChartOptions}
                      series={[
                        dashboardData?.statusBreakdown.paid,
                        dashboardData?.statusBreakdown.overdue,
                        dashboardData?.statusBreakdown.pending,
                        dashboardData?.statusBreakdown.partial,
                      ]}
                      type="donut"
                      height={350}
                    />
                  )}
                </Box>
              )}
            </Paper>
          </motion.div>
        </Grid>
        
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Paper
              className="glass-panel"
              sx={{
                p: 3,
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3 }}>
                Recent Payments
              </Typography>
              
              {isLoading ? (
                Array.from(new Array(4)).map((_, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                    <Box sx={{ width: '100%' }}>
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="40%" />
                    </Box>
                  </Box>
                ))
              ) : (
                <Stack spacing={2}>
                  {dashboardData?.recentPayments.map((payment: any) => (
                    <Box key={payment.id}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            <Payments fontSize="small" />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1">{payment.debtor}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(payment.date).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h6">{payment.amount}</Typography>
                          <Chip
                            size="small"
                            label={payment.status === 'completed' ? 'Completed' : 'Pending'}
                            icon={payment.status === 'completed' ? <Check fontSize="small" /> : <Schedule fontSize="small" />}
                            color={payment.status === 'completed' ? 'success' : 'warning'}
                            sx={{ fontWeight: 500 }}
                          />
                        </Box>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                    </Box>
                  ))}
                </Stack>
              )}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}