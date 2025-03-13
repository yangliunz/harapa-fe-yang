import { useStudentDetails } from "@/apis/students";
import StudentDto from "@/interfaces/StudentDto";
import Loading from "../common/Loading";
import { PLACE_HOLDER_IMG } from "@/constants";

const StudentGridCard = ({
  student,
  onClick,
}: {
  student: StudentDto;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const {
    data: details,
    isLoading,
    error,
  } = useStudentDetails(student.id, student.status === "online");
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md p-4 rounded-lg w-full overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
    >
      <h3 className="font-semibold text-md mb-2 text-left">{student.name}</h3>

      <div className="flex-grow relative aspect-video rounded-lg overflow-clip">
        {student.status === "offline" && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Offline</span>
          </div>
        )}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Loading />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Error</span>
          </div>
        )}
        {details && student.status === "online" && (
          <img
            src={details.currentScreen ?? PLACE_HOLDER_IMG}
            alt={student.name}
            className="object-cover w-full h-full"
          />
        )}
      </div>
    </div>
  );
};

export default StudentGridCard;
