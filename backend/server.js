const EXPRESS = require("express");
const APP = EXPRESS();
const MONGOOOSE = require("mongoose");
const filebin = require("./fileBinModel");
const path = require("path");
const cors = require("cors");
const UPLOAD = require("express-fileupload");
const PORT = 8000 || process.env.PORT;
APP.use(cors());
APP.use(EXPRESS.json());
APP.use(UPLOAD());

MONGOOOSE.connect(
  "mongodb+srv://databasedeveloper:version2.0engaged@cluster0.pg4sw.mongodb.net/FILEBINDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
)
  .then((Res) => {
    console.log("DATABASE IS CONNECTED");
  })
  .catch((Err) => {
    console.log(Err);
  });

APP.post("/uploadfile", (req, res) => {
  if (req.files) {
    const FILE = req.files.file;
    const FILENAME = req.files.file.name;
    const FILESIZE = req.files.file.size;

    const newfilebin = new filebin({
      fetched: false,
    });
    newfilebin
      .save()
      .then((Res) => {
        const ID = Res._id;
        filebin
          .findByIdAndUpdate(
            ID,
            {
              fileurl: `http://localhost:8000/fetchfile/${ID}${FILENAME}/${ID}`,
            },
            { returnOriginal: false }
          )
          .then((Res) => {
            
              FILE.mv(
                path.join(__dirname, "./uploadedfiles", `${ID}${FILENAME}`),
                (Err) => {
                  if (Err) {
                    console.log(Err);
                    res.send("Internal server error");
                  } else {
                    res
                      .status(200)
                      .json({ msg: "FILE UPLOADED SUCCESSFULLY", Res });
                  }
                }
              );
            
          })
          .catch((Err) => {
            console.log(Err);
          });
      })
      .catch((Err) => {
        console.log(Err);
      });
  } else {
    res.status(200).json({ msg: "Please Upload a appropreate profile pic" });
  }
});

APP.get("/fetchfile/:filename/:id", (req, res) => {
  const FILENAME = req.params.filename;
  const ID = req.params.id;
  filebin.findById(ID).then((Res) => {
    const FETCHED = Res.fetched;
    if (FETCHED) {
      res.status(200).send("URL HAS BEEN FETCHED ONCE");
    } else {
      filebin
        .findByIdAndUpdate(ID, { fetched: true }, { returnOriginal: false })
        .then((Res) => {
          if (Res) {
            res.sendFile(
              path.join(__dirname, "./uploadedfiles", `${FILENAME}`)
            );
          }
        });
    }
  });
});

APP.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});
