module.exports = {
  mongo : {
    'dev' : {
      DB_HOST: "mongodb",
      DB_NAME: "workshops_dev_db"
    },
    'test' : {
      DB_HOST: "localhost",
      DB_NAME: "workshops_dev_db"
    },
    'prod' : {
      DB_HOST: "mongodb",
      DB_NAME: "workshops_prod_db"
    },
  }
};
