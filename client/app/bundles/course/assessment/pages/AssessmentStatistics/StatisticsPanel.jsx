import { Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import {
  assessmentShape,
  courseUserShape,
  submissionRecordsShape,
} from '../../propTypes';
import MeanMedianStdev from './MeanMedianStdev';
import SubmissionDoughnut from './SubmissionDoughnut';
import SubmissionTimeAndScoreChart from './SubmissionTimeAndScoreChart';

const StatisticsPanel = ({ assessment, submissions, allStudents }) => (
  <div className="assessment-statistics-panel">
    <div className="assessment-statistics-panel__top">
      <Card
        className="assessment-statistics-panel__top-left"
        variant="outlined"
      >
        <CardContent>
          <SubmissionDoughnut
            submissions={submissions}
            allStudents={allStudents}
          />
        </CardContent>
      </Card>
      <Card
        className="assessment-statistics-panel__top-right"
        variant="outlined"
      >
        <CardContent>
          <MeanMedianStdev assessment={assessment} submissions={submissions} />
        </CardContent>
      </Card>
    </div>
    <Card className="assessment-statistics-panel__bottom" variant="outlined">
      <CardContent>
        <SubmissionTimeAndScoreChart submissions={submissions} />
      </CardContent>
    </Card>
    {/* TODO: Add section on hardest questions */}
  </div>
);

StatisticsPanel.propTypes = {
  assessment: assessmentShape,
  submissions: PropTypes.arrayOf(submissionRecordsShape).isRequired,
  allStudents: PropTypes.arrayOf(courseUserShape).isRequired,
};

export default StatisticsPanel;
