import HomeHeader from './HomeLayout/Header';
import Sidebar from '~/components/Layout/Sidebar';
import './defaultLayout.scss';
import Login from '~/pages/Login';

function DefaultLayout({ children }) {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
}

export default DefaultLayout;
