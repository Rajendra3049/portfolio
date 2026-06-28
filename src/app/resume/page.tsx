import { redirect } from "next/navigation";

export default function ResumePage() {
  const resumeFileId = "1YVn8XqmTOMYc3KYaUEXthaNggsson0LP";
  redirect(`https://drive.google.com/uc?export=download&id=${resumeFileId}`);
}
