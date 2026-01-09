import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logOut } from '@/app/redux/api/fetures/auth';

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const {token,user } = useAppSelector((store) => store.auth) as any;
  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logOut());
    return window.location.href = '/login';
  }
  if (!token) {
    return location.href = '/login'
  }

  return children;
};

export default ProtectedRoute;