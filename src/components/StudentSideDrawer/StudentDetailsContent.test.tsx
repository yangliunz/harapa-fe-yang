import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StudentDetailsContent from "./StudentDetailsContent";
import StudentDetailDto from "@/interfaces/StudentDetailDto";
import "@testing-library/jest-dom";

describe("StudentDetailsContent", () => {
  const mockDetails: StudentDetailDto = {
    name: "John Doe",
    currentUrl: "http://example.com",
    history: [
      {
        timestamp: "1627849923000",
        urls: ["http://example.com/page1", "http://example.com/page2"],
      },
    ],
    id: "",
    currentScreen: null,
  };

  it("renders student name", () => {
    render(
      <StudentDetailsContent
        details={mockDetails}
        isLoading={false}
        error={null}
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders loading component when isLoading is true", () => {
    render(
      <StudentDetailsContent
        details={mockDetails}
        isLoading={true}
        error={null}
      />
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message when error is present", () => {
    const error = new Error("Test error");
    render(
      <StudentDetailsContent
        details={mockDetails}
        isLoading={false}
        error={error}
      />
    );
    expect(screen.getByText(`Error: ${error.message}`)).toBeInTheDocument();
  });

  it("renders current URL", () => {
    render(
      <StudentDetailsContent
        details={mockDetails}
        isLoading={false}
        error={null}
      />
    );
    expect(screen.getByText("http://example.com")).toBeInTheDocument();
  });

  it("renders activity log", () => {
    render(
      <StudentDetailsContent
        details={mockDetails}
        isLoading={false}
        error={null}
      />
    );
    expect(screen.getByText("http://example.com/page1")).toBeInTheDocument();
    expect(screen.getByText("http://example.com/page2")).toBeInTheDocument();
  });

  it("renders 'No history' when history is empty", () => {
    const emptyHistoryDetails = { ...mockDetails, history: [] };
    render(
      <StudentDetailsContent
        details={emptyHistoryDetails}
        isLoading={false}
        error={null}
      />
    );
    expect(screen.getByText("No history")).toBeInTheDocument();
  });

  it("renders 'N/A' when details are not provided", () => {
    render(<StudentDetailsContent isLoading={false} error={null} />);
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });
});
