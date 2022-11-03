import { gql } from "@apollo/client";

export const GET_GEN_3 = gql`
    {
        categories {
        name,
        products {
            id,
            name
        }
        }
    }
`;
export const Categories = gql`
    {
        categories {
            name
        }
    }
`;

export const Curr = gql`
    {
        currencies {
            label,
            symbol
        }
    }
`;
export const AllInfo = gql`
    {
        categories {
            name,
          products {
            id,
            name,
            inStock,
            gallery,
            description,
            category,
            attributes{
              id,
              name,
              type,
              items {
                displayValue,
                value,
                id
              }
            },
            prices{
              currency {
                label,
                symbol
              },
              amount
            },
            brand
          }
        }
    }
`;