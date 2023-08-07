const express = require('express');
const proposal = require('../Models/Proposals');
const app = express();
const User = require('../Models/User');
const router = express.Router();
const path = require('path');
const reproposal = require('../Models/ReProposal');
app.use(express.json());

router.post('/adminUsers', async (req, res) => {
  const user = await User.find({ admin: false })
  try {
    res.json({ user: user })
    // console.log(user);
  } catch (error) {
    console.log(error)
    res.json({ success: false })

  }
})

router.post('/admingetForms', async (req, res) => {
  try {
    const pro = await proposal.find(proposal._id)
    // console.log(pro);
    console.log(typeof (pro))
    res.send(pro).status(200)
    // res.json(pro).status(200)
  } catch (error) {
    console.log(error)
    res.json(error).status(500)
  }
})

router.post('/adminCount', async (req, res) => {
  const categories = req.body;
  const arr = [];

  try {
    const countPromises = categories.map(async (category) => {
      const count = await proposal.countDocuments({ category });
      return { [category]: count };
    });

    const results = await Promise.all(countPromises);
    arr.push(...results);

    const total = await proposal.countDocuments();
    arr.push({ Total: total });

    return res.send(arr);
  } catch (error) {
    console.log(error);
    res.json({ error: error }).status(500);
  }
});

router.post('/adminDownload', async (req, res) => {
  try {
    let id = req.body.id;
    let type = req.body.type;

    if(type=="reproposal"){
      let repro = await reproposal.findById(id);
      if (!repro) {
        // If the proposal is not found, return an appropriate response
        return res.status(404).json({ error: 'Proposal not found' });
      }
      const filePath = repro.proposal_file_path;
      const absolutePath = path.join('C:\\Users\\tg210\\OneDrive\\Desktop\\Codes\\Sem 4\\CDAC\\proposal\\Backend\\uploads\\', '', filePath);
      const fileName = path.basename(filePath);
      res.setHeader('Content-Type', 'application/pdf');
      // Set the 'Content-Disposition' header to specify the filename when downloading
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
  
      // Send the file in the response
      res.sendFile(absolutePath);
    }
    
    else{
      let pro = await proposal.findById(id);
      if (!pro) {
        // If the proposal is not found, return an appropriate response
        return res.status(404).json({ error: 'Proposal not found' });
      }
      const filePath = pro.proposal_file_path;
      const absolutePath = path.join('C:\\Users\\tg210\\OneDrive\\Desktop\\Codes\\Sem 4\\CDAC\\proposal\\Backend\\uploads\\', '', filePath);
      const fileName = path.basename(filePath);
      res.setHeader('Content-Type', 'application/pdf');
      // Set the 'Content-Disposition' header to specify the filename when downloading
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
  
      // Send the file in the response
      res.sendFile(absolutePath);
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/adminProposalResubmission', async (req, res) => {
  try {
    const id = req.body.id;
    const pro = await proposal.findByIdAndUpdate(id, { proposal_access: true, proposal_submit: true });

    if (pro) {
      res.sendStatus(200);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/adminReproposalCount', async (req, res) => {
  try {
    let parentProposal = req.body.parentProposal;
    const repro = await reproposal.find({ parentProposal: parentProposal });
    const pro = await proposal.findById(parentProposal);

    if (repro && pro) {
      const combinedResults = { first: pro, second: repro };
      res.status(200).json(combinedResults);
    } else {
      res.sendStatus(404); // If either 'pro' or 'repro' is not found, you can return a 404 status
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;