import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import StudentsStatistics from './students';
import StaffStatistics from './staff';
import { fetchStudentsStatistics, fetchStaffStatistics } from '../../actions';
import { staffStatisticsShape, studentsStatisticsShape } from '../../propTypes';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`statistics-tabpanel-${index}`}
      aria-labelledby={`statistics-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3, pb: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => ({
  id: `statistics-tab-${index}`,
  'aria-controls': `statistics-tabpanel-${index}`,
});

const StatisticsIndex = ({ dispatch, studentsStatistics, staffStatistics }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(fetchStudentsStatistics());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStaffStatistics());
  }, [dispatch]);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Statistics Index Tabs"
        >
          <Tab label="Course" {...a11yProps(0)} />
          <Tab label="Students" {...a11yProps(1)} />
          <Tab label="Staff" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        <StudentsStatistics {...studentsStatistics} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StaffStatistics {...staffStatistics} />
      </TabPanel>
    </Box>
  );
};

StatisticsIndex.propTypes = {
  dispatch: PropTypes.func.isRequired,
  studentsStatistics: studentsStatisticsShape.isRequired,
  staffStatistics: staffStatisticsShape.isRequired,
  intl: intlShape,
};

export default connect((state) => ({
  studentsStatistics: state.studentsStatistics,
  staffStatistics: state.staffStatistics,
}))(injectIntl(StatisticsIndex));
