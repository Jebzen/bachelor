import Head from "next/head";
import CFInfoComponent from "../../components/contenful/CFInfoComponent";
import { client } from "../../components/contenful/main";
import { CFEntryIndhold } from "../../interfaces/CFentry";

export async function getServerSideProps(context: any) {
  const { slug } = context.query;
  const response = await client.getEntries({
    content_type: "infoside",
  });

  const slugged = response.items.find((item: any) => {
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
  content: CFEntryIndhold;
}

export default function InfoPage({ content }: prop) {
  //console.log(content);

  return (
    <>
      <Head>
        <title>{content.fields.title}</title>

        {content.fields?.abstrakt && (
          <meta name="description" content={content.fields?.abstrakt} />
        )}
      </Head>
      <CFInfoComponent content={content} />
    </>
  );
}
