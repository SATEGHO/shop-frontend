import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useCheckAuth } from './services/react-query/user.queries';
import { useUserStore } from './store/user.store';
import { adminRoutes, privateRoutes, publicRoutes } from './routes/constants';
import MainLayout from './layouts/main/MainLayout';
import AdminLayout from './layouts/admin/AdminLayout';

const AppRouter = () => {
  const { isFetching } = useCheckAuth();
  const user = useUserStore((state) => state.user);

  if (isFetching) {
    return <span>loading...</span>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {user && user.roles.includes('ADMIN') && (
          <Route path="/admin" element={<AdminLayout />}>
            {adminRoutes.map((route) => (
              <Route
                path={route.path}
                index={route.index}
                element={route.element}
                key={route.path}
              />
            ))}
          </Route>
        )}
        <Route path="/" element={<MainLayout />}>
          {publicRoutes.map((route) => (
            <Route path={route.path} index={route.index} element={route.element} key={route.path} />
          ))}
          {user &&
            privateRoutes.map((route) => (
              <Route path={route.path} element={route.element} key={route.path} />
            ))}
          <Route path="*" element={<Navigate to="/products" replace={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
