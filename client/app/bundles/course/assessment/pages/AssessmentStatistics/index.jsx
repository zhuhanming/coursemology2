import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  defineMessages,
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import { connect } from 'react-redux';

import NotificationBar, {
  notificationShape,
} from 'lib/components/NotificationBar';
import ErrorCard from 'lib/components/ErrorCard';
import LoadingIndicator from 'lib/components/LoadingIndicator';

import {
  fetchAncestors,
  fetchAncestorStatistics,
  fetchStatistics,
} from '../../actions';
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
  fetchAncestorStatisticsFailure: {
    id: 'course.assessment.statistics.ancestorStatisticsFail',
    defaultMessage: "Failed to fetch ancestor's statistics.",
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
  notification,
  ancestorAssessment,
  ancestorSubmissions,
  ancestorAllStudents,
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

  const fetchAncestorSubmissions = (id) => {
    if (id === assessmentId) {
      return;
    }
    dispatch(
      fetchAncestorStatistics(
        id,
        intl.formatMessage(translations.fetchAncestorStatisticsFailure),
      ),
    );
    setSelectedAncestorId(id);
  };

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
        setSelectedAncestorId={fetchAncestorSubmissions}
      />
      {ancestorAssessment != null && (
        <StatisticsPanel
          assessment={ancestorAssessment}
          submissions={ancestorSubmissions}
          allStudents={ancestorAllStudents}
        />
      )}
      <NotificationBar notification={notification} />
    </>
  );
};

AssessmentStatisticsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  notification: notificationShape,
  assessmentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,

  assessment: assessmentShape,
  submissions: PropTypes.arrayOf(submissionRecordsShape).isRequired,
  allStudents: PropTypes.arrayOf(courseUserShape).isRequired,
  ancestors: PropTypes.arrayOf(ancestorShape).isRequired,

  ancestorAssessment: assessmentShape,
  ancestorSubmissions: PropTypes.arrayOf(submissionRecordsShape),
  ancestorAllStudents: PropTypes.arrayOf(courseUserShape),
};

export default connect((state) => state.statisticsPage)(
  injectIntl(AssessmentStatisticsPage),
);
