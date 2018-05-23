import { DEFAULT_LOCALE } from 'common/constants';

export default {
  namespace: 'global',

  state: {
    locale: DEFAULT_LOCALE,
  },

  effects: {
  },

  reducers: {
    localeToggle(state, { payload }) {
      state.locale = payload;
    },
  },

  // subscriptions: {
  //   setup({ history }) {
  //     // Subscribe history(url) change, trigger `load` action if pathname is `/`
  //     return history.listen(({ pathname, search }) => {
  //       if (typeof window.ga !== 'undefined') {
  //         window.ga('send', 'pageview', pathname + search);
  //       }
  //     });
  //   },
  // },
};
