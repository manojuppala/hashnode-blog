import { create } from "zustand";

type State = {
  publicationId: string;
  newsletterStatus: string;
  newsletterErrorMsg: string;
};

type Actions = {
  updatePublicationId: (id: string) => void;
  updateNewsletterInfo: (status: string, errorMsg: string) => void;
};

export const useAppStore = create<State & Actions>((set) => ({
  publicationId: "",
  newsletterStatus: "",
  newsletterErrorMsg: "",
  updatePublicationId: (id: string) => set(() => ({ publicationId: id })),
  updateNewsletterInfo: (status: string, errorMsg: string) =>
    set(() => ({ newsletterStatus: status, newsletterErrorMsg: errorMsg })),
}));
