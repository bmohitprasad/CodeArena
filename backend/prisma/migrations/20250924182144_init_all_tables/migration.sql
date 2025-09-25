-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('STUDENT', 'TEACHER');

-- CreateTable
CREATE TABLE "public"."Student" (
    "roll_num" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "Student_pkey" PRIMARY KEY ("roll_num")
);

-- CreateTable
CREATE TABLE "public"."Teacher" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dept" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'TEACHER',

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Class" (
    "class_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "joinCode" TEXT NOT NULL,
    "teacher_id" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("class_id")
);

-- CreateTable
CREATE TABLE "public"."Enrollment" (
    "class_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("class_id","student_id")
);

-- CreateTable
CREATE TABLE "public"."Assignment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "classId" INTEGER NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Problem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "expectedOutput" TEXT NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AssignmentSubmission" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssignmentSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProblemSubmission" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "problemId" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProblemSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProblemCodeSubmission" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "problemId" INTEGER NOT NULL,
    "language" VARCHAR(64) NOT NULL,
    "code" TEXT NOT NULL,
    "stdin" TEXT,
    "stdout" TEXT,
    "stderr" TEXT,
    "verdict" VARCHAR(64),
    "runtimeMs" INTEGER,
    "memoryKb" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProblemCodeSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_roll_num_key" ON "public"."Student"("roll_num");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "public"."Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Class_joinCode_key" ON "public"."Class"("joinCode");

-- CreateIndex
CREATE INDEX "Assignment_classId_idx" ON "public"."Assignment"("classId");

-- CreateIndex
CREATE INDEX "Problem_assignmentId_idx" ON "public"."Problem"("assignmentId");

-- CreateIndex
CREATE INDEX "AssignmentSubmission_assignmentId_idx" ON "public"."AssignmentSubmission"("assignmentId");

-- CreateIndex
CREATE INDEX "AssignmentSubmission_student_id_idx" ON "public"."AssignmentSubmission"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentSubmission_student_id_assignmentId_key" ON "public"."AssignmentSubmission"("student_id", "assignmentId");

-- CreateIndex
CREATE INDEX "ProblemSubmission_assignmentId_problemId_idx" ON "public"."ProblemSubmission"("assignmentId", "problemId");

-- CreateIndex
CREATE INDEX "ProblemSubmission_student_id_assignmentId_idx" ON "public"."ProblemSubmission"("student_id", "assignmentId");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemSubmission_student_id_assignmentId_problemId_key" ON "public"."ProblemSubmission"("student_id", "assignmentId", "problemId");

-- CreateIndex
CREATE INDEX "ProblemCodeSubmission_assignmentId_problemId_idx" ON "public"."ProblemCodeSubmission"("assignmentId", "problemId");

-- CreateIndex
CREATE INDEX "ProblemCodeSubmission_student_id_assignmentId_idx" ON "public"."ProblemCodeSubmission"("student_id", "assignmentId");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemCodeSubmission_student_id_assignmentId_problemId_key" ON "public"."ProblemCodeSubmission"("student_id", "assignmentId", "problemId");

-- AddForeignKey
ALTER TABLE "public"."Class" ADD CONSTRAINT "Class_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Enrollment" ADD CONSTRAINT "Enrollment_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."Class"("class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Enrollment" ADD CONSTRAINT "Enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."Student"("roll_num") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Assignment" ADD CONSTRAINT "Assignment_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."Class"("class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Problem" ADD CONSTRAINT "Problem_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "public"."Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."Student"("roll_num") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "public"."Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProblemSubmission" ADD CONSTRAINT "ProblemSubmission_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."Student"("roll_num") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProblemSubmission" ADD CONSTRAINT "ProblemSubmission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "public"."Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProblemSubmission" ADD CONSTRAINT "ProblemSubmission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "public"."Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProblemSubmission" ADD CONSTRAINT "ProblemSubmission_student_id_assignmentId_fkey" FOREIGN KEY ("student_id", "assignmentId") REFERENCES "public"."AssignmentSubmission"("student_id", "assignmentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProblemCodeSubmission" ADD CONSTRAINT "ProblemCodeSubmission_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."Student"("roll_num") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProblemCodeSubmission" ADD CONSTRAINT "ProblemCodeSubmission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "public"."Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProblemCodeSubmission" ADD CONSTRAINT "ProblemCodeSubmission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "public"."Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
