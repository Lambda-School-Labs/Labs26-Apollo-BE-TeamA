const express = require("express");
const authRequired = require("../middleware/authRequired");
const Topics = require("./topicModel");
const Topic_Contexts = require("../topicContextQuestion/topiccontextquestionModel")
const Topic_Requests = require("../topicRequestQuestion/topicrequestquestionModel")
const router = express.Router();

//EMAIL SERVICE
const emailService = require("../sendgrid/topicEmail.js");

router.get("/", authRequired, function (req, res) {
  Topics.findAll()
    .then((topic) => {
      res.status(200).json(topic);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", authRequired, function (req, res) {
  const id = String(req.params.id);
  Topics.findById(id)
    .then((topic) => {
      if (topic) {
        res.status(200).json(topic);
      } else {
        res.status(404).json({ error: "topicNotFound" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id/details", authRequired, function (req, res) {
  const id = String(req.params.id);
  Topics.findById(id)
    .then((topic) => {
      if (topic) {
        Topics.getAllAboutTopic(id).then((topicdetail) => {
          if (topicdetail) {
            res.status(200).json(topicdetail);
          } else {
            res.status(404).json({
              message: "Failed to get topic details. Try again later.",
            });
          }
        });
      } else {
        res.status(404).json({ error: "TopicNotFound" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", authRequired, async (req, res) => {
  const topic = req.body;
  if (topic) {
    const id = topic.id || 0;
    try {
      await Topics.findById(id).then(async (pf) => {
        if (pf == undefined) {
          //profile not found so lets insert it
          await Topics.create(topic).then((topic) =>
            res.status(200).json({ message: "topic created", topic: topic[0] })
          );

        //   await Topic_Contexts.create(topic_question).then((topic_question) => 
        //     res.status(200).json({ message: "topic_question created", topic: topic[0] })
        //   );

        //   await Topic_Requests.create(topic_question).then((topic_question) => 
        //     res.status(200).json({ message: "topic_question created", topic: topic[0] })
        // );

          // Call to send email via sendgrid.
          Topics.findEmail(topic.leaderid).then((data) => {
            console.log(data.email);
            emailService(data.email);
          });
        } else {
          res.status(400).json({ message: "topic already exists" });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: "topic missing" });
  }
});

router.put("/", authRequired, (req, res) => {
  const topic = req.body;
  if (topic) {
    const id = topic.id || 0;
    Topics.findById(id)
      .then(
        Topics.update(id, topic)
          .then((updated) => {
            res
              .status(200)
              .json({ message: "topic created", topic: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update topic '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find topic '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  try {
    Topics.findById(id).then((topic) => {
      Topics.remove(topic.id).then(() => {
        res
          .status(200)
          .json({ message: `topic '${id}' was deleted.`, topic: topic });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete topic with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;