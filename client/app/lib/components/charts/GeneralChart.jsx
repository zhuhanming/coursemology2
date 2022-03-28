import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import emptyChartPlugin from './emptyChartPlugin';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  zoomPlugin,
);

const addZoomToProps = (props) => ({
  ...props,
  options: {
    ...props.options,
    plugins: {
      ...props.options?.plugins,
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
      },
    },
  },
});

const GeneralChart = ({ withZoom = false, ...props }) => {
  let finalProps = props;
  if (withZoom) {
    finalProps = addZoomToProps(finalProps);
  }
  return (
    <Chart
      {...finalProps}
      plugins={[...(finalProps.plugins ?? []), emptyChartPlugin]}
    />
  );
};

GeneralChart.propTypes = {
  withZoom: PropTypes.bool,
  ...Chart.propTypes,
};

export default GeneralChart;
