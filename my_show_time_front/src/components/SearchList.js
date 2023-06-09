import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import * as dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const SearchResults = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const artistName = router.query.artist_name;
    if (artistName) {
      setSearchQuery(artistName);
      search(artistName);
    }
  }, [router.query]);

  const search = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3000/concerts/?word=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      
      {searchResults.length > 0 ? (
        <div className="home_content">
          <div className="product-container">
            {searchResults.map((result) => (
              <div key={result._id}>
                <Link
                href={{ pathname: "/unit_concert", query: { id: result._id } }}>
                  
                  <div className="product-list">
                    <div className="card bg-slate-950">

                      <div className="image">
                          <img src={result.concert_img} width={250} height={200} />
                      </div>
                      <div className="title">
                          <p>{result.name}</p>
                          <p>{result.artist_name}</p>
                      </div>
                      <div className="text-list">
                          <p className="text-l font-bold">Location: {result.location}</p>
                          <p className="text-l font-bold">{dayjs().to(dayjs(result.concert_date))}</p>
                          <p>{dayjs(result.concert_date).format("ddd, D MMM, YYYY h:mm A")}</p>
                          <p className="text-l font-bold">Price: {result.price}€</p>
                      </div>
                    </div>
                  </div>
                  
                </Link>
              </div>
            ))}
          </div>
        </div>
       
      ) : (
        <p>No results found for "{searchQuery}"</p>
      )}
    </div>
    
  );
};

export default SearchResults;
