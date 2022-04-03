import PropTypes from 'prop-types';

import {
  BLUE_CHART_BACKGROUND,
  BLUE_CHART_BORDER,
  ORANGE_CHART_BACKGROUND,
  ORANGE_CHART_BORDER,
} from 'theme/colors';

import { defineMessages, injectIntl, intlShape } from 'react-intl';
import GeneralChart from 'lib/components/charts/GeneralChart';
import { submissionRecordsShape } from '../../propTypes';
import { getDataFromSubmissions } from './utils';

const translations = defineMessages({
  lineDatasetLabel: {
    id: 'course.assessment.statistics.submissionTimeGradeChart.lineDatasetLabel',
    defaultMessage: 'Grade',
  },
  barDatasetLabel: {
    id: 'course.assessment.statistics.submissionTimeGradeChart.barDatasetLabel',
    defaultMessage: 'Number of Submissions',
  },
  xAxisLabelWithDeadline: {
    id: 'course.assessment.statistics.submissionTimeGradeChart.xAxisLabel.withDeadline',
    defaultMessage: 'Submission Date Relative to Deadline (D)',
  },
  xAxisLabelWithoutDeadline: {
    id: 'course.assessment.statistics.submissionTimeGradeChart.xAxisLabel.withoutDeadline',
    defaultMessage: 'Submission Date',
  },
});

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

const SubmissionTimeAndGradeChart = ({ submissions, intl }) => {
  const { labels, lineData, barData } = getDataFromSubmissions(submissions);

  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: intl.formatMessage(translations.lineDatasetLabel),
        backgroundColor: ORANGE_CHART_BACKGROUND,
        borderColor: ORANGE_CHART_BORDER,
        borderWidth: 2,
        fill: false,
        data: lineData,
        yAxisID: 'A',
      },
      {
        type: 'bar',
        label: intl.formatMessage(translations.barDatasetLabel),
        backgroundColor: BLUE_CHART_BACKGROUND,
        borderColor: BLUE_CHART_BORDER,
        borderWidth: 1,
        data: barData,
        yAxisID: 'B',
      },
    ],
  };

  const hasEndAt = submissions.every((s) => s.endAt != null);

  const options = {
    scales: {
      A: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: intl.formatMessage(translations.lineDatasetLabel),
          color: ORANGE_CHART_BORDER,
        },
      },
      B: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: intl.formatMessage(translations.barDatasetLabel),
          color: BLUE_CHART_BORDER,
        },
      },
      x: {
        title: {
          display: true,
          text: hasEndAt
            ? intl.formatMessage(translations.xAxisLabelWithDeadline)
            : intl.formatMessage(translations.xAxisLabelWithoutDeadline),
        },
      },
    },
  };

  return (
    <div style={styles.root}>
      <GeneralChart type="bar" data={data} options={options} withZoom />
    </div>
  );
};

SubmissionTimeAndGradeChart.propTypes = {
  submissions: PropTypes.arrayOf(submissionRecordsShape).isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(SubmissionTimeAndGradeChart);
