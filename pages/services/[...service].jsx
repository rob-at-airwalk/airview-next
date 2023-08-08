import React from "react";
import { siteConfig } from "../../site.config.js";
import { mdComponents } from "../../constants/mdxProvider";
import { parse } from "toml";
import { MDXProvider } from "@mdx-js/react";
import { getAllFiles, getFileContent } from "@/lib/github";
import { usePageContent } from "@/lib/hooks";
import { getMenuStructure } from "@/lib/content";
import { ContentPage } from "@/components/content";
import { FullHeaderMenu, ControlsMenu } from '@/components/dashboard/Menus'
import { ServicesHeader } from '@/components/dashboard/Headers'


import { ServicesView } from "@/components/services";

import { FullScreenSpinner } from "@/components/dashboard/index.js";
import { dirname, basename } from "path";
// import { getMenuStructureProviderServices } from '@/lib/content/menus';

export default function Page({
  content: initialContent,
  file: initialFile,
  menuStructure: initialMenuStructure,
  collection,
  controls
}) {

  const {
    pageContent,
    contentSource,
    menuStructure,
    handleContentChange,
    handlePageReset,
    context,
    content,
  } = usePageContent(initialContent, initialFile, initialMenuStructure, collection);

  return (
    <ContentPage
      pageContent={pageContent}
      file={initialFile}
      content={content}
      menuStructure={menuStructure}
      handleContentChange={handleContentChange}
      handlePageReset={handlePageReset}
      collection={collection}
      context={context}
      menuComponent={FullHeaderMenu}
      contentSource={contentSource}
      headerComponent={(props) => <ServicesHeader {...props} extraData={controls} />}
      sideComponent={(props) => <ControlsMenu {...props} controls={controls} />}
    />

  )

}

export async function getServerSideProps(context) {
  // // // console.log(context.params.service)

  const file = "services/" + context.params.service.join("/");
  let pageContent = "";
  if (!file.endsWith(".etherpad")) {
    pageContent = await getFileContent(
      siteConfig.content.services.owner,
      siteConfig.content.services.repo,
      siteConfig.content.services.branch,
      file
    );
  }

  const pageContentText = pageContent
    ? Buffer.from(pageContent).toString("utf-8")
    : "";

  const menuPromise = getMenuStructure(
    siteConfig,
    siteConfig.content.providers
  );
  const menuStructure = await menuPromise;

  // controls
  const controlLocation =
    siteConfig.content.services.path +
    "/" +
    dirname(context.params.service.join("/"));
  const controlFiles = await getAllFiles(
    siteConfig.content.services.owner,
    siteConfig.content.services.repo,
    siteConfig.content.services.branch,
    controlLocation,
    true,
    ".toml"
  );
  const controlContent = controlFiles.map(async (file) => {
    const content = await getFileContent(
      siteConfig.content.services.owner,
      siteConfig.content.services.repo,
      siteConfig.content.services.branch,
      file
    );
    return { data: parse(content), file: file };
  });

  return {
    props: {
      content: pageContentText || null,
      file: file,
      menuStructure: menuStructure || null,
      collection: siteConfig.content.services,
      controls: await Promise.all(controlContent),
    },
  };
}
