import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChapterIdPageProps {
   params: {
    courseId: string;
    chapterId: string;
  };
}

const ChapterIdPage = async ({ params }: ChapterIdPageProps) => {
  const { courseId, chapterId } = params;

  const { userId } = auth();

   return <div>{chapterId}</div>;
  };
  
  export default ChapterIdPage;