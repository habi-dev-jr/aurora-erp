// Authentication and Authorization Middleware
import {NextFunction, Request, Response} from 'express';
import { authConfig } from '../configs';
import { AuthenticationError } from '../errors';
import { handleResponse } from '../helpers';

import jwt, {JsonWebTokenError} from 'jsonwebtoken';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      res.json(
        handleResponse(req.id, {}, new AuthenticationError('Missing token'))
      );
      return;
    }

    jwt.verify(token, authConfig.jwt.secret, (err, decoded) => {
      if (err) {
        let message = 'Invalid token';
        if (err instanceof JsonWebTokenError) message = err.message;
        return res.json(
          handleResponse(req.id, {}, new AuthenticationError(message))
        );
      }
      req.user = decoded;
      next();
    });
  } else {
    res.json(
      handleResponse(req.id, {}, new AuthenticationError('Unauthorize'))
    );
    return;
  }
};
