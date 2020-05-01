import { Middleware } from '@nuxt/types';

const lendingExist: Middleware = ({ store, redirect }: any) => {
  const lendingForm = store.getters['lendings/lendingExist'];
  if (lendingForm) {
    store.dispatch('lendings/addLending', lendingForm).then(() => {
      return true;
    });
  } else {
    return redirect('/');
  }
};

export default lendingExist;
