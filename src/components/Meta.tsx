import { FC } from "react";
import Head from "next/head";

type MetaProps = {
  title?: string;
  description?: string;
  keywords?: string;
};

const Meta: FC<MetaProps> = ({ title, description, keywords }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <link rel="canonical" href="http://localhost:3000" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Lusterlux",
  description: "Lusterlux is a perfect curling iron for you.",
  keywords:
    "lusterlux, hair, curling iron, hair clamp, flat iron, hairstyling, hair care, hair styling, hair tools, hair products, hair accessories, hair styling tools, hair styling products, hair styling accessories, hair styling tools and products, hair styling tools and accessories, hair styling tools and products for, curl iron, curling iron, curling iron for, curling iron for hair, curling iron for hair styling, curling iron for hair styling tools, curling iron for hair styling tools and products, curling iron for hair styling tools and accessories, curling iron for hair styling tools and products for, curling iron for hair styling tools and accessories for, curling iron for hair styling tools and products for hair, curling iron for hair styling tools and accessories for hair, curling iron for hair styling tools and products for hair styling, curling iron for hair styling tools and accessories for hair styling, curling iron for hair styling tools and products for hair styling tools",
};

export default Meta;
