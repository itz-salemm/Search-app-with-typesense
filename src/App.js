import React from 'react';
import './style.css';
import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  SearchBox,
  Pagination,
  Configure,
  Hits,
  Highlight,
} from 'react-instantsearch-dom';
const Typesense = require('typesense');



const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

export default function App() {
  const Hit = ({ hit }) => {
    return (
      <div className="hit">
        <div className="hit-image">
          <img alt={hit.name} src={`${hit.image}`} />
        </div>
        <div className="hit-content">
          <div className="hit-price">${hit.price}</div>
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
      <InstantSearch indexName="instant_search" searchClient={searchClient}>
        <h4>Search Movies</h4>
        <SearchBox autoFocus />
        <Configure hitsPerPage={2} />
        <Hits hitComponent={Hit} />
        <Pagination />
      </InstantSearch>
    </div>
  );
}
