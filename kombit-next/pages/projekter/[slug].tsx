import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../../components/contenful/main";
import ProjektComponent from "../../components/ProjektComponent";
import { IndexLayout } from "../../layout";

export async function getServerSideProps(context: any) {
  const { slug } = context.query;
  const response = await client.getEntries({
    content_type: "projekt",
    "fields.slug": slug,
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
      projekt: slugged,
    },
  };
}

export default function ProjektPage({ projekt }: any) {
  //console.log(projekt);
  return (
    <>
      <Head>
        <title>{projekt.fields.title}</title>
      </Head>
      <ProjektComponent projekt={projekt} />
    </>
  );
}
