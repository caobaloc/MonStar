import PropTypes from 'prop-types';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Menu({ children }) {
  return <nav className={cx('sidebar')}>{children}</nav>;
}
Menu.prototype = {
  children: PropTypes.node.isRequired,
};

export default Menu;
