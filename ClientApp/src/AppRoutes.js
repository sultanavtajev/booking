import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Item from "./components/Item";
import Create from "./components/Create";
import { Home } from "./components/Home";
import UserProperties from './components/UserProperties';
import UserRentedProperties from './components/UserRentedProperties';
import UserBookings from './components/UserBookings';
import { Newsletter } from './components/content/Newsletter';
import { Privacy } from './components/content/Privacy';
import { Terms } from './components/content/Terms';
import { FAQ } from './components/content/FAQ';
import { Destinations } from './components/content/Destinations';
import { LandlordRes } from './components/content/LandlordRes';
import { TenantRes } from './components/content/TenantRes';
import { Support } from './components/content/Support';
import { Login } from './components/api-authorization/Login'; // Oppdater stien etter behov



const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />
  },
  {
    path: '/all-items',
    requireAuth: false,
    element: <Item />
  },
  {
    path: '/create',
    requireAuth: true,
    element: <Create />
  },
  {
    path: '/userProperties',
      requireAuth: true,
      element: <UserProperties />
  },
  {
    path: '/userBookings',
      requireAuth: true,
      element: <UserBookings />
  },

  {
    path: '/userRentedProperties',
      requireAuth: true,
      element: <UserRentedProperties />
  },

  {
      path: '/login',
      requireAuth: false,
      element: <Login />
  },

  {
    path: '/newsletter',
      element: <Newsletter />
  },

  {
    path: '/privacy',
      element: <Privacy />
  },

  {
    path: '/terms',
      element: <Terms />
  },

  {
    path: '/faq',
      element: <FAQ />
  },

  {
    path: '/destinations',
      element: <Destinations />
  },

  {
    path: '/landlordRes',
      element: <LandlordRes />
  },

  {
    path: '/tenantRes',
      element: <TenantRes />
  },

  {
    path: '/support',
      element: <Support />
  },

  ...ApiAuthorzationRoutes
];

export default AppRoutes;
