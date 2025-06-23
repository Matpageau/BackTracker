"use client";
import { useRouter } from "next/navigation";

export default function CreatePostButton() {
  const router = useRouter();

  const handleClick = async () => {
    const res = await fetch("/api/post/create", {
      method: "POST"
    })
    
    const data = await res.json()
    if(res.ok) {
      router.push(`/publish/${data.postId}`)
    }else{
      return
    }
  }

  return (
    <button
      className="bg-[var(--main)] py-1 px-3 rounded-full mt-3 cursor-pointer transition-colors hover:bg-[var(--main-hover)]"
      onClick={handleClick}
    >
      Create a post
    </button>
  );
}
