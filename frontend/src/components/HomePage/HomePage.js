import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';




const HomePage = () => {
  const params = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const historyData = await fetch(
          `/api/userTransaction/`
        );
        const data = await historyData.json();
        setHistory(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [params]);

    return (
      <>
        <div>

        </div>
      </>
    )
}

export default HomePage;
