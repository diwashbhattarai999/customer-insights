import { Navigate, Route } from 'react-router';

import SettingsLayout from '@/components/layouts/settings-layout';
import Account from '@/features/settings/pages/Account';
import General from '@/features/settings/pages/General';
import Integrations from '@/features/settings/pages/Integrations';
import Notifications from '@/features/settings/pages/Notifications';
import Security from '@/features/settings/pages/Security';

/**
 * Settings routes are used to define the settings routes.
 */
const SettingsRoutes = () => (
  <Route element={<SettingsLayout />} path="/settings">
    <Route element={<Navigate to={'/settings/general'} />} path="/settings" />
    <Route index element={<General />} path="general" />
    <Route element={<Account />} path="account" />
    <Route element={<Notifications />} path="notifications" />
    <Route element={<Security />} path="security" />
    <Route element={<Integrations />} path="integrations" />
  </Route>
);

export default SettingsRoutes;
