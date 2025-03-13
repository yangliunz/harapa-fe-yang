import { API_BASE_URL } from "@/constants";
import StudentDetailDto from "@/interfaces/StudentDetailDto";
import StudentDto from "@/interfaces/StudentDto";
import { useQuery } from "@tanstack/react-query";
export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: async (): Promise<StudentDto[]> => {
      const response = await fetch(`${API_BASE_URL}/students`);
      return response.json();
    },
  });
};

export const useStudentDetails = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: async (): Promise<StudentDetailDto> => {
      const response = await fetch(`${API_BASE_URL}/students/${id}`);
      return response.json();
    },
    enabled,
  });
};
