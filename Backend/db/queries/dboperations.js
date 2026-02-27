const pool = require("../connectionobj");
const dbobj = require("../connectionobj");

const getursers = (request, response) => {
  pool.query("select * from testtable", (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

const saveuser = (request, response) => {
  // console.log(request);
  const { name, runn, country } = request.body;
  // console.log(name, runn, country);
  pool.query(
    "insert into testtable (name, runn, country) values ($1, $2, $3)",
    [name, runn, country],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send("User added successfully");
    },
  );
};

const updateuser = (request, response) => {
  const { name, runn, country, id } = request.body;
  pool.query(
    "update testtable set name = $1, runn = $2, country = $3 where id = $4",
    [name, runn, country, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send("User updated successfully");
    },
  );
};

const deleteuser = (request, response) => {
  const { id } = request.body;
  pool.query("delete from testtable where id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).send("User deleted successfully");
  });
};

module.exports = {
  getursers,
  saveuser,
  updateuser,
  deleteuser,
};
