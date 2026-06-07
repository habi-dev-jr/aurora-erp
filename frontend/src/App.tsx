// GA
import ReactGA from 'react-ga4';

// utils
import { lazy, Suspense } from 'react';

// styles
import './styles/index.scss';
import ThemeStyles from './styles/theme';

// fonts
import './fonts/icomoon/icomoon.woff';
import './fonts/icomoon/icomoon.svg';

// contexts
import { SidebarProvider } from './contexts/sidebarContext';
import { ThemeProvider } from 'styled-components';

// hooks
import { useTheme } from './contexts/themeContext';
import { useEffect, useRef } from 'react';
import {useWindowSize} from 'react-use';

// components
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './layouts/Sidebar';
import Copyright from './components/Copyright';
import AppBar from './layouts/AppBar';
import { PageRoute } from './constants';

// pages
// const Login  = lazy(() => import('@pages/Login'));
// const SalesAnalytics = lazy(() => import('@pages/SalesAnalytics'));
// const SellersList = lazy(() => import('@pages/SellersList'));
const Home = lazy(() => import('./views/Home'));
const PageNotFound = lazy(() => import('./views/PageNotFound'));

const App = () => {
  const {width} = useWindowSize();
  const appRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const path = useLocation().pathname;
  const withSidebar = path !== '/login' && path !== '/404';

  // Google Analytics init
  const gaKey = import.meta.env.VITE_GA;
  gaKey && ReactGA.initialize(gaKey);

  useEffect(() => {
    appRef.current && appRef.current.scrollTo(0, 0);
  }, []);

  return (
    <SidebarProvider>
      <ThemeProvider theme={{ theme: theme }}>
        <ThemeStyles />
        {/* <ToastContainer theme={theme} autoClose={2000} style={{padding: '20px'}}/> */}
        {width < 1280 && withSidebar && <AppBar/>}
        <div className={`app ${!withSidebar ? 'fluid' : ''}`} ref={appRef}>
          <ScrollToTop />
          {withSidebar && <Sidebar />}
          <div className="app_content">
            {width >= 1280 && withSidebar && <AppBar/>}
            <Suspense fallback={<Loader />}>
              <div className="main">
                <Routes>
                  {/* <Route path="/login" element={<Login/>}/> */}
                  <Route path="/" element={<Home/>}/>
                  {/* <Route path="transactions" element={<Transactions/>}/> */}
                  <Route path="*" element={<Navigate to={PageRoute.NOT_FOUND} />} />
                  <Route path={PageRoute.NOT_FOUND} element={<PageNotFound />} />
                </Routes>
              </div>
              {withSidebar && <Copyright />}
            </Suspense>
          </div>
        </div>
      </ThemeProvider>
    </SidebarProvider>
  );
};

export default App;
