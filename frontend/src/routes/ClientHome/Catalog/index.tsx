import "./styles.css";
import SearchBar from "../../../components/SearchBar";
import SearchCat from "../../../components/SearchCat";
import CatalogCard from "../../../components/CatalogCard";
import ButtonNextPage from "../../../components/ButtonNextPage";
import { Product } from "../../../types/product";

import * as productService from '../../../services/product-service';
import {useContext, useEffect, useState} from "react";

import {ContextCartCount} from "../../../utils/context-cart";

type QueryParams = {
  page: number;
  name: string;
}
type QueryParamsCat = {
  page: number;
  categories: string;
}

export default function Catalog() {

  const [isLastPage, setIsLastPage] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const {setContextCartCount} = useContext(ContextCartCount);

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: ''
  })
  const [queryParamsCat, setQueryParamsCat] = useState<QueryParamsCat>({
    page: 0,
    categories: ''
  })

  useEffect(()=>{
    productService.findPageRequest(queryParams.page,queryParams.name)
    .then(response => {
      const nextPage = response.data.content;
      setProducts(products.concat(nextPage))
      setIsLastPage(response.data.last)
    })
  },[queryParams]);


  function handleSearch(searchText: string) {
    setProducts([]);
    setQueryParams({...queryParams,page: 0, name: searchText});
  }

  function handleSearchCat(searchCat: string) {
    setProducts([]);
    setQueryParamsCat({...queryParamsCat,page: 0, categories: searchCat});
  }

  function handleNextPageClick() {
    setQueryParams({...queryParams, page: queryParams.page + 1})
  }

  return (
    <main>
      <section id="catalog-section" className="dsc-container">
        <div className="searchbar">
          <SearchBar  onSearch={handleSearch} />
          <SearchCat  onSearch={handleSearchCat} />

        </div>

        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">

          {
            products.map(
              product => <CatalogCard key={product.id} product={product} />
              )
          }
        </div>
        {
          !isLastPage &&
          <div onClick={handleNextPageClick}>
          <ButtonNextPage />
          </div>
        }
      </section>
    </main>
  );
}
