export type Course = {
  code: string
  title: string
  unit: number
  level: string
  semester: 'First' | 'Second'
}

export const allCourses: Course[] = [
  // FIRST SEMESTER 100L
  { code: 'GNS101', title: 'Use of English I', unit: 2, level: '100L', semester: 'First' },
  { code: 'GNS103', title: 'Nigerian People and Culture', unit: 2, level: '100L', semester: 'First' },
  { code: 'MTH101', title: 'General Mathematics I', unit: 3, level: '100L', semester: 'First' },
  { code: 'PHY101', title: 'General Physics I', unit: 3, level: '100L', semester: 'First' },
  { code: 'CHM101', title: 'General Chemistry I', unit: 3, level: '100L', semester: 'First' },
  { code: 'CSC101', title: 'Introduction to Computer Science', unit: 2, level: '100L', semester: 'First' },
  
  // SECOND SEMESTER 100L  
  { code: 'GNS102', title: 'Use of English II', unit: 2, level: '100L', semester: 'Second' },
  { code: 'GNS104', title: 'History and Philosophy of Science', unit: 2, level: '100L', semester: 'Second' },
  { code: 'MTH102', title: 'General Mathematics II', unit: 3, level: '100L', semester: 'Second' },
  { code: 'PHY102', title: 'General Physics II', unit: 3, level: '100L', semester: 'Second' },
  { code: 'CHM102', title: 'General Chemistry II', unit: 3, level: '100L', semester: 'Second' },
  { code: 'CSC102', title: 'Computer Programming I', unit: 2, level: '100L', semester: 'Second' },
]