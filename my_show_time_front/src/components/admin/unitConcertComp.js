import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import * as dayjs from 'dayjs';

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

function unitConcert() {
  const router = useRouter();
  const { id } = router.query;
  // console.log(id);
  const [dataUnitConcert, setUnitConcert] = useState(null);
  const [dataCategory, setCategory] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/concerts/' + id)
      .then(response => {
        setUnitConcert(response.data);
        return response.data; // Return the response data to pass it to the next `.then()` block
      })
      .then(data => {
        axios.get('http://localhost:3000/categories?_id=' + data.category_id)
          .then(response => setCategory(response.data[0]))
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }, []);
  // console.log(dataUnitConcert);
  // console.log(dataCategory);

  return (
    <div className="admin_concert">
      <Link href="/admin"><button className="btn">Back</button></Link>
      <h1 class="text-3xl font-bold">CONCERT</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
            <thead>
              <tr>
                <td><h3>CONCERT</h3></td>
                <td><h3>GENRE</h3></td>
                <td><h3>REMAINING TIME</h3></td>
                <td><h3>DATE</h3></td>
                <td><h3>LOCATION</h3></td>
                <td><h3>PRICE</h3></td>
                <td><h3>PLACES</h3></td>
                <td><h3>IMAGE</h3></td>
              </tr>
            </thead>
            <tbody>
              {dataUnitConcert && <td><b>{ dataUnitConcert.name }</b></td>}
              {dataCategory && <td>{ dataCategory.name }</td>}
              {dataUnitConcert && <td>{ dayjs().to(dayjs( dataUnitConcert.concert_date )) }</td>}
              {dataUnitConcert && <td>{ dayjs(dataUnitConcert.concert_date).format('ddd, D MMM, YYYY h:mm A') }</td>}
              {dataUnitConcert && <td>{ dataUnitConcert.location }</td>}
              {dataUnitConcert && <td>{ dataUnitConcert.price }</td>}
              {dataUnitConcert && <td>{ dataUnitConcert.place_nbr }</td>}
              {dataUnitConcert && <td><img src={dataUnitConcert.concert_img} width="100" /></td>}
            </tbody>
        </table>
      </div>
    </div>
  );
};
  
export default unitConcert;