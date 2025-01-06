import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Insert Mentors
app.post("/seed/mentors", async (c) => {
  const insertedMentors = await prisma.mentor.createMany({
    data: [
      { name: "Haidar", username: "haihaidardar" },
      { name: "Ben", username: "benbanbun" },
      { name: "Raditya", username: "radwisatso" },
    ],
  });
  return c.json(insertedMentors, 201);
});

// Insert Students
app.post("/seed/students", async (c) => {
  const insertedStudents = await prisma.student.createMany({
    data: [
      { name: "Rifki", mentor_id: 1 },
      { name: "Ipung", mentor_id: 1 },
      { name: "Ijun", mentor_id: 2 },
    ],
  });
  return c.json(insertedStudents, 201);
});

// Select Mentors
app.get("/mentors", async (c) => {
  const mentors = await prisma.mentor.findMany({
    include: {
      students: true
    }
  });
  return c.json(
    {
      status: "success",
      message: "Successfully get mentors",
      data: mentors,
    },
    200
  );
});

// Update a mentor
app.patch("/mentors/:username", async (c) => {
  const name = c.req.param("username");
  const body = await c.req.json<{ name: string }>();
  const updatedMentor = await prisma.mentor.update({
    where: {
      username: name,
    },
    data: {
      name: body.name,
    },
  });
  return c.json(
    {
      status: "success",
      message: "Successfully update a mentor",
      data: updatedMentor,
    },
    200
  );
});

// Delete a mentor
app.delete("/mentors/:id", async (c) => {
  const id = +c.req.param("id");
  const deletedUser = await prisma.mentor.delete({
    where: {
      id: id,
    },
  });
  return c.json({
    status: "success",
    message: "Successfully deleted a mentor",
    data: deletedUser,
  });
});

export default app;
