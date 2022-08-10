/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBookById = /* GraphQL */ `
  query GetBookById($bookId: ID!) {
    getBookById(bookId: $bookId) {
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
export const listBooks = /* GraphQL */ `
  query ListBooks($limit: Int!, $nextToken: String) {
    listBooks(limit: $limit, nextToken: $nextToken) {
      books {
        bookId
        title
        description
        imageUrl
        author
        price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const myOrders = /* GraphQL */ `
  query MyOrders($limit: Int!, $nextToken: String) {
    myOrders(limit: $limit, nextToken: $nextToken) {
      orderItems {
        userId
        orderId
        book {
          bookId
          title
          description
          imageUrl
          author
          price
          createdAt
          updatedAt
        }
        quantity
      }
      nextToken
    }
  }
`;
