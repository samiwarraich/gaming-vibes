import { useEffect, useContext, useState } from "react";
import styles from "../styles/Guides.module.css";
import AuthContext from "../stores/authContext";

const Guides = () => {
  const { user, authReady } = useContext(AuthContext);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      fetch(
        "/.netlify/functions/guides",
        user && {
          headers: {
            Authorization: "Bearer " + user.token.access_token,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("You must be logged in to see the content");
          }
          return res.json();
        })
        .then((data) => {
          setGuides(data);
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
          setGuides(null);
        });
    }
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading...</div>}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {guides &&
        guides.map((guide) => (
          <div key={guide.title} className={styles.card}>
            <h3>{guide.title}</h3>
            <h4>written by {guide.author}</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. At
              corrupti iste ab magnam dignissimos id maxime rerum quae minima.
              Delectus maxime culpa est consequatur veritatis, perspiciatis cum
              corrupti possimus quis?
            </p>
          </div>
        ))}
    </div>
  );
};

export default Guides;
