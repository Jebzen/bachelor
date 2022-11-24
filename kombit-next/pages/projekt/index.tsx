import { IndexLayout } from "../../layout";
import { client } from "../../components/contenful/main";
import CardOverview from "../../components/CardOverview";
import PageHero from "../../components/PageHero";
import { useEffect, useState } from "react";
import styles from "../../styles/Projekt.module.css";

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
export default function Projekter({ projekt, tag }: any) {
  const [tab, setTab] = useState("arbejdsmarked");
  console.log(projekt);
  console.log(tag);

  return (
    <div>
      <PageHero heading={"Projekt overblik"} />
      <div className="tabsContainer">
        <div
          className={tab == "arbejdsmarked" ? "tabLink active" : "tabLink"}
          aria-current="page"
          onClick={() => setTab("arbejdsmarked")}
        >
          ARBEJDSMARKED & BESKÆFTIGELSE
        </div>
        <div
          className={tab == "kultur" ? "tabLink active" : "tabLink"}
          onClick={() => setTab("kultur")}
        >
          BØRN, KULTUR, SOCIAL & SUNDHED
        </div>
        <div
          className={tab == "kommuner" ? "tabLink active" : "tabLink"}
          onClick={() => setTab("kommuner")}
        >
          KOMMUNERNES DATA OG INFRASTRUKTUR
        </div>
        <div
          className={tab == "teknik" ? "tabLink active" : "tabLink"}
          onClick={() => setTab("teknik")}
        >
          TEKNIK, MILJØ OG BORGERSERVICE
        </div>
        <div
          className={tab == "data" ? "tabLink active" : "tabLink"}
          onClick={() => setTab("data")}
        >
          TVÆRGÅENDE LØSNINGER OG DATA
        </div>
      </div>
      <div className={styles.CardOverviewContaier}>
        {projekt.map((pro: any, i: number) => {
          console.log(pro);
          return pro.metadata.tags.map((tag: any, i: number) => {
            if (tag.sys.id == "arbejdsmarked" && tab == "arbejdsmarked") {
              return (
                <div className={styles.cardBody}>
                  <CardOverview projekt={pro} />
                </div>
              );
            }
            if (tag.sys.id == "kultur" && tab == "kultur") {
              return (
                <div className={styles.cardBody}>
                  <CardOverview projekt={pro} />
                </div>
              );
            }
            if (tag.sys.id == "kommuner" && tab == "kommuner") {
              return (
                <div className={styles.cardBody}>
                  <CardOverview projekt={pro} />
                </div>
              );
            }
            if (tag.sys.id == "teknik" && tab == "teknik") {
              return (
                <div className={styles.cardBody}>
                  <CardOverview projekt={pro} />
                </div>
              );
            }
            if (tag.sys.id == "data" && tab == "data") {
              return (
                <div className={styles.cardBody}>
                  <CardOverview projekt={pro} />
                </div>
              );
            }
          });
        })}
      </div>
    </div>
  );
}
