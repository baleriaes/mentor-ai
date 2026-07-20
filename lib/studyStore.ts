export interface StudySession {
  filename: string;
  text: string;
  uploadedAt: string;
}

let currentSession: StudySession | null = null;

export function setStudySession(session: StudySession) {
  currentSession = session;

  if (typeof window !== "undefined") {
    localStorage.setItem("mentorai-study-session", JSON.stringify(session));
  }
}

export function getStudySession(): StudySession | null {
  if (currentSession) return currentSession;

  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem("mentorai-study-session");

  if (!saved) return null;

  currentSession = JSON.parse(saved);

  return currentSession;
}

export function clearStudySession() {
  currentSession = null;

  if (typeof window !== "undefined") {
    localStorage.removeItem("mentorai-study-session");
  }
}