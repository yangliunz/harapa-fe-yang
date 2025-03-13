import StudentDto from "@/interfaces/StudentDto";
import StudentGridCard from "@/components/StudentGridCard";
import Loading from "@/components/common/Loading";

interface StudentsGridProps {
  students?: StudentDto[];
  onStudentClick?: (student: StudentDto) => void;
  isLoading?: boolean;
  error?: Error | null;
}

const StudentsGrid = ({
  students,
  onStudentClick,
  isLoading,
  error,
}: StudentsGridProps) => {
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {students?.map((item: StudentDto) => (
        <StudentGridCard
          key={item.id}
          student={item}
          onClick={() => onStudentClick?.(item)}
        />
      ))}
    </div>
  );
};

export default StudentsGrid;
