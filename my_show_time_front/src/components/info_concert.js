import React, { useEffect, useState } from "react";
import axios from "axios";
import * as dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function ConcertInfo({ concert }) {
  const [placeCount, setPlaceCount] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:3000/ticket?id_concert=" + concert._id
      );
      setPlaceCount(response.data.length);
      console.log(response.data);
    }
    fetchData();
  }, [concert._id]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
  }, []);

  const remainingPlaces = concert.place_nbr - placeCount;

  return (
    <div className="product-list">
        <div className="card bg-slate-950">


          <div className="image">
            <img src={concert.concert_img} width={250} height={200} />
          </div>

          
          <div className="title">
            <h1 className="text-3xl font-bold">{concert.name}</h1>
            <h2 className="text-xl font-bold">{concert.artist_name}</h2>
          </div>

          <div className="text-list">
            <p className="text-l font-bold">Location: {concert.location}</p>
            <p>{dayjs().to(dayjs(concert.concert_date))}</p>
            <p className="text-l font-bold">{dayjs(concert.concert_date).format("ddd, D MMM, YYYY h:mm A")}</p>
            {categories &&
            categories.map((item) => {
            if (item._id === concert.category_id) {
              return <p key={item._id}>Genre: {item.name}</p>;
            }
            return null;
            })}
            {placeCount !== null && <h3>Remaining places: {remainingPlaces}</h3>}
            <h3 className="text-2xl font-bold">{concert.price}€</h3>
          </div>

        </div>
    </div>
  );
}

export default ConcertInfo;
