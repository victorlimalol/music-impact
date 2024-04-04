import connection from "../config/database.js";

export function createStudent(req, res) {
  const { name, cpf, date_of_birth, phone_number, address } = req.body;

  connection.query(
    `INSERT INTO students
           (name, cpf, date_of_birth, phone_number, address) 
           VALUES (?, ?, ?, ?, ?)`,
    [name, cpf, date_of_birth, phone_number, address],
    (err, results) => {
      if (err) {
        console.error("Erro ao inserir aluno:", err);
        res.status(500).json({ error: "Erro ao inserir aluno" });
        return;
      }
      res.status(201).json({
        message: "Aluno criado com sucesso",
        studentId: results.insertId,
      });
    }
  );
}

export function getAllStudents(req, res) {
  connection.query("SELECT * FROM students", (err, results) => {
    if (err) {
      console.error("Erro ao buscar alunos:", err);
      res.status(500).json({ error: "Erro ao buscar alunos" });
      return;
    }
    res.status(200).json(results);
  });
}

export function updateStudent(req, res) {
  const studentId = req.params.id;
  const { name, cpf, date_of_birth, phone_number, address } = req.body;

  connection.query(
    "UPDATE students SET name = ?, cpf = ?, date_of_birth = ?, phone_number = ?, address = ? WHERE id = ?",
    [name, cpf, date_of_birth, phone_number, address, studentId],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar aluno:", err);
        res.status(500).json({ error: "Erro ao atualizar aluno" });
        return;
      }
      res
        .status(200)
        .json({ message: "Aluno atualizado com sucesso", results });
    }
  );
}

export function deleteStudent(req, res) {
  const studentId = req.params.id;
  connection.query(
    "DELETE FROM students WHERE id = ?",
    [studentId],
    (err, results) => {
      if (err) {
        console.error("Erro ao excluir aluno:", err);
        res.status(500).json({ error: "Erro ao excluir aluno" });
        return;
      }
      res.status(200).json({ message: "Aluno excluído com sucesso" });
    }
  );
}
