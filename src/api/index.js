import user from "./modules/common/user";

import booking from "./modules/forestage/booking";
import record from "./modules/forestage/record";




import users from "./modules/backstage/users";
import bookings from "./modules/backstage/bookings";
import termical from "./modules/backstage/termical";
import dashboard from "./modules/backstage/dashboard";

const adminApi = {}

Object.assign(adminApi, user, booking, record, users, bookings, termical, dashboard)
export default adminApi