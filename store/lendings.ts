import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { RootState } from '~/store';

interface Lending {
  amount?: number;
  termLimit?: number;
  type?: string;
  entries?: any;

  name?: string;
  lastName?: string;
  id?: number | null;
  idType?: any;
  mobile?: number | null;
  altMobile?: number | null;
  email?: string;
  birthDate?: string;
  genre?: any;
  maritalStatus?: any;
  state?: any;
  city?: any;
  address?: any;
  extraAddress?: any;
  tel?: number | null;
  socialStratum?: any;
  houseType?: any;
  dependents?: number;
  contactType?: string;
  status: number | null;
}

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
  termLimit: 3,
  // Personal
  name: '',
  lastName: '',
  idType: {},
  id: null,
  birthDate: '',
  genre: {},
  maritalStatus: {},
  tel: null,
  mobile: null,
  altMobile: null,

  // Localization
  state: {},
  city: {},
  address: '',
  extraAddress: '',

  // Aditional info
  status: 0,
  houseType: {},
  dependents: 0
});

export const state = () => ({
  lending: freshLending()
});

export type LendingState = ReturnType<typeof state>;

export const mutations: MutationTree<LendingState> = {
  ADD_LENDING: (state, lendingObj: any) => {
    state.lending = lendingObj;
  },
  REMOVE_LENDING: (state: LendingState) => {
    state.lending = freshLending();
  },
  UPDATE_LENDING: (state: any, lendingObj: any) => {
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
    commit('UPDATE_LENDING', lendingObj);
  }
};

export const getters: GetterTree<LendingState, RootState> = {};
