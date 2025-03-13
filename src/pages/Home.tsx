import { useStudents } from "@/apis/students";
import StudentsGrid from "@/components/StudentsGrid";
import StudentSideDrawer from "@/components/StudentSideDrawer";
import StudentDto from "@/interfaces/StudentDto";
import React from "react";

const Home: React.FC = () => {
  const { data: students, isLoading, error } = useStudents();
  const [selectedStudent, setSelectedStudent] =
    React.useState<StudentDto | null>(null);
  const [showDrawer, setShowDrawer] = React.useState(false);

  const onClickStudent = (student: StudentDto) => {
    if (student.status === "online") {
      setSelectedStudent(student);
      setShowDrawer(true);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] ml-[calc(-50vw+50%)]">
        <div className="px-4 max-w-screen-2xl mx-auto">
          <StudentsGrid
            isLoading={isLoading}
            error={error}
            students={students || []}
            onStudentClick={onClickStudent}
          />
        </div>
      </div>
      {selectedStudent && (
        <StudentSideDrawer
          student={selectedStudent}
          isOpen={showDrawer}
          onClose={() => {
            setShowDrawer(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;
