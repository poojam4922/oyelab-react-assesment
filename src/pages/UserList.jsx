import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, setUserPage } from "../redux/userSilce";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error, currentPage, limit, totalUsers } = useSelector(
    (state) => state.users
  );
  console.log(users, "users");
  useEffect(() => {
    dispatch(fetchUser({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);
  const totalPages = Math.ceil(totalUsers / limit);
  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map(({ id, firstName, lastName, email, phone }) => (
          <div key={id} className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold">
              {firstName} {lastName}
            </h2>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <Link to={`/users/${id}`} className="text-blue-500 underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => dispatch(setUserPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">{currentPage}</span>
        <button
          onClick={() => dispatch(setUserPage(currentPage + 1))}
          disabled={users.length < limit}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
