import connection from "../config/database.js";

export function createTeacher(req, res) {
  const {
    name,
    cpf,
    date_of_birth,
    address,
    phone_number,
    category,
    email,
    password,
  } = req.body;

  connection.query(
    `INSERT INTO users
         (name, email, cpf, date_of_birth, password, address, phone_number, category) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      email,
      cpf,
      date_of_birth,
      password,
      address,
      phone_number,
      category,
    ],
    (err, results) => {
      if (err) {
        console.error("Erro ao inserir professor:", err);
        res.status(500).json({ error: "Erro ao inserir professor" });
        return;
      }
      res.status(201).json({
        message: "Usuário criado com professor",
        userId: results.insertId,
      });
    }
  );
}

export function getAllTeachers(req, res) {
  connection.query("SELECT * FROM teachers", (err, results) => {
    if (err) {
      console.error("Erro ao buscar professores:", err);
      res.status(500).json({ error: "Erro ao buscar professores" });
      return;
    }
    res.status(200).json(results);
  });
}

export function updateTeacher(req, res) {
  const teacherId = req.params.id;
  const { name, cpf, date_of_birth, phone_number, address, category } =
    req.body;

  connection.query(
    "UPDATE users SET name = ?, cpf = ?, date_of_birth = ?, phone_number = ?, address = ?, category = ? WHERE id = ?",
    [name, cpf, date_of_birth, phone_number, address, category, teacherId],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar professor:", err);
        res.status(500).json({ error: "Erro ao atualizar professor" });
        return;
      }
      res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso", results });
    }
  );
}

export function deleteTeacher(req, res) {
  const teacherId = req.params.id;
  connection.query(
    "DELETE FROM users WHERE id = ?",
    [teacherId],
    (err, results) => {
      if (err) {
        console.error("Erro ao excluir professor:", err);
        res.status(500).json({ error: "Erro ao excluir professor" });
        return;
      }
      res.status(200).json({ message: "Professor excluído com sucesso" });
    }
  );
}
