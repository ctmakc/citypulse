import AssetDetail from "@/components/screens/AssetDetail"

// Next 16 App Router: `params` is a Promise — await it in this async server
// component, then hand the resolved id to the client AssetDetail screen.
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <AssetDetail id={decodeURIComponent(id)} />
}
