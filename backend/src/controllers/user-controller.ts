import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import {UserService} from '../services';

import {flatten} from 'lodash';
import { authConfig } from 'configs';
import { handleResponse } from 'helpers';

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      success: false,
      msg: errors.array(),
    });
  }

  const username = req.body.username;
  const password = req.body.password;
  const user = await UserService.processLogIn(username, password, [
    'userPermissions',
    'userPermissions.permission',
    'organizationRequest',
  ]);

  if (user) {
    const payload = {
      id: user.id,
      username: user.username,
      user_type: user.userType,
      parent_id: user.parentId,
    };
    const jwtToken = jwt.sign(payload, authConfig.jwt.secret, {
      expiresIn: ms(authConfig.jwt.ttl),
    });

    return res.send({
      success: true,
      access_token: jwtToken,
      expired_at: Date.now() + authConfig.jwt.ttl,
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        user_type: user.userType,
      },
    });
  }

  return res.send({
    success: false,
    msg: 'Invalid User or Password',
  });
};

export const refreshPermission = async (req: Request, res: Response) => {
  const userId = Number(req.user.id);
  const user = await UserService.getUserDetail(userId, [
    'userPermissions',
    'userPermissions.permission',
    'organizationRequest',
  ]);

  if (!user) {
    return res.send({
      success: false,
      msg: 'Invalid User',
    });
  }

  // Initialize an empty object to store the grouped actions and resources
  const actionPermission = {};
  let permissions = [];
  let linkUserIdsApproved = [];

  linkUserIdsApproved = user.organizationRequest
    .filter(linkedUser => linkedUser.status === 'approved')
    .map(user => user.linkUserId);
  permissions = flatten(user.userPermissions.map(uP => uP.permission));

  // Iterate over each item in the data array
  for (const permission of permissions) {
    // Parse the action and resources strings to convert them to actual arrays/objects
    const parsedActions: string[] = JSON.parse(permission.action);
    let parsedResources: any[] = JSON.parse(permission.resources);

    if (user.userType === USER_TYPE.ORGANIZATION) {
      if (!linkUserIdsApproved.includes(permission.userId)) continue;
      parsedResources = await convertAllResourceToDetail(
        permission.userId,
        parsedResources
      );
    }

    // Iterate over each action
    parsedActions.forEach(action => {
      // If the action does not exist in the groupedData object, create an empty array for it
      if (!actionPermission[action]) {
        actionPermission[action] = [];
      }
      // Add the resources to the corresponding action in groupedData
      actionPermission[action] =
        actionPermission[action].concat(parsedResources);
    });
  }

  return res.send({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      user_type: user.userType,
      action_permission: actionPermission,
    },
  });
};

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(handleResponse(req.id, {}, new ExpressValidator(errors)));
  }

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password !== confirmPassword) {
    return res.send(
      handleResponse(req.id, {}, new Error('New password is not match.'))
    );
  }

  try {
    await UserService.registerUser(username, email, password);
    return res.send(handleResponse(req.id, {}, null));
  } catch (err) {
    return res.send(handleResponse(req.id, {}, err));
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(handleResponse(req.id, {}, new ValidateError(errors)));
  }
  const userId = Number(req.params.userId);

  try {
    const user = await UserService.getUserDetail(userId);
    if (!user) {
      throw new Error('User Not Found');
    }
    const userDetail = {
      userType: user.userType,
      parentId: user.parentId,
      username: user.username,
      email: user.email,
      avatar: user.avatar || null,
      isEnabled: user.isEnabled,
      createdAt: new Date(user.createdAt).toISOString().split('T')[0],
    };
    return res.send(handleResponse(req.id, userDetail, null));
  } catch (err) {
    return res.send(handleResponse(req.id, {}, err));
  }
};

const updatePassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(handleResponse(req.id, {}, new ValidateError(errors)));
  }
  const userId = Number(req.params.userId);
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;

  const inValidOldPassword = await UserService.checkPasswordInvalid(
    userId,
    oldPassword
  );
  if (!inValidOldPassword) {
    return res.send(
      handleResponse(req.id, {}, new Error('Old password is not invalid.'))
    );
  }

  if (newPassword !== confirmNewPassword) {
    return res.send(
      handleResponse(req.id, {}, new Error('New password is not match.'))
    );
  }

  try {
    await UserService.updatePassword(userId, newPassword);
    return res.send(handleResponse(req.id, {}, null));
  } catch (err) {
    return res.send(handleResponse(req.id, {}, err));
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(handleResponse(req.id, {}, new ValidateError(errors)));
  }
  const userId = Number(req.params.userId);
  const email = req.body.email;

  try {
    await UserService.updateUser(userId, email);
    return res.send(handleResponse(req.id, {}, null));
  } catch (err) {
    return res.send(handleResponse(req.id, {}, err));
  }
};

export const changeAvatar = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(handleResponse(req.id, {}, new ValidateError(errors)));
  }
  const file = req.file;
  if (!file) {
    throw new Error('No file uploaded');
  }
  const userId = Number(req.params.userId);
  try {
    await UserService.uploadImageToS3(userId, file);
    return res.send(handleResponse(req.id, {}, null));
  } catch (err) {
    return res.send(handleResponse(req.id, {}, err));
  }
};
