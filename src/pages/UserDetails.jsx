import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, fetchUserPosts } from "../redux/userSilce";
import Loading from "../components/Loading";

const UserDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetails, userPosts, userLoading, userError } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUserDetails(id));
    dispatch(fetchUserPosts(id));
  }, [dispatch, id]);

  if (userLoading) return <Loading />;
  if (userError) return <p className="text-center text-red-500">{userError}</p>;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {userDetails ? (
        <>
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center space-x-6 text-center">
              <img
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                src={userDetails.image || "/path-to-default-avatar.jpg"}
                alt={userDetails.name}
              />
              <div>
                <h2 className="text-4xl font-semibold text-gray-800">
                  {userDetails.name}
                </h2>
                <p className="text-xl text-gray-700 mt-2">
                  {userDetails.email}
                </p>
                <p className="text-lg text-gray-500 mt-1">
                  {userDetails.phone}
                </p>
              </div>
            </div>
          </div>

          {/* User Posts */}
          <h3 className="text-3xl font-semibold mb-4">Posts</h3>
          {userPosts.length > 0 ? (
            <div
              className={`grid ${
                userPosts.length === 1
                  ? "place-items-center"
                  : "grid-cols-1 sm:grid-cols-2"
              } gap-6`}
            >
              {userPosts.map((post) => (
                <div
                  key={post.id}
                  className={` bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                    userPosts.length === 1 ? "border border-gray-500" : ""
                  }`}
                >
                  <h4 className="text-xl font-semibold text-gray-800">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 mt-2">{post.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center mt-6 grid place-items-center">
              No posts available
            </p>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600">User not found</p>
      )}
    </div>
  );
};

export default UserDetailsPage;
