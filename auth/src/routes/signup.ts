import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection.error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  body('email').isEmail().withMessage('Email must be provided'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw new BadRequestError('Email already in use');
    };

    const newUser = User.build({ email, password });
    await newUser.save();

    return res.status(201).send(newUser);
  }
);

export { router as signupRouter };
