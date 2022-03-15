import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  defineMessages,
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import { connect } from 'react-redux';

import ErrorCard from 'lib/components/ErrorCard';
import LoadingIndicator from 'lib/components/LoadingIndicator';

import { fetchAncestors, fetchStatistics } from '../../actions';
import {
  ancestorShape,
  assessmentShape,
  courseUserShape,
  submissionRecordsShape,
} from '../../propTypes';
import StatisticsPanel from './StatisticsPanel';
import AncestorSelect from './AncestorSelect';

const translations = defineMessages({
  fetchFailure: {
    id: 'course.assessment.statistics.fail',
    defaultMessage: 'Failed to fetch statistics.',
  },
  fetchAncestorsFailure: {
    id: 'course.assessment.statistics.ancestorFail',
    defaultMessage: 'Failed to fetch past iterations of this assessment.',
  },
});

const AssessmentStatisticsPage = ({
  assessmentId,
  intl,
  isFetching,
  isError,
  dispatch,
  assessment,
  submissions,
  allStudents,
  ancestors,
}) => {
  const [selectedAncestorId, setSelectedAncestorId] = useState(null);

  useEffect(() => {
    if (assessmentId) {
      dispatch(
        fetchStatistics(
          assessmentId,
          intl.formatMessage(translations.fetchFailure),
        ),
      );
    }
  }, [assessmentId]);

  useEffect(() => {
    if (assessmentId) {
      dispatch(
        fetchAncestors(
          assessmentId,
          intl.formatMessage(translations.fetchAncestorsFailure),
        ),
      );
    }
  }, [assessmentId]);

  if (isFetching) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <ErrorCard
        message={<FormattedMessage {...translations.fetchFailure} />}
      />
    );
  }

  return (
    <>
      <StatisticsPanel
        assessment={assessment}
        submissions={submissions}
        allStudents={allStudents}
      />
      <AncestorSelect
        ancestors={ancestors}
        selectedAncestorId={selectedAncestorId}
        setSelectedAncestorId={setSelectedAncestorId}
      />
    </>
  );
};

AssessmentStatisticsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  assessmentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,

  assessment: assessmentShape,
  submissions: PropTypes.arrayOf(submissionRecordsShape).isRequired,
  allStudents: PropTypes.arrayOf(courseUserShape).isRequired,
  ancestors: PropTypes.arrayOf(ancestorShape).isRequired,
};

export default connect((state) => state.statisticsPage)(
  injectIntl(AssessmentStatisticsPage),
);
