import { create } from "zustand";
import { Book, User } from "../../types/UserType";
import { useShallow } from "zustand/react/shallow";

interface UserState {
  currentUser: User | null;
  actions: {
    setCurrentUser: (currentUser: User | null) => void;
    addBookToCurrentUserLibrary: (book: Book) => void;
    removeBookFromCurrentUserLibrary: (bookId: string) => void;
    setBookAsFavorite: (bookId: string) => void;
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

    setBookAsFavorite: (bookId: string) =>
      set((state) => {
        if (!state.currentUser) return state;

        const user = state.currentUser;
        const bookIndex = user.library.findIndex(
          (book) => book.bookId === bookId
        );

        if (bookIndex === -1) return state; // Book not found in library

        const book = user.library[bookIndex];
        const isCurrentlyFavorite = book.favorite ?? false;

        // Calculate the number of currently favorited books
        const favoriteCount = user.library.filter((b) => b.favorite).length;

        if (isCurrentlyFavorite) {
          // Unfavorite the book if it is already favorited
          user.library[bookIndex] = { ...book, favorite: false };
        } else if (favoriteCount < 3) {
          // Favorite the book if it is not currently favorited and there is space
          user.library[bookIndex] = { ...book, favorite: true };
        }

        return { currentUser: { ...user, library: [...user.library] } };
      }),
  },
}));

export const useUserStoreActions = () => userStore((state) => state.actions);

export const useCurrentUser = () =>
  userStore(useShallow((state) => state.currentUser));
