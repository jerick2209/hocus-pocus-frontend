import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserIdFromLocalStorage } from "../util/getUserId";
import EditAdForm from "../components/ads/EditAdForm";

const API_ENDPOINT = "https://hocus-pocus-backend.onrender.comads/by/";

const Profile = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showNewAdForm, setShowNewAdForm] = useState(false);
  const [newAd, setNewAd] = useState({
    title: "",
    description: "",
  });
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userId = getUserIdFromLocalStorage();
        const response = await axios.get(`${API_ENDPOINT}${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    const fetchUserData = async () => {
      try {
        const userId = getUserIdFromLocalStorage();
        const response = await axios.get(
          `https://hocus-pocus-backend.onrender.com/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchUserData();
  }, [token]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      // Make a request to update user information on the backend
      await axios.put(`https://hocus-pocus-backend.onrender.com/users/${user.id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local state and exit edit mode
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleNewAdInputChange = (e) => {
    setNewAd({
      ...newAd,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewAdSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to create a new ad on the backend
      await axios.post("https://hocus-pocus-backend.onrender.com/ads/new", newAd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh the list of products after creating a new ad
      const userId = getUserIdFromLocalStorage();
      const response = await axios.get(`${API_ENDPOINT}${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);
      setShowNewAdForm(false);
    } catch (error) {
      console.error("Error creating new ad:", error);
    }
  };

  const handleDisableActivate = async (adId, isDisabled) => {
    try {
      // Make a request to disable/activate the ad on the backend
      if (isDisabled) {
        await axios.put(
          `https://hocus-pocus-backend.onrender.com/ads/disable/${adId}`,
          { disabled: isDisabled },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.put(
          `https://hocus-pocus-backend.onrender.com/ads/enable/${adId}`,
          { disabled: isDisabled },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Refresh the list of products after disabling/activating
      const userId = getUserIdFromLocalStorage();
      const response = await axios.get(`${API_ENDPOINT}${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);
    } catch (error) {
      console.error("Error disabling/activating ad:", error);
    }
  };

  const [editAdId, setEditAdId] = useState(null);

  const handleEdit = (adId) => {
    setEditAdId(adId);
  };

  const handleCancelEdit = () => {
    setEditAdId(null);
  };

  const handleSaveEdit = async (editedAd) => {
    try {
      // Make a request to edit the ad on the backend
      await axios.put(
        `https://hocus-pocus-backend.onrender.com/ads/edit/${editedAd.id}`,
        editedAd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh the list of products after editing
      const userId = getUserIdFromLocalStorage();
      const response = await axios.get(`${API_ENDPOINT}${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);
      setEditAdId(null);
    } catch (error) {
      console.error("Error editing ad:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (deleteConfirmation !== user.email) {
        setDeleteError("Email confirmation does not match.");
        return;
      }

      // Make a request to delete the user account on the backend
      await axios.delete(`https://hocus-pocus-backend.onrender.com/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Redirect or perform any necessary actions after account deletion
      // For example, you can redirect to the sign-out page or clear local storage
      localStorage.removeItem("token");
      setToken(null);

      // You can also redirect to a different page if needed
      // window.location = "/sign-out";
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Your Profile</h2>

          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          {isEditing && (
            <div>
              <label>
                <strong>New Password:</strong>
                <input
                  type="password"
                  name="password"
                  value={user.password || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </label>
            </div>
          )}
          <button className="btn btn-primary m-2" onClick={handleEditToggle}>
            {isEditing ? "Cancel" : "Change password"}
          </button>
          {isEditing && (
            <button
              className="btn btn-primary pl-2"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          )}

          {/* Delete Account Section */}
          <div className="mt-4">
            <h4>Delete Account</h4>
            <p>
              To delete your account, enter your email for confirmation.
            </p>
            <label>
              <strong>Email Confirmation:</strong>
              <input
                type="email"
                name="deleteConfirmation"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="form-control"
              />
            </label>
            {deleteError && (
              <p className="text-danger">{deleteError}</p>
            )}
            <button
              className="btn btn-danger mt-2"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        </div>
      )}

      <h2 className="d-flex py-3">Your Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {products.map((product) => (
            <div key={product.id} className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  {/* Add more details as needed */}

                  {/* Disable/Activate Button */}
                  <button
                    className={`btn ${
                      product.disabled ? "btn-danger" : "btn-success"
                    }`}
                    onClick={() =>
                      handleDisableActivate(product.id, !product.disabled)
                    }
                  >
                    {product.disabled ? "Activate" : "Disable"}
                  </button>

                  {/* Edit Button */}
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
          {editAdId && (
            <EditAdForm
              ad={products.find((product) => product.id === editAdId)}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          )}
        </div>
      )}
      <div>
        <button
          className="btn btn-primary"
          onClick={() => setShowNewAdForm(true)}
        >
          Create new ad!
        </button>
      </div>
      {showNewAdForm && (
        <form onSubmit={handleNewAdSubmit}>
          <div className="mb-3 py-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newAd.title}
              onChange={handleNewAdInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              id="description"
              className="form-control"
              name="description"
              value={newAd.description}
              onChange={handleNewAdInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
