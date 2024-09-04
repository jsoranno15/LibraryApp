import { create } from "zustand";
import { Book, User } from "../../types/UserType";
import { useShallow } from "zustand/react/shallow";

interface UserState {
  currentUser: User | null;
  actions: {
    setCurrentUser: (currentUser: User | null) => void;
    addBookToCurrentUserLibrary: (book: Book) => void;
    removeBookFromCurrentUserLibrary: (bookId: string) => void;
  };
}

const initialState: Omit<UserState, "actions"> = {
  currentUser: null,
};

export const userStore = create<UserState>((set) => ({
  ...initialState,
  actions: {
    setCurrentUser: (currentUser: User | null) => set({ currentUser }),
    addBookToCurrentUserLibrary: (book: Book) =>
      set((state: UserState) => {
        if (state.currentUser) {
          return {
            currentUser: {
              ...state.currentUser,
              library: [...state.currentUser.library, book],
            },
          };
        }
        return state;
      }),
    removeBookFromCurrentUserLibrary: (bookId: string) =>
      set((state: UserState) => {
        if (state.currentUser) {
          return {
            currentUser: {
              ...state.currentUser,
              library: state.currentUser.library.filter(
                (book) => book.bookId !== bookId
              ),
            },
          };
        }
        return state;
      }),
  },
}));

export const useUserStoreActions = () => userStore((state) => state.actions);

export const useCurrentUser = () =>
  userStore(useShallow((state) => state.currentUser));
