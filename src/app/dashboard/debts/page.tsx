'use client';

import { useState } from 'react';
import { 
  Box, Typography, Button, TextField, InputAdornment, 
  Chip, Avatar, IconButton, Menu, MenuItem, ListItemIcon,
  Grid, Pagination, Skeleton
} from '@mui/material';
import { 
  Search, FilterList, Edit, Delete, MoreVert, 
  Add, Assignment, Check, Error, Schedule, Payments
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';

// Mock data for debts
const MOCK_DEBTS = [
  {
    id: 1,
    debtor: 'John Smith',
    description: 'Invoice #1001 for consulting services',
    originalAmount: 5000,
    currentBalance: 0,
    dueDate: '2025-03-15',
    status: 'Paid',
  },
  {
    id: 2,
    debtor: 'Sarah Johnson',
    description: 'Invoice #1002 for software development',
    originalAmount: 12000,
    currentBalance: 12000,
    dueDate: '2025-04-20',
    status: 'Pending',
  },
  {
    id: 3,
    debtor: 'Michael Brown',
    description: 'Invoice #1003 for design services',
    originalAmount: 3500,
    currentBalance: 3500,
    dueDate: '2025-03-10',
    status: 'Overdue',
  },
  {
    id: 4,
    debtor: 'Emily Davis',
    description: 'Invoice #1004 for marketing campaign',
    originalAmount: 8000,
    currentBalance: 4000,
    dueDate: '2025-04-05',
    status: 'PartiallyPaid',
  },
  {
    id: 5,
    debtor: 'David Wilson',
    description: 'Invoice #1005 for equipment purchase',
    originalAmount: 15000,
    currentBalance: 15000,
    dueDate: '2025-05-12',
    status: 'Pending',
  },
  {
    id: 6,
    debtor: 'Jennifer Taylor',
    description: 'Invoice #1006 for monthly subscription',
    originalAmount: 2000,
    currentBalance: 2000,
    dueDate: '2025-03-01',
    status: 'Overdue',
  },
];

// Status chip component
const StatusChip = ({ status }: { status: string }) => {
  let color: 'success' | 'error' | 'warning' | 'primary';
  let icon;
  let label;

  switch (status) {
    case 'Paid':
      color = 'success';
      icon = <Check fontSize="small" />;
      label = 'Paid';
      break;
    case 'Overdue':
      color = 'error';
      icon = <Error fontSize="small" />;
      label = 'Overdue';
      break;
    case 'PartiallyPaid':
      color = 'primary';
      icon = <Payments fontSize="small" />;
      label = 'Partially Paid';
      break;
    case 'Pending':
    default:
      color = 'warning';
      icon = <Schedule fontSize="small" />;
      label = 'Pending';
  }

  return (
    <Chip
      size="small"
      icon={icon}
      label={label}
      color={color}
      sx={{ fontWeight: 500 }}
    />
  );
};

export default function DebtsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentDebtId, setCurrentDebtId] = useState<number | null>(null);
  
  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, debtId: number) => {
    setAnchorEl(event.currentTarget);
    setCurrentDebtId(debtId);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentDebtId(null);
  };

  // Filter debts based on search text
  const filteredDebts = MOCK_DEBTS.filter(debt => 
    debt.debtor.toLowerCase().includes(searchText.toLowerCase()) ||
    debt.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Debts
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            background: 'linear-gradient(90deg, #0078d4 0%, #38b6ff 100%)',
            px: 3,
            py: 1,
            '&:hover': {
              background: 'linear-gradient(90deg, #0078d4 0%, #38b6ff 100%)',
              opacity: 0.9
            }
          }}
        >
          Add New Debt
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <TextField
          placeholder="Search debts..."
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: '100%', md: '350px' } }}
        />
        
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          sx={{ ml: 2, display: { xs: 'none', sm: 'flex' } }}
        >
          Filter
        </Button>
      </Box>
      
      {isLoading ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} key={item}>
              <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Grid container spacing={3}>
            {filteredDebts.map((debt) => (
              <Grid item xs={12} key={debt.id}>
                <GlassCard sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          <Assignment fontSize="small" />
                        </Avatar>
                        <Typography variant="h6" fontWeight={500}>
                          {debt.debtor}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {debt.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Original Amount
                          </Typography>
                          <Typography variant="subtitle1" fontWeight={500}>
                            ${debt.originalAmount.toLocaleString()}
                          </Typography>
                        </Box>
                        
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Current Balance
                          </Typography>
                          <Typography variant="subtitle1" fontWeight={500}>
                            ${debt.currentBalance.toLocaleString()}
                          </Typography>
                        </Box>
                        
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Due Date
                          </Typography>
                          <Typography variant="subtitle1" fontWeight={500}>
                            {new Date(debt.dueDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, debt.id)}
                      >
                        <MoreVert fontSize="small" />
                      </IconButton>
                      
                      <StatusChip status={debt.status} />
                    </Box>
                  </Box>
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination count={10} color="primary" />
      </Box>
      
      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Edit Debt
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Payments fontSize="small" />
          </ListItemIcon>
          Record Payment
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}