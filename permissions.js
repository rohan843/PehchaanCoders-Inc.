import { actions, roles } from "./constants.js";

const mappings = new Map();

mappings.set(actions.MODIFY_FILE, [roles.ADMIN, roles.EDITOR]);
mappings.set(actions.VIEW_FILE, [roles.ADMIN, roles.EDITOR, roles.GUEST]);
mappings.set(actions.DELETE_FILE, [roles.ADMIN]);
mappings.set(actions.CREATE_FILE, [roles.ADMIN, roles.EDITOR]);