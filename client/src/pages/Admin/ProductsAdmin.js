import React, { useEffect, useState } from "react";

import CreateIcon from "@mui/icons-material/Create";
import Product from "../../components/Admin/Product";
import Categories from "../../components/Admin/Categories";
import { getAllProducts } from "../../services/ProductService";
import { getAllCategories } from "../../services/CategoryService";
import {
  Alert,
  Avatar,
  Card,
  CardContent,
  Divider,
  Tooltip,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteCategory from "../../components/Admin/DeleteCategory";

const ProductsAdmin = () => {
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
  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = categories.filter(
      (category) => category._id !== categoryId
    );
    setCategories(updatedCategories);
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [searchInput, page, limit, selectedCategory]);

  return (
    <div className="userpage">
      {/* Categories */}
      <div className="category-cards">
        <Tooltip title="Create new">
          <Link className="nav_link" to="/create-category-admin">
            <Avatar
              sx={{
                width: 70,
                height: 70,
                backgroundColor: "#537188",
                marginTop: 1.9,
                marginRight: 3,
              }}
              className="class-logo"
              alt="Create new"
            >
              <CreateIcon />
            </Avatar>
          </Link>
        </Tooltip>
        <Tooltip title="Show All">
          <Avatar
            sx={{
              width: 70,
              height: 70,
              backgroundColor: "#537188",
              marginTop: 1.9,
              marginRight: 3,
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
            <Card
              sx={{
                minWidth: 150,
                margin: "0rem 1rem",
              }}
            >
              <CardContent
                sx={{
                  backgroundColor: "rgb(182, 180, 184)",
                  padding: "0.5rem",
                }}
              >
                <Categories
                  key={category._id}
                  category={category}
                  selectedCategory={selectedCategory}
                  onCategoryClick={handleCategoryClick}
                />
                <Divider />
                <Tooltip title="Settings">
                  <Link to={`/view-categories-admin/${category._id}`}>
                    <SettingsIcon
                      color="primary"
                      aria-haspopup="true"
                      sx={{ fontSize: 30, paddingLeft: 3, color: "#202737" }}
                    />
                  </Link>
                </Tooltip>
                <Tooltip title="Delete">
                  <DeleteCategory
                    categoryId={category._id}
                    onDeleteCategory={handleDeleteCategory}
                  />
                </Tooltip>
              </CardContent>
            </Card>
          ))}
      </div>
      {/* Products */}

      <div>
        {" "}
        <Tooltip title="">
          <Link to="/create-product-admin">
            <Avatar
              sx={{
                width: 70,
                height: 70,
                backgroundColor: "#537188",
                position: "absolut",
                top: "10rem",
                left: "-52rem",
              }}
              className="class-logo"
              alt="Create new"
            >
              <CreateIcon />
            </Avatar>
          </Link>
        </Tooltip>
      </div>

      <div className="product-card">
        {products.length > 0 ? (
          products.map((product) => (
            <Card sx={{ minWidth: 320 }}>
              <CardContent
                sx={{
                  backgroundColor: "rgb(182, 180, 184)",
                  padding: "0.5rem",
                }}
              >
                <Product key={product._id} product={product} />{" "}
              </CardContent>
            </Card>
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
    </div>
  );
};

export default ProductsAdmin;
