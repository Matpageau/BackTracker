import ProfileLinkComp from "@/components/ProfileLinkComp/ProfileLinkComp";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function Home() {
  const user = await getCurrentUser()

  if(!user) return

  return (
    <div className="flex w-full">
      <div className="flex justify-center w-full mt-6">
        <div className="w-3/5">
          <p>a</p>
        </div>
        <div className="w-1/5 mt-5">
          <ProfileLinkComp user={user}/>
          <button className="bg-[var(--main)] py-1 px-3 rounded-full mt-3 cursor-pointer transition-colors hover:bg-[var(--main-hover)]">Create a post</button>
        </div>
      </div>
    </div>
  );
}