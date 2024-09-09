// types/User.ts
export interface BookProgress {
  totalPages?: number;
  pagesRead?: number;
  completed?: boolean;
}

export interface Book {
  bookId: string;
  title: string;
  image: string;
  authors: string[];
  genres: string[];
  favorite?: boolean;
  progress?: BookProgress;
}

export interface Review {
  bookId: string;
  rating: number;
  reviewText: string;
}

export interface CurrentBook {
  bookId: string;
  progress: number;
}

export interface Dashboard {
  booksRead: number;
  currentBooks: CurrentBook[];
  favoriteBooks: string[];
}

export interface User {
  uid: string;
  email: string;
  library: Book[];
  favoriteBooks: string[];
  quotes: string[];
  dashboard: Dashboard;
  reviews: Review[];
  createdAt?: Date;
  updatedAt?: Date;
}
