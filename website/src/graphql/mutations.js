/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBook = /* GraphQL */ `
  mutation CreateBook($newBook: BookInput) {
    createBook(newBook: $newBook) {
      bookId
      title
      description
      imageUrl
      author
      price
      createdAt
      updatedAt
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder($newOrder: OrderInput) {
    createOrder(newOrder: $newOrder)
  }
`;
