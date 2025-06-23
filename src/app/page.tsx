import CreatePostButton from "@/components/Other/Buttons/NewPost";
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
          <CreatePostButton />
        </div>
      </div>
    </div>
  );
}