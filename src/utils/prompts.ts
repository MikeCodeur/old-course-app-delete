import { ERROR, courses } from "../commons/constants.js"

import { CourseName } from "../types/courses.js"
import { Option } from "../types/prompt.js"
import { throwError } from "./helpers.js"

export const getCoursesNames = () => {
  const coursesNames = courses.map((course) => ({
    value: course.name,
    label: course.name,
  }))
  return coursesNames
}

export const getModulesNames = (courseName: CourseName) => {
  const modules = courses
    .filter((course) => course.name.includes(courseName))
    .at(0)
  if (!modules) {
    return throwError(ERROR.COURSE_NAME_NOT_FOUND)
  }
  const modulesName = modules.modules.map((course) => ({
    value: course.name,
    label: course.name,
  }))
  return modulesName
}

export const getFirstOption = <T>(option: Option<T>[]): T => {
  const newOption = option.at(0)?.value ?? throwError(ERROR.FIRST_OPTION)
  return newOption
}

export const getModule = (courseName: string, moduleName: string) => {
  const course = courses
    .filter((course) => course.name.includes(courseName))
    .at(0)
  if (!course) {
    return throwError(ERROR.COURSE_NOT_FOUND)
  }
  const module = course.modules
    .filter((moduleCourse) => moduleCourse.name.includes(moduleName))
    .at(0)

  if (!module) {
    return throwError(ERROR.MODULE_NOT_FOUND)
  }
  return module
}
