import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const App = () => {
  const [posts, setposts] = useState([]);

  const [page, setpage] = useState(1);
  const prevHandler = () => {
    if (page >= 1) {
      setpage(page - 1);
      getPosts();
    }
  };
  const nextHandler = () => {
    setpage(page + 1);
    getPosts();
  };

  const getPosts = async () => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_limit=15&_page=${page}`
      );
      setposts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  let renderpost = <h2>Loading...</h2>;
  if (posts.length > 0) {
    renderpost = posts.map((post) => (
      <div className="alert alert-dark m-3" key={post.id}>
        <h2> "Id" : {post.id}</h2>
        <h3 className="text-capitalize"> "Title" : {post.title}</h3>
        <h4> "ThumbnailUrl" : {post.thumbnailUrl}</h4>
        <h2> "Url" : {post.url}</h2>
        <h5>
          {" "}
          <Link className="btn btn-dark " to={`/photos/${post.id}`}>
            Info
          </Link>{" "}
        </h5>
      </div>
    ));
  }

  return (
    <div className="container-fluid bg-dark text-white">
      <nav className="d-flex justify-content-between align-items-center bg-gradient px-3">
        <strong className="fs-2">GET_APIs</strong>
        <span><img src="/images/apilogo.png" alt="apilogo" width="100" height="70" /></span>
        <ul className="d-flex gap-3 list-unstyled text-capitalize ">
          <li>google</li>
          <li>facebook</li>
          <li>youtube</li>
        </ul>
      </nav>

      <div className="px-3">
        <button className="btn btn-primary" onClick={getPosts}>
          Get_Apis
        </button>
      </div>
      <hr />

      <div className="border p-3">{renderpost}</div>
      <hr />
      <div className="text-center ">
        <button
          className="btn btn-primary my-3 mx-2 text-capitalize"
          onClick={prevHandler}
        >
          Prev
        </button>
        <button
          className="btn btn-primary my-3 mx-2 text-capitalize"
          onClick={nextHandler}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
