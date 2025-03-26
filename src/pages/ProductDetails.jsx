import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../redux/productSlice";
import Loading from "../components/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id, "id");
  const dispatch = useDispatch();
  const { productDetails, productLoading, productError } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);
  if (productLoading) return <Loading />;
  if (productError)
    return <p className="text-red-500 text-center"> {productError} </p>;
  return (
    <div className="max-w-xl mx-auto p-6">
      {productDetails ? (
        <div className="border rounded-lg shadow-lg p-6">
          <img
            src={productDetails.thumbnail}
            alt={productDetails.title}
            className="w-full h-96 object-cover rounded-lg mb-4"
          />
          <h1 className="text-2xl font-bold">{productDetails.title}</h1>
          <p className="text-lg text-gray-700 mt-2">
            {productDetails.description}
          </p>
          <p className="text-xl font-semibold text-blue-600 mt-4">
            Price: ${productDetails.price}
          </p>
          <p className="mt-2">
            Category:{" "}
            <span className="font-medium">{productDetails.category}</span>
          </p>
        </div>
      ) : (
        <p className="text-center text-xl">No product details found</p>
      )}
    </div>
  );
};

export default ProductDetails;
