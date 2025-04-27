import Icon from "../Icon/Icon";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useAppSelector } from "../app/hooks";


export function AuthWindow() {
  const authType = useAppSelector((state) => state.authType);
  
  return (
    <div className="auth-window">
      <div className="auth-window__wrapper">
        <div className="auth-window__logo">
          <img className="auth-window__logo-icon" src="/src/Images/logo-icon.png" alt="логотип маруси" />
          <Icon id="logo-word" className="auth-window__logo-word"></Icon>
        </div>
        {authType === "login" ? <LoginForm className="auth-window" /> : <RegisterForm className="auth-window" />}
      </div>
    </div>
  )
}