declare global {
  interface Category {
    name: string;
    _id: string;
    approved: boolean;
  }
  interface Post {
    location: {
      x: number;
      y: number;
      label: string;
    };
    categories: Category[];
    images: string[];
    name: string;
    description: string;
    createdByUser: User;
    createdAt: Date;
    likedByUsers: User[];
  }
  type User = {
    name: string;
    email: string;
    image: string;
    createdAt: Date;
  };
  type mapCoors = {
    x: number;
    y: number;
  };
}

export {};
