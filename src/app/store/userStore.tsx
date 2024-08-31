import { create } from "zustand";
import { Book, User } from "../../types/UserType";

interface UserState {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  addBookToCurrentUserLibrary: (book: Book) => void;
  removeBookFromCurrentUserLibrary: (bookId: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
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
}));

export default useUserStore;
