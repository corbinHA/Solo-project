import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';
import styled from 'styled-components'
import output from './output.json'

const HomePage = () => {
  const params = useParams()
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `/api/userTransaction/`
        );
        const data = await res.json();
        console.log(data);
        setHistory(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [params]);

const Amount = styled.div`
height: 1000px;
width: 1000px;
`


    return (
      <>
        <container>
        {/* <Amount title='amountOwed' data={amountOwed} /> */}
        </container>
      </>
    )
}

export default HomePage;
