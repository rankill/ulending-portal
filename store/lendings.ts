import { ActionTree, MutationTree, GetterTree } from 'vuex';
import axios from 'axios';
import { RootState } from '~/store';

interface Lending {
  amount?: number;
  termLimit?: number;
  type?: string;
  entries?: any;

  // Personal
  name?: string | null;
  lastName?: string | null;
  id?: number | null;
  idType?: any;
  mobile?: number | null;
  altMobile?: number | null;
  email?: string | null;
  birthDate?: string | null;
  genre?: any;
  maritalStatus?: any;
  tel?: number | null;
  socialStratum?: any;
  houseType?: any;
  dependents?: number | null;
  contactType?: string | null;
  status?: number | null;

  // Localization
  state?: any;
  city?: any;
  address?: any;
  extraAddress?: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const freshLending = (): Lending => ({
  entries: {
    transport: 0,
    schoolSupplies: 0,
    feeding: 0,
    rent: 0,
    academicOutings: 0,
    other: 0
  },
  type: 'ENROLLMENT',
  amount: 300000,
  termLimit: 3
});

export const state = () => ({
  lending: null
});

export type LendingState = ReturnType<typeof state>;

export const mutations: MutationTree<LendingState> = {
  ADD_LENDING: (state, lendingObj: any) => {
    state.lending = lendingObj;
  },
  REMOVE_LENDING: (state: LendingState) => {
    state.lending = null;
  },
  UPDATE_LENDING: (state: any, lendingObj: any) => {
    state.lending = state.lending || {};

    // @ts-ignore
    // eslint-disable-next-line no-undef
    _.merge(state.lending, lendingObj);
  }
};

export const actions: ActionTree<LendingState, RootState> = {
  addLending({ commit }: any, lendingObj: any) {
    commit('ADD_LENDING', lendingObj);
  },
  removeLending({ commit }: any) {
    commit('REMOVE_LENDING');
  },
  updateLending({ commit }: any, lendingObj: any) {
    console.warn('updating...');
    commit('UPDATE_LENDING', lendingObj);
  },
  async sendEmail({ dispatch }: any, payloadForm) {
    console.log('EMAIL', payloadForm);

    if (payloadForm) {
      await axios.post('/api/lending-request', {
        form: payloadForm
      });
      dispatch('updateLending', payloadForm);
    }
  }
};

export const getters: GetterTree<LendingState, RootState> = {};
