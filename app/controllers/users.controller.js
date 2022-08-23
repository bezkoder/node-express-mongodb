const db = require("../models");
const User = db.users;
const Words = db.words;


// Create and Save a new User
exports.create = (req, res) => {
  delete req.body._id;
  // Validate request
  // if (!req.body.login || !req.body.password) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

  // Create a User
  const users = new User({
    login: req.body.login,
    email: req.body.email,
    password: req.body.password,
    published: req.body.published ? req.body.published : false
  });

  // Save User in the database
  users
    .save(users)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const theuser = req.query.email;
  var condition = theuser ? { theuser: { $regex: new RegExp(theuser), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      console.log("Users");
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};


exports.markedfav = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  const word= req.body.word; 
  console.log(word)

  let favwords = new Array();

  // const user = new User(); 
  User.findById(id).then(data => {
    favwords = data.words;
    favwords.push(word);
    console.log("tab"+ favwords)

    req.body.words = favwords;
    User.findByIdAndUpdate(id, {words: favwords}, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
  })  
};


exports.movetofav = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  const word= req.body.word
  let favwords = new Array();

  // const user = new User(); 
  User.findById(id).then(data => {
    favwords = data.words;
    let index = favwords.indexOf(word);
    favwords.splice(index);
    req.body.words = favwords;
    console.log("untab"+ favwords)

    User.findByIdAndUpdate(id, {words: favwords}, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
  })
  

  
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

// Find all published Users
exports.findAllPublished = (req, res) => {
  User.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a single User with an id
exports.findAllFav = async (req, res) => {
  const id = req.params.id;
  
  const favs = [
    {
      _id: ("630290520e31c150be3570a8"),
      mot: 'mon mot',
      definition: 'tester@habib.com',
      published: false
    },
    {
      _id: ("6302a3c60e31c150be3570b6"),
      mot: 'toto',
      definition: 'fadad',
      published: false
    },
    {
      _id: ("6302a4040e31c150be3570ba"),
      mot: 'testerr',
      definition: 'tester@habib.com',
      published: false
   
    },
    {
      _id: ("6302a3c60e31c150be3570b6"),
      mot: 'toto',
      definition: 'fadad',
      published: false
     
    },
    {
      _id: ("630290520e31c150be3570a8"),
      mot: 'mon mot',
      definition: 'tester@habib.com',
      published: false
     
    }
  ];

  await User.findById(id)
    .then(data => {

        let listfavs = data.words;

        listfavs.forEach(wordid => {
          Words.findById(wordid).then((word) => {
         
            favs.push(word);
            console.log(favs);
          });
        });

        res
          .send(favs)
    })
    .catch(err => {
      console.log(err)
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};


// function getlistword(listId){
//   var favs = new array(); 

//   listId.forEach(wordid => {
//     Words.findById(wordid).then((word)=>{
//       favs.push(word)
//     });
//   });
//   console.log(favs);
  
//   return favs
// }