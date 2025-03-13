import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import StudentsGrid from "./index";
import StudentDto from "@/interfaces/StudentDto";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a wrapper with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("StudentsGrid", () => {
  const students: StudentDto[] = [
    { id: 1, name: "John Doe", status: "online" },
    { id: 2, name: "Jane Doe", status: "offline" },
  ];

  it("renders loading component when isLoading is true", () => {
    render(<StudentsGrid isLoading={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message when error is present", () => {
    const error = new Error("Failed to fetch students");
    render(<StudentsGrid error={error} />);
    expect(screen.getByText(`Error: ${error.message}`)).toBeInTheDocument();
  });

  it("renders students grid when students are provided", () => {
    render(<StudentsGrid students={students} />, { wrapper: createWrapper() });
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("calls onStudentClick when a student card is clicked", () => {
    const onStudentClick = vi.fn(); // Use vi instead of jest
    render(
      <StudentsGrid students={students} onStudentClick={onStudentClick} />,
      { wrapper: createWrapper() }
    );
    fireEvent.click(screen.getByText("John Doe"));
    expect(onStudentClick).toHaveBeenCalledWith(students[0]);
  });
});
