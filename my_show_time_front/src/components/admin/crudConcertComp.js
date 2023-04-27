import React, { useState, useEffect } from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import axios from "axios";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import { Cloudinary } from "cloudinary-core";

const cloudinaryInstance = new Cloudinary({ cloud_name: "dgarygsq5" });

function CrudConcert() {
  const [name, setName] = useState("");
  const [artist_name, setArtistName] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [location, setLocation] = useState("");
  const [concert_date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [place_nbr, setPlaceNbr] = useState("");
  const [concert_img, setImage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(concert_date);
      const response = await axios.post("http://localhost:3000/concerts", {
        name,
        artist_name,
        category_id,
        location,
        concert_date,
        price,
        place_nbr,
        concert_img,
      });
      console.log(response.data);

      // handle success response
    } catch (error) {
      console.error(error);
      // handle error response
    }
    window.location.reload(false);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "grobjvxj");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          cloudinaryInstance.config().cloud_name
        }/image/upload`,
        formData
      );
      setImage(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.response.data.error);
    }
  };

  return (
    <div class="admin_crud">
      <form class="admin_crud" onSubmit={handleSubmit}>
        <h1>CRUD CONCERT</h1>
        <input
          placeholder="Concert Name"
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          placeholder="Artist Name"
          type="text"
          id="artist_name"
          value={artist_name}
          onChange={(event) => setArtistName(event.target.value)}
        />

        <select
          id="category_id"
          value={category_id}
          onChange={(event) => setCategoryId(event.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Location"
          type="text"
          id="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        ></input>

        {/* <input placeholder="Concert Date"
              type="text"
              id="concert_date"
              value={concert_date}
              onChange={(event) => setDate(event.target.value)}></input> */}

        <div>
          <br />
          <form fullWidth>
            <Datetime
              inputProps={{
                placeholder: "Concert Date & Time",
                id: "concert_date",
                value: concert_date,
              }}
              onChange={(event) => {
                setDate(new Date(event));
              }}
            />
          </form>
        </div>

        <input
          placeholder="Ticket Price"
          type="text"
          id="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        ></input>

        <input
          placeholder="Places"
          type="text"
          id="place_nbr"
          value={place_nbr}
          onChange={(event) => setPlaceNbr(event.target.value)}
        ></input>

        <input
          type="file"
          id="concert_img"
          accept="image/*"
          onChange={(event) => handleImageUpload(event)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CrudConcert;
