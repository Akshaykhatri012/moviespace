import { useEffect, useState } from "react";
import { useKey } from "../useKey";
import StarRating from "../StarRating";
import Loader from "./Loader";

const KEY = "ed210c00";

//api key = ed210c00;

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(" ");

  const countRef = useState(0);
  useEffect(
    function () {
      if (userRating) countRef.current += 1;
    },
    [userRating]
  );
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId); // here we search for list of watched array with imdbID which includes selectedId i.e. they have been selected..
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  // console.log(isWatched)
  //destructuring movie array
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      // creating an obj to store data that needs to be displayed
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie); // one function is passed into another
    onCloseMovie(); // closes the box after selecting a movie
  }

  //useEffect for escaping event
  useKey("Escape", onCloseMovie);
  // useEffect(
  //   function () {
  //     function callback(e) {
  //       if (e.code === "Escape") {
  //         onCloseMovie();
  //         console.log("CLOSING");
  //       }
  //     }
  //     document.addEventListener("keydown", callback);
  //     //cleanup function
  //     return function () {
  //       document.removeEventListener("keydown", callback);
  //     }; //
  //   },
  //   [onCloseMovie]
  // );

  //another API call using useEffect()
  useEffect(
    function () {
      setIsLoading(true);
      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );
  // another useeffect() call to change doc title
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      //Clean up Code (which runs on unmount)
      return function () {
        document.title = "movieSpace";
        // console.log(`clean up effect for movie ${title}`) //due to closure react remembers the variable name of previous movie  i.e title
      };
    },
    [title]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released}&bull;{runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You have watched this movie <span>⭐</span>
                  {watchedUserRating}
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
