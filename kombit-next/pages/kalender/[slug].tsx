import Head from "next/head";
import CFKalenderComponent from "../../components/contenful/CFKalenderComponent";
import { client } from "../../components/contenful/main";
import WPKalenderComponent from "../../components/wordpress/WPKalenderComponent";
import { GraphCatcher } from "../../data/GraphQL";
import { CFEntryKalender } from "../../interfaces/CFentry";
import { WPSinglePage } from "../../interfaces/WPIndexes";

/* CONTENTFUL VERSION START */
export async function getServerSideProps(context: any) {
  const { slug } = context.query;
  const response = await client.getEntries({
    content_type: "kalender",
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
  content: CFEntryKalender;
}

export default function KalenderPage({ content }: prop) {
  //console.log(content);

  return (
    <>
      <Head>
        <title>{content.fields.title}</title>

        {content.fields?.abstrakt && (
          <meta name="description" content={content.fields?.abstrakt} />
        )}
      </Head>
      <CFKalenderComponent content={content} />
    </>
  );
}
/* CONTENTFUL VERSION END */

/* WORDPRESS VERSION START */
/*
export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const json = await GraphCatcher.getSinglePage(slug);

	return {
		props: {
			content: json,
		},
	};
}

interface prop {
	content: WPSinglePage;
}

export default function KalenderPage({ content }: prop) {
	//console.log(content);
	if (!content.data?.page) return <></>;

	return (
		<>
			<Head>
				<title>{content.data.page.title}</title>
				{content.data.page.excerpt && (
					<meta name="description" content={content.data.page.excerpt} />
				)}
			</Head>
			<WPKalenderComponent content={content} />
		</>
	);
}
/* WORDPRESS VERSION END */
