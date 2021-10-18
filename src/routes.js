import React from 'react';
import { HOME_ROUTE } from './constants/env.constant';
import NftDetails from './views/pages/Nft/nftDetails'

const Dashboard = React.lazy(() => import('./views/pages/Dashboard/Dashboard'));
const Category = React.lazy(() => import('./views/pages/Category'));
const Collection = React.lazy(() => import('./views/pages/Collection'));
const NFT = React.lazy(() => import('./views/pages/Nft'));
const User = React.lazy(() => import('./views/pages/User'));
const Transaction = React.lazy(() => import('./views/pages/Transaction'));
const Profile = React.lazy(() => import('./views/pages/Profile'));
const SellNft = React.lazy(() => import('./views/pages/SellNft'));


const routes = [
  { path: `${HOME_ROUTE}/`, exact: true, name: 'Home' },
  { path: `${HOME_ROUTE}/dashboard`, name: 'Dashboard', component: Dashboard, exact : true  },
  { path: `${HOME_ROUTE}/category`, name: 'Category', component: Category , exact : true },
  { path: `${HOME_ROUTE}/collection`, name: 'Collection', component: Collection, exact : true  },
  { path: `${HOME_ROUTE}/user`, name: 'User', component: User , exact : true },
  { path: `${HOME_ROUTE}/nft`, name: 'Nft', component: NFT , exact : true },
  { path: `${HOME_ROUTE}/transaction`, name: 'Transaction', component: Transaction , exact : true },
  { path: `${HOME_ROUTE}/nft/:id`, name: 'Details', component: NftDetails , exact : false  },
  { path: `${HOME_ROUTE}/profile`, name: 'Profile', component: Profile , exact : true  },
  { path: `${HOME_ROUTE}/sell-nft`, name: 'Sell Nft', component: SellNft , exact : true  },
];

export default routes;
