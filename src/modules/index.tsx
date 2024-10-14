import { lazy } from 'react';
const SignIn = lazy(() => import('./auth/pages/sign-in'));
const SignUp = lazy(() => import('./auth/pages/sign-up'));
const AdminPanel = lazy(() => import('./admin-panel'));
const Products = lazy(() => import('./product/pages'));
const Settings = lazy(() => import('./settings/pages'));
const ProductDetails = lazy(() => import('./product-details/pages'));
const Categories = lazy(() => import('./categories/pages'));
const Brands = lazy(() => import('./brands/pages'));
const SubCategories = lazy(() => import('./sub-categories/pages'));
const BrandCategories = lazy(() => import('./brand-categories/pages'));
const Ads = lazy(() => import('./ads/pages'));
const Stock = lazy(() => import('./stock/pages'));
const NotFound = lazy(() => import('./not-found'));
 export{
    SignIn,
    SignUp,
    AdminPanel,
   Products,
   Categories,
   Brands,
   SubCategories,
   BrandCategories,
   Ads,
   Stock,
   NotFound,
   Settings,
   ProductDetails
 }