import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';
import Head from 'next/head';

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`;

const Pagination = (props) => {
    return (
        <Query query={PAGINATION_QUERY}>
            {({data, error, loading}) => {
                if (loading) return <p>Loading...</p>
                const count = data.itemsConnection.aggregate.count;
                const pages = Math.ceil(count / perPage);
                const page = props.page;
                return (
                    <PaginationStyles>
                        <Head>
                            <title>React shop - Page {page} of {pages}</title>
                        </Head>
                        <Link
                            prefetch
                            href={{
                                pathname: 'items',
                                query: { page: page - 1 }
                        }}>
                            <a className="prev" aria-disabled={page <= 1}>prev</a>
                        </Link>
                        <p>Page {page} of {pages}</p>
                        <Link
                            prefetch
                            href={{
                                pathname: 'items',
                                query: { page: page + 1 }
                        }}>
                            <a className="prev" aria-disabled={page >= pages}>next</a>
                        </Link>
                    </PaginationStyles>
                )
            }}
        </Query>
    );
};

export default Pagination;