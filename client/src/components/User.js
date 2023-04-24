import React from "react";

const User = (props) => {
  const { name, email, phone, image } = props.user;
  const imageUrl = "http://127.0.0.1:8080/public/images/users/" + image;

  return (
    <div>
      <img src={imageUrl} className="user_img" alt={name}></img>
      <h3>Name: {name}</h3>
      <p>Email: {email}</p>
      <p>Phone number: {phone}</p>
      <p>Password: ******</p>
    </div>
  );
};

export default User;
