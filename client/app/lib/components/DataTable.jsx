import { createTheme, ThemeProvider } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { adaptedTheme } from 'lib/components/ProviderWrapper';

const options = {
  filter: true,
  filterType: 'dropdown',
  responsive: 'standard',
};

const theme = createTheme({
  ...adaptedTheme,
  components: {
    ...adaptedTheme.components,
    MUIDataTableHeadCell: {
      styleOverrides: {
        fixedHeader: {
          zIndex: 0,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        selectLabel: {
          marginBottom: 0,
        },
        displayedRows: {
          marginBottom: 0,
        },
      },
    },
  },
});

/**
 * Props for this component are identical to MUIDataTable's.
 *
 * Refer to https://github.com/gregnb/mui-datatables for the documentation.
 */
const DataTable = (props) => (
  <ThemeProvider theme={theme}>
    <MUIDataTable
      {...props}
      options={{ ...options, ...(props.options ?? {}) }}
    />
  </ThemeProvider>
);

DataTable.propTypes = MUIDataTable.propTypes;

export default DataTable;
