import { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, IconButton, Tooltip } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { FormattedMessage } from 'react-intl';
import translations from './translations';

const styles = {
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
};

export default class DeleteButton extends Component {
  renderIcon() {
    return (
      <Tooltip title={<FormattedMessage {...translations.removeFile} />}>
        <IconButton
          onClick={this.props.handleCancel}
          size="small"
          style={styles.badgeStyle}
        >
          <Close />
        </IconButton>
      </Tooltip>
    );
  }

  render() {
    return <Badge style={styles.badge}>{this.renderIcon()}</Badge>;
  }
}

DeleteButton.propTypes = {
  handleCancel: PropTypes.func,
};
