import { render } from 'react-dom';

import ProviderWrapper from 'lib/components/ProviderWrapper';
import storeCreator from './store';
import PersonalizedTimelineSettings from './pages/PersonalizedTimelineSettings';

$(() => {
  const mountNode = document.getElementById('personalized-timeline-settings');

  if (mountNode) {
    const data = mountNode.getAttribute('data');
    const attributes = JSON.parse(data);
    const store = storeCreator({
      admin: {
        personalizedTimelineSettings: {
          minLearningRate: parseFloat(attributes.min_learning_rate),
          maxLearningRate: parseFloat(attributes.max_learning_rate),
          assessmentGradeWeight: parseFloat(attributes.assessment_grade_weight),
          assessmentSubmissionWeight: parseFloat(
            attributes.assessment_submission_weight,
          ),
          videoViewPercentageWeight: parseFloat(
            attributes.video_view_percentage_weight,
          ),
        },
      },
    });

    render(
      <ProviderWrapper store={store}>
        <PersonalizedTimelineSettings />
      </ProviderWrapper>,
      mountNode,
    );
  }
});
