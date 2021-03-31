import passport from "passport";

import { GithubStrategy } from "./githubStrategy";

export default function setup() {
  passport.use(GithubStrategy());
}
