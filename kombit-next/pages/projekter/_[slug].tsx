import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { client } from "../../components/contenful/main";
import { IndexLayout } from "../../layout";
import styles from "../../styles/Projekt.module.css";
import Image from "next/image";
import Img from "../../public/download.jpeg";

export async function getServerSideProps(context: any) {
  const { slug } = context.query;

  const response = await (
    await fetch(
      `https://cdn.contentful.com/spaces/7mkgxnbudn0o/environments/master/entries?content_type=projekt&fields.slug=${slug}`,
      {
        headers: {
          Authorization: "Bearer EcZKFhLUFp3op1UWgVR3qouQ8iwYwIDf0ZEdjygBZKA",
        },
      }
    )
  ).json();

  const content = response.items.find((item: any) => {
    return true;
  });

  if (content === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: content,
    },
  };
}
export default function ProjektPage({ content }: any) {
  console.log(content);
  const { title, beskrivelse, featuredImage, links } = content.fields;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <IndexLayout>
        <div className={styles.pageContainer}>
          <div className={styles.hero}>
            <div className={styles.insideHero}>
              <h1 className={styles.single}>{title}</h1>
              <h2>OM PROJEKTET</h2>
            </div>
          </div>
          <div className={styles.columns}>
            <div>{documentToReactComponents(beskrivelse)}</div>
            <div>
              {/* <Image
                alt={title}
                src={"https:" + featuredImage.fields.file.url}
                className={styles.columnsImg}
                width={500}
                height={500}
              /> */}
            </div>
          </div>
          <div>
            <>Card 1</>
            <>Card 2</>
            <>Card 3</>
          </div>
          <div>
            <>{links}</>
            <>Projektleder</>
          </div>
        </div>
      </IndexLayout>
    </>
  );
}
