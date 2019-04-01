import user from "./modules/common/user";

import booking from "./modules/forestage/booking";
import record from "./modules/forestage/record";

const adminApi = {}

Object.assign(adminApi, user,booking,record)
export default adminApi