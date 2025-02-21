import { getAddress } from "@chopinframework/next";

export default async function ProtectedPage() {
  const address = await getAddress();

  console.log("User Address:", address); // Log the address

  if (!address) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Logged in as {address}</p>
    </div>
  );
}
