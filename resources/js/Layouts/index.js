import Authenticated from './Authenticated';
import Guest from './Guest';
import Authenticating from './Authenticating';

export const AuthenticatedLayout = Authenticated;
export const GuestLayout = Guest;
export const AuthenticatingLayout = Authenticating;

export default {
    Authenticated: AuthenticatedLayout,
    Guest: GuestLayout,
    Authenticating: AuthenticatingLayout,
};
