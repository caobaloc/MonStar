import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Search from '~/pages/Search';
import Messages from '~/pages/Messages';
import Explore from '~/pages/Explore';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Profile from '~/pages/Profile';
import EditProfile from '~/pages/EditProfile';
import ChangePW from '~/pages/Change';
import Create from '~/pages/Create';
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/Following', component: Following },
  { path: '/Search', component: Search },
  { path: '/Explore', component: Explore },
  { path: '/Messages', component: Messages },
  { path: '/Profile', component: Profile },
  { path: '/edit', component: EditProfile },
  { path: '/change', component: ChangePW },
  { path: '/create', component: Create },
  { path: '/Login', component: Login, layout: null },
  { path: '/Register', component: Register, layout: null },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
