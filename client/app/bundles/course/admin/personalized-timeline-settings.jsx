import { render } from 'react-dom';

import ProviderWrapper from 'lib/components/ProviderWrapper';
import storeCreator from './store';
import PersonalizedTimelineSettings from './pages/PersonalizedTimelineSettings';

$(() => {
  const mountNode = document.getElementById('personalized-timeline-settings');

  if (mountNode) {
    const store = storeCreator({});

    render(
      <ProviderWrapper store={store}>
        <PersonalizedTimelineSettings />
      </ProviderWrapper>,
      mountNode,
    );
  }
});
