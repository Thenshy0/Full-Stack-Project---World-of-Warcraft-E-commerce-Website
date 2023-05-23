import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Product from "../components/Product";
import Categories from "../components/Categories";
import { getAllProducts } from "../services/ProductService";
import { getAllCategories } from "../services/CategoryService";
import { Alert, Avatar, Tooltip } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const fetchProducts = async () => {
    const response = await getAllProducts(
      searchInput,
      page,
      limit,
      selectedCategory
    );
    setProducts(response.data.products);
    setTotalPages(Math.ceil(response.data.total / limit));
  };
  const fetchCategories = async () => {
    const response = await getAllCategories();
    console.log("categories");
    console.log(response);
    setCategories(response);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
    setPage(1);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowAllProducts(false);
  };
  const handleShowAllProducts = () => {
    setSelectedCategory(null);
    setShowAllProducts(true);
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [searchInput, page, limit, selectedCategory]);

  return (
    <div>
      {/* className="userpage" */} {/* SEARCH */}
      {/* <div className="searchBar">
        <input
          className="searchBarInput"
          type="text"
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search users"
        />
      </div> */}
      {/* Categories */}
      <div className="category-cards">
        <Tooltip title="Show All">
          <Avatar
            sx={{
              width: 70,
              height: 70,
              backgroundColor: "#537188",
              marginRight: 3,
              marginBottom: "10rem",
              boxShadow: showAllProducts
                ? "0px 0px 20px 0px #cbb279"
                : "0px 0px 20px 0px black",
            }}
            className="class-logo"
            alt="Show All"
            onClick={handleShowAllProducts}
          >
            <RestartAltIcon />
          </Avatar>
        </Tooltip>
        {categories.length > 0 &&
          categories.map((category) => (
            <Categories
              key={category._id}
              category={category}
              selectedCategory={selectedCategory}
              onCategoryClick={handleCategoryClick}
            />
          ))}
      </div>
      {/* Products */}
      <div className="product-card">
        {products.length > 0 ? (
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <div>
            <Alert
              sx={{
                bgcolor: "#cbb279",
              }}
            >
              No products found.
            </Alert>
          </div>
        )}
      </div>
      {/* PAGINATION */}
      {/* <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            slots={{
              previous: <ArrowBackIcon />,
              next: <ArrowForwardIcon />,
            }}
            color="standard"
            size="large"
            showFirstButton
            showLastButton
            onChange={handlePageChange}
            boundaryCount={1}
          />
        </Stack>
      </div> */}
    </div>
  );
};
export default Products;
