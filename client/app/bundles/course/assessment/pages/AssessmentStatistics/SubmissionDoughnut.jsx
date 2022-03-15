import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useMemo } from 'react';
import { courseUserShape, submissionRecordsShape } from '../../propTypes';

ChartJS.register(ArcElement, Tooltip, Legend);

const GREEN_BACKGROUND = 'rgba(75, 192, 192, 0.2)';
const GREEN_BORDER = 'rgba(75, 192, 192, 1)';
const ORANGE_BACKGROUND = 'rgba(255, 159, 64, 0.2)';
const ORANGE_BORDER = 'rgba(255, 159, 64, 1)';
const RED_BACKGROUND = 'rgba(255, 99, 132, 0.2)';
const RED_BORDER = 'rgba(255, 99, 132, 1)';

const SubmissionDoughnut = ({ submissions, allStudents }) => {
  // const [includePhantoms, setIncludePhantoms] = useState(false);

  const data = useMemo(
    () => ({
      labels: ['Submitted', 'Attempting', 'Unattempted'],
      datasets: [
        {
          label: 'Student Submission Statuses',
          data: [25, 40, 5],
          backgroundColor: [
            GREEN_BACKGROUND,
            ORANGE_BACKGROUND,
            RED_BACKGROUND,
          ],
          borderColor: [GREEN_BORDER, ORANGE_BORDER, RED_BORDER],
          borderWidth: 1,
        },
      ],
    }),
    [submissions, allStudents],
  );
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Doughnut data={data} />
      <div style={{ marginTop: '2rem', fontWeight: 'medium', color: 'gray' }}>
        Student Submission Statuses
      </div>
    </div>
  );
};

SubmissionDoughnut.propTypes = {
  submissions: PropTypes.arrayOf(submissionRecordsShape).isRequired,
  allStudents: PropTypes.arrayOf(courseUserShape).isRequired,
};

export default SubmissionDoughnut;
