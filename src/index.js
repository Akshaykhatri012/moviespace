import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./StarRating";
// import Expander from "./expander";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
//       <p>This movie is rated {movieRating} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
    maxRating={5}
    messages={["Terrible", "Bad", "Average", "Good", "Amazing"]}
    /> */}

    {/* Reusability as consumer can change things acc. to his own comfort without even entering in real code...  */}
    {/* <StarRating maxRating={5} color="red" defaultRating={3} />
    <Test /> */}
  </React.StrictMode>
);
