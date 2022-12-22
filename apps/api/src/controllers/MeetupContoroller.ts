import { STATUSES, INFO_MESSAGES } from '../constants';
import MeetupModel from '../models/Meetup';

export const create = async (req, res) => {
  try {
    const { title, description, place, tags, date } = req.body;

    const doc = new MeetupModel({
      title,
      description,
      place,
      tags,
      date,
      user: req.userId,
    });

    const meetup = await doc.save();

    res.status(STATUSES.created).json(meetup);
  } catch (err) {
    res.status(STATUSES.serverError).json({
      message: INFO_MESSAGES.FailedCreateMeetup,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const meetups = await MeetupModel.find().populate('user').exec();

    res.status(STATUSES.success).json(meetups);
  } catch (err) {
    res.status(STATUSES.serverError).json({
      message: INFO_MESSAGES.FailedGetMeetups,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const meetupId = req.params.id;

    MeetupModel.findById(
      {
        _id: meetupId,
      },
      (err, doc) => {
        if (err) {
          return res.status(STATUSES.serverError).json({
            message: INFO_MESSAGES.FailedGetMeetup,
          });
        }

        if (!doc) {
          return res.status(STATUSES.notFound).json({
            message: INFO_MESSAGES.MeetupNotFound,
          });
        }

        res.status(STATUSES.success).json(doc);
      }
    ).populate('user');
  } catch (err) {
    res.status(STATUSES.serverError).json({
      message: INFO_MESSAGES.FailedGetMeetups,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const meetupId = req.params.id;

    await MeetupModel.findOneAndDelete(
      {
        _id: meetupId,
      },
      (err, doc) => {
        if (err) {
          return res.status(STATUSES.serverError).json({
            message: INFO_MESSAGES.FailedDeleteMeetup,
          });
        }

        if (!doc) {
          return res.status(STATUSES.notFound).json({
            message: INFO_MESSAGES.MeetupNotFound,
          });
        }

        res.status(STATUSES.success).json({
          success: true,
          message: INFO_MESSAGES.DeletedMeetup
        });
      }
    );
  } catch (err) {
    res.status(STATUSES.serverError).json({
      message: INFO_MESSAGES.FailedDeleteMeetup,
    });
  }
};

export const update = async (req, res) => {
  try {
    const meetupId = req.params.id;
    const { title, description, place, tags, date } = req.body;

    await MeetupModel.updateOne(
      {
        _id: meetupId,
      },
      {
        title,
        description,
        place,
        tags: tags.split(','),
        date,
        user: req.userId,
      }
    );

    res.status(STATUSES.success).json({
      success: true,
      message: INFO_MESSAGES.UpdatedMeetup,
    });
  } catch (err) {
    res.status(STATUSES.serverError).json({
      message: INFO_MESSAGES.FailedUpdateMeetup,
    });
  }
};
