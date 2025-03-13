import { useEffect, useRef } from "react";
import StudentDto from "@/interfaces/StudentDto";
import { useStudentDetails } from "@/apis/students";
import StudentDetailsContent from "./StudentDetailsContent";

interface StudentSideDrawerProps {
  student: StudentDto;
  isOpen: boolean;
  onClose: () => void;
}

const StudentSideDrawer = ({
  student,
  isOpen,
  onClose,
}: StudentSideDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  const { data: details, isLoading, error } = useStudentDetails(student.id);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 bottom-0 w-4/5 md:w-1/2 lg:w-[300px] bg-white shadow-lg p-4 z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close drawer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <StudentDetailsContent
          details={details}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </>
  );
};

export default StudentSideDrawer;
