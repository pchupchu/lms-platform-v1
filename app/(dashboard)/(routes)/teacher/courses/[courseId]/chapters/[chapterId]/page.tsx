interface ChapterIdProps {
   params: {
    courseId: string;
    chapterId: string;
  };
}

const ChapterIdPage =  ({ params }: ChapterIdProps) => {
  const { courseId, chapterId } = params;
   return <div>{chapterId}</div>;
  };
  
  export default ChapterIdPage;