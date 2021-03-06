const express = require("express");
const authRequired = require("../middleware/authRequired");
const RequestResponses = require("./requestresponseModel");
const router = express.Router();

router.get("/", authRequired, function (req, res) {
  RequestResponses.findAll()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", authRequired, function (req, res) {
  const id = req.params.id;
  // const dataArr = [];
  // const data = RequestResponses.findAll().then((data) => {
  //   const dataArr = [];
  //   dataArr.push(data);
  //   console.log(dataArr);
  // });
  // dataArr.push(data);
  // console.log(dataArr);

  RequestResponses.findById(id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: "responseNotFound" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:surveyrequestid/details", authRequired, function (req, res) {
  const id = String(req.params.id);
  RequestResponses.findById(id)
    .then((response) => {
      if (response) {
        RequestResponses.getAllReplyonResponse(id).then((responsedetail) => {
          if (responsedetail) {
            res.status(200).json(responsedetail);
          } else {
            res.status(404).json({
              message: "Failed to get response detail. Try again later.",
            });
          }
        });
      } else {
        res.status(404).json({ error: "ResponseNotFound" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", authRequired, async (req, res) => {
  const response = req.body;

  RequestResponses.create(response)
    .then((response) => {
      res
        .status(200)
        .json({ message: "response created", response: response[0] });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
  //   if (response) {
  //     const id = response.id || 0;
  //     try {
  //       await RequestResponses.findById(id).then(async (pf) => {
  //         if (pf == undefined) {
  //           //profile not found so lets insert it
  //           await RequestResponses.create(response).then((response) => {
  //             res
  //               .status(200)
  //               .json({ message: "response created", response: response[0] });
  //           });
  //         } else {
  //           res.status(400).json({ message: "response already exists" });
  //         }
  //       });
  //     } catch (e) {
  //       res.status(500).json({ message: e.message });
  //     }
  //   } else {
  //     res.status(404).json({ message: "response missing" });
  //   }
});

router.put("/", authRequired, (req, res) => {
  const response = req.body;
  if (response) {
    const id = response.id || 0;
    RequestResponses.findById(id)
      .then(
        RequestResponses.update(id, response)
          .then((updated) => {
            res
              .status(200)
              .json({ message: "response created", response: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update response '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find response '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  RequestResponses.remove(id)
    .then((data) => {
      res.status(200).json({
        message: `Removed ${data} request response, ID: ${id} successfully`,
      });
    })
    .catch((err) => res.status(400).json({ message: err.error }));
  // try {
  //   RequestResponses.findById(id).then((response) => {
  //     RequestResponses.remove(response.id).then(() => {
  //       res.status(200).json({
  //         message: `response '${id}' was deleted.`,
  //         response: response,
  //       });
  //     });
  //   });
  // } catch (err) {
  //   res.status(500).json({
  //     message: `Could not delete response with ID: ${id}`,
  //     error: err.message,
  //   });
  // }
});

module.exports = router;
