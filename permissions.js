import { actions, roles } from "./constants.js";

const mappings = new Map();

mappings.set(actions.MODIFY_FILE, [roles.Student, roles.College, roles.AICTE]);
mappings.set(actions.VIEW_FILE, [roles.Student, roles.College, roles.AICTE]);
mappings.set(actions.DELETE_FILE, [roles.AICTE]);
mappings.set(actions.CREATE_FILE, [roles.College, roles.Student]);