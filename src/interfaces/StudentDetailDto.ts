interface StudentDetailDto {
  id: string;
  name: string;
  currentUrl: string | null;
  currentScreen: string | null;
  history: Array<{
    timestamp: string;
    urls: string[];
  }>;
}

export default StudentDetailDto;
