import { render } from 'react-dom';

import initializeAjaxForms from 'lib/helpers/initializeAjaxForms';
import ProviderWrapper from 'lib/components/ProviderWrapper';

import StudentStatistics from './pages/StudentStatistics';
import storeCreator from './store';

initializeAjaxForms('tr.course-user #update');

$(() => {
  const studentStatisticsMountNode =
    document.getElementById('student-statistics');

  if (studentStatisticsMountNode) {
    const store = storeCreator({});

    render(
      <ProviderWrapper store={store}>
        <StudentStatistics />
      </ProviderWrapper>,
      studentStatisticsMountNode,
    );
  }
});
