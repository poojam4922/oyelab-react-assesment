import React, { useEffect } from "react";
import { fetchProduct, setPage } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const HomePages = () => {
  const dispatch = useDispatch();
  const { products, loading, error, currentPage, limit, totalProducts } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProduct({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  const totalPages = Math.ceil(totalProducts / limit);
  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map(({ id, thumbnail, title, price, description }) => (
            <Link to={`/product/${id}`} key={id}>
              <Card
                id={id}
                img={thumbnail}
                title={title}
                price={price}
                description={description}
              />
            </Link>
          ))
        ) : (
          <p className="text-center text-xl">No products available</p>
        )}
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">{currentPage}</span>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePages;
