import Voter from '../models/Voter.js';
import generateVoterAuthToken from '../utils/generateVoterAuthToken.js';
import bcrypt from 'bcryptjs';

export const loginVoter = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', { email, password }); // Debug

  const voter = await Voter.findOne({ email }).select('+password');
  const isMatch = await bcrypt.compare(password, voter.password);
  if (voter && isMatch) {
    res.status(200).json({
      _id: voter._id,
      VoterId: voter.VoterId,
      name: voter.name,
      email: voter.email,
      token: generateVoterAuthToken(voter._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};