import morgan from 'morgan';
import morganBody from 'morgan-body';
import {Request, Response, NextFunction, Express} from 'express';

import logger from 'jet-logger';
import { generateUUID } from '../utils';

export function requestID() {
  return function (request: Request, response: Response, next: NextFunction) {
    const requestID = generateUUID();
    request.id = requestID;
    next();
  };
}

const informationRequireToHide = [
  'state',
  'city',
  'town',
  'district',
  'fullAddress',
  'recipientName',
  'tel',
  'buyerUsername',
];

export function morganLog(app: Express) {
  morgan.token('id', (req: Request) => req.id);
  morgan.token('user_id', (req: Request) => req.user?.id) || '-';

  const stream = {
    write: (message: string) => {
      logger.info(message.trim());
      return true;
    },
  };

  const skip = (req: Request) => req.path === '/app/health';

  app.use(
    morgan(
      '[:id]  User Country: :req[cloudfront-viewer-country]; User IP: :req[x-forwarded-for]; User Id: :user_id; Tracking: :req[x-amz-cf-id]|:req[x-amzn-trace-id]',
      {
        stream: stream,
        skip: skip,
      }
    )
  );

  morganBody(app, {
    noColors: true,
    prettify: false,
    logReqDateTime: false,
    includeNewLine: false,
    maxBodyLength: Infinity,
    logRequestId: true,
    filterParameters: ['password', 'access_token', 'clientSecret'].concat(
      informationRequireToHide
    ),
    skip: skip,
    stream: stream,
  });
}
