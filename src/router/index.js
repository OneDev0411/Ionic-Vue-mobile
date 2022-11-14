import { createRouter, createWebHistory } from '@ionic/vue-router'
import LandingPage from '../pages/generic/LandingPage.vue'
import { useUser } from '../stores/user'

const routes = [
  {
    path: '/',
    redirect: '/landing',
  },
  {
    name: 'landing',
    path: '/landing',
    component: LandingPage,
  },

  {
    name: 'profile',
    path: '/profile/:id',
    component: () => import('../pages/userprofile/ProfilePage.vue'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../pages/userprofile/LoginComponent.vue'),
    beforeEnter: async () => {
      // redirect to landing page if user already logged in
      const userStore = useUser()
      if (await userStore.checkAuth()) {
        return {
          path: '/landing',
        }
      }
    },
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('../pages/userprofile/RegisterPage.vue'),
  },
  {
    name: 'email-validation',
    path: '/email-validation',
    component: () => import('../pages/userprofile/EmailValidationPage.vue'),
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('../pages/settings/SettingsPage.vue'),
  },
  {
    name: 'profile-settings',
    path: '/settings/profile',
    component: () => import('../pages/settings/ProfileSettings.vue'),
  },
  {
    name: 'profile-edit',
    path: '/edit/profile',
    component: () => import('../pages/userprofile/ProfileEditPage.vue'),
  },
  {
    name: 'profile-edit',
    path: '/edit/profile',
    component: () => import('../pages/userprofile/ProfileEditPage.vue'),
  },
  {
    name: 'favorite-lists',
    path: '/user/favorites',
    component: () => import('../pages/userprofile/FavoritesPage.vue'),
  },
  {
    name: 'financier-list',
    path: '/user/financiers',
    component: () => import('../pages/userprofile/FinancierListPage.vue'),
  },
  {
    name: 'withdraw-funds',
    path: '/user/withdraw',
    component: () => import('../pages/userprofile/WithdrawFundsPage.vue'),
  },
  {
    name: 'supporters',
    path: '/user/supporters',
    component: () => import('../pages/userprofile/SupportersPage.vue'),
  },
  {
    name: 'edit-supporters',
    path: '/user/edit/supporters',
    component: () => import('../pages/userprofile/EditSupportersPage.vue'),
  },
  {
    name: 'help',
    path: '/settings/help',
    component: () => import('../pages/generic/HelpPage.vue'),
  },
  {
    name: 'changePassword',
    path: '/settings/change-password',
    component: () => import('../pages/settings/ChangePasswordPage.vue'),
  },
  {
    name: 'notifications',
    path: '/notifications',
    component: () => import('../pages/generic/NotificationsPage.vue'),
  },
  {
    name: 'terms&conditions',
    path: '/terms',
    component: () => import('../pages/generic/TermsPage.vue'),
  },
  {
    name: 'privacy-policy',
    path: '/privacy-policy',
    component: () => import('../pages/generic/PrivacyPage.vue'),
  },
  {
    name: 'delete-account',
    path: '/settings/delete-account',
    component: () => import('../pages/settings/DeleteUser.vue'),
  },
  {
    name: 'dreamCreation',
    path: '/create-dream',
    component: () => import('../pages/dream/DreamCreationPage.vue'),
  },
  {
    name: 'wallet',
    path: '/wallet',
    component: () => import('../pages/wallet/WalletList.vue'),
  },
  {
    name: 'walletDetail',
    path: '/wallet/:id',
    component: () => import('../pages/wallet/WalletDetail.vue'),
  },
  {
    name: 'fund',
    path: '/fund/:id',
    component: () => import('../pages/wallet/FundMilestone.vue'),
  },
  {
    name: 'pay',
    path: '/pay',
    component: () => import('../pages/wallet/PaymentPage.vue'),
  },
  {
    name: 'chat',
    path: '/chat',
    component: () => import('../pages/chat/ChatList.vue'),
  },
  {
    name: 'chatDetail',
    path: '/chat/:id',
    component: () => import('../pages/chat/ChatDetail.vue'),
  },
  {
    name: 'dreamDetail',
    path: '/dream/:id',
    component: () => import('../pages/dream/DreamDetail.vue'),
  },
  {
    name: 'editMilestoneSupporters',
    path: '/milestone/:id',
    component: () => import('../pages/dream/MilestoneSupporters_admin.vue')
  },
  {
    name: 'editMilestoneSupportProducts',
    path: '/milestone/:id/support',
    component: () => import('../pages/dream/MilestoneSupporters_Products.vue')
  },
  {
    name: 'supporters',
    path: '/supporters',
    component: () => import('../pages/supporters/AddSupporters.vue'),
  },
  {
    name: 'product',
    path: '/product',
    component: () => import('../pages/products/ProductServices.vue'),
  },
  {
    name: 'productLoading',
    path: '/product-loading',
    component: () => import('../pages/products/ProductsLoading.vue'),
  },
  {
    name: 'dreamLoading',
    path: '/dream-loading',
    component: () => import('../components/dream/DreamLoading.vue'),
  },
  {
    name: 'marketplaceListing',
    path: '/marketplace/lists',
    component: () => import('../pages/marketplace/ListingPage.vue'),
  },
  {
    name: 'marketplaceListingSearch',
    path: '/marketplace/lists/search',
    component: () => import('../pages/marketplace/ListingSearchPage.vue'),
  },
  {
    name: 'productListing',
    path: '/marketplace/product-listing',
    component: () => import('../pages/markedplace/ProductListing.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: function (to) {
    if (to.hash) {
      return { el: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  },
})

// check if user is authenticated before any redirect
// if false, redirect to login page
router.beforeEach(async (to) => {
  const userStore = useUser()
  const authState = userStore.isAuthenticated || (await userStore.checkAuth())

  // redirect to login if user not authenticated
  if (
    to.name !== 'login' &&
    to.name !== 'register' &&
    to.name !== 'terms&conditions' &&
    to.name !== 'privacy-policy' &&
    !authState
  ) {
    return { name: 'login' }
  }
  // load user profile in not loaded
  if (!userStore.isLoaded) {
    await userStore.getUserProfile()
    const emailValid = userStore.emailValid

    // redirect to email verification page if user email is not verified
    if (to.name !== 'email-validation' && !emailValid && authState) {
      return { name: 'email-validation' }
    }
  }
})

export default router
