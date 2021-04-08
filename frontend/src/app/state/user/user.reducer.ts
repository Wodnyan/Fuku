import { createReducer, on } from "@ngrx/store";
import { User } from "src/types";
import { addUser, removeUser } from "./user.actions";

export const initialState: User | null = null;

const _userReducer = createReducer(
  initialState,
  on(addUser, (_, payload) => ({
    username: payload.username,
    email: payload.email,
    id: payload.id,
    avatarUrl: payload.avatarUrl,
  })),
  on(removeUser, (_) => null)
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
