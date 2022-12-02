import Head from "next/head";
import CFNewsComponent from "../../components/contenful/CFNewsComponent";
import { client } from "../../components/contenful/main";
import { CFEntryNyheder } from "../../interfaces/CFentry";

export async function getServerSideProps(context: any) {
  const { slug } = context.query;
  const response = await client.getEntries({
    content_type: "nyheder",
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
  content: CFEntryNyheder;
}

export default function NewsPage({ content }: prop) {
  //console.log(content);

  return (
    <>
      <Head>
        <title>{content.fields.title}</title>

        {content.fields?.abstrakt && (
          <meta name="description" content={content.fields?.abstrakt} />
        )}
      </Head>
      <CFNewsComponent content={content} />
    </>
  );
}
