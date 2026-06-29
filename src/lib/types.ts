import type { ObjectId } from "mongodb";

export type UserRole = "member" | "admin";

export interface User {
  _id: ObjectId;
  username: string;
  passwordHash: string;
  role: UserRole;
  name?: string;
  email?: string;
  createdAt: Date;
}

export type SurveyType = "baseline" | "ondemand";
export type SurveyStatus = "scheduled" | "processing" | "completed";

export interface Survey {
  _id: ObjectId;
  userId: ObjectId;
  surveyNumber: string;
  propertyAddress: string;
  zip: string;
  type: SurveyType;
  status: SurveyStatus;
  capturedAt?: Date;
  notes?: string;
  createdAt: Date;
}

export interface Footage {
  _id: ObjectId;
  surveyId: ObjectId;
  title: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

export interface SessionPayload {
  userId: string;
  username: string;
  role: UserRole;
}
