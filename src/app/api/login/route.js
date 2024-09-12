import dbConnect from '../../../dbConfig/config';
import User from '../../../models/model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try { 
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
 
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
 
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
