import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ to, href, children, onclick }) {
  let Comp = 'button';
  return <Comp to={to}>{children}</Comp>;
}

Button.prototype = {
  href: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onclick: PropTypes.string.isRequired,
};
export default Button;
