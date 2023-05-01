import { redirect } from "react-router-dom";

export function LogoutHandler() {
  localStorage.removeItem("userlogin");
  return redirect("/");
}
