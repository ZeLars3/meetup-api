export const STATUSES = {
  success: 200,
  serverError: 500,
  notFound: 404,
  created: 201,
  badRequest: 400,
  noCredentials: 401,
  unauthorized: 403,
  noContent: 204,
  unprocessableEntity: 422,
}

export const INFO_MESSAGES = {
  FailedCreateMeetup: 'Failed to create meetup!',
  FailedGetMeetups: 'Failed to get meetups!',
  FailedGetMeetup: 'Failed to get meetup!',
  MeetupNotFound: 'Meetup is not found!',
  FailedDeleteMeetup: 'Failed to delete meetup!',
  FailedUpdateMeetup: 'Failed to update meetup!',
  DeletedMeetup: 'Meetup is deleted from database!',
  UpdatedMeetup: 'Meetup is updated!',
  FailedRegister: 'Failed registration account',
  UserNotFound: `User hasn't been found!`,
  InvalidUserCred: 'Invalid login or password, please, try again!',
  WrongRequest: 'Wrong request, try again!',
}

export const ROUTES = {
  meetupRoute: '/meetup',
  authRoute: '/auth',
}
