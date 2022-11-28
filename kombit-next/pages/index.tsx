import Head from "next/head";
import FrontBanner from "../components/frontBanner";
import { IndexLayout } from "../layout";
import { useEffect, useState } from "react";

//Contenful
import { client } from "../components/contenful/main";
import { BannerType, FrontPageFields } from "../interfaces/frontpage";
import { BannerImage, BannerVideo } from "../interfaces/banner";
import NewsCards from "../components/NewsCards";
import ProjectBlobs from "../components/ProjekterBlobs";
import styles from "../styles/Projekt.module.css";
import CardOverview from "../components/CardOverview";
import Feed from "../components/Feed";

export async function getServerSideProps() {
  const response = await client.getEntry("7fW3ZHZQgTQeFORANbS6Uk");

  //Hent projekter
  const projects = await client.getEntries({
    content_type: "projekt",
    limit: 3,
  });

  //Hent nyheder
  const news = await client.getEntries({
    content_type: "nyheder",
    limit: 3,
  });
  //Put billede links og info i fields
  if (news.includes?.Asset) {
    news.items.map((item: any, i: number) => {
      item.fields.banner = news.includes.Asset.find((Asset: any) => {
        return Asset.sys.id == item?.fields?.banner?.sys?.id;
      });
      return item;
    });
  }

  return {
    props: {
      banners: response.fields.banners.map((banner: any) => {
        return {
          media: banner.fields.bannerBillede.fields.file.url,
          type: "Image",
          title: banner.fields.cta,
        } as BannerImage;
      }) as BannerImage[],
      news: news,
      projects: projects,
    },
  };
}

export default function Home({ banners, news, projects }: any) {
  //Alle props kommer ovenfra

  return (
    <>
      <Head>
        {/* <title>KOMBIT APP</title>

        <meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" /> */}
      </Head>
      <FrontBanner banners={banners} />
      <div className={styles.container}>
        <h2 id="slide">FORRETNINGSFÆLLSSKABER I KOMBIT</h2>
      </div>
      <div className={styles.CardOverviewContaier}>
        <ProjectBlobs projects={projects} />
      </div>
      <div className={styles.container}>
        <Feed />
      </div>
    </>
  );
}
