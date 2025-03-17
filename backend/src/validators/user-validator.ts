import {Schema} from 'express-validator';

export const loginSchema: Schema = {
  username: {
    in: 'body',
    exists: {
      errorMessage: '`username` is required in body',
    },
  },
  password: {
    in: 'body',
    exists: {
      errorMessage: '`password` is required in body',
    },
  },
};

export const userDetail: Schema = {
  userId: {
    in: 'params',
    isInt: {
      errorMessage: '`userId must be integer`',
    },
  },
};

export const updatePassword: Schema = {
  userId: {
    in: 'params',
    isInt: {
      errorMessage: '`userId` must be integer',
    },
  },
  oldPassword: {
    in: 'body',
    exists: true,
    isString: {
      errorMessage: 'Old password must be a string',
    },
    matches: {
      options: [/^[\S]*$/],
      errorMessage: 'Old password is not valid',
    },
  },
  newPassword: {
    in: 'body',
    exists: true,
    isString: {
      errorMessage: 'New password must be a string',
    },
    matches: {
      options: [/^[\S]*$/],
      errorMessage: 'New password is not valid',
    },
  },
  confirmNewPassword: {
    in: 'body',
    exists: true,
    isString: {
      errorMessage: 'Confirm new password must be a string',
    },
    matches: {
      options: [/^[\S]*$/],
      errorMessage: 'Confirm new password is not valid',
    },
  },
};

export const createUser: Schema = {
  username: {
    in: 'body',
    exists: true,
    isString: {
      errorMessage: 'Username must be a string',
    },
    matches: {
      options: [/^[\S]*$/],
      errorMessage: 'Username is not valid',
    },
  },
  email: {
    in: 'body',
    exists: true,
    isEmail: {
      errorMessage: 'Email must be a email',
    },
  },
  password: {
    in: 'body',
    exists: true,
    isString: {
      errorMessage: 'Password must be a string',
    },
    matches: {
      options: [/^[\S]*$/],
      errorMessage: 'Password is not valid',
    },
  },
  confirmPassword: {
    in: 'body',
    exists: true,
    isString: {
      errorMessage: 'Confirm password must be a string',
    },
    matches: {
      options: [/^[\S]*$/],
      errorMessage: 'Confirm password is not valid',
    },
  },
};

export const updateUser: Schema = {
  userId: {
    in: 'params',
    isInt: {
      errorMessage: '`userId` must be integer',
    },
  },
  email: {
    in: 'body',
    exists: true,
    isEmail: {
      errorMessage: 'Email must be a email',
    },
  },
};

export const subUserListSchema: Schema = {
  keyword: {
    in: 'query',
    optional: true,
    isString: {
      errorMessage: '`keyword` must be a string',
    },
  },
  deleted: {
    in: 'query',
    optional: true,
    isBoolean: {
      errorMessage: '`deleted` must be boolean',
    },
    toBoolean: true,
  },
};

export const roleListSchema: Schema = {
  keyword: {
    in: 'query',
    optional: true,
    isString: {
      errorMessage: '`keyword` must be a string',
    },
  },
  limit: {
    in: 'query',
    optional: true,
    isInt: {
      errorMessage: '`limit` must be integer',
    },
    toInt: true,
  },
  page: {
    in: 'query',
    optional: true,
    isInt: {
      errorMessage: '`page` must be integer',
    },
    toInt: true,
  },
  deleted: {
    in: 'query',
    optional: true,
    isBoolean: {
      errorMessage: '`deleted` must be boolean',
    },
    toBoolean: true,
  },
};

export const permissionListSchema: Schema = {
  keyword: {
    in: 'query',
    optional: true,
    isString: {
      errorMessage: '`keyword` must be a string',
    },
  },
  deleted: {
    in: 'query',
    optional: true,
    isBoolean: {
      errorMessage: '`deleted` must be boolean',
    },
    toBoolean: true,
  },
};
