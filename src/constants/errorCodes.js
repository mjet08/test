import { OK, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN } from 'http-status'

export const errorCodes = {
  EMAIL_ALREADY_EXIST: {
    code: 'email_already_exist',
    status: OK
  },
  INVALID_REQUEST: {
    code: 'Invalid_Request',
    status: BAD_REQUEST
  },
  INVALID_USER_PASSSWORD: {
    code: 'invalid_user_password',
    status: FORBIDDEN
  },
  EMAIL_NOT_VERIFIED: {
    code: 'email_not_verified',
    status: UNAUTHORIZED
  },
  UNAUTHORIZED_REQUEST: {
    code: 'unauthorized',
    status: UNAUTHORIZED
  },
  SLOT_OPEN_MINIMUM_DAYS: {
    code: 'slot_open_minimum_days',
    status: OK
  },
  SLOT_CLOSE_MINIMUM_DAYS: {
    code: 'slot_close_minimum_days',
    status: OK
  },
  SLOT_NOT_EDITABLE: {
    code: 'slot_not_editable',
    status: OK
  },
  BOOKING_CANNOT_CANCELLED: {
    code: 'booking_cannot_cancelled',
    status: BAD_REQUEST
  },
  EXCEED_MAX_BOOKING_ALLOWED_PER_DAY: {
    code: 'exceed_max_booking_per_day',
    status: OK
  },
  EXCEED_MAX_BOOKING_ALLOWED_PER_WEEK: {
    code: 'exceed_max_booking_per_week',
    status: OK
  },
  SLOT_ALREADY_BOOKED: {
    code: 'slot_already_booked',
    status: OK
  },
  CLASS_ALREADY_BOOKED: {
    code: 'class_already_booked',
    status: OK
  }
}
