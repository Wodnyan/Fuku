import { createAction, props } from "@ngrx/store";
import { User } from "src/types";

export const addUser = createAction("[User] Add User", props<User>());
export const removeUser = createAction("[User] Remove User");
export const updateUser = createAction("[User] Update User");
