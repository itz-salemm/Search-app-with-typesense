import React from 'react';
import './style.css';
import {
  InstantSearch,
  SearchBox,
  Configure,
  Hits,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import { SearchClient as TypesenseSearchClient } from 'typesense';

import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    nodes: [
      {
        host: 'fkute4jm109ndpzvp-1.a1.typesense.net',
        port: '443',
        protocol: 'https',
      },
    ],
    apiKey: 'GZiu8M4qazNPf336UQlv9jfD6x2evuXz',
  },
  additionalSearchParameters: {
    query_by: 'title',
  },
});

export default function App() {
  const Hit = ({ hit }) => {
    return (
      <div className="hit">
        <div className="hit-image">
          <img alt={hit.authors} src={hit.image_url} />
        </div>
        <div className="hit-content">
          <div className="hit-price">${hit.title}</div>
          <div className="hit-name">
            <Highlight attribute="name" hit={hit} />
          </div>
          <div className="hit-description">
            <Highlight attribute="description" hit={hit} />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <InstantSearch
        indexName="books"
        searchClient={typesenseInstantsearchAdapter.searchClient}
      >
        <h4>Search Books</h4>
        <SearchBox autoFocus />
        <Configure hitsPerPage={5} />
        <Hits hitComponent={Hit}/>
        <Pagination />
      </InstantSearch>
    </div>
  );
}