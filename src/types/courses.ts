import { courses } from "../commons/constants.js"

export type Course = typeof courses
export type CourseName = Course[number]["name"]
export type ModuleName = Course[number]["modules"][number]["name"]
