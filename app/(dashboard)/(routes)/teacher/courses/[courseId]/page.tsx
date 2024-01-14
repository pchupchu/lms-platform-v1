interface CourseIdProps {
  params: {
    courseId: string;
  };
}

const CourseIdPage = ({ params }: CourseIdProps) => {
  const { courseId } = params;

  return <div>{courseId}</div>;
};

export default CourseIdPage;
