import React, { useState } from "react";
import { updateUserRequest } from "../services/UserService";
import { useLocation } from "react-router-dom";

const UpdateUser = ({ state }) => {
  console.log(state);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
    phone: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      image: event.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("image", formData.image);
    form.append("phone", formData.phone);

    try {
      const response = await updateUserRequest(state.id, form);

      if (response.status === 200) {
        console.log(response.data.message);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
      console.log("An error occurred while updating the user.");
    }
  };
  return (
    <div>
      <h1>Update</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            pattern="[+]{1}[0-9]{11,14}"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          required
        />
        {formData.image && (
          <div>
            <img
              className="user_img"
              src={URL.createObjectURL(formData.image)}
              alt="user"
            />
          </div>
        )}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
