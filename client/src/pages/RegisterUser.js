import React, { useState } from "react";
import { toast } from "react-toastify";
import { createUserRequest } from "../services/UserService";

const CreateUser = () => {
  //  name, email, password, phone, image

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = new FormData();
      newUser.append("name", name);
      newUser.append("email", email);
      newUser.append("password", password);
      newUser.append("phone", phone);
      newUser.append("image", image);

      const response = await createUserRequest(newUser);
      toast(response.message);
      console.log(response.message);

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setImage("");
    } catch (error) {
      toast(error.response.data.error.message);
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
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
            value={phone}
            onChange={handlePhoneChange}
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
        {image && (
          <div>
            <img
              className="user_img"
              src={URL.createObjectURL(image)}
              alt="user"
            />
          </div>
        )}
        <button type="submit">REGISTER</button>
      </form>
    </div>
  );
};

export default CreateUser;
