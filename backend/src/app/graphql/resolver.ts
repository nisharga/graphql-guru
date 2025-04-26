// Define the Book type
interface Book {
  title: string;
  author: string;
}

// Define data set
const books: Book[] = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Resolver with return type defined
export const resolvers = {
  Query: {
    books: (): Book[] => books,  // Define return type as Book[]
  },
};
