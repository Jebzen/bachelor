import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useState } from "react";
import CFCardOverview from "./CFCardOverview";
import styles from "../../styles/Projekt.module.css";

export default function CFProjectBlobs({ projects }: any) {
  const [showTag, setShowTag] = useState(true);

  //console.log(projects);

  //Contentful npm package søgning for ting
  //Contentful npm package documentToReactComponents
  return (
    <>
      {projects.items &&
        projects.items.map((item: any, i: number) => {
          console.log(item);

          return item.metadata.tags.map((tag: any, i: number) => {
            return (
              <div className={styles.cardBody} key={i}>
                {/* <h3> {tag.sys.id}</h3> */}
                <CFCardOverview projekt={item} tag={tag} showTag={showTag} />
              </div>
            );
          });
        })}
    </>
  );
}

//console.log(projects);

//Contentful npm package søgning for ting
//Contentful npm package documentToReactComponents
