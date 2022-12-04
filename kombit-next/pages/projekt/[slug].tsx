import Head from "next/head";
import CFProjektComponent from "../../components/contenful/CFProjektComponent";
import { client } from "../../components/contenful/main";
import { GraphCatcher } from "../../data/GraphQL";
import { CFEntryProjekt } from "../../interfaces/CFentry";
import { WPSinglePage } from "../../interfaces/WPIndexes";

export async function getServerSideProps(context: any) {
  const { slug } = context.query;
  const response = await client.getEntries({
    content_type: "projekt",
  });

  const slugged = response.items.find((item: any) => {
    console.log(item);
    return item?.fields?.slug == slug;
  });

  if (slugged === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: slugged,
    },
  };
}

interface prop {
  content: CFEntryProjekt;
}

export default function ProjektPage({ content }: prop) {
  console.log(content);
  return (
    <>
      <Head>
        <title>{content.fields.title}</title>
        <meta name="description" content={content.fields.abstrakt} />
      </Head>
      <CFProjektComponent projekt={content} />
    </>
  );
}
