import connection from "../config/database.js";

export function createCourse(req, res) {
  const { name, instruments_availiable, class_durability, modality } = req.body;

  connection.query(
    `INSERT INTO courses
           (name, instruments_availiable, class_durability, modality) 
           VALUES (?, ?, ?, ?)`,
    [name, instruments_availiable, class_durability, modality],
    (err, results) => {
      if (err) {
        console.error("Erro ao inserir curso:", err);
        res.status(500).json({ error: "Erro ao inserir curso" });
        return;
      }
      res.status(201).json({
        message: "Curso criado com sucesso",
        courseId: results.insertId,
      });
    }
  );
}

export function getAllCourses(req, res) {
  connection.query("SELECT * FROM courses", (err, results) => {
    if (err) {
      console.error("Erro ao buscar cursos:", err);
      res.status(500).json({ error: "Erro ao buscar cursos" });
      return;
    }
    res.status(200).json(results);
  });
}

export function updateCourse(req, res) {
  const courseId = req.params.id;
  const { name, instruments_availiable, class_durability, modality } = req.body;

  connection.query(
    "UPDATE courses SET name = ?, instruments_availiable = ?, class_durability = ?, modality = ? WHERE id = ?",
    [name, instruments_availiable, class_durability, modality, courseId],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar curso:", err);
        res.status(500).json({ error: "Erro ao atualizar curso" });
        return;
      }
      res
        .status(200)
        .json({ message: "Curso atualizado com sucesso", results });
    }
  );
}

export function deleteCourse(req, res) {
  const courseId = req.params.id;
  connection.query(
    "DELETE FROM courses WHERE id = ?",
    [courseId],
    (err, results) => {
      if (err) {
        console.error("Erro ao excluir curso:", err);
        res.status(500).json({ error: "Erro ao excluir curso" });
        return;
      }
      res.status(200).json({ message: "Curso excluído com sucesso" });
    }
  );
}
