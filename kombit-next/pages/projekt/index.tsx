import PageHero from "../../components/general/PageHero";
import { useState } from "react";
import styles from "../../styles/Projekt.module.css";
import { GraphCatcher } from "../../data/GraphQL";
import { WPAllPages } from "../../interfaces/WPIndexes";
import { client } from "../../components/contenful/main";
import { CFEntryProjekt } from "../../interfaces/CFentry";
import CFCardOverview from "../../components/contenful/CFCardOverview";

export async function getServerSideProps() {
  const response = await client.getEntries({
    content_type: "projekt",
  });

  return {
    props: {
      projekt: response.items,
    },
  };
}

interface prop {
  projekt: CFEntryProjekt[];
}

export default function Projekter({ projekt }: prop) {
  //console.log(projekt);
  //console.log(tag);

  const tags: any[] = [];
  projekt
    .map((projekt, i: number) => {
      return projekt.metadata.tags.map((tag: any) => {
        return {
          name: tag.sys.id.toUpperCase(),
          slug: tag.sys.id,
        };
      });
    })
    .flat(1)
    .filter((item) => {
      const isDuplicate = tags.find((tag) => {
        return tag.slug == item.slug;
      });
      if (!isDuplicate) {
        tags.push(item);
        return true;
      }
      return false;
    });
  console.log(tags);

  const [tab, setTab] = useState(tags[0].slug);

  return (
    <div>
      <PageHero heading={"Projekt overblik"} />
      <div className="tabsContainer">
        {tags.map((tag, i) => {
          return (
            <div
              className={
                tab == tag.slug
                  ? "tabLink active text-uppercase"
                  : "tabLink text-uppercase"
              }
              aria-current="page"
              onClick={() => setTab(tag.slug)}
              key={i}
            >
              {tag.name}
            </div>
          );
        })}
        <div
          className={
            tab == "other"
              ? "tabLink active text-uppercase"
              : "tabLink text-uppercase"
          }
          aria-current="page"
          onClick={() => setTab("other")}
        >
          Ukategoriseret
        </div>
      </div>
      <div className={styles.CardOverviewContaier}>
        {projekt.map((node, i) => {
          //console.log(node);
          let tag: any;
          if (
            node.metadata.tags.find((node: any) => {
              if (node.sys.id == tab) {
                tag = node;
                return node.sys.id == tab;
              }
            })
          ) {
            return (
              <div className={styles.cardBody} key={i}>
                <CFCardOverview projekt={node} tag={tag} showTag={true} />
              </div>
            );
          } else if (node.metadata.tags.length == 0 && tab == "other") {
            return (
              <div className={styles.cardBody} key={i}>
                <CFCardOverview projekt={node} tag={tag} showTag={false} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
