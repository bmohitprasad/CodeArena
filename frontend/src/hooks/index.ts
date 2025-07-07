import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export interface TeacherClasses {
    class_id: number
    name: string
    joinCode: string
    teacherid: number
}

export interface Assignment {
    id: number,
    title: string,
    description: string,
    createdAt: string,
    classId: number,
    deadline: string
}

export interface Problems{
    id: number,
    title: string,
    content: string,
    assignmentId: number,
    expectedOutput: string
}

export interface Enrollments {
    student_id: number;
    student: {
      name: string;
      roll_num: number;
      branch: string;
    };
}  

export interface Submissions {
    id: number;
    student_id: number;
    assignmentId: number;
    isCompleted: true,
    submittedAt: string
    student: {
        name: string;
        roll_num: number;
        branch: string;
      };
}  

export interface StudentClasses {
    class_id: number;
    student_id: number;
    class: {
        class_id: number;
        name: string;
        teacher_id: number;
        joinCode: string;
        teacher: {
            name: string
        }
    };
}  

export const teacherClasses = () => {

    const [loading, setLoading] = useState(true)
    const [classes, setClasses] = useState<TeacherClasses[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/admin/classes`, {
            headers: {
                Authorization: localStorage.getItem("jwt")
            }
        })
        .then(response => {
            setLoading(false)
            setClasses(response.data)
        })
    }, [])

    return {
        loading,
        classes
    }
}

export const Assignments = ( {class_id} : {class_id: number} ) => {

    const [loading, setLoading] = useState(true)
    const [assignments, setAssignments] = useState<Assignment[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/admin/class/${class_id}/assignments`, {
            headers: {
                Authorization: localStorage.getItem("jwt")
            }
        })
        .then(response => {
            setLoading(false)
            setAssignments(response.data)
        })
    }, [])

    return {
        loading,
        assignments
    }
}

export const Problems = ({ assignment_id, refresh }: { assignment_id: number; refresh: boolean }) => {
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState<Problems[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/admin/assignment/${assignment_id}`, {
          headers: {
            Authorization: localStorage.getItem("jwt") || "",
          },
        });
        setProblems(res.data);
      } catch (error) {
        console.error("Failed to fetch problems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [assignment_id, refresh]); 
    return {
        loading,
        problems
    }
}

export const Enrolled = ({ class_id }: { class_id: number }) => {
    const [loadingStudents, setLoadingStudents] = useState(true);
    const [enrolledStudents, setEnrolledStudents] = useState<Submissions[]>([]);
  
    useEffect(() => {
      axios
        .get(`${BACKEND_URL}/api/v1/admin/class/${class_id}/enrolled`, {
          headers: {
            Authorization: localStorage.getItem("jwt") || ""
          }
        })
        .then((response) => {
          setEnrolledStudents(response.data);
          setLoadingStudents(false);
        });
    }, [class_id]);
  
    return {
      loadingStudents,
      enrolledStudents
    };
};

export const Submissions = ({ assignment_id }: { assignment_id: number }) => {
    const [loadingStudents, setLoadingStudents] = useState(true);
    const [submittedStudents, seSubmittedStudents] = useState<Enrollments[]>([]);
  
    useEffect(() => {
      axios
        .get(`${BACKEND_URL}/api/v1/admin/submissions/${assignment_id}`, {
          headers: {
            Authorization: localStorage.getItem("jwt") || ""
          }
        })
        .then((response) => {
          seSubmittedStudents(response.data);
          setLoadingStudents(false);
        });
    }, [assignment_id]);
  
    return {
      loadingStudents,
      submittedStudents
    };
};

export const studentClasses = ({ student_id }: { student_id: number }) => {
    const [loadingClasses, setLoadingClasses] = useState(true);
    const [classes, setClasses] = useState<StudentClasses[]>([]);
  
    useEffect(() => {
      axios
        .get(`${BACKEND_URL}/api/v1/student/${student_id}/classes`, {
          headers: {
            Authorization: localStorage.getItem("jwt") || ""
          }
        })
        .then((response) => {
            setClasses(response.data);
          setLoadingClasses(false);
        });
    }, [student_id]);
  
    return {
        loadingClasses,
        classes
    };
};

export const useRunCode = () => {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const runCode = async (code: string, language: string, input: string = '') => {
    setLoading(true);
    setError('');
    setOutput('');

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/code/run-code`,
        { code, language, input },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwt') || ''
          }
        }
      );

      if (response.status === 200) {
        setOutput(response.data.output);
      } else {
        setError(response.data.error || 'Something went wrong');
      }

    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return { runCode, output, loading, error };
};

export const SingleProblem = ({ problem_id }: { problem_id: number; }) => {
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState<Problems[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/student/assignment/problem/${problem_id}`, {
          headers: {
            Authorization: localStorage.getItem("jwt") || "",
          },
        });
        setProblem(res.data);
      } catch (error) {
        console.error("Failed to fetch problems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [problem_id]); 
    return {
        loading,
        problem
    }
}