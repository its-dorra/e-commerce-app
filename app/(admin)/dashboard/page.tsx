import { assertAdmin } from "@/server/lucia/utils";

export default async function Dashboard() {
  const admin = await assertAdmin();

  return <div>{JSON.stringify(admin, null, 2)}</div>;
}
