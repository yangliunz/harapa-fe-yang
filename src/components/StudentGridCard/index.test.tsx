import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StudentDto from "@/interfaces/StudentDto";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StudentGridCard from ".";
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
const mockStudent: StudentDto = {
  id: 1,
  name: "John Doe",
  status: "online",
};
const mockOfflineStudent: StudentDto = {
  id: 2,
  name: "Jane Doe",
  status: "offline",
};

describe("StudentGridCard", () => {
  it("renders student name and status", () => {
    render(<StudentGridCard student={mockStudent} />, {
      wrapper: createWrapper(),
    });
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders offline student status", () => {
    render(<StudentGridCard student={mockOfflineStudent} />, {
      wrapper: createWrapper(),
    });
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Offline")).toBeInTheDocument();
  });
});
