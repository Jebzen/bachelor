import styles from "../styles/Projekt.module.css";
import { useEffect, useState } from "react";

const CardOverview = ({ projekt, tag, showTag }: any) => {
  //console.log(projekt);
  const { title, abstrakt, featuredImage, slug } = projekt.fields;

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
    console.log(isHovering);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    console.log(isHovering);
  };

  return (
    <div onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
      {isHovering && showTag ? (
        <h3 className={styles.tagActive}>{tag.sys.id}</h3>
      ) : null}

      <div className={styles.cardImg}>
        <img src={"https:" + featuredImage.fields.file.url}></img>
      </div>
      <div className={styles.cardText}>
        <h3>{title}</h3>

        <p className="text">{abstrakt}</p>
        <a className="read-more" href={"/projekt/" + slug}>
          Read more
        </a>
      </div>
    </div>
  );
};

export default CardOverview;
