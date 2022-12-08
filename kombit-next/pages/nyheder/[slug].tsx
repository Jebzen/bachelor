import Head from "next/head";
import CFNewsComponent from "../../components/contenful/CFNewsComponent";
import CFProjektComponent from "../../components/contenful/CFProjektComponent";
import { client } from "../../components/contenful/main";
import WPnewsComponent from "../../components/wordpress/WPnewsComponent";
import { GraphCatcher } from "../../data/GraphQL";
import { CFEntryNyheder, CFEntryProjekt } from "../../interfaces/CFentry";
import { WPSinglePage } from "../../interfaces/WPIndexes";

/* CONTENTFUL VERSION START */
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

export default function NewsPage({ content }: prop) {
	//console.log(content);
	if (!content.data?.page) return <></>;
	const { page } = content.data;

	return (
		<>
			<Head>
				<title>{page.title}</title>
				{page.excerpt && <meta name="description" content={page.excerpt} />}
			</Head>
			<WPnewsComponent content={page} />
		</>
	);
}

/* WORDPRESS VERSION END */
