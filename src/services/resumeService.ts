// src/services/resumeService.ts

export async function uploadResume(file: File): Promise<{ success: boolean, parsedData?: any, error?: string }> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:8000/upload_resume", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, parsedData: data.parsed_resume };
    } else {
      return { success: false, error: data.error || "Upload failed." };
    }
  } catch (error: any) {
    return { success: false, error: error.message || "Network error." };
  }
}
