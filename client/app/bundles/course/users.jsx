import { render } from 'react-dom';

import initializeAjaxForms from 'lib/helpers/initializeAjaxForms';
import ProviderWrapper from 'lib/components/ProviderWrapper';

import UserStatistics from './pages/UserStatistics';
import storeCreator from './store';

initializeAjaxForms('tr.course-user #update');

$(() => {
  const statisticsMountNode = document.getElementById('course-users-show');

  if (statisticsMountNode) {
    const store = storeCreator({});

    render(
      <ProviderWrapper store={store}>
        <UserStatistics />
      </ProviderWrapper>,
      statisticsMountNode,
    );
  }
});
