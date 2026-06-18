import Content from "./content";

export async function generateMetadata({ params }) {
  const { id } = await params;

  return {
    title: "案例實績 | 奇模都市計畫顧問",
    description: `案例實績詳情 - ${id}`,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  return <Content projectId={id} />;
}
