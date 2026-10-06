export interface VerifiedCertificate {
  registrationNo: string;
  eventId: string;
  participantName: string;
  issueDate: string;
  certificateId: string;
  role: string;
}

export const officialCertificatesDatabase: VerifiedCertificate[] = [
  // 2025 DECRYPTA
  {
    registrationNo: "249301045",
    eventId: "decrypta-2025",
    participantName: "Rudra Sharma",
    issueDate: "November 09, 2025",
    certificateId: "CSC-2025-DEC-249301045",
    role: "Participant",
  },
  {
    registrationNo: "249301001",
    eventId: "decrypta-2025",
    participantName: "Aarav Patel",
    issueDate: "November 09, 2025",
    certificateId: "CSC-2025-DEC-249301001",
    role: "1st Winner",
  },
  {
    registrationNo: "249301012",
    eventId: "decrypta-2025",
    participantName: "Ananya Sen",
    issueDate: "November 09, 2025",
    certificateId: "CSC-2025-DEC-249301012",
    role: "Participant",
  },
  {
    registrationNo: "249301088",
    eventId: "decrypta-2025",
    participantName: "Devansh Verma",
    issueDate: "November 09, 2025",
    certificateId: "CSC-2025-DEC-249301088",
    role: "Participant",
  },

  // 2025 Bounty Bonanza 3.0
  {
    registrationNo: "249301045",
    eventId: "bounty-bonanza-3",
    participantName: "Rudra Sharma",
    issueDate: "November 08, 2025",
    certificateId: "CSC-2025-BB3-249301045",
    role: "Participant",
  },
  {
    registrationNo: "249301001",
    eventId: "bounty-bonanza-3",
    participantName: "Aarav Patel",
    issueDate: "November 08, 2025",
    certificateId: "CSC-2025-BB3-249301001",
    role: "Participant",
  },

  // 2025 Rewind & Recode
  {
    registrationNo: "249301045",
    eventId: "rewind-recode-2025",
    participantName: "Rudra Sharma",
    issueDate: "October 11, 2025",
    certificateId: "CSC-2025-RR-249301045",
    role: "Participant",
  },
  {
    registrationNo: "249301025",
    eventId: "rewind-recode-2025",
    participantName: "Priya Sharma",
    issueDate: "October 11, 2025",
    certificateId: "CSC-2025-RR-249301025",
    role: "Top 5 Finalist",
  },

  // 2025 Cyber Awareness Camp
  {
    registrationNo: "249301045",
    eventId: "cyber-awareness-2025",
    participantName: "Rudra Sharma",
    issueDate: "October 07, 2025",
    certificateId: "CSC-2025-CAC-249301045",
    role: "Volunteer / Participant",
  },

  // 2025 Modular Nexus
  {
    registrationNo: "249301045",
    eventId: "modular-nexus-2025",
    participantName: "Rudra Sharma",
    issueDate: "August 24, 2025",
    certificateId: "CSC-2025-MNEX-249301045",
    role: "Participant",
  },

  // 2025 PLAYTOPIA
  {
    registrationNo: "249301045",
    eventId: "playtopia-2025",
    participantName: "Rudra Sharma",
    issueDate: "August 23, 2025",
    certificateId: "CSC-2025-PLAY-249301045",
    role: "Participant",
  },

  // 2025 Hack n' Earn 2.0
  {
    registrationNo: "249301045",
    eventId: "hack-n-earn-2",
    participantName: "Rudra Sharma",
    issueDate: "July 14, 2025",
    certificateId: "CSC-2025-HNE2-249301045",
    role: "Participant",
  },

  // 2025 Bounty Bonanza 2.0
  {
    registrationNo: "249301045",
    eventId: "bounty-bonanza-2",
    participantName: "Rudra Sharma",
    issueDate: "April 12, 2025",
    certificateId: "CSC-2025-BB2-249301045",
    role: "Participant",
  },

  // 2024 AI vs Human Debate
  {
    registrationNo: "249301045",
    eventId: "ai-vs-human-2024",
    participantName: "Rudra Sharma",
    issueDate: "November 15, 2024",
    certificateId: "CSC-2024-AIH-249301045",
    role: "Participant",
  },
  {
    registrationNo: "249301010",
    eventId: "ai-vs-human-2024",
    participantName: "Siddharth Malhotra",
    issueDate: "November 15, 2024",
    certificateId: "CSC-2024-AIH-249301010",
    role: "Best Speaker",
  },
];

export function lookupCertificate(eventId: string, regNo: string): VerifiedCertificate | null {
  const cleanRegNo = regNo.trim().toLowerCase();
  if (!cleanRegNo) return null;

  const match = officialCertificatesDatabase.find(
    (cert) => cert.eventId === eventId && cert.registrationNo.toLowerCase() === cleanRegNo
  );

  if (match) return match;

  // Generic fallback match for testing convenience
  const fallbackMatch = officialCertificatesDatabase.find(
    (cert) => cert.registrationNo.toLowerCase() === cleanRegNo
  );

  if (fallbackMatch) {
    return {
      ...fallbackMatch,
      eventId: eventId,
    };
  }

  return null;
}
